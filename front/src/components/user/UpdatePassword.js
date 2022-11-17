import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, updatePassword } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { Metadata } from "../layout/Metadata"


export const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()
    const { error, isUpdated, loading } = useSelector(state => state.user)
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('oldPassword', oldPassword)
        formData.set('password', password)
        
        dispatch(updatePassword(formData))
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success('Password updated successfully')
            dispatch({ type: UPDATE_PASSWORD_RESET })
            navigate('/me')
        }
    }, [dispatch, alert, error, isUpdated, navigate])
    return (
        <Fragment>
            <Metadata title={'Update Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
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
                        
                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            UPDATE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}


