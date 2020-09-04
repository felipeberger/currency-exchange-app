import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const NotFound = () => {
  return <h2>404 Not Found</h2>
}

const Navbar = () => {

    return (
      <Router>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Calcurrency</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#hamburgerContent" aria-controls="hamburgerContent" aria-expanded="false" aria-label="Toggle navigation">
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

        <Switch>
          <Route path="/" exact component={null} />
          <Route path="/comparison" component={null} />
          <Route path="/table" component={null} />
          <Route component={NotFound} />
        </Switch>

      </Router>
    )
  }

export default Navbar;
