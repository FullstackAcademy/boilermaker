# Boilermaker

*Good things come in pairs*

Looking to mix up a backend with express/sequelize and a frontend with react/redux? That's `boilermaker`!

Follow along with the workshop to make your own! This canonical version can serve as a reference, or a starting point all on its own.

## Setup

To use this boilerplate, you'll need to take the following steps:

* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `boilermaker` and `boilermaker-test`
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

`npm start` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

From there, just follow your bliss.
