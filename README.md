# Github + Netlify + Gatsby = :heart:
This is to show how we can remove all the manual process to clone a Github template repository and deploy into Netlify with a specific subdomain.

## Installation
```
npm install
```

## Run
Change the configuration to your settings inside:
```
src/config.json
```

_**Note:** DO NOT DEPLOY TO PRODUCTION UNLESS you have changed this code to hide the Personal Access Tokens into environmental variables_

Now call, in `index.js`, the `execute()` with you new repository:
```
execute(`yourNewRepoName`)
```

## How to use
There are many ways to use this, here are a few:
* Slack command: `/create <yourNewRepo>`
* Terminal command: `create <yourNewRepo>`
* In any other project to save manual work
* ...
