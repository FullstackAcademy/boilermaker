'use strict'
/* global describe beforeEach it */

const { dim } = require('chalk')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

describe('seed script', () => {
  it('completes with 0 (successful) exit code', async () => {
    const { stderr } = await exec('node ./seed', {
      cwd: __dirname,
      env: process.env,
      timeout: 10e3 // 20 secs
    })
    console.log(dim('Seed script exited successfully but with stderr:', stderr))
  })
})
