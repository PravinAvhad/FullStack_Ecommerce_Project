import React from 'react'
import "./profile.css"
import { useSelector } from 'react-redux'
import Loader from '../Layout/Loader/Loader';
import { Link } from 'react-router-dom';
import MetaData from '../Layout/MetaData';

const Profile = () => {
    const {loading,isAuthenticated,user} = useSelector((state)=> state.User);
    return (
        <div className='account'>
            <MetaData title="Your Account"/>
            {loading ? (<Loader/>) :(
            <div className="accountsubsection">
                <div className="section1">
                    <div className="detailsection">
                        <div className="subsection">
                            <h3>Full Name : </h3>
                            <p>{user.user.name}</p>
                        </div>
                        <div className="subsection">
                            <h3>Email : </h3>
                            <p>{user.user.email}</p>
                        </div>
                        <div className="subsection">
                            <h3>Joined On :</h3>
                            <p>{user.user.createdAt.substr(0,10)}</p>
                        </div>
                        <div className="subsection">
                            <h3>Role :</h3>
                            <p>{user.user.role}</p>
                        </div>
                    </div>
                    <div className="photosection">
                        <img src={user.user.profileImg.Url ? user.user.profileImg.Url : "/Profile.jpeg"} alt="User Profile Img" />
                        <Link to="/myaccount/update" className='link'>Edit Profile</Link>
                    </div>
                </div>
                <div className="section2">
                    <Link to="/orders" className='section2btns'>My Orders</Link>
                    <Link to="/password/update" className='section2btns'>Change Password</Link>
                </div>
            </div>
            )}
        </div>
    )
}

export default Profile;