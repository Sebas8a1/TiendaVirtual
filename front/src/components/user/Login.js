import React, { Fragment } from 'react'
import { Metadata } from '../layout/Metadata'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <Fragment>
        <Metadata title={"Inicie Sesión"}/>
        <div className='row wrapper'>
            <div className='col-12 col-lg-5'>
                <form className='shadow-lg'>
                    <h1 className='mb-3'>Inicio de Sesión</h1>
                    {/*Campo para colocar correo*/}
                    <div className='form-group'>
                        <label htmlFor='email_field'>Correo Electronico</label>
                        <input type="email" id="email_field" className='form-control'></input>
                    </div>
                    <br/>
                    {/*Campo para colocar contraseña*/}
                    <div className='form-group'>
                        <label htmlFor='password_field'>Contraseña</label>
                        <input type="password"id="password field" className='form-control'></input>
                    </div>
                    <br/>
                    <Link to="/password/forgot" className='float-right mb-4'>Olvidó su contraseña?</Link>
                    <br/>
                    {/*Boton Iniciar sesión*/}
                    <button id="view_btn" type="submit" className='button mt-5' >Login</button>
                    <br/>
                    <br/>
                    <Link to="/register" className='float-right mt-3'>Usuario Nuevo? Registrese aqui</Link>

                </form>
            </div>
        </div>
    </Fragment>
  )
}
