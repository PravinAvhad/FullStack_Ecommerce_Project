import React from 'react'
import "./account.css"

const Account = () => {
    return (
        <div className='account'>
            <div className="accountsubsection">
                <div className="section1">
                    <div className="detailsection">
                        <div className="subsection">
                            <h3>Full Name : </h3>
                            <p>Pravin Avhad</p>
                        </div>
                        <div className="subsection">
                            <h3>Email : </h3>
                            <p>pravinavhad020@gmail.com</p>
                        </div>
                        <div className="subsection">
                            <h3>Joined On :</h3>
                            <p>25-07-2024</p>
                        </div>
                        <div className="subsection">
                            <h3>Role :</h3>
                            <p>Customer</p>
                        </div>
                    </div>
                    <div className="photosection">
                        <img src="/Profile.jpeg" alt="User Profile Img" />
                        <button>Edit Profile</button>
                    </div>
                </div>
                <div className="section2">
                    <button className='section2btns'>My Orders</button>
                    <button className='section2btns'>Change Password</button>
                </div>
            </div>

        </div>
    )
}

export default Account;