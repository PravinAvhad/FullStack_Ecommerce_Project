// import { useSelector, useDispatch } from 'react-redux'
import { allItemsFail, allItemsRequest, allItemsSuccess, clearError } from '../Store/Slices/items'
import axios from "axios"
import { itemDetailFail, itemDetailRequest, itemDetailSuccess } from '../Store/Slices/itemdetails';

export const getitems = (keyword="",page=1,category) => async (dispatch) => {
    try {
        // console.log(keyword,category,page);
        dispatch(allItemsRequest());
        let apilink = `/api/v1/items?keyword=${keyword}&page=${page}`;
        if(category){
            apilink = `/api/v1/items?keyword=${keyword}&category=${category}&page=${page}`;
        }
        console.log(apilink);
        const { data } = await axios.get(apilink);
        console.log(data);
        dispatch(allItemsSuccess(data));
    } catch (error) {
        // console.log(error);
        dispatch(allItemsFail(error.response.data.message));
    }
}

export const fetchItemDetails = (id)=> async (dispatch) => {
    try {
        dispatch(itemDetailRequest());
        const { data } = await axios.get(`/api/v1/item/${id}`);
        dispatch(itemDetailSuccess(data.item));
    } catch (error) {
        dispatch(itemDetailFail(error.response.data.message));
    }
}