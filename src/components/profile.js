import React, { useEffect, useState } from "react";
import './css/profile.css';
import { useNavigate, useParams } from "react-router-dom";
import Logut from "./logout";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Profile = () => {
    const [data, setdata] = useState([]);
    const [verify , setverify]=useState(false);
    const [loading,setloading]=useState(false);
    const params=useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getDetails();
        // eslint-disable-next-line
    }, []);
    const postnewBlogg=()=>{
      if(verify){
        navigate('/login/profile/add');
      }else{
        alert('Please Verify Your Account');
      }
    }
    const del = async(val) => {
        setloading(true);
        let result = await fetch(`${baseURL}/login/${val}`,{
            method:'Delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Content-Type':'Application/json'
            }
        });
        result=await result.json();
        if(result.result==='Data deleted'){
            setloading(false);
            alert('Blogg Deleted');
            window.location.reload();
        }else{
            setloading(false);
            alert('Error');
        }
    }
    const getDetails = async () => {
        let result = await fetch(`${baseURL}/login/${params.email}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result.result==='No Bloggs'){
            setverify(result.ver);
           return(
            <div>
                
            </div>
           )
        }else{
            setdata(result.result);
            setverify(result.ver);
        }
    }
    return (
        <div className="mainbody">
            <Logut />
            <div className="container-fluid bloghead">
                <div className="d-flex justify-content-end newblog">
                    <button className=" mt-4" onClick={postnewBlogg}>Post New Bloggs</button>
                </div>
                <h4 className="text-center">Your Posted Bloggs</h4>
                <div className="row d-flex justify-content-center">
                {
                    data.map((item, ind) =>
                            <div className="col-md-3 accblog">
                                <div><h6>{item.title} </h6></div>
                                <div><hr />
                                    <div id={`carouselExampleFade${ind}`} className="carousel slide carousel-fade">
                                        <div className="carousel-inner image">
                                            {
                                                item.image.map((image, index) =>
                                                    <div className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                                        <img src={image} className="d-block w-100" alt="..." />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleFade${ind}`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleFade${ind}`} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                                <div><h5>Captions : {item.tagline} </h5><p>Posted on : {item.date} </p></div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-info" onClick={(() => del(item._id))}>Delete</button>
                                </div>
                            </div>                        
                    )
                }
                </div>
                <div className="d-flex justify-content-center">
                     <BeatLoader loading={loading} color="#15F5BA" size={20} aria-label="Loading Spinner" data-testid="loader"/>
                </div>
            </div>
        </div>
    );

}
export default Profile;