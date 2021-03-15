const config = require('./../config.json')
const { Octokit } = require('@octokit/rest')

const github = module.exports = {}

let octokit

github.initialize = function() {
  octokit = new Octokit({
    auth: config.githubToken,
    userAgent: `${config.githubOrganization}/link-netlify`
  })
}

github.execute = async function(projectName, githubTemplateRepo) {
  const repoInfo = await octokit.repos.createUsingTemplate({
    template_owner: config.githubOrganization,
    template_repo: githubTemplateRepo,
    owner: config.githubOrganization,
    name: projectName,
    include_all_branches: false,
    private: true
  })

  console.log(` -- Created repository from Github template repository: ${config.githubOrganization}/${githubTemplateRepo}`)

  return repoInfo.data.id
}

github.addNetlifyDeployKey = function(projectName, netlifyDeployPublicKey) {
  console.log(' -- Github - adding Netlify deploy key')
  return octokit.repos.createDeployKey({
    owner: config.githubOrganization,
    repo: projectName,
    key: netlifyDeployPublicKey
  })
}
