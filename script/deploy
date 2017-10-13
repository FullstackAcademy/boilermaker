#!/usr/bin/env bash

# Hello, welcome to a bash script.

# This bash script deploys your boilermaker application.

# On the terminal you run individual
# bash commands, and this file strings a bunch of commands together.

# The first line of this file, or the `hashbang`, tells the system to
# execute the text of this file as a bash program.

# We want this entire script to exit if any single line fails.
# So we set the `-e` flag.
set -e

# If our deploy fails partway through we want to clean up after ourselves.
# This next block is like a try/catch for our entire script.

# We trap any program EXIT and run this function.
# Whether the deploy succeeds or fails, we'll clean up the deploy branch.

function cleanup_at_exit {
  # return to your master branch
  git checkout master
  
  # remove the deploy branch
  git branch -D deploy
}
trap cleanup_at_exit EXIT

# checks out a new branch called "deploy". Note that the name "deploy" here isn't magical,
# but it needs to match the name of the branch we specify when we push to our heroku remote.
git checkout -b deploy

# webpack will run in "production mode"
webpack -p

# "force" add the otherwise gitignored build files
git add -f public/bundle.js public/bundle.js.map

# create a commit, even if nothing changed
git commit --allow-empty -m 'Deploying'

# push your local "deploy" branch to the "master" branch on heroku
git push --force heroku deploy:master
