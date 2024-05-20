import React from "react";
import './css/navbar.css'
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('account');
    const email = JSON.parse(auth);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbarcolor">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img className="img-fluid navbarlogo" src={require('./images/home.png')} alt="..."/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <form className="d-flex" role="search">
                            {
                                auth ? <button onClick={(()=>navigate(`/login/${email}`))} className="btn btn-primary">Home</button> :<div> <button className="btn btn-danger" type="button" onClick={(()=>navigate('/login'))}>Login</button>
                                <button className="btn btn-success" type="button" style={{marginLeft:'5px'}} onClick={(()=>navigate('/signup'))}>SignUp</button></div>
                            }
                                
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default Navbar;