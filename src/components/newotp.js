import React, { useState } from "react";
import {useNavigate} from "react-router-dom";  
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Newotp = () => {
    const [otp,setotp]=useState();
    const [loading,setloading]=useState(false);
    const navigate = useNavigate();
    const email = JSON.parse(localStorage.getItem('account'));
    const verification= async()=>{
        setloading(true);
       let result = await fetch(`${baseURL}/login/newverify`,{
        method:'Put',
        body:JSON.stringify({email,otp}),
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Content-Type':'Application/json'
        }
       });
       result= await result.json();
       if(result.result==='Account Verified Successfully'){
        setloading(false);
        alert('Account Verified');
        navigate('/login/profile/details');
       }else{
        setloading(false);
        alert('Incorrect OTP');
       }
    }
    return (
        <div className="mainbody">
          <div className="container-fluid verifybox">
                <h3 className="text-center mt-3">Verify Account</h3>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 mb-5 pb-3 pt-3 otpbox">
                        <label for="inputPassword5" className="form-label">Please Enter Your OTP</label>
                        <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={(e) => setotp(e.target.value)} value={otp} />
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-5" onClick={verification}>Verify Account</button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                  <BeatLoader loading={loading} color="#15F5BA" size={20} aria-label="Loading Spinner" data-testid="loader"/>
                </div>
            </div>
        </div>
    );

}
export default Newotp;