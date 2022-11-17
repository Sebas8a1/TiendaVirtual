import React, { Fragment } from 'react'
import { Metadata } from '../layout/Metadata'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                <Fragment>
                    <Metadata title={"Mi perfil"} />

                    <h2 className="mt-5 ml-5"> My profile </h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user.nombre} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full name</h4>
                            <p>{user.nombre}</p>

                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Joined at: </h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-3">
                                    My orders
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-primary btn-block mt-3 mx-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}