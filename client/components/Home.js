import React from 'react';
import { Link } from 'react-router';

// Component //

export default function Home () {
  return (
      <div>
        <div className="col-lg-3"></div>
        <Link to="/ready"><div className="col-lg-6" id="logo-border">
          <h1 className="fancy-type caps" id="everyone">Everyone Just</h1>
          <h1 className="fancy-type caps" id="parelax-logo">Parelax</h1>
        </div></Link>
        <div className="col-lg-3"></div>
      </div>
  );
}
