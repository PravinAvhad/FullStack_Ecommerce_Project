import React, { useEffect } from 'react'
import "./productdetails.css"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Layout/Loader/Loader';
import ReactStars from "react-rating-stars-component"
import { getItemDetails } from '../../Actions/itemAction';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const getItemDetails = async (inputid) => {
    //     try {
    //         dispatch(itemDetailRequest());
    //         const { data } = await axios.get(`/api/v1/item/${inputid}`);
    //         dispatch(itemDetailSuccess(data.item));
    //     } catch (error) {
    //         dispatch(itemDetailFail(error.response.data.message));
    //     }
    // }
    useEffect(() => {
        dispatch(getItemDetails(id));
        if (error) {
            toast.error(error);
        }
        console.log("Loading: ",loading);
    }, [dispatch, id]);
    const { fetchitemDetails, loading, error } = useSelector(state => state.ItemDetails);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#FFDF00",
        value: 2.5,
        isHalf: true,
        size: window.innerWidth < 600 ? 15 : 25,
    }
    return (
        <div className='productDetails'>
            <ToastContainer />
            {loading ? (<Loader />) :
                (<div className="mainsection">
                    <div className="subsection1">
                        <img src="https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="Dummy Image" className='part1' />
                        <div className='part2'>
                            <div className="imgsarray">
                                <img src="https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="img1" className='img' />
                                <img src="https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="img2" className='img' />
                                {/* <img src={fetchitemDetails.images[0].Url} alt="img3" className='img' /> */}
                                <img src="https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="img3" className='img' />
                                <img src="https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="img3" className='img' />
                                <img src="https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="img3" className='img' />
                                <img src="https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="img3" className='img' />
                                <img src="https://static.toiimg.com/thumb/msid-109613217,width-1070,height-580,imgsize-71170,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" alt="img3" className='img' />
                            </div>
                        </div>
                    </div>
                    <div className="subsection2">
                        <h1>Lenovo V15 AMD Ryzen 3 Quad Core 7320U - (8 GB/SSD/512 GB SSD/Windows 11 Home) V15 G4 AMN 1 Thin and Light Laptop  (39.62 cm, Arctic Grey, 1.65 Kg)</h1>
                        <div className="ratings">
                            <ReactStars {...options} />
                            {/* <span>{fetchitemDetails.name}</span> */}
                            <span>20 Ratings & 20 Reviews</span>
                        </div>
                        <div className="pricesection">
                            <div className="discount">
                                Discount Price
                            </div>
                            <div className="allprices">
                                <span>Rs. 37600/-</span>
                                <span className='orignalprice'>Rs. 47000/-</span>
                                <span className='discount'>20% off</span>
                            </div>
                        </div>
                        <div className="description">10th Gen Intel Core i5-10210U processor
                            Pre-loaded Windows 10 Home
                            14-inch screen with Full HD IPS Display
                            8GB RAM | Storage: 128GB SSD
                            Wireless Communication Technology: Bluetooth; Ram Memory Technology: Ddr4; Hard Disk Description: Hdd; Human Interface Input: Keyboardmicrophonebuttons; Resolution: 1080p; Hardware Interface: Usb; Form Factor: Ultra-Portable; Display Resolution Maximum: 1920x1080</div>
                        <div className="description">10th Gen Intel Core i5-10210U processor
                            Pre-loaded Windows 10 Home
                            14-inch screen with Full HD IPS Display
                            8GB RAM | Storage: 128GB SSD
                            Wireless Communication Technology: Bluetooth; Ram Memory Technology: Ddr4; Hard Disk Description: Hdd; Human Interface Input: Keyboardmicrophonebuttons; Resolution: 1080p; Hardware Interface: Usb; Form Factor: Ultra-Portable; Display Resolution Maximum: 1920x1080</div>
                        <div className="description">10th Gen Intel Core i5-10210U processor
                            Pre-loaded Windows 10 Home
                            14-inch screen with Full HD IPS Display
                            8GB RAM | Storage: 128GB SSD
                            Wireless Communication Technology: Bluetooth; Ram Memory Technology: Ddr4; Hard Disk Description: Hdd; Human Interface Input: Keyboardmicrophonebuttons; Resolution: 1080p; Hardware Interface: Usb; Form Factor: Ultra-Portable; Display Resolution Maximum: 1920x1080</div>
                        <div className="description">10th Gen Intel Core i5-10210U processor
                            Pre-loaded Windows 10 Home
                            14-inch screen with Full HD IPS Display
                            8GB RAM | Storage: 128GB SSD
                            Wireless Communication Technology: Bluetooth; Ram Memory Technology: Ddr4; Hard Disk Description: Hdd; Human Interface Input: Keyboardmicrophonebuttons; Resolution: 1080p; Hardware Interface: Usb; Form Factor: Ultra-Portable; Display Resolution Maximum: 1920x1080</div>
                        <div className="description">10th Gen Intel Core i5-10210U processor
                            Pre-loaded Windows 10 Home
                            14-inch screen with Full HD IPS Display
                            8GB RAM | Storage: 128GB SSD
                            Wireless Communication Technology: Bluetooth; Ram Memory Technology: Ddr4; Hard Disk Description: Hdd; Human Interface Input: Keyboardmicrophonebuttons; Resolution: 1080p; Hardware Interface: Usb; Form Factor: Ultra-Portable; Display Resolution Maximum: 1920x1080</div>
                            <div className="description">10th Gen Intel Core i5-10210U processor
                            Pre-loaded Windows 10 Home
                            14-inch screen with Full HD IPS Display
                            8GB RAM | Storage: 128GB SSD
                            Wireless Communication Technology: Bluetooth; Ram Memory Technology: Ddr4; Hard Disk Description: Hdd; Human Interface Input: Keyboardmicrophonebuttons; Resolution: 1080p; Hardware Interface: Usb; Form Factor: Ultra-Portable; Display Resolution Maximum: 1920x1080</div>
                        <div className="description">10th Gen Intel Core i5-10210U processor
                            Pre-loaded Windows 10 Home
                            14-inch screen with Full HD IPS Display
                            8GB RAM | Storage: 128GB SSD
                            Wireless Communication Technology: Bluetooth; Ram Memory Technology: Ddr4; Hard Disk Description: Hdd; Human Interface Input: Keyboardmicrophonebuttons; Resolution: 1080p; Hardware Interface: Usb; Form Factor: Ultra-Portable; Display Resolution Maximum: 1920x1080</div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default ProductDetails