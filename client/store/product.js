import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const CREATED_PRODUCT = 'CREATED_PRODUCT'
/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const editProduct = product => ({type: EDIT_PRODUCT, product})
const createdProduct = product => ({ type: CREATED_PRODUCT, product })
/**
 * THUNK CREATORS
 */
export const getProductsThunk = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getProducts(res.data || defaultProducts)))
      .catch(err => console.log(err))

export const editProductThunk = (data, id) => {
return dispatch =>
axios.put(`/api/products/${id}`, data )
  .then(res =>
    dispatch(editProduct(res.data)))
  .catch(err => console.log(err))
}

export const createProductThunk = (product) =>
  dispatch =>
    axios.post('/api/products', product)
      .then(res => {
				console.log(res.data)
				dispatch(createdProduct(res.data))
			})
      .catch(err => console.log(err))
/**
 * REDUCER
 */

export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case EDIT_PRODUCT:
      const products = state.map(product => (
        action.product.id === product.id ? action.product : product
     ))
      return products
		case CREATED_PRODUCT:
			return [...state, action.product]
    default:
      return state
  }
}
