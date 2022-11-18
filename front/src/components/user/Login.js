import React, { Fragment,useEffect,useState } from 'react'
import { Metadata } from '../layout/Metadata'
import { Link, useNavigate} from 'react-router-dom'
import { login,clearErrors } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

export const Login = () => {
    const navigate=useNavigate();
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const dispatch=useDispatch();
    const {isAuthenticated, error, loading}=useSelector(state=>state.auth)
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/")
        }
        if (error){
            dispatch(clearErrors)
        }
    },[dispatch,isAuthenticated,error, navigate])

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }
    return (
        <Fragment>
            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>:(
            <Fragment>
            <Metadata title={"Inicie Sesión"} />
            <div className='row wrapper'>
                <div className='col-12 col-lg-5'>
                    <form className='shadow-lg' onSubmit={submitHandler}>
                        <h1 className='mb-3'>Inicio de Sesión</h1>
                        {/*Campo para colocar correo*/}
                        <div className='form-group'>
                            <label htmlFor='email_field'>Correo Electronico</label>
                            <input type="email"
                            id="email_field"
                            className='form-control'
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            ></input>
                        </div>
                        <br />
                        {/*Campo para colocar contraseña*/}
                        <div className='form-group'>
                            <label htmlFor='password_field'>Contraseña</label>
                            <input type="password" 
                            id="password field" 
                            className='form-control'
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            ></input>
                        </div>
                        <br />
                        <Link to="/password/forgot" className='float-right mb-4'>Olvidó su contraseña?</Link>
                        <br />
                        {/*Boton Iniciar sesión*/}
                        <button id="view_btn" type="submit" className='button mt-5' >Login</button>
                        <br />
                        <br />
                        <Link to="/register" className='float-right mt-3'>Usuario Nuevo? Registrese aqui</Link>

                    </form>
                </div>
            </div>
        </Fragment>
        )}
        </Fragment>
    )
}