import React, { useEffect } from 'react'
import "./adminallproducts.css";
import Aside from '../AsideBar/Aside';
import { useDispatch, useSelector } from 'react-redux';
import { admingetItems, Itemdelete } from '../../../Actions/itemAction';
import Loader from '../../Layout/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { adminDeleteReset, clearError } from '../../../Store/Slices/AdminDeleteItem';

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminItems, error, loading } = useSelector((state) => state.AdminItems);
  const {error:deleteError,Deleted}= useSelector((state)=> state.AdminDeleteItem)
  const deleteitem = (id)=>{
    dispatch(Itemdelete(id));
  }
  useEffect(() => {
    if(error){
      console.log(error);
    }
    if(deleteError){
      alert(deleteError);
      dispatch(clearError());
    }
    if(Deleted.success){
      alert("Product Deleted");
      navigate("/admin/dashboard");
      dispatch(adminDeleteReset());
    }
    dispatch(admingetItems());
  }, [dispatch,error,deleteError,navigate,Deleted]);

  return (
    <>
      {loading ? (<Loader />) : (
        <div className="adminallproducts">
          <Aside />
          <div className="products">
            <h2>All Products</h2>
            <div className="sub">
              {
                adminItems && adminItems.length > 0 ? (
                  <table>
                    <thead>
                      <th>Name</th>
                      <th>Stock</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </thead>
                    <tbody>
                      {
                        adminItems && adminItems.map((item) => (
                          <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.stock}</td>
                            <td>{item.price}</td>
                            <td className='actions'>
                              <button onClick={()=>navigate(`/admin/editproduct/${item._id}`)}><FontAwesomeIcon icon={faPen} /></button>
                              <button onClick={()=>deleteitem(item._id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                ) : (
                  <h3>No Products</h3>
                )}
            </div>
          </div>
        </div>)}
    </>
  )
}

export default AllProducts