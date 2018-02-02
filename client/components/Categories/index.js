import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap'

import { } from '../../store'
import CategoryList from './CategoryList';

const Categories = (props) => {
  const { categories } = props;
  return (
    <div>
      <PageHeader>
        Channel Categories
      </PageHeader>
      <CategoryList categories={categories} />
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    categories: state.categories,
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapState, mapDispatch)(Categories));