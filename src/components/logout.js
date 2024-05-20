import React from "react";
import './css/logout.css';
import { Link,useNavigate } from "react-router-dom";
const Logut = () => {
    const navigate = useNavigate();
    const email = JSON.parse(localStorage.getItem('account'));
    const logout = () => {
        navigate('/login');
        localStorage.clear();
    }
    return (
        <div>
         <nav className="navbar profile">
                <div className="container-fluid d-flex justify-content-end">
                    <Link className="navbar-brand" style={{ color: '#ffffff' }} to={`/login/${email}`}>Home</Link>
                    <Link className="navbar-brand" style={{ color: '#ffffff' }} to="/login/profile/details">My Profile</Link>
                    <button className="btn" style={{ color: '#ffffff', fontSize: 'larger' }} onClick={logout}>Logut</button>
                </div>
            </nav>
     </div>
    );

}
export default Logut;