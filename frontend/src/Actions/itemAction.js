// import { useSelector, useDispatch } from 'react-redux'
import { allItemsFail, allItemsRequest, allItemsSuccess, clearError } from '../Store/Slices/items'
import axios from "axios"
import { itemDetailFail, itemDetailRequest, itemDetailSuccess } from '../Store/Slices/itemdetails';
import { adminItemsFail, adminItemsRequest, adminItemsSuccess } from '../Store/Slices/AdminItems';
import { adminNewItemFail, adminNewItemRequest, adminNewItemReset, adminNewItemSuccess } from '../Store/Slices/AdminNewItem';
import { adminUpdateRequest,adminUpdateSuccess,adminUpdateFail,adminDeleteRequest,adminDeleteSuccess,adminDeleteFail } from '../Store/Slices/AdminUpDelItem';

//Get all Items - For Users
export const getitems = (keyword="",page=1,category) => async (dispatch) => {
    try {
        // console.log(keyword,category,page);
        dispatch(allItemsRequest());
        let apilink = `/api/v1/items?keyword=${keyword}&page=${page}`;
        if(category){
            apilink = `/api/v1/items?keyword=${keyword}&category=${category}&page=${page}`;
        }
        const { data } = await axios.get(apilink);
        // console.log(data);
        dispatch(allItemsSuccess(data));
    } catch (error) {
        // console.log(error);
        console.log(error);
        dispatch(allItemsFail(error.response.data.message));
    }
}

//Get Items Details - For Users
export const fetchItemDetails = (id)=> async (dispatch) => {
    try {
        dispatch(itemDetailRequest());
        const { data } = await axios.get(`/api/v1/item/${id}`);
        dispatch(itemDetailSuccess(data.item));
    } catch (error) {
        dispatch(itemDetailFail(error.response.data.message));
    }
}

//Get all Items - For Admin
export const admingetItems = ()=>async(dispatch)=>{
    try {
        dispatch(adminItemsRequest());
        const { data } = await axios.get("/api/v1/admin/allitems");
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
        const {data} = await axios.post(`/api/v1/admin/item/create`,itemdata,config);
        dispatch(adminNewItemSuccess(data));
        if(data.success){
            console.log("Product Created Successfully");
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
        const {data} = await axios.delete(`/api/v1/admin/item/${id}`);
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
        const {data} = await axios.put(`/api/v1/admin/item/${id}`,itemData,config);
        dispatch(adminUpdateSuccess(data));
    } catch (error) {
        dispatch(adminUpdateFail(error.response.data.message));
    }
}