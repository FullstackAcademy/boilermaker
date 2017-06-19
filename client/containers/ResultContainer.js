import Result from '../components/Result';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { showCode } from '../action-creators';
import $ from 'jquery';

const mapState = (state) => {
  return {
      bg: state.bg,
      images: state.images,
      showCode: state.showCode,
    }
};

const mapDispatch = (dispatch) => {
  return {
    toggleCode: () => {
      dispatch(showCode());
    }
  }
}

const ResultContainer = connect(mapState, mapDispatch)(Result);

export default ResultContainer;
