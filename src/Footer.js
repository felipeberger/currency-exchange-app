import React from 'react';

const Footer = () => {
  
    return (
      <footer className="bg-dark text-white">
        <div className="container-fluid py-2">
          <div className="row justify-content-between">
            <div className="col-md-4 col-sm-5 align-self-center">
              <h4>Created by: <br />Felipe Berger</h4>
            </div>
            <div className="col-md-4 col-sm-5 text-right contact-links">
              <div className="text-center">
                <h4>Contact Me:</h4>
                <a href="https://www.linkedin.com/in/felipe-berger" target="_blank" rel="noopener noreferrer" className="px-3"><i className="fab fa-linkedin"></i></a>
                <a href="https://github.com/felipeberger" target="_blank" rel="noopener noreferrer" className="px-3"><i className="fab fa-github-square"></i></a>
                <a href="mailto:felipecberger@gmail.com" className="px-3"><i className="fas fa-envelope-square"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );

}

export default Footer;
