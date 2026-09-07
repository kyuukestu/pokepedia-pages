import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, relative, dirname } from 'node:path'
import fg from 'fast-glob'

const categoriesDir = resolve('src/data/events/categories')
const outputFile = resolve(
  'src/data/events/generated/category-registry.ts',
)

const files = await fg('**/*.ts', {
  cwd: categoriesDir,
  absolute: true,
})

const categories: {
  file: string
  id: string
}[] = []

const ids = new Set<string>()
const variableNames = new Set<string>()

for (const file of files) {
  const content = await readFile(file, 'utf8')

  const match = content.match(/id:\s*['"]([^'"]+)['"]/)

  if (!match) {
    throw new Error(`Could not find event category ID in ${file}`)
  }

  const id = match[1]

  if (ids.has(id)) {
    throw new Error(`Duplicate category ID ${id} found in ${file}`)
  }

  ids.add(id)

  const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')

  if (variableNames.has(variableName)) {
    throw new Error(
      `Category ID '${id}' produces a duplicate import variable '${variableName}'`,
    )
  }

  variableNames.add(variableName)

  categories.push({
    file,
    id,
  })
}

categories.sort((a, b) => a.id.localeCompare(b.id))

const imports = categories
  .map(({ file, id }) => {
    const importPath = relative(dirname(outputFile), file)
      .replace(/\\/g, '/')
      .replace(/\.ts$/, '')

    const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')

    return `import ${variableName} from '${importPath.startsWith('.') ? importPath : `./${importPath}`}'`
  })
  .join('\n')

const registryEntries = categories
  .map(({ id }) => {
    const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')
    return `  ${variableName}`
  })
  .join(',\n')

const categoryIds = categories
  .map(({ id }) => `  | '${id}'`)
  .join('\n')

const output = `// AUTO-GENERATED FILE
// Do not edit manually.

${imports}

export const eventCategories = [
${registryEntries},
] as const

export type EventCategoryId =
${categoryIds}
`

await mkdir(dirname(outputFile), {
  recursive: true,
})

await writeFile(outputFile, output)

console.log(
  `Generated ${categories.length} event categories.`,
)
