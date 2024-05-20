import React, { useEffect, useState } from "react";
import './css/profiledetails.css';
import { useNavigate } from "react-router-dom";
import Logut from "./logout";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Profiledetails = () => {
    const [data,setdata]=useState('');
    const [loading,setloading]=useState(false);
    const email = JSON.parse(localStorage.getItem('account'));
    const navigate = useNavigate();
    const sendOTP=async()=>{
        setloading(true);
        let result = await fetch(`${baseURL}/login/send`,{
          method:'Put',
          body:JSON.stringify({email}),
          headers:{
            'Content-Type':'Application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        if(result.result==='OTP send Successfully'){
            setloading(false);
            alert('OTP Send to Email');
            navigate('/login/profile/change');
        }else{
            setloading(false);
            alert('OTP Can not Send');        }

    }
    useEffect(()=>{
        getDetails();
        // eslint-disable-next-line
    },[]);
    const del=async()=>{
        setloading(true);
        let result = await fetch (`${baseURL}/login/profile/details/${email}`,{
            method:'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result.result==='Pic Deleted'){
            setloading(false);
            window.location.reload();
        }else{
            setloading(false);
            alert('Error');
        }
    }
    const getDetails=async()=>{
       let result = await fetch(`${baseURL}/login/profile/details/${email}`,{
        headers:{
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
       })
       result = await result.json();
       setdata(result);
    }
    const newverify= async()=>{
        let result = await fetch(`${baseURL}/login/send`,{
            method:'Put',
            body:JSON.stringify({email}),
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Content-Type':'Application/json'
            }
        }) ;
        result=await result.json();
        if(result.result==='OTP send Successfully'){
            alert('OTP send Successfully');
            navigate('/login/newverify');
        }else{
            alert('Internal Server Error');
        }
    }
    return (
        <div>
            <Logut />
            <div className="container">
                <div className="d-flex justify-content-center">
                    <BeatLoader loading={loading} color="#15F5BA" size={20} aria-label="Loading Spinner" data-testid="loader"/>
                </div>
                <div className="row d-flex justify-content-center profileimagebox">
                    <div className="col-md-4 d-flex justify-content-center">
                        <img src={data.profilepic ? data.profilepic : require('./images/no image.jpg') } className="img-fluid" alt="..." />
                    </div>
                    <div className="d-flex justify-content-center mt-3 mb-3">
                        <button type="button" className="btn btn-primary" onClick={(()=>navigate('/login/profile/details/update'))}>Update</button>
                        <button type="button" className="btn btn-primary" disabled={data.profilepic ? "":"disabled"} onClick={del}>Delete</button>
                    </div>
                    <div className="col-md-5">
                        <div className="email shadow-lg p-3 mb-5 bg-body-tertiary rounded"><b>Email</b> :- {data.email}                    {data.verification ? <p className="text-end">Verfied</p> :<p className="text-end"><button className="btn"  onClick={newverify} >Verify</button></p> }
                             </div>
                        <div className="email shadow-lg p-3 mb-5 bg-body-tertiary rounded"><b>Name</b> :- {data.name}</div>
                        <div className="email shadow-lg p-3 mb-5 bg-body-tertiary rounded"><b>Field </b>:-{data.field} </div>
                        <div className="email shadow-lg p-3 mb-5 bg-body-tertiary rounded"><b>Qualification</b> :- {data.qualification}</div>
                        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded text-center"><button className=" btn pass" onClick={sendOTP}>Change Password</button></div>
                        <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded text-center"><button className="btn pass" onClick={(()=>navigate('/login/profile/info'))}>Change Details</button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profiledetails;
