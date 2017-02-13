import React from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { login } from '../reducer/user';

const mapState = state => ({
  type: 'Login'
});

const mapDispatch = dispatch => ({
  handleSubmit (evt) {
    evt.preventDefault();
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(login(email, password));
  }
});

export default connect(mapState, mapDispatch)(AuthForm);
