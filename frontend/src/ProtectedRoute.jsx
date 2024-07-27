import React from 'react'
import {Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoute = ({isAdmin, component: Component, ...rest }) => {
    const { isAuthenticated, loading, user, error } = useSelector((state) => state.User);
    return (
        <>
        {loading === false && isAuthenticated===false ? 
            <Navigate to="login"/> : isAdmin===true && user.user.role !=="admin" ? <Navigate to="login"/> : <Component />
        }
        </>
    )
    // return (
    //     <>
    //     {loading === false && (
    //         <Route {...rest} 
    //             render={props => {
    //                 if(isAuthenticated===false){
    //                     return <Navigate to="/login"/>
    //                 }
    //                 if(isAdmin===true && user.user.role !== "admin"){
    //                     return <Navigate to="/login"/>
    //                 }
    //                 return <Component {...props}/>
    //             }}
    //         />
    //     )}
    //     </>
    // )
}

export default ProtectedRoute;