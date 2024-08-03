import { adminallusersFail, adminallusersRequest, adminallusersSuccess } from "../ReduxStore/Slices/AdminGetUsers";
import { adminDelUserFail, adminDelUserRequest, adminDelUserSuccess, adminGetUserFail, adminGetUserRequest, adminGetUserSuccess, adminUpdateUserFail, adminUpdateUserRequest, adminUpdateUserSuccess } from "../ReduxStore/Slices/AdminUpDelUser";
import { ForgetPasswordFail, ForgetPasswordRequest, ForgetPasswordSuccess } from "../ReduxStore/Slices/ForgetPassword";
import { UpdatePasswordFail, UpdatePasswordRequest, UpdatePasswordSuccess, UpdateProfileFail, UpdateProfileRequest, UpdateProfileSuccess } from "../ReduxStore/Slices/Profile";
import { loginRequest,loginSuccess,loginFail, clearError, registerRequest, registerSuccess, registerFail, loadUserSuccess, loadUserRequest, loadUserFail, logoutUserSuccess, logoutUserFail } from "../ReduxStore/Slices/User"; 
import axios from "axios"

//For Login of User
export const loginuser = (email,password)=> async(dispatch) =>{
    try {
        dispatch(loginRequest());
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.post(`${window.location.origin}/api/v2/login`,{email,password},config);
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
        const {data} = await axios.post(`${window.location.origin}/api/v2/register`,{name,email,password,avatar},config);
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
        const {data} = await axios.get(`${window.location.origin}/api/v2/me/profile`);
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
        // localStorage.setItem("shippingInfo",JSON.stringify(getState().Cart.shippinginfo));
        localStorage.removeItem("shippingInfo");
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
        const {data} = await axios.put(`${window.location.origin}/api/v2/me/updateprofile`,{name,email,avatar},config);
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
        const {data} = await axios.put(`${window.location.origin}/api/v2/me/password/update`,{oldpassword,newpassword,confirmpassword},config);
        // console.log(data);
        dispatch(UpdatePasswordSuccess(data));
    } catch (error) {
        dispatch(UpdatePasswordFail(error.response.data.message));
    }
}

//for sending email when Forget Password Remaining
export const sendemail = (email)=> async(dispatch)=>{
    try {
        dispatch(ForgetPasswordRequest());
        const config = {headers:{"Content-Type":"application/json"}};
        const data = await axios.post(`${window.location.origin}/api/v2/password/forget`,email,config);
        // console.log(data);
        dispatch(ForgetPasswordSuccess(data));
    } catch (error) {
        dispatch(ForgetPasswordFail(error.response.data.message));
    }   
}

//Get All Users - for Admin 
export const admingetallUsers = ()=> async(dispatch) =>{
    try {
        dispatch(adminallusersRequest());
        const {data} = await axios.get(`${window.location.origin}/api/v2/admin/users`);
        // console.log(data);
        dispatch(adminallusersSuccess(data));
    } catch (error) {
        dispatch(adminallusersFail(error.response.data.message));
    }
}

//Get Single User Details - For Admin
export const admingetUserDetail = (id)=> async(dispatch) =>{
    try {
        dispatch(adminGetUserRequest());
        const {data} = await axios.get(`${window.location.origin}/api/v2/admin/user/${id}`);
        // console.log(data);
        dispatch(adminGetUserSuccess(data));
    } catch (error) {
        dispatch(adminGetUserFail(error.response.data.message));
    }
}

//Update User Role - For Admin 
export const updateUser = (id,userData)=> async(dispatch) =>{
    try {
        dispatch(adminUpdateUserRequest());
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.put(`${window.location.origin}/api/v2/admin/user/${id}`,userData,config);
        // console.log(data);
        dispatch(adminUpdateUserSuccess(data));
    } catch (error) {
        dispatch(adminUpdateUserFail(error.response.data.message));
    }
}

//Delete User - For Admin 
export const deleteUser = (id)=> async(dispatch) =>{
    try {
        dispatch(adminDelUserRequest());
        const {data} = await axios.delete(`${window.location.origin}/api/v2/admin/user/${id}`);
        // console.log(data);
        dispatch(adminDelUserSuccess(data));
    } catch (error) {
        dispatch(adminDelUserFail(error.response.data.message));
    }
}