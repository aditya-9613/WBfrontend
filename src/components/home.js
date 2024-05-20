import React, { useEffect, useState } from "react";
import './css/home.css';
import { useNavigate } from "react-router-dom";
import { baseURL} from "../urls";
const Home = () => {
    const [data, setdata] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getBloggs();
        // eslint-disable-next-line
    }, []);
    const getBloggs = async () => {
        let result = await fetch(`${baseURL}`);
        result = await result.json();
        if(result.result==='No Bloggs'){
            return(<div>

            </div>)
        }else{
            setdata(result.result);
        }
    }
    return (
        <div className="mainbody">
            <div className="container-fluid">
                <h1 className="text-center bloggsfeed">Bloggs Feeds</h1>
                <p className="text-center bloggsfeed">A Place Where Each Skillful Thought Can be Shared</p>
                <div className="row d-flex justify-content-evenly">
                    {
                        data.map((item, ind) =>
                            <div className="col-md-3 mt-3 mb-3 blogbox">
                                <div className="title">
                                    <h5 className="text-center">{item.title}</h5>
                                </div>
                                <div className="postedby">
                                    <p> <img src={item.profilepic ? item.profilepic : require('./images/no image.jpg')} className="img-fluid postdp" alt="..."/> {item.name}</p>
                                </div>
                                <div className="image">
                                    <div id={`carouselExampleFade${ind}`} className="carousel slide carousel-fade">
                                        <div className="carousel-inner">
                                            {
                                                item.image.map((image, index) =>
                                                    <div className={index === 0 ? " carousel-item active" : " carousel-item"}>
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
                                </div>
                                <div className="date">
                                    <h5>Date:- {item.date} </h5><hr />
                                </div>
                                <div className="description">
                                    <h5>Caption:- {item.tagline}</h5> <hr />
                                </div>
                                <div className="d-flex justify-content-center pb-2">
                                    <button type="button" className="btn btn-primary" onClick={(()=>navigate(`/${item._id}`))}>Read Full Blogg</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
         </div>
    );
}
export default Home;