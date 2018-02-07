import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Welcome from './Welcome';
import CategoryList from './CategoryList';

const Home = (props) => {
  const { categories } = props;
  return (
    <div>
      <Welcome />
      <CategoryList categories={categories} />
    </div>
  )
}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapState, mapDispatch)(Home));