import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Component //

export default function Main ({ children }) {
  return (
      <div>
        <img id="landing-bg" src="/img/pinksky.jpg" />
        { children }
      </div>
  );
}

//export default Main;
// Main.propTypes = {
//   children: PropTypes.object,
// };

// // Container //

// const mapState = state => ({
// });

// const mapDispatch = dispatch => ({

// });

// export default connect(mapState, mapDispatch)(Main);
