import { ForgetPasswordFail, ForgetPasswordRequest, ForgetPasswordSuccess } from "../Store/Slices/ForgetPassword";
import { UpdatePasswordFail, UpdatePasswordRequest, UpdatePasswordSuccess, UpdateProfileFail, UpdateProfileRequest, UpdateProfileSuccess } from "../Store/Slices/Profile";
import { loginRequest,loginSuccess,loginFail, clearError, registerRequest, registerSuccess, registerFail, loadUserSuccess, loadUserRequest, loadUserFail, logoutUserSuccess, logoutUserFail } from "../Store/Slices/User"; 
import axios from "axios"

//For Login of User
export const loginuser = (email,password)=> async(dispatch) =>{
    try {
        dispatch(loginRequest());
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.post(`/api/v2/login`,{email,password},config);
        // console.log(data);
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data.message));

    }
}

//For Register of User
export const registeruser = (name,email,password,avatar)=> async(dispatch) =>{
    try {
        dispatch(registerRequest());
        const config = {headers:{"Content-Type":"multipart/form-data"}};
        console.log(name,email,password,avatar);
        const {data} = await axios.post(`/api/v2/register`,{name,email,password,avatar},config);
        // console.log(data);
        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail(error.response.data.message));

    }
}

//For Rendering data if user has logged In
export const loaduser = ()=> async(dispatch) =>{
    try {
        dispatch(loadUserRequest());
        const {data} = await axios.get(`/api/v2/me/profile`);
        // console.log(data);
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));

    }
}

//For Logout of User
export const logoutuser = ()=> async(dispatch) =>{
    try {
        await axios.get(`/api/v2/logout`);
        // console.log(data);
        dispatch(logoutUserSuccess());
    } catch (error) {
        dispatch(logoutUserFail(error.response.data.message));
    }
}

//for Clearing Errors of User
export const clearErrors = () => async(dispatch)=>{
    dispatch(clearError());
}

//for Updating Profile Details
export const updateProfile = (name,email,avatar)=> async(dispatch) =>{
    try {
        dispatch(UpdateProfileRequest());
        const config = {headers:{"Content-Type":"multipart/form-data"}};
        const {data} = await axios.put(`/api/v2/me/updateprofile`,{name,email,avatar},config);
        dispatch(UpdateProfileSuccess(data));
    } catch (error) {
        dispatch(UpdateProfileFail(error.response.data.message));
    }
}

//for Updating Passwords
export const updatePassword = (oldpassword,newpassword,confirmpassword)=> async(dispatch) =>{
    try {
        dispatch(UpdatePasswordRequest());
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.put(`/api/v2/me/password/update`,{oldpassword,newpassword,confirmpassword},config);
        // console.log(data);
        dispatch(UpdatePasswordSuccess(data));
    } catch (error) {
        dispatch(UpdatePasswordFail(error.response.data.message));
    }
}

//for sending email when Forget Password
export const sendemail = (email)=> async(dispatch)=>{
    try {
        dispatch(ForgetPasswordRequest());
        const config = {headers:{"Content-Type":"application/json"}};
        const data = await axios.post("/api/v2/password/forget",email,config);
        console.log(data);
        // dispatch(ForgetPasswordSuccess(data));
    } catch (error) {
        dispatch(ForgetPasswordFail(error.response.data.message));
    }   
}
