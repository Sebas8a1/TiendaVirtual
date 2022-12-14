import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Metadata from '../layout/Metadata'


export const Success = () => {
    return (
        <Fragment>

            <Metadata title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/succes.png" alt="Exito!" width="400" height="400" />

                    {/*<h2>Su orden ha sido registrada con éxito, pronto estaremos en contacto</h2>*/}

                    <Link to="/">Back to Home</Link>
                </div>

            </div>

        </Fragment>
    )
}