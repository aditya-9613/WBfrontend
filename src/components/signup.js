import React, { useState } from "react";
import './css/signup.css';
import { useNavigate } from "react-router-dom";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Signup = () => {
    const [email, setemail] = useState('');
    const [confirmemail, setconfirmemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [show, setshow] = useState(false);
    const [first, setfirst] = useState('');
    const [last, setlast] = useState('');
    const [field, setfield] = useState('');
    const [qualification, setqualification] = useState('');
    const [loading, setloading] = useState(false);
    const [values, setvalues] = useState(false);
    const profilepic = null;
    let verification = false;
    const navigate = useNavigate();
    const signup = async () => {
        if (email !== confirmemail) {
            alert('Email not Same');
        } else if (password !== confirmpassword) {
            alert('Password not Same');
        } else {
            setloading(true);
            let result = await fetch(`${baseURL}/signup`, {
                method: 'Post',
                body: JSON.stringify({ email, password, first, last, field, qualification, verification, profilepic }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            if (result.result === 'Account Created') {
                setloading(false);
                alert('Please Verify your Account');
                navigate('/signup/verify');
                localStorage.setItem('user', email);
                localStorage.setItem('token', JSON.stringify(result.auth));
            } else if (result.result === 'Incomplete') {
                setloading(false);
                alert('Please fill all Details');
            }else if(result.result=== 'Nodemailer Error'){
               setloading(false);
               alert('Nodemailer Error');
            } else {
                setloading(false);
                alert('Account Exsist Already');
            }
        }
    }
    const qvalue = (e) => {
        if (e.target.value === 'Others') {
            setqualification(e.target.value);
            setvalues(true);
        } else {
            setqualification(e.target.value);
            setvalues(false);
        }

    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center signupbox">
                    <h2 className="text-center mt-3 mb-3">Create Account</h2>
                    <div className="col-8 signup">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" onChange={(e) => setemail(e.target.value)} value={email} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail4" className="form-label">Confirm Email</label>
                                <input type="email" className="form-control" id="inputEmail3" onChange={(e) => setconfirmemail(e.target.value)} value={confirmemail} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Password</label>
                                <input type={show ? 'text' : 'password'} className="form-control" id="inputPassword4" onChange={(e) => setpassword(e.target.value)} value={password} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputPassword4" className="form-label">Confirm Password</label>
                                <input type={show ? 'text' : 'password'} className="form-control" id="inputPassword3" onChange={(e) => setconfirmpassword(e.target.value)} value={confirmpassword} />
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" onChange={(e) => setshow(e.target.checked)} />
                                    <label className="form-check-label" htmlFor="gridCheck">Show Password</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputAddress" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="inputAddress" onChange={(e) => setfirst(e.target.value)} value={first} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputAddress2" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="inputAddress2" onChange={(e) => setlast(e.target.value)} value={last} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputCity" className="form-label">Field</label>
                                <input type="text" className="form-control" id="inputCity" onChange={(e) => setfield(e.target.value)} value={field} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputState" className="form-label">Qualification</label>
                                <select id="inputState" className="form-select" onChange={(e) => qvalue(e)} value={qualification}>
                                    <option defaultValue>Choose...</option>
                                    <option>Graduate</option>
                                    <option>Post Graduate</option>
                                    <option>Doctrate</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="inputZip" className="form-label">Others</label>
                                <input type="text" className="form-control" placeholder="Others" id="inputZip" disabled={values ? '' : 'disabled'} onChange={(e) => setqualification(e.target.value)} />
                            </div>
                        </form>

                    </div>
                    <div className="col-12 text-center pt-5 pb-3">
                        <button type="button" className="btn btn-primary" onClick={signup}>Create Account</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <BeatLoader loading={loading} color="#15F5BA" size={20} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signup;