import React, { useState } from "react";
import './css/verify.css';
import { useNavigate } from "react-router-dom";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Verify = () => {
    const [otp, setotp] = useState('');
    const [loading,setloading]=useState(false);
    const email = localStorage.getItem('user');
    const navigate = useNavigate();
    const verification = async () => {
        setloading(true);
        let result = await fetch(`${baseURL}/signup/verify`, {
            method: 'Put',
            body: JSON.stringify({ email, otp }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.result === 'Account Verfied Succesfully') {
            setloading(false);
            alert('Account Verfied Succesfully');
            navigate('/');
            localStorage.removeItem('user');
        } else if (result.result === 'Wrong OTP') {
            setloading(false);
            alert('Wrong OTP');
        } else {
            setloading(false);
            alert('Error');
        }
    }
    return (
        <div className="mainbody">
            <div className="container-fluid verifybox">
                <h3 className="text-center mt-3">Verify Account</h3>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 mb-5 pb-3 pt-3 otpbox">
                        <label htmlFor="inputPassword5" className="form-label">Please Enter Your OTP</label>
                        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={(e) => setotp(e.target.value)} value={otp} />
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-5" onClick={verification}>Verify Account</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                       <BeatLoader loading={loading} color="#15F5BA" size={20} aria-label="Loading Spinner" data-testid="loader"/>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Verify;