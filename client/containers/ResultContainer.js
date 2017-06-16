import Result from '../components/Result';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import $ from 'jquery';

const mapState = (state) => {
  return {
      bg: state.bg,
      images: state.images
    }
};


const ResultContainer = connect(mapState)(Result);

export default ResultContainer;
