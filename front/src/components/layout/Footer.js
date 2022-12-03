import React, { Fragment } from 'react'

export const Footer = () => {
  return (
    <Fragment> 
        <footer id="footer" className="mt-5">
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <h4 className="l-heading">
                            <i className="fas fa-phone"></i> Contact
                        </h4>
                        <p className="text-justify">
                            <strong>Phone:</strong> 1234567890
                        </p>
                        <p className="text-justify">
                            <strong>Email:</strong> supermasters@bookstore.com
                            <a href="mailto:supermasters@bookstore.com" className="text-white">

                            </a>
                        </p>
                        <p className="text-justify">
                            <strong>Address:</strong> 1234, Calle, Ciudad, Estado, Pais
                        </p>
                    </div>

                    <div className="col-12 col-md-3">
                        <h4 className="l-heading">
                            <i className="fas fa-info-circle"></i> Information
                        </h4>
                        <div className="d-flex flex-column flex-wrap">
                            <a href="/"  className="footer-link">About Us</a>
                            <a href="/"  className="footer-link">Privacy Notice</a>
                            <a href="/"  className="footer-link">Conditions of Use</a>
                            <a href="/"  className="footer-link">Help</a>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <h4 className="l-heading">
                            <i className="fas fa-exchange-alt"></i> Policies
                        </h4>
                        <div className="d-flex flex-column flex-wrap">
                            <a href="/"  className="footer-link">Shipping Policy</a>
                            <a href="/"  className="footer-link">Return Policy</a>
                            <a href="/"  className="footer-link">Payment Policy</a>
                            <a href="/"  className="footer-link">Security Policy</a>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <h4 className="l-heading">
                            <i className="fas fa-envelope"></i> Suscribe
                        </h4>
                        <form action="/">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Enter your email" required/>
                                <div className="input-group-append">
                                    <button className="btn btn-success">
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-4">
                            <h5 className="l-heading">
                                <i className="fas fa-paper-plane"></i> Follow me
                            </h5>
                            <div className="d-flex flex-row">
                                <a href="/" className="social-link">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="/"  className="social-link">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="/"  className="social-link">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="/"  className="social-link">
                                    <i className="fab fa-google-plus-g"></i>
                                </a>
                                <a href="/"  className="social-link">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </Fragment> 

    )
}

export default Footer