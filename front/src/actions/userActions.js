import axios from 'axios'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    USER_LOADED_REQUEST,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
    
} from "../constants/userConstants"

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('/api/v1/login',{email,password},config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })
    } 
    catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
}

//register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data}=await axios.post('/api/v1/user/register',userData,config)

        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data.user
        })
    } 
    catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response.data.message
        })
    }
}

//update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data}=await axios.put('/api/v1/me/update',userData,config)

        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data.user
        })
    }
    catch (error) {
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message
        })
    }
}

//update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.put('/api/v1/password/update',passwords,config)

        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        })
    }
    catch (error) {
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
}

// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: USER_LOADED_REQUEST })

        const {data}=await axios.get('/api/v1/me')

        dispatch({
            type:USER_LOADED_SUCCESS,
            payload:data.user
        })
    }
    catch (error) {
        dispatch({
            type:USER_LOADED_FAIL,
            payload:error.response.data.message
        })
    }
}

//logout
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout')

        dispatch({
            type:LOGOUT_SUCCESS
        })
    }
    catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        })
    }
}

// forgot password (password recovery, send email)
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.post('/api/v1/password/forgot',email,config)

        dispatch({
            type:FORGOT_PASSWORD_SUCCESS,
            payload:data.message
        })
    }
    catch (error) {
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
}

// reset password (password recovery, send email)
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PASSWORD_REQUEST })

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data}=await axios.put(`/api/v1/password/reset/${token}`,passwords,config)

        dispatch({
            type:NEW_PASSWORD_SUCCESS,
            payload:data.success
        })
    }
    catch (error) {
        dispatch({
            type:NEW_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
}

//Ver todos los usuarios
export const allUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST })

        const { data } = await axios.get('/api/V1/admin/allUsers')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}
// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST })


        const { data } = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/updateUser/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


//Clear Error

export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })

}