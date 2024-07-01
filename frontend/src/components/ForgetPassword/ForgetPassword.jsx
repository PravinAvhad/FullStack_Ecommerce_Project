import React, { useEffect, useState } from 'react'
import "./forgetpassword.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { clearError } from '../../Store/Slices/ForgetPassword';
import { sendemail } from '../../Actions/userActions';
import Loader from '../Layout/Loader/Loader';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email,setEmail] = useState("");
  const {loading,error,message} = useSelector((state)=> state.ForgetPassword);

  const send = (e)=>{
    e.preventDefault();
    dispatch(sendemail(email));
    // console.log(`Send Email to ${email}`);
  }

  useEffect(()=>{
    if(error){
      console.log(error);
      toast.error(error);
      // dispatch(clearError());
    }
    if(message){
      console.log(message);
      toast.success(message);
    }
  },[error,message,toast,dispatch]);
  return (
    <>
    {loading ? (<Loader/>) : (
    <div className="forgetpassword">
      <ToastContainer/>
      <div className="forgetpasswordsection">
        <h1>Find your Account</h1>
        <div className="subsection1">
          <p>Please Enter Your email address to search for your account</p>
          <input type="email"
            name="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="subsection2">
          <button onClick={()=> navigate("/login")}>Cancel</button>
          <button onClick={send}>Send Email</button>
        </div>
      </div>
    </div>)}
    </>
  )
}

export default ForgetPassword;