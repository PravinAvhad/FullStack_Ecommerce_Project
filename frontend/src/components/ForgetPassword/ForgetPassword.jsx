import React, { useEffect, useState } from 'react'
import "./forgetpassword.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { clearError } from '../../ReduxStore/Slices/ForgetPassword';
import { sendemail } from '../../Actions/userActions';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';

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
      // console.log(error);
      // dispatch(clearError());
    }
    if(message){
      toast.success(message,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      // console.log(message);
    }
  },[error,message,toast,dispatch]);
  
  return (
    <>
    {loading ? (<Loader/>) : (
    <div className="forgetpassword">
      <MetaData title="Ecommerce Password Assistance"/>
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