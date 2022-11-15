import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { clearErrors, resetPassword } from '../../actions/userActions'
import { Metadata } from "../layout/Metadata"

export const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') 
    const alert = useAlert()
    const params = useParams()
    const dispatch = useDispatch()
    const { error, success, loading } = useSelector(state => state.forgotPassword)
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('password', password)
        formData.set('confirmPassword', confirmPassword)
        dispatch(resetPassword(params.token, formData))
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Password updated successfully')
            navigate('/login')
        }
    }, [dispatch, alert, error, success, navigate])
    return (
        <Fragment>
            <Metadata title={'New Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>
                        <div className="form-group">
                            <label htmlFor="password_field">New Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            Set Password
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
