import React from "react";
import { Navigate,Outlet } from "react-router-dom";
const Privatecomponents=()=>{
    const auth = localStorage.getItem('account');
    return(
              auth ? <Outlet/>:<Navigate to='/login'/>
    );
}
export default Privatecomponents;