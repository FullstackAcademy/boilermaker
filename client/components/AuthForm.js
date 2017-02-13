import React from 'react';

export default props => {

  const { type, handleSubmit } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{ type }</button>
        </div>
      </form>
      <a href="/auth/google">{ type } with Google</a>
    </div>
  );
};
