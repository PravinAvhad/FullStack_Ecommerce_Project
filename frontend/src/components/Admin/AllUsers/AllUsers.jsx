import React, { useEffect } from 'react'
import Aside from '../AsideBar/Aside'
import "../Orders/orders.css"
import "./allusers.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layout/Loader/Loader';
import { admingetallUsers, deleteUser } from '../../../Actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import MetaData from '../../Layout/MetaData';
import { adminDelUserReset } from '../../../Store/Slices/AdminUpDelUser';

const AllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading:GetUsersloading,error:adminGetUsersError,adminAllUsers} = useSelector((state)=> state.AdminGetUsers);
  const {loading,message,isDeleted,error} = useSelector((state)=> state.AdminUpDelUser);

  const userdelete = (id)=>{
    console.log(`User Deleted : ${id}`);
    dispatch(deleteUser(id));
  }
  useEffect(() => {
    if(adminGetUsersError){
      alert(adminGetUsersError);
      console.log(adminGetUsersError);
    }
    if(error){
      alert(error);
      console.log(error);
    }
    if(isDeleted){
      alert(message);
      console.log(message);
      navigate("/admin/allusers");
      dispatch(adminDelUserReset());
    }
    dispatch(admingetallUsers());
  }, [dispatch,error,adminGetUsersError,isDeleted,message,navigate]);
  
  return (
    <>
      {loading || GetUsersloading ? (<Loader />) : (
        <div className="adminallproducts">
          <MetaData title="Ecommerce : Admin All Users" />
          <Aside />
          <div className="products">
            <h2>All Users</h2>
            <div className="sub">
              {
                adminAllUsers && adminAllUsers.users && adminAllUsers.users.length > 0 ? (
                  <table>
                    <thead>
                      <th>User Id</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      {
                        adminAllUsers && adminAllUsers.users.map((user) => (
                          <tr key={user._id}>
                            <td style={{ color: "#FF4B2B" }}>...{user._id.substr(17, 23)}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td style={{color: user.role ==="admin" ? "tomato":"black"}}>{user.role}</td>
                            <td className='actions'>
                              <button onClick={() => navigate(`/admin/updateuser/${user._id}`)}><FontAwesomeIcon icon={faPen} /></button>
                              <button onClick={() => userdelete(user._id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                ) : (
                  <div className="noOrders">
                    <h3>No Orders Received</h3>
                  </div>
                )}
            </div>
          </div>
        </div>)}
    </>
  )
}

export default AllUsers