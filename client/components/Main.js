import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Component //

export default function Main ({ children }) {
  return (
      <div>
        <video loop muted autoPlay poster="img/videoframe.jpg" className="fullscreen-bg__video">
            <source src="/img/giphy.mp4" type="video/mp4" />
        </video>
        <h1>Everyone Just Parelax</h1>
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
