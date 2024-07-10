import React, { useEffect, useState } from 'react'
import "./productdetails.css"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Layout/Loader/Loader';
import ReactStars from "react-rating-stars-component"
import { fetchItemDetails } from '../../Actions/itemAction';
import { addItemsToCart } from '../../Actions/cartItems';
import MetaData from '../Layout/MetaData';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { itemDetails, loading, error } = useSelector(state => state.ItemDetails);
    const [quantity, setquantity] = useState(1);
    // console.log(itemDetails);
    useEffect(() => {
        if (error) {
            console.log(error);
            toast.error(error);
        }
        dispatch(fetchItemDetails(id));
    }, [dispatch]);
    const decrement = () => {
        if (quantity > 1) {
            setquantity(quantity - 1);
        }
        if(quantity === 1){
            console.log("Minimum 1 quantity");
        }
    }
    const increment = () => {
        if (quantity < itemDetails.stock) {
            setquantity(quantity + 1);
        }
        if (quantity === itemDetails.stock) {
            console.log(`You can order this much quantity`);
        }
    }
    const addtocart = () => {
        dispatch(addItemsToCart(id,quantity)); //working correctly
    }
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#FFDF00",
        value: itemDetails.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 15 : 25,
    }
    return (<>
        {loading ? (
            <Loader />
        ) : (
            <div className='productDetails'>
                {/* <ToastContainer /> */}
                <MetaData title={itemDetails.name} />
                <div className="mainsection">
                    <div className="subsection1">
                        {itemDetails.images?.map((img, index) => (
                            <img src={img.Url || "https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} alt={`img${index}`} className='part1' key={index} />
                        ))}
                        <div className='part2'>
                            <div className="imgsarray">
                                
                            </div>
                        </div>
                    </div>
                    <div className="subsection2">
                        <h1>{itemDetails.name}</h1>
                        <div className="ratings">
                            <ReactStars {...options} />
                            <span> {itemDetails.ratings} Ratings & {itemDetails.numOfReviews} Reviews</span>
                        </div>
                        <div className="subsection3">
                            <div className="pricesection">
                                <div className="discount">
                                    Discount Price
                                </div>
                                <div className="allprices">
                                    <span>Rs. {itemDetails.price* 0.8}/-</span>
                                    <span className='orignalprice'>Rs. {itemDetails.price}/-</span>
                                    <span className='discount'>20% off</span>
                                </div>
                            </div>
                            <div className="statusSection">
                                <span>Status :
                                    {itemDetails.stock >= 1 ? (<span style={{ color: "green" }}> In Stock</span>) : (<span style={{ color: "red" }}> Not In Stock</span>)}
                                </span>
                            </div>
                        </div>
                        <div className="subsection4">
                            <div className="quantity">
                                <button onClick={decrement}>-</button>
                                {quantity}
                                <button onClick={increment}>+</button>
                            </div>
                            <div className="addcart">
                                <button onClick={addtocart}>Add to cart</button>
                            </div>
                        </div>
                        <div className="description">{itemDetails.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium corrupti sequi, vitae est perferendis amet accusantium, illo pariatur, reprehenderit non nisi! In repellat molestiae consectetur adipisci beatae minus quasi porro. Inventore veniam mollitia delectus laudantium dicta dignissimos nulla quo facilis harum fugit. Est qui vel fugiat cum molestiae iste odit cumque, temporibus sunt, recusandae facilis doloribus optio placeat quia a ipsum quasi ullam nemo. Asperiores, cumque. Quia, veniam. Nemo, dolor. Facere perferendis ducimus sit aliquid in molestiae fugit ipsum doloremque nulla odio animi dolor debitis nam corporis, voluptatem repellat nesciunt, iste voluptas perspiciatis eveniet facilis similique quos? Similique culpa reiciendis impedit dolore amet ratione illum fuga. Doloremque non optio nisi nostrum ullam aliquid dolorum nesciunt vero, ratione sed veniam quas sint eveniet cum ab fugiat aliquam esse quaerat eum est qui error nulla voluptas adipisci? Animi omnis et molestiae non amet ratione harum soluta sit ullam itaque autem quam ab quaerat hic saepe dolore praesentium quos earum, commodi vitae, velit fugit, dignissimos placeat nam. Dicta eos qui error praesentium nesciunt aliquid dolorum pariatur. Saepe iusto doloribus, repellendus ab voluptas quisquam molestiae amet error doloremque, maiores voluptatem quae excepturi dolore cumque molestias in ducimus fuga impedit. Recusandae cumque minus porro labore, qui nam odit perferendis, incidunt cupiditate nihil deserunt debitis impedit reprehenderit minima necessitatibus fugiat possimus? Ab saepe corporis consequatur pariatur, fugiat illo aperiam sapiente qui dolorem natus ipsum dignissimos recusandae quam dolor vitae optio esse cum voluptatibus iusto, rerum odit! Harum voluptate ducimus deleniti atque nesciunt vel fugit voluptatem, dolorem facere excepturi reprehenderit odit mollitia aperiam ab. Incidunt dolorem commodi praesentium. Iusto, est illo? Alias architecto quo nobis nisi porro voluptatum fugit mollitia reiciendis ipsum tenetur, incidunt nam eum! Facilis sit voluptatibus illo aperiam unde rerum optio quo eligendi in! Sit ad non earum modi reiciendis at saepe harum ipsa est laboriosam excepturi consequatur dolorum aperiam, similique quisquam laborum obcaecati voluptas nobis unde amet magni. Quaerat, libero! Totam suscipit dolorem hic, facere itaque adipisci ducimus amet reprehenderit excepturi? Rem veritatis laudantium accusantium quae dolorum, et, atque earum eligendi facilis quis repellendus corrupti sed autem neque voluptates nobis harum minima libero! Sunt accusantium dolor, ducimus suscipit dignissimos autem dolorem nulla cumque, assumenda dolorum et eligendi rerum nam quas soluta quod consequuntur labore nisi, obcaecati iste voluptatum quam odio. In, assumenda ut? Assumenda modi deserunt corrupti minus tempore placeat porro ad vitae, consectetur ea sit architecto deleniti, ipsa dicta quasi tenetur praesentium.</div>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}

export default ProductDetails