import React, { useState } from "react";
import './css/changepassword.css';
import {useNavigate} from "react-router-dom";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Changepassword = () => {
    const [otp,setotp]=useState('');
    const [password,setpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState('');
    const [check,setcheck]=useState(false);
    const [loading,setloading]=useState(false);
    const email = JSON.parse(localStorage.getItem('account'));
    const navigate = useNavigate();
    const change=async()=>{
        if(password===''||confirmpassword===''||otp===''){
            alert('Required Fields');
        }else if((password===confirmpassword)&&password!==''){
            setloading(true);
            let result = await fetch(`${baseURL}/login/profile/change`,{
                method:'Put',
                body:JSON.stringify({email,otp,password}),
                headers:{
                    'Content-Type':'Application/json',
                    autauthorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result.result==='Password Changed'){
                setloading(false);
                alert('Password Changed Successfully');
                localStorage.clear();
                navigate('/login');
            }else{
                setloading(false);
                alert('OTP Incorrect');
            }
        }else{
            setloading(false);
            alert('Password Not Match');
        }
    }
    const resend=async()=>{
        setloading(true);
      let result = await fetch(`${baseURL}/login/send`,{
        method:'Put',
        body:JSON.stringify({email}),
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
            'Content-Type':'Application/json'

        }
      });
      result = await result.json();
      if(result.result==='OTP send Successfully'){
        setloading(false);
        alert('OTP send Successfully');
      }else{
        setloading(false);
        alert('OTP send Failed');
      }
    }
    return (
        <div className="mainbody">
            <div className="container-fluid">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-4 changepassword">
                        <h3 className="text-center mb-4"> Change Password</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">OTP</label>
                                <input type= {check ? "text":"password"} className="form-control" id="exampleInputPassword1" onChange={(e)=>setotp(e.target.value)} value={otp}/>
                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <button type="button" className="btn btn-primary" onClick={resend}>Resend OTP</button>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type= {check ? "text":"password"} className="form-control" id="exampleInputPassword1" onChange={(e)=>setpassword(e.target.value)} value={password}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                                <input type= {check ? "text":"password"} className="form-control" id="exampleInputPassword1" onChange={(e)=>setconfirmpassword(e.target.value)} value={confirmpassword}/>
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e)=>setcheck(e.target.checked)} />
                                <label className="form-check-label" htmlFor="exampleCheck1">Show Password</label>
                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <button type="button" className="btn btn-primary"onClick={change}>Change Password</button>
                            </div>
                        </form>
                    </div>
                    <div className="d-flex justify-content-center">
                       <BeatLoader loading={loading} color="#15F5BA" size={20} aria-label="Loading Spinner" data-testid="loader"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Changepassword;