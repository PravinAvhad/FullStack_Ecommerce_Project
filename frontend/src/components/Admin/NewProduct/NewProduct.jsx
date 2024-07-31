import React, { useState, useEffect } from 'react'
import "./newProduct.css"
import Aside from '../AsideBar/Aside';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../../../Actions/itemAction';
import MetaData from '../../Layout/MetaData';
import { clearError } from '../../../ReduxStore/Slices/AdminNewItem';
import { toast } from 'react-toastify';

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    discount: "",
    category: "",
    stock: "",
  })
  const [imgs, setImgs] = useState([]);
  const [imgsPreview, setImgsPreview] = useState([]);
  const category = ["Electronics", "Men's Wear","Women's Wear","Footwear","Grocery", "Vegetables", "Sports","Health, Supplements"];
  const changeHandler = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  }
  const { loading, error,newitem } = useSelector((state) => state.AdminNewItem);
  
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
      // console.log(error);
      dispatch(clearError());
    }
  }, [dispatch, newitem, error]);

  const createproduct = (e) => {
    e.preventDefault();
    newProduct.images = imgs;
    dispatch(createItem(newProduct,navigate));
  }

  const ImgsChange = (e) => {
    const files = Array.from(e.target.files);
    setImgs([]);
    setImgsPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImgsPreview((old) => [...old, reader.result]);
          setImgs((old) => [...old, reader.result]);
        }
      }
      reader.readAsDataURL(file);
    })
  }
  return (
    <div className="adminNewProduct">
      <MetaData title="Ecommerce : Admin New Product"/>
      <Aside />
      <div className="newProduct">
        <h2>New Product</h2>
        <div className="productcontainer">
          <form onSubmit={createproduct}>
            <div className="firsttworows">
              <input type="text"
                name="name" id=""
                placeholder='Product Name' required
                value={newProduct.name}
                onChange={changeHandler} />

              <input type="text"
                name="price" id=""
                placeholder='Product Price' required
                value={newProduct.price}
                onChange={changeHandler} />
            </div>
            <div className="firsttworows">
              <input type="text"
                name="stock" id=""
                placeholder='Product Stock' required
                value={newProduct.stock}
                onChange={changeHandler} />

              <input type="text"
                name="discount" id=""
                placeholder='Product Discount' required
                value={newProduct.discount}
                onChange={changeHandler} />
            </div>
            <div className="firsttworows">
              <textarea name="description"
                placeholder='Product Description' required
                value={newProduct.description}
                onChange={changeHandler}></textarea>

              <select
                name="category"
                id=""
                required
                value={newProduct.category}
                onChange={changeHandler}
              >
                <option value="">Choose Category</option>
                {category.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="chooseimg">
              <input type="file"
                name="imgs" id=""
                accept='image/*'
                onChange={ImgsChange}
                multiple />
            </div>
            {imgsPreview.length > 0 && (
            <div className="imgsarr">
              {imgsPreview.map((img, index) => (
                <img key={index} src={img} alt="Product Imgs" />
              ))}
            </div>)}

            <button type='submit' disabled={loading ? true : false}>Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewProduct;