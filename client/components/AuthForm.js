import React from 'react';

export default props => {

  const { name, displayName, handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{ displayName }</button>
        </div>
      </form>
      <a href="/auth/google">{ displayName } with Google</a>
    </div>
  );
};
