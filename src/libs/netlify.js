const config = require('./../config.json')
const NetlifyAPI = require('netlify')

const netlify = module.exports = {}

let client

netlify.initialize = function() {
  client = new NetlifyAPI(config.netlifyAccessToken)
}

netlify.execute = async function(projectName, deployKey, githubRepoId) {
  // link the repo

  let domain = projectName
  // Create a site. Notice `body` here for sending OpenAPI body
  try {
    await netlify.createSite(githubRepoId, deployKey, projectName, domain)
  } catch (error) {
    console.log(` -- Failed to use domain: "${projectName}.netlify.app"`, error)
    console.log(` -- Now trying domain: "${config.netlifyUrlPrefix}${projectName}.netlify.app"`)
    domain = `${config.netlifyUrlPrefix}${projectName}`
    await netlify.createSite(githubRepoId, deployKey, projectName, domain)
  }

  console.log(` -- Netlify linked to: ${config.githubOrganization}/${projectName}`)

  return domain
}

netlify.createSite = function(githubRepoId, deployKey, projectName, domain) {
  return client.createSite({
    body: {
      name: domain,
      repo: {
        cmd: 'gatsby build',
        dir: 'public',
        id: githubRepoId,
        provider: 'github',
        repo_type: 'git',
        repo_url: `https://github.com/${config.githubOrganization}/${projectName}`,
        repo_branch: config.githubBranch,
        repo_path: `${config.githubOrganization}/${projectName}`,
        deploy_key_id: deployKey
      }
    }
  })
}

netlify.createDeployKey = function() {
  // reference: https://github.com/Shiva-sandupatla/Netlify-deployment-of-github-repo
  console.log(' -- Netlify - creating deploy key')
  return client.createDeployKey()
}

netlify.getDeployUrl = function(projectName) {
  return `https://app.netlify.com/sites/${projectName}/deploys`
}

netlify.getSiteUrl = function(domain) {
  return `http://${domain}.netlify.app`
}
