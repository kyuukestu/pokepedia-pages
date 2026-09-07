import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, relative, dirname } from 'node:path'
import fg from 'fast-glob'

const definitionsDir = resolve('src/data/events/definitions')
const outputFile = resolve(
  'src/data/events/generated/definition-registry.ts',
)

const files = await fg('**/*.ts', {
  cwd: definitionsDir,
  absolute: true,
})

const definitions: {
  file: string
  id: string
}[] = []

const ids = new Set<string>()
const variableNames = new Set<string>()

for (const file of files) {
  const content = await readFile(file, 'utf8')

  const match = content.match(/id:\s*['"]([^'"]+)['"]/)

  if (!match) {
    throw new Error(`Could not find definition ID in ${file}`)
  }

  const id = match[1]

  if (ids.has(id)) {
    throw new Error(`Duplicate definition ID '${id}' found in ${file}`)
  }

  ids.add(id)

  const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')

  if (variableNames.has(variableName)) {
    throw new Error(
      `Definition ID '${id}' produces a duplicate import variable '${variableName}'`,
    )
  }

  variableNames.add(variableName)

  definitions.push({
    file,
    id,
  })
}

definitions.sort((a, b) => a.id.localeCompare(b.id))

const imports = definitions
  .map(({ file, id }) => {
    const importPath = relative(dirname(outputFile), file)
      .replace(/\\/g, '/')
      .replace(/\.ts$/, '')

    const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')

    return `import ${variableName} from '${importPath.startsWith('.') ? importPath : `./${importPath}`}'`
  })
  .join('\n')

const registryEntries = definitions
  .map(({ id }) => {
    const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')
    return `  ${variableName}`
  })
  .join(',\n')

const definitionIds = definitions
  .map(({ id }) => `  | '${id}'`)
  .join('\n')

const output = `// AUTO-GENERATED FILE
// Do not edit manually.

${imports}

export const eventDefinitions = [
${registryEntries},
] as const

export type EventDefinitionId =
${definitionIds}
`

await mkdir(dirname(outputFile), {
  recursive: true,
})

await writeFile(outputFile, output)

console.log(
  `Generated ${definitions.length} event definitions.`,
)
