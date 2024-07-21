import React, { useEffect, useState } from 'react'
import Aside from '../AsideBar/Aside'
import "./update.css";
import MetaData from '../../Layout/MetaData.jsx'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../Layout/Loader/Loader.jsx'
import { useNavigate, useParams } from 'react-router-dom';
import { admingetUserDetail, updateUser } from '../../../Actions/userActions.js';
import { adminUpdateUserReset, clearError } from '../../../Store/Slices/AdminUpDelUser.jsx';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userid } = useParams();
  const { loading, user, error, isUpdated, message } = useSelector((state) => state.AdminUpDelUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const updateRole = (e)=>{
    e.preventDefault();
    dispatch(updateUser(userid,{name,email,role}));
  }
  useEffect(() => {
    if( !user.user ||  user.user._id !== userid){
      dispatch(admingetUserDetail(userid));
    }
    else{
      setName( user.user.name);
      setEmail( user.user.email);
      setRole( user.user.role);
    }
    if(error){
      alert(error);
      console.log(error);
      dispatch(clearError());
    }
    if(isUpdated){
      alert(message);
      // console.log(message);
      navigate("/admin/allusers");
      dispatch(adminUpdateUserReset());
      dispatch(admingetUserDetail(userid));
    }
  }, [dispatch,userid,error,user,isUpdated,message,navigate]);

  return (
    <>
      {loading ? (<Loader />) : (
        <div className="adminUpdateUser">
          <MetaData title="Ecommerce : Update User Role" />
          <Aside />
          <div className="updateUser">
            <h2>Update User</h2>
            <div className="updateUserContainer">
              <div className="sub1">
                <div className="userinfo">
                  <h3>Name : {name}</h3>
                  <h3>Email : {email}</h3>
                  <h3>Joined On : {user.user && user.user.createdAt.substr(0, 10)}</h3>
                </div>
                <img src={user.user && user.user.profileImg.Url} alt="User Profile" />
              </div>
              <form onSubmit={updateRole}>
                <div className="">
                  <label for="role">User Role : </label>
                  <select
                    name="role"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)} >
                    <option value="">Choose User Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                  </select>
                </div>
                <button type="submit" disabled={loading ? true : false || role==="" ? true : false}>Update</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateUser