// import { useSelector, useDispatch } from 'react-redux'
import { allItemsFail, allItemsRequest, allItemsSuccess, clearError } from '../Store/Slices/items'
import axios from "axios"
import { itemDetailFail, itemDetailRequest, itemDetailSuccess } from '../Store/Slices/itemdetails';

export const getitems = (keyword="",page=1) => async (dispatch) => {
    try {
        dispatch(allItemsRequest());
        const { data } = await axios.get(`/api/v1/items?keyword=${keyword}&page=${page}`);
        dispatch(allItemsSuccess(data));
    } catch (error) {
        // console.log(error);
        dispatch(allItemsFail(error.response.data.message));
    }
}
export const getItemDetails = (inputid)=> async (dispatch) => {
    try {
        dispatch(itemDetailRequest());
        const { data } = await axios.get(`/api/v1/item/${inputid}`);
        dispatch(itemDetailSuccess(data.item));
    } catch (error) {
        dispatch(itemDetailFail(error.response.data.message));
    }
}