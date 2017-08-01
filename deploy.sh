#!/usr/bin/env bash

# Hey everyone, this is a bash script! (They end in .sh)!
# You can use scripts like these to execute commands on the command line
# one after the other.

echo 'Prepare to deploy...'

# 1. Checkout a dummy branch called 'deploy'.
# Make sure that you don't currently have a branch hanging around called 'deploy',
# or this step will fail!
git checkout -b deploy

# 2. Pull our heroku remote master branch into our local 'deploy' branch,
# so that your local 'deploy' branch is 'up-to-date' with the heroku master branch.
# You may see an error at this step when you do your initial deploy, because the heroku
# master branch isn't set up yet, but that's okay.
git pull heroku master

# 3. Run webpack with -p for 'production' mode. This builds our bundle.js and bundle.js.map
webpack -p

# 4. Add our normally ignored bundle.js and bundle.js.map files with -f for force.
# This ensures that our build files are included on our production server.
git add -f public/bundle.js public/bundle.js.map

# 5. Make a commit (which could be empty, in case we want to force a re-deploy)
git commit --allow-empty -m 'Deploying'

# 6. Push our local 'deploy' branch to the heroku remote 'master' branch
# This triggers the process whereby heroku rebuilds our app on our dyno
git push heroku deploy:master

# 7. Switch back to our local master branch
git checkout master

# 8. Delete our dummy 'deploy' branch
git branch -D deploy

echo 'Deployment complete!'
