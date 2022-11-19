import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'

const UsersList = () => {
    const navigate=useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User Deleted Successfully');
            navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID User',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'nombre',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Rol',
                    field: 'rol',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'acciones',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.role,

                acciones: <Fragment>
                    <Link to={`/admin/user/${user._id}`} className="fa-sharp fa-solid fa-file-pen icon-border" >
                        
                    </Link>
                    <Link className="fa-sharp fa-solid fa-trash-can icon-border" onClick={() => deleteUserHandler(user._id)}>
                        
                    </Link>

                    
                    
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <Metadata title={'Registered users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Registered Users</h1>

                        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default UsersList