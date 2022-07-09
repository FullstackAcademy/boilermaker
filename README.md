# N.E.R.P. Boilerplate

---

### To adapt this boilerplate as your own:

* [ ] Change the `name` field in `package.json` to match your project name.
* [ ] Create a database with the same name by executing the following steps:
  1.  type `psql` into the command in the command line to open the postgresql shell
  1.  execute the following command at the prompt, don't forget the semicolon at the end:
      `CREATE DATABASE ${name};`
  1.  check if the above command succeeded by using: `\l` (no semicolon necessary) you should see a list of all available databases including your own, exit the shell with `\q`
  * note: if you intend to use this boilerplate's testing framework, you will also need to make a second database titled `${name}_test`
* [ ] Replace `N.E.R.P. BOILERPLATE` in line 9 of `client/components/navbar.js` to match your project name.
* [ ] Replace `N.E.R.P. BOILERPLATE` in line 6 of `public/index.html` to match your project name.
* [ ] Add the necessary environmental variables to `secrets.js` using the following syntax:

```js
const secrets = 'blah blah'
```
