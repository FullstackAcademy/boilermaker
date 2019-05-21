import {createMemoryHistory, createBrowserHistory} from 'history'

const history =
  process.env.NODE_ENV === 'test'
    ? createMemoryHistory()
    : createBrowserHistory()

export default history
