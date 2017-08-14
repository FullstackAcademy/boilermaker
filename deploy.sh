#!/usr/bin/env bash

# Hey everyone, this is a bash script! (They end in .sh)!
# You can use scripts like these to execute commands on the command line
# one after the other.

echo 'Prepare to deploy...'

# 1. Checkout a dummy branch called 'deploy'.
# Make sure that you don't currently have a branch hanging around called 'deploy',
# or this step will fail!
git checkout -b deploy

# 2. Run webpack with -p for 'production' mode. This builds our bundle.js and bundle.js.map
webpack -p

# 3. Add our normally ignored bundle.js and bundle.js.map files with -f for force.
# This ensures that our build files are included on our production server.
git add -f public/bundle.js public/bundle.js.map

# 4. Make a commit (which could be empty, in case we want to force a re-deploy)
git commit --allow-empty -m 'Deploying'

# 5. Push our local 'deploy' branch to the heroku remote 'master' branch (with the --force flag, because we want to overwrite whatever's already up there without worrying about merging it in locally first)
# This triggers the process whereby heroku rebuilds our app on our dyno
git push --force heroku deploy:master

# 6. Switch back to our local master branch
git checkout master

# 7. Delete our dummy 'deploy' branch
git branch -D deploy

echo 'Deployment complete!'
