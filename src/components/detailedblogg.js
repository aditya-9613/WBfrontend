import React, { useEffect, useState } from "react";
import './css/detailedblogg.css';
import { useParams } from "react-router-dom";
import {baseURL} from "../urls";
const Detailedblogg = () => {
    const [data, setdata] = useState([]);
    const [image,setimage] = useState([]);
    const params = useParams();
    const id = params._id;
    useEffect(() => {
        getBloggs();
        // eslint-disable-next-line
    }, []);
    const getBloggs = async () => {
        let result = await fetch(`${baseURL}/${id}`);
        result = await result.json();
        setdata(result);
        setimage(result.image);
    }
    return (
        <div className="mainbody">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4 imageblogg">
                        <h3 className="text-center">{data.title}</h3>
                        <div>
                            <p className="text-center">( {data.tagline} )</p>
                        </div>
                        <div id="carouselExampleFade" className="carousel slide carousel-fade">
                            <div className="carousel-inner">
                                {
                                    image.map((item,index) =>
                                        <div className={index===0 ? "carousel-item active" : "carousel-item"}>
                                            <img src={item} className="d-block w-100" alt="..." />
                                        </div>
                                    )
                                }
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="postdate">
                            <p className="text-end">{data.date}</p>
                        </div>
                        <div className="descrip">
                            <p className="text-start">{data.description} </p>
                        </div>
                        <div >
                         <p className="text-end"><b>Posted By : </b>{data.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Detailedblogg;