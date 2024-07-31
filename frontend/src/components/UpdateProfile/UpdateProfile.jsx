import React, { useState, useEffect } from 'react'
import "./updateProfile.css"
import Loader from '../Layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { loaduser, updateProfile } from '../../Actions/userActions';
import { clearError, UpdateProfileReset } from '../../ReduxStore/Slices/Profile';
import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const { user,isAuthenticated } = useSelector((state) => state.User);
    const { loading, isUpdated, error } = useSelector((state) => state.Profile);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.jpeg");

    const DataChange = (e) => {
        e.preventDefault();
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const update = (e) => {
        e.preventDefault();
        dispatch(updateProfile(name, email, avatar));
    }

    useEffect(() => {
        if(user.user){
            setName(user.user.name);
            setEmail(user.user.email);
            setAvatarPreview(user.user.profileImg.Url || "/Profile.jpeg");
        }
        if (error) {
            toast.error(error,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }); 
            dispatch(clearError());
        }
        if (isUpdated) {
            toast.success("Profile Updated SuccessFully",{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }); 
            dispatch(loaduser());
            navigate("/myaccount");
            dispatch(UpdateProfileReset());
        }
    }, [dispatch, error, navigate, toast, user, isUpdated]);

    return (
        <>
        {loading ? (<Loader/>) : (
        <div className="updateProfile">
            <MetaData title="Update Profile"/>
            <div className="updateProfileSection">
                <h1>Update Profile</h1>
                <div className="subsection">
                    <input type="text"
                        name='name'
                        required
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)} />
                    <input type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                    <div className="registerimg">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type="file"
                            name='avatar'
                            accept='image/*'
                            onChange={DataChange} />
                    </div>
                    <button onClick={update}>Update</button>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default UpdateProfile