import React, { useState } from "react";
import './css/login.css';
import { useNavigate } from "react-router-dom";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [show, setshow] = useState(false);
    const [loading,setloading]=useState(false);
    const navigate = useNavigate();
    const login = async () => {
        setloading(true);
        let result = await fetch(`${baseURL}/login`, {
            method: 'Post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.auth) {
            setloading(false);
            localStorage.setItem('account', JSON.stringify(result.result));
            localStorage.setItem('name',JSON.stringify(result.data));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate(`/login/${email}`);
        } else if (result.result === 'Account Not Found') {
            setloading(false);
            alert('Please Sign In');
            navigate('/signup');
        } else if (result.result === 'Incompelete') {
            setloading(false);
            alert('Required Fields');
        } else {
            setloading(false);
            alert('Wrong Credentials');
        }
    }
    return (
        <div className="mainbody">
            <div className="container-fluid loginbox">
                <div className="row d-flex justify-content-center">
                    <h2 className="text-center mb-5 mt-5">Login Page</h2>
                    <div className="col-md-4 mb-3 enterbox">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setemail(e.target.value)} value={email} />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type={show ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" onChange={(e) => setpassword(e.target.value)} value={password} />
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e) => setshow(e.target.checked)} value={show} />
                                <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                    <BeatLoader className="text-center" loading={loading} color="#15F5BA" size={25} aria-label="Loading Spinner" data-testid="loader"/></div>
                </div>
            </div>
        </div>
    );
}
export default Login;