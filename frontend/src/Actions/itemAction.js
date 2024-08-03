import { allItemsFail, allItemsRequest, allItemsSuccess} from '../ReduxStore/Slices/items'
import axios from "axios"
import { itemDetailFail, itemDetailRequest, itemDetailSuccess } from '../ReduxStore/Slices/itemdetails';
import { adminItemsFail, adminItemsRequest, adminItemsSuccess } from '../ReduxStore/Slices/AdminItems';
import { adminNewItemFail, adminNewItemRequest, adminNewItemReset, adminNewItemSuccess } from '../ReduxStore/Slices/AdminNewItem';
import { adminUpdateRequest,adminUpdateSuccess,adminUpdateFail,adminDeleteRequest,adminDeleteSuccess,adminDeleteFail } from '../ReduxStore/Slices/AdminUpDelItem';
import { itemReviewFail, itemReviewRequest, itemReviewSuccess } from '../ReduxStore/Slices/ItemReview';
import { adminReviewsFail, adminReviewsRequest, adminReviewsSuccess } from '../ReduxStore/Slices/AdminReviews';
import { adminDeleteReviewFail, adminDeleteReviewRequest, adminDeleteReviewSuccess } from '../ReduxStore/Slices/AdminDelReview';

//Get all Items - For Users
export const getitems = (keyword="",page=1,category) => async (dispatch) => {
    try {
        dispatch(allItemsRequest());
        let apilink = `${window.location.origin}/api/v1/items?keyword=${keyword}&page=${page}`;
        if(category){
            apilink = `${window.location.origin}/api/v1/items?keyword=${keyword}&category=${category}&page=${page}`;
        }
        const { data } = await axios.get(apilink);
        dispatch(allItemsSuccess(data));
    } catch (error) {
        dispatch(allItemsFail(error.response.data.message));
    }
}

//Get Item Details - For Users
export const fetchItemDetails = (id)=> async (dispatch) => {
    try {
        dispatch(itemDetailRequest());
        const { data } = await axios.get(`${window.location.origin}/api/v1/item/${id}`);
        dispatch(itemDetailSuccess(data.item));
    } catch (error) {
        dispatch(itemDetailFail(error.response.data.message));
    }
}

//Get all Items - For Admin
export const admingetItems = ()=>async(dispatch)=>{
    try {
        dispatch(adminItemsRequest());
        const { data } = await axios.get(`${window.location.origin}/api/v1/admin/allitems`);
        dispatch(adminItemsSuccess(data));
    } catch (error) {
        dispatch(adminItemsFail(error.response.data.message));
    }
}

//Create Item - For Admin Only 3 imgs can be upload
export const createItem = (itemdata,navigate) => async(dispatch)=>{
    try {
        dispatch(adminNewItemRequest());
        const config = {
            headers:{"Content-Type":"application/json"},
        };
        const {data} = await axios.post(`${window.location.origin}/api/v1/admin/item/create`,itemdata,config);
        dispatch(adminNewItemSuccess(data));
        if(data.success){
            navigate('/admin/dashboard');
            dispatch(adminNewItemReset());
        }
    } catch (error) {
        dispatch(adminNewItemFail(error.response.data.message));
    }
}

//Delete Item - For Admin 
export const Itemdelete = (id)=>async(dispatch)=>{
    try {
        dispatch(adminDeleteRequest());
        const {data} = await axios.delete(`${window.location.origin}/api/v1/admin/item/${id}`);
        dispatch(adminDeleteSuccess(data));
    } catch (error) {
        dispatch(adminDeleteFail());
    }
}

//Update Item - For Admin 
export const UpdateItem = (id,itemData) => async(dispatch)=>{
    try {
        dispatch(adminUpdateRequest());
        const config = {
            headers:{"Content-Type":"application/json"},
        };
        const {data} = await axios.put(`${window.location.origin}/api/v1/admin/item/${id}`,itemData,config);
        dispatch(adminUpdateSuccess(data));
    } catch (error) {
        dispatch(adminUpdateFail(error.response.data.message));
    }
}

//For Submitting Review Create Review - For User 
export const ItemReview = (reviewData)=> async (dispatch) => {
    try {
        dispatch(itemReviewRequest());
        const config = {
            headers:{"Content-Type":"application/json"},
        };
        const { data } = await axios.put(`${window.location.origin}/api/v1/review`,reviewData,config);
        // console.log(data);
        dispatch(itemReviewSuccess(data.success));
    } catch (error) {
        dispatch(itemReviewFail(error.response.data.message));
    }
}

//Get All Reviews of One Item Input is Name - For Admin
export const getallReviews = (name)=>async(dispatch)=>{
    try {
        dispatch(adminReviewsRequest());
        const { data } = await axios.get(`${window.location.origin}/api/v1/reviews?itemname=${name}`);
        // console.log(data);
        dispatch(adminReviewsSuccess(data));
    } catch (error) {
        dispatch(adminReviewsFail(error.response.data.message));
    }
}

//Delete Review - For Admin
export const deletereview = (itemid,reviewid)=>async(dispatch)=>{
    try {
        dispatch(adminDeleteReviewRequest());
        const {data} = await axios.delete(`${window.location.origin}/api/v1/reviews?itemId=${itemid}&reviewId=${reviewid}`);
        // console.log(data);
        dispatch(adminDeleteReviewSuccess(data));
    } catch (error) {
        dispatch(adminDeleteReviewFail(error.response.data.message));
    }
}