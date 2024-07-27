import React, { useState, useEffect } from 'react'
import "../NewProduct/newProduct.css";
import Aside from '../AsideBar/Aside';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchItemDetails, UpdateItem } from '../../../Actions/itemAction';
import Loader from '../../Layout/Loader/Loader';
import MetaData from '../../Layout/MetaData';
import { adminUpdateReset } from '../../../Store/Slices/AdminUpDelItem';

const EditItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [oldimgs, setOldimgs] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [imgsPreview, setImgsPreview] = useState([]);
  const categories = ["Electronics", "Food", "Furniture", "Fashion", "Vegetables", "Women's Wear", "Men's Wear", "Grocery", "Footwear"];

  const { error, itemDetails, loading } = useSelector((state) => state.ItemDetails);
  const { loading: UpdateLoading, error: UpdateError,Updated} = useSelector((state) => state.AdminUpDelItem);
  const { id } = useParams();

  useEffect(() => {
    if (itemDetails && itemDetails._id !== id) { //for fetching item details
      dispatch(fetchItemDetails(id));
    }
    else {
      setName(itemDetails.name);
      setPrice(itemDetails.price);
      setDescription(itemDetails.description);
      setDiscount(itemDetails.discount);
      setStock(itemDetails.stock);
      setCategory(itemDetails.category);
      setOldimgs(itemDetails.images);
    }
    if(error){
      console.log(error);
    }
    if (UpdateError) {
      console.log(UpdateError);
    }
    if(Updated){
      alert("Product Updated");
      navigate("/admin/allproducts");
      dispatch(adminUpdateReset());
      dispatch(fetchItemDetails(id));
    }
  }, [dispatch, UpdateError, itemDetails,Updated,id,error,navigate]);

  const [updatedItem,setUpdatedItem]=useState({});
  const updateproduct = (e) => {
    e.preventDefault();
    updatedItem.name = name;
    updatedItem.price = price;
    updatedItem.description = description;
    updatedItem.discount = discount;
    updatedItem.stock = stock;
    updatedItem.category = category;
    updatedItem.images = imgs;
    console.log(`Updated Item :`, updatedItem);
    dispatch(UpdateItem(id,updatedItem));
  }

  const ImgsChange = (e) => {
    const files = Array.from(e.target.files);
    setImgs([]);
    setImgsPreview([]);
    setOldimgs([]);
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
    <>
      {loading ||UpdateLoading ? (<Loader />) : (
        <div className="adminNewProduct">
          <MetaData title="Ecommerce : Admin Update Product"/>
          <Aside />
          <div className="newProduct">
            <h2>Update Product</h2>
            <div className="productcontainer">
              <form onSubmit={updateproduct}>
                <div className="firsttworows">
                  <input type="text"
                    name="name" id=""
                    placeholder='Product Name' required
                    value={name}
                    onChange={(e) => setName(e.target.value)} />

                  <input type="text"
                    name="price" id=""
                    placeholder='Product Price' required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="firsttworows">
                  <input type="text"
                    name="stock" id=""
                    placeholder='Product Stock' required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)} />

                  <input type="text"
                    name="discount" id=""
                    placeholder='Product Discount' required
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div className="firsttworows">
                  <textarea
                    name="description" id=""
                    placeholder='Product Description' required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} ></textarea>

                  <select
                    name="category"
                    id=""
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((item) => (
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
                {oldimgs && oldimgs.length > 0 ? (
                  <div className="imgsarr">
                    {oldimgs.map((img, index) => (
                      <img key={index} src={img.Url} alt="Old Product Imgs" />
                    ))}
                  </div>) : (imgsPreview.length > 0 && (
                  <div className="imgsarr">
                    {imgsPreview.map((img, index) => (
                      <img key={index} src={img} alt="Product Imgs" />
                    ))}
                  </div>))}

                <button type='submit' disabled={loading ? true : false}>Update</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditItem