import React, { useState, useEffect } from 'react'
import "./updatepassword.css"
import Loader from '../Layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { clearError, UpdatePasswordReset } from '../../ReduxStore/Slices/Profile';
import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData';
import { loaduser, updatePassword } from '../../Actions/userActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [oldpassword, setoldPassword] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const { loading, isUpdated, error } = useSelector((state) => state.Profile);
  const navigate = useNavigate();
  const [visible1, setvisible1] = useState(false);
  const [visible2, setvisible2] = useState(false);
  const [visible3, setvisible3] = useState(false);

  const passwordupdate = (e) => {
    e.preventDefault();
    dispatch(updatePassword( oldpassword, newpassword, confirmpassword ));
  }
  useEffect(() => {
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
      dispatch(loaduser());
      navigate("/myaccount");
      toast.success("Password Updated SuccessFully",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      dispatch(UpdatePasswordReset());
    }
  }, [dispatch, error, navigate, isUpdated]);

  const toggle1 = () => {
    setvisible1(!visible1);
  }
  const toggle2 = () => {
    setvisible2(!visible2);
  }
  const toggle3 = () => {
    setvisible3(!visible3);
  }
  return (
    <>
    {loading ? (<Loader />) : (
      <div className="updatePassword">
        <MetaData title="Update Password" />
        <div className="updatePasswordSection">
          <h1>Update Password</h1>
          <div className="subsection">

            <div className="inputfield">
              <input type={visible1 ? "text" : "password"}
                name='OldPassword'
                required
                placeholder="Old Password"
                value={oldpassword}
                onChange={(e) => setoldPassword(e.target.value)} />
              <button className='togglebtn' >
                {visible1 ? (<FontAwesomeIcon icon={faEyeSlash} onClick={toggle1} />) :
                  (<FontAwesomeIcon icon={faEye} onClick={toggle1} />)}
              </button>
            </div>

            <div className="inputfield">
              <input type={visible2 ? "text" : "password"}
                name='NewPassword'
                required
                placeholder="New Password"
                value={newpassword}
                onChange={(e) => setnewPassword(e.target.value)} />
              <button className='togglebtn' >
                {visible2 ? (<FontAwesomeIcon icon={faEyeSlash} onClick={toggle2} />) :
                  (<FontAwesomeIcon icon={faEye} onClick={toggle2} />)}
              </button>
            </div>

            <div className="inputfield">
              <input type={visible3 ? "text" : "password"}
                name='ConfirmPassword'
                required
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setconfirmPassword(e.target.value)} />
              <button className='togglebtn' >
                {visible3 ? (<FontAwesomeIcon icon={faEyeSlash} onClick={toggle3} />) :
                  (<FontAwesomeIcon icon={faEye} onClick={toggle3} />)}
              </button>
            </div>
            <button onClick={passwordupdate} className='updatebtn'>Update</button>
          </div>
        </div>
      </div>)}
  </>
  )
}

export default UpdatePassword