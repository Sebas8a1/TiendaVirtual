import React from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { Navigate } from "react-router-dom";
import { loadUser } from "../actions/userActions";
import { useEffect } from "react";


const ProtectedRoutes = ({ children, isAdmin }) => {
    const { isAuthenticated=false, loading=true, user } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
    }, [isAuthenticated, loading, user, dispatch]);

    if (loading) {
        return <i className="fa fa-spinner fa-spin" />;
    }

    if ( loading===false && isAuthenticated) {
        if (isAdmin && user.role !== "admin") {
            return <Navigate to="/" />;
        }

    return children;

    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoutes;