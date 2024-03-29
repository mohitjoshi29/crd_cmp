import Swal from 'sweetalert2'
import axios from "axios";

export const Get_API_SELCMPNAME = "Get_API_SELCMPNAME";


export const Get_API_SE_CMNM = (data) => {
    return {
        type: Get_API_SELCMPNAME,
        value: data
    }
}

// get API...
export const get_SCN = (cmpId) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_KEY}/api/companiesemp/${cmpId}/`).then((res) => {
            dispatch(Get_API_SE_CMNM(res.data));
        })
    }
}





