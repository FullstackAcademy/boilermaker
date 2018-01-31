/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './Main'
export { default as Channel } from './Channel'
export { default as Home } from './Home'
export { default as UserNamePrompt } from './UserNamePrompt';
export { default as Category } from './Category';
export { Login, Signup } from './auth-form'
export { default as CreateChannel } from './CreateChannel';
export { default as UserPage } from './UserPage';
