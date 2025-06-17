import * as fs from 'fs'
import * as path from 'path'

interface RouteConfig {
  path: string
  name: string
  component: string
}

const projectRoot = import.meta.dir
const viewsPath = path.resulve(projectRoot, './src/views')
const routesOutputPath = path.resolve(projectRoot, './src/router/generatedRoutes.ts')

const generateRoutes = (directory: string, parentPath: string = ''): RouteConfig[] => {
  let routes: RouteConfig[] = []
  const files = fs.readdirSync(directory) // Bun's fs.readdirSync works

  files.forEach((file) => {
    const fullPath = path.join(directory, file) // Bun's path.join works
    const stat = fs.statSync(fullPath) // Bun's fs.statSync works

    if (stat.isDirectory()) {
      const newParentPath =
        parentPath === '' ? `/${file}` : `<span class="math-inline">\{parentPath\}/</span>{file}`
      routes = routes.concat(generateRoutes(fullPath, newParentPath))
    } else if (file.endsWith('.vue')) {
      const componentName = path.basename(file, '.vue')
      const routePath =
        parentPath === ''
          ? `/${componentName.toLowerCase()}`
          : `<span class="math-inline">\{parentPath\}/</span>{componentName.toLowerCase()}`

      // Calculate relative path from project root (where tsconfig.json points @/)
      // For Vite, the alias `@/` usually resolves from the project root.
      const componentRelativePath = path
        .relative(path.resolve(projectRoot, './src'), fullPath)
        .replace(/\\/g, '/')

      routes.push({
        path: routePath,
        name: componentName,
        component: `() => import('@/${componentRelativePath}')`,
      })
    }
  })

  return routes
}

const generatedRoutes: RouteConfig[] = generateRoutes(viewsPath)

const routeString = `
import { routeRecordRaw } from 'vue-router'

interface GeneratedRoute {
  path: string
  name: string
  component: string
}

const rawGeneratedRoutes: GeneratedRoute[] = ${JSON.stringify(generatedRoutes, null, 4)};

const routes: RouteRecordRaw[] = rawGeneratedRoutes.map(route => {
return {
...route,
component: () => import(route.component) as () => Promise<any>};
});

export default routes;`

fs.writeFileSync(routesOutputPath, routeString)

console.log(`Routes generated at ${routesOutputPath}`)

const sandboxLinks = [
  { title: '' },
  { title: 'Trainer 101' },
  { title: 'Regions' },
  { title: 'Law Enforcement' },
  { title: 'Supervisory Boards' },
  { title: 'PokeCorp' },
  { title: 'PokeAcademia' },
  { title: 'PokeTech' },
  { title: 'Sandbox Events' },
  { title: 'Characters' },
  { title: 'Misc' },
]

const sandboxTrainerContentLinks = [
  { title: 'Trainer101.Trainer-IDs' },
  { title: 'Trainer101.Permit.Sky' },
  { title: 'Trainer101.Permit.Land' },
  { title: 'Trainer101.Permit.Water' },
]

const syncLinks = [
  { title: '' },
  { title: 'Setting' },
  { title: 'Fortitude' },
  { title: 'Sync Events' },
  { title: 'Swarms' },
  { title: 'PokeJobs' },
  { title: 'Vocations' },
  { title: 'PokeAcademy' },
]

const sandboxRoutes = sandboxLinks.map((route) => {
  if (route.title === '') {
    return {
      path: '/sandbox',
      name: 'sandbox',
      component: () => import('../views/sandbox/SandboxView.vue'),
    }
  } else {
    return {
      path: `${route.title.toLowerCase().replace(' ', '-')}`,
      name: route.title,
      component: () => import(`../views/sandbox/main/${route.title.replace(' ', '')}View.vue`),
    }
  }
})

const sandboxTrainerContentRoutes = sandboxTrainerContentLinks.map((route) => {
  return {
    path: `content/${route.title.toLowerCase().replace(' ', '-')}`,
    name: route.title,
    component: () => import(`../views/sandbox/content/${route.title.replace(' ', '')}View.vue`),
  }
})

console.log('Content Routes', JSON.stringify(sandboxTrainerContentRoutes))

const syncRoutes = syncLinks.map((route) => {
  if (route.title === '') {
    return {
      path: '/sync',
      name: 'sync',
      component: () => import('../views/sync/SyncView.vue'),
    }
  } else {
    return {
      path: `${route.title.toLowerCase().replace(' ', '-')}`,
      name: route.title,
      component: () => import(`../views/sync/${route.title.replace(' ', '')}View.vue`),
    }
  }
})

console.log(`Sandbox Routes: ${JSON.stringify(sandboxRoutes).toString()}`)
console.log(`Sync Routes: ${JSON.stringify(syncRoutes)}`)
