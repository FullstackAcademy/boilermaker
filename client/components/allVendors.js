import React from 'react'
import {connect} from 'react-redux'
import {fetchAllVendors} from '../store/vendors'

class AllVendors extends React.Component {
  componentDidMount() {
    this.props.fetchAllVendors()
  }

  render() {
    console.log(this.props)
    return <div>Hello</div>
  }
}

const mapStateToProps = state => ({
  vendors: state.vendors
})

const mapDispatchToProps = dispatch => ({
  fetchAllVendors: () => dispatch(fetchAllVendors())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllVendors)
