
// eslint-disable-next-line
import React from 'react';
import {Link} from "react-router-dom";

function PageNotFound() {
  return (
    <span style={{marginTop: '200px'}}>
      <center><h1>Page Not Found!</h1>
        <h3>
            Go to Home page: <Link to="/">Home</Link>
        </h3>
      </center>
    </span>
  )
}

export default PageNotFound;
