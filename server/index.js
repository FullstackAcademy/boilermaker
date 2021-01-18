/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
try {
  require('../secrets')
}
catch(ex){
  console.log(ex.message);
  console.log('if you are in your development environment, you can add a secrets.js file where environment variables can be set, if you are in a production environment, make sure to set environment variables');
}

const { db } = require('./db')
const PORT = process.env.PORT || 8080
const app = require('./app')

const init = async () => {
  try {
    await db.sync()
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
