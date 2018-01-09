import React from 'react';
import {connect} from 'react-redux'

export const FrontPage = (props) => {
  console.log('props is----------', props)
  return (
    <div>
    {
      props.categories && props.categories.map(
        category => {
        return <span key={category.name}>{category.name}</span>
      })
    }

    </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(mapState)(FrontPage);
