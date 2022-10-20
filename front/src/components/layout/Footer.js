import React, { Fragment } from 'react'

export const Footer = () => {
  return (
    <Fragment> 
        <footer id="footer" className="mt-5">
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <h4 className="l-heading">
                            <i className="fas fa-phone"></i> Contacto
                        </h4>
                        <p className="text-justify">
                            <strong>Telefono:</strong> 1234567890
                        </p>
                        <p className="text-justify">
                            <strong>Email:</strong>
                            <a href="mailto:" className="text-white">

                            </a>
                        </p>
                        <p className="text-justify">
                            <strong>Direccion:</strong> 1234, Calle, Ciudad, Estado, Pais
                        </p>
                    </div>

                    <div className="col-12 col-md-3">
                        <h4 className="l-heading">
                            <i className="fas fa-info-circle"></i> Informacion
                        </h4>
                        <div className="d-flex flex-column flex-wrap">
                            <button onClick=""  className="footer-link">Sobre Nosotros</button>
                            <button onClick=""  className="footer-link">Politicas de Privacidad</button>
                            <button onClick=""  className="footer-link">Terminos y Condiciones</button>
                            <button onClick=""  className="footer-link">Ayuda</button>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <h4 className="l-heading">
                            <i className="fas fa-exchange-alt"></i> Politicas
                        </h4>
                        <div className="d-flex flex-column flex-wrap">
                            <button onClick=""  className="footer-link">Politicas de Envio</button>
                            <button onClick=""  className="footer-link">Politicas de Devolucion</button>
                            <button onClick=""  className="footer-link">Politicas de Pago</button>
                            <button onClick=""  className="footer-link">Politicas de Seguridad</button>
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <h4 className="l-heading">
                            <i className="fas fa-envelope"></i> Suscribete
                        </h4>
                        <form action="#">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Ingrese su email" required/>
                                <div className="input-group-append">
                                    <button className="btn btn-success">
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-4">
                            <h5 className="l-heading">
                                <i className="fas fa-paper-plane"></i> Sigueme
                            </h5>
                            <div className="d-flex flex-row">
                                <button onClick="" className="social-link">
                                    <i className="fab fa-facebook-f"></i>
                                </button>
                                <button onClick=""  className="social-link">
                                    <i className="fab fa-twitter"></i>
                                </button>
                                <button onClick=""  className="social-link">
                                    <i className="fab fa-instagram"></i>
                                </button>
                                <button onClick=""  className="social-link">
                                    <i className="fab fa-google-plus-g"></i>
                                </button>
                                <button onClick=""  className="social-link">
                                    <i className="fab fa-linkedin-in"></i>
                                </button>
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