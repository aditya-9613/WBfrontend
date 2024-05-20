import React, { useEffect, useState } from "react";
import './css/info.css';
import { useNavigate } from "react-router-dom";
import Logut from "./logout";
import { baseURL } from "../urls";
import BeatLoader from "react-spinners/BeatLoader";
const Info = () => {
    const [first, setfirst] = useState('');
    const [last, setlast] = useState('');
    const [field, setfield] = useState('');
    const [qualification, setqualification] = useState('');
    const [values, setvalues] = useState(false);
    const [loading,setloading]=useState(false);
    const navigate = useNavigate();
    const email = JSON.parse(localStorage.getItem('account'));
    useEffect(() => {
        getDetails();
        // eslint-disable-next-line
    }, []);
    const getDetails = async () => {
        let result = await fetch(`${baseURL}/login/profile/info/${email}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setfirst(result.first);
        setlast(result.last);
        setfield(result.field);
        setqualification(result.qualification);
    }
    const qvalue = (e) => {
        if (e.target.value === 'Others') {
            setqualification(e.target.value);
            setvalues(true);
        } else if (e.target.value === 'Choose...') {
            setvalues(false);
            alert('Please fill Qualification');
        } else {
            setqualification(e.target.value);
            setvalues(false);
        }

    }
    const update = async () => {
        if (first !== '' && last !== '' && field !== '' && qualification !== '') {
            setloading(true);
            let result = await fetch(`${baseURL}/login/profile/info`, {
                method: 'Put',
                body: JSON.stringify({ email, first, last, field, qualification }),
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    'Content-Type': 'Application/json'
                }
            });
            result = await result.json();
            if (result.result === 'Profile Updated') {
                setloading(false);
                alert('Profile Updated Successfully');
                navigate('/login/profile/details');
            } else {
                setloading(false);
                alert('Error');
            }

        }else{
            setloading(false);
            alert('Required Fields');
        }
    }
    return (
        <div className="mainbody">
            <Logut/>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-4 changepassword">
                        <h3 className="text-center" style={{ marginBottom: '100px' }}>Profile Details</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">First Name  Middle Name</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setfirst(e.target.value)} value={first} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setlast(e.target.value)} value={last} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Field</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setfield(e.target.value)} value={field} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputState" className="form-label">Qualification</label>
                                <select id="inputState" className="form-select" onChange={(e) => qvalue(e)} value={qualification}>
                                    <option>Choose...</option>
                                    <option>Graduate</option>
                                    <option>Post Graduate</option>
                                    <option>Doctrate</option>
                                    <option>Others</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Others</label>
                                <input type="text" className="form-control" placeholder="Others" id="inputZip" disabled={values ? '' : 'disabled'} onChange={(e) => setqualification(e.target.value)} />
                            </div>
                            <div className="d-flex justify-content-center mt-5 mb-5">
                                <button type="button" className="btn btn-primary" onClick={update}>Update Profile</button>
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
export default Info;