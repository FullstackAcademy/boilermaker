/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {me, logout} from './auth'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    //no browser available, we need to stub out localStorage
    global.window = {
      localStorage: {
        removeItem: () => {},
        getItem: () => {
          return 'some-token'
        },
        setItem: () => {}
      }
    }
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    describe('with valid token', () => {
      beforeEach(() => {
        global.window = {
          localStorage: {
            removeItem: () => {},
            getItem: () => {
              return 'some-token'
            },
            setItem: () => {}
          }
        }
      })
      it('eventually dispatches the SET_AUTH action', async () => {
        const fakeUser = {email: 'Cody'}
        mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
        await store.dispatch(me())
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('SET_AUTH')
        expect(actions[0].auth).to.be.deep.equal(fakeUser)
      })
    })
    describe('without valid token', () => {
      beforeEach(() => {
        global.window = {
          localStorage: {
            removeItem: () => {},
            getItem: () => {},
            setItem: () => {}
          }
        }
      })
      it('does not dispatch GET USER action', async () => {
        const fakeUser = {email: 'Cody'}
        mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
        await store.dispatch(me())
        const actions = store.getActions()
        expect(actions.length).to.equal(0)
      })
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the SET_AUTH action withan empty object', async () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_AUTH')
      expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
