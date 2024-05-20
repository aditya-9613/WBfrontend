import React, { useState } from "react";
import './css/profilepic.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logut from "./logout";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Profilepic =() => {
    const [profilepic,setprofilepic]=useState('');
    const [loading,setloading]=useState(false);
    const email = JSON.parse(localStorage.getItem('account'));
    const navigate = useNavigate();
    const upload=async()=>{
        const formdata = new FormData();
        formdata.append("profilepic",profilepic);
        setloading(true);
      axios({
        method:'Put',
        url:`${baseURL}/login/profile/details/${email}`,
        data:formdata,
        headers:{
            "Authorization":`bearer ${JSON.parse(localStorage.getItem('token'))}`,
            'Content-Type': profilepic.type,
            'Accept':'image/jpeg'
        }
      }).then((res)=>{
        setloading(false);
        alert('Photo Posted')
        navigate(`/login/${email}`);
      })
         .catch((err)=>{
            setloading(false);
            alert('Error')
        });
    }
    return (
        <div className="mainbody">
            <Logut/>
          <div className="container-fluid profilepic">
                <h3 className="text-center mt-3">Update Photo</h3>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 mb-5 pb-3 pt-3">
                        <label for="inputPassword5" className="form-label">Profile Photo</label>
                        <input type="file" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={(e)=>setprofilepic(e.target.files[0])}/>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary mt-5" onClick={upload}>Update Profile</button>
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
export default Profilepic;