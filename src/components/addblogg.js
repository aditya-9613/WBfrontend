import React, { useState } from "react";
import './css/addblogg.css';
import Logut from "./logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Addblogg = () => {
    const [title, settitle] = useState('');
    const [tagline, settagline] = useState('');
    const [description, setdescription] = useState('');
    const [image, setimage] = useState([]);
    const [loading, setloading] = useState(false);
    const name = JSON.parse(localStorage.getItem('name'));
    const email = JSON.parse(localStorage.getItem('account'));
    const navigate = useNavigate();
    const change = (e) => {
        let imag = [];
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        imag.push(chosenFiles);
        setimage(imag);
    }
    const postblog = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("tagline", tagline);
        formdata.append("description", description);
        formdata.append("name", name);
        formdata.append("email", email);
        if (image.length) {
            for (let i = 0; i < image[0].length; i++) {
                formdata.append("image", image[0][i]);
            }
        } else {
            alert('chose photo');
        }
        setloading(true);
        axios({
            method: 'Post',
            url: `${baseURL}/login/profile/add`,
            data: formdata,
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                "Content-Type":"Application/json"
            }
        })
            .then((res) => {
                setloading(false);
                alert('Blogg Posted')
                navigate(`/login/${email}`);
                window.location.reload();
            })
            .catch((err) => {
                setloading(false)
                alert('Error')
            });
    }
    return (
        <div>
            <Logut />
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-3 postblog">
                        <h4 className="text-center mt-5 mb-5">Blogg Details</h4>
                        <form className="row g-3">
                            <div className="col-md-12">
                                <label htmlFor="inputEmail4" className="form-label">Title</label>
                                <input type="text" className="form-control" id="inputEmail4" onChange={(e) => settitle(e.target.value)} value={title} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="inputAddress" className="form-label">Captions</label>
                                <input type="text" className="form-control" id="inputAddress" onChange={(e) => settagline(e.target.value)} value={tagline} />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputCity" className="form-label">Descriptions</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" onChange={(e) => setdescription(e.target.value)} value={description} rows="3"></textarea>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputZip" className="form-label">Images</label>
                                <input type="file" className="form-control" id="inputZip" onChange={change} multiple />
                                <div className="imagetagline">Only Two Images at a Time .</div>
                            </div>
                            <div className="col-12 d-flex justify-content-center mb-5 mt-5">
                                <button type="button" className="btn btn-primary" onClick={postblog}>Post Blogg</button>
                            </div>
                        </form>
                        <BeatLoader className="text-center mb-5" loading={loading} color="#15F5BA" size={20} aria-label="Loading Spinner" data-testid="loader" />
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Addblogg;