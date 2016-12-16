const execa   = require('execa')
const Listr   = require('listr')
const package = require('./package.json')

const tasks = new Listr([
  {
    title: 'dependencies',
    task: () => {
      return new Listr(
        Object.keys(package.dependencies).map(name => {
          const version = package.dependencies[name]
          return {
            title: name,
            task: () => execa('npm', ['install', `${name}@${version}`, '--save'])
          }
        }),
        {concurrent: true}
      )
    },
  },
  {
    title: 'devDependencies',
    task: () => {
      return new Listr(
        Object.keys(package.devDependencies).map(name => {
          const version = package.devDependencies[name]
          return {
            title: name,
            task: () => execa('npm', ['install', `${name}@${version}`, '--save-dev'])
          }
        }),
        {concurrent: true}
      )
    },
  }
], {concurrent: true})

tasks.run().catch(err => {
    console.error(err)
})
