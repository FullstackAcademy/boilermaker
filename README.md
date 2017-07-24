# Boilermaker

*Good things come in pairs*

Looking to mix up a backend with express/sequelize and a frontend with react/redux? That's `boilermaker`!

Follow along with the workshop to make your own! This canonical version can serve as a reference, or a starting point all on its own.

## Setup

To use this boilerplate, you'll need to take the following steps:

* Fork and clone this repo.
* `cd` into your clone and `rm -rf .git` to remove the boilerplate git tracking
* Update project name and description in `package.json` file
* `git init` to start your own git tracking
* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `boilermaker` and `boilermaker-test` (you can substitute these with the name of your own application - just be sure to go through and change the `package.json` and `server/db/db.js` to refer to the new names)
  * By default, running `npm test` will use `boilermaker-test`, while regular development uses `boilermaker`
* Create a file called `secrets.js` in the project root
  * This file is `.gitignore`'d, and will *only* be required in your *development* environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * However, it's **very** important that you **not** push it to Github! Otherwise, *prying eyes* will find your secret API keys!
  * It might look like this:

  ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush';
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret';
    process.env.GOOGLE_CALLBACK = '/auth/google/callback';
  ```

* To use OAuth with Google, complete the step above with a real client ID and client secret from Google
  * You can get them here: https://console.developers.google.com/apis/credentials

## Start

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment

Ready to go world wide? Here's a guide to deployment!

### Prep
1. Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and install [Yarn](https://yarnpkg.com/en/) if you haven't already (`npm install -g yarn`)
2. `heroku login`
3. Add a git remote for heroku:
  - **If you're creating a new app...**
    1. `heroku create` or `heroku create your-app-name` if you have a name in mind.
    2. `heroku addons:create heroku-postgresql:hobby-dev` to add ("provision") a postgres database to your heroku dyno

  - **If you already have a Heroku app...**
    1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

### When you're ready to deploy

1. Make sure that all your work is fully committed and pushed to your master branch on Github.
2. Checkout a new branch called "deploy": `git checkout -b deploy`. If you currently have an existing branch called "deploy", delete it now (`git branch -d deploy`). Note that the name "deploy" here isn't magical, but it needs to match the name of the branch we specify in step 3d.
3. `npm run deploy` - this will cause the following commands to happen in order:
  a. `webpack -p`: webpack will run in "production mode"
  b. `git add -f public/bundle.js public/bundle.js/map`: "force" add the otherwise gitignored build files
  c. `git commit --allow-empy -m 'Deploying'`: create a commit, even if nothing changed
  d. `git push heroku deploy:master`: push your local "deploy" branch to the "master" branch on heroku

Now, you should be deployed! To clean up, remove your deploy branch:

4. `git checkout master`: return to your master branch
5. `git branch -d deploy`: remove the deploy branch

Why do all of these steps? The big reason is because we don't want our production server to be cluttered up with dev dependencies like webpack, but at the same time we don't want our development git-tracking to be cluttered with production build files like bundle.js! By doing these steps, we make sure our development and production environments both stay nice and clean!

(By the way, if performing these steps seems tedious and error-prone, try writing a shell script that will do them all for you!)
