import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

// ==============================================
// ==============================================

const PublicHomePage = () => {

  return (
    <div style={{display: 'grid', placeItems: 'center', height: '50vh', width: '100vw', paddingTop: '10vh', background: 'white'}}>
      <h1>Public HomePage</h1>

      <div>
        <Link to="/login" style={{color: 'black'}}>Log In</Link>
      </div>
      <div>
        <Link to="/register" style={{color: 'black'}}>Register</Link>
      </div>
    </div>
  ); // return

}; // PublicHomePage

// ==============================================
// ==============================================

export default PublicHomePage;