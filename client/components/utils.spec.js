import {expect} from 'chai'
import {parseLLZ} from './utils'

describe('Utils', () => {
  beforeEach(() => {})

  it('renders the email in an h3', () => {
    const llz = '37.77;-122.43;11'
    expect(parseLLZ(llz)).to.deep.equal({lat: 37.77, lng: -122.43, z: 11})
  })
})
