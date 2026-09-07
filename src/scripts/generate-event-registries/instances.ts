import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve, relative, dirname } from 'node:path'
import fg from 'fast-glob'

const instancesDir = resolve('src/data/events/instances')
const outputFile = resolve(
  'src/data/events/generated/instance-registry.ts',
)

const files = await fg('**/*.ts', {
  cwd: instancesDir,
  absolute: true,
})

const instances: {
  file: string
  id: string
}[] = []

const ids = new Set<string>()
const variableNames = new Set<string>()

for (const file of files) {
  const content = await readFile(file, 'utf8')

  const match = content.match(/id:\s*['"]([^'"]+)['"]/)

  if (!match) {
    throw new Error(`Could not find instance ID in ${file}`)
  }

  const id = match[1]

  if (ids.has(id)) {
    throw new Error(`Duplicate instance ID '${id}' found in ${file}`)
  }

  ids.add(id)

  const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')

  if (variableNames.has(variableName)) {
    throw new Error(
      `Instance ID '${id}' produces a duplicate import variable '${variableName}'`,
    )
  }

  variableNames.add(variableName)

  instances.push({
    file,
    id,
  })
}

instances.sort((a, b) => a.id.localeCompare(b.id))

const imports = instances
  .map(({ file, id }) => {
    const importPath = relative(dirname(outputFile), file)
      .replace(/\\/g, '/')
      .replace(/\.ts$/, '')

    const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')

    return `import ${variableName} from '${importPath.startsWith('.') ? importPath : `./${importPath}`}'`
  })
  .join('\n')

const registryEntries = instances
  .map(({ id }) => {
    const variableName = id.replace(/[^a-zA-Z0-9_$]/g, '_')
    return `  ${variableName}`
  })
  .join(',\n')

const instanceIds = instances
  .map(({ id }) => `  | '${id}'`)
  .join('\n')

const output = `// AUTO-GENERATED FILE
// Do not edit manually.

${imports}

export const eventInstances = [
${registryEntries},
] as const

export type EventInstanceId =
${instanceIds}
`

await mkdir(dirname(outputFile), {
  recursive: true,
})

await writeFile(outputFile, output)

console.log(
  `Generated ${instances.length} event instances.`,
)
