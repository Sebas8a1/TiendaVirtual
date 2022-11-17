import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, forgotPassword } from '../../actions/userActions'
import { Metadata } from "../layout/Metadata"

export const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, loading, message } = useSelector(state => state.forgotPassword)
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('email', email)
        dispatch(forgotPassword(formData))
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (message) {
            alert.success(message)
            navigate('/login')
        }
    }, [dispatch, alert, error, message, navigate])
    return (
        <Fragment>
            <Metadata title={'Forgot Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn update-btn btn-block mt-4 mb-3"
                            disabled={loading ? true : false}
                        >
                            Send Email
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}