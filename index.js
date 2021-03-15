const config = require('./src/config.json')
const github = require('./src/libs/github')
const netlify = require('./src/libs/netlify')

execute = async function(projectName) {
  const { githubTemplateRepo } = config

  github.initialize()
  netlify.initialize()

  const githubRepoId = await github.execute(projectName, githubTemplateRepo)

  const netlifyDeployKeys = await netlify.createDeployKey()

  await github.addNetlifyDeployKey(projectName, netlifyDeployKeys.public_key)

  console.log(' -- Waiting 5s for Github to sort itself -- ')
  await delay(5000) // waiting 10 seconds.

  return await netlify.execute(projectName, netlifyDeployKeys.id, githubRepoId)
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
