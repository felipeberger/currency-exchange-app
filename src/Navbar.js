import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

const Navbar = () => {

    return (
      
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
           
            <Link className="navbar-brand" to="/">Calcurrency</Link>

            <button className="navbar-toggler" type="button" data-toggle="dropdown" data-target="#hamburgerContent" aria-controls="hamburgerContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="hamburgerContent">
              <div className="navbar-nav ml-auto">
                <Link className="nav-item nav-link" to="/comparison">Currency Comparison</Link>
                <Link className="nav-item nav-link" to="/table">Currency Table</Link>
              
              </div>
            </div>
          </div>
        </nav>
      
    )
  }

export default Navbar;
