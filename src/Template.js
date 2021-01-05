import React from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

const Template = (props) => {

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col 12 py-5">
            {props.children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

}

export default Template;
