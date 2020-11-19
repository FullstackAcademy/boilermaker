import axios from 'axios'

const ALL_VENDORS = 'ALL_VENDORS'

export const getVendors = vendors => ({
  type: ALL_VENDORS,
  vendors
})

export const fetchAllVendors = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/vendors')
      dispatch(getVendors(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_VENDORS:
      return action.vendors
    default:
      return state
  }
}

export default vendorReducer
