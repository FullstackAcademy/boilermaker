import React from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { signup } from '../reducer/user';

const mapState = state => ({
  type: 'Signup'
});

const mapDispatch = dispatch => ({
  handleSubmit (evt) {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(signup(email, password));
  }
});

export default connect(mapState, mapDispatch)(AuthForm);
