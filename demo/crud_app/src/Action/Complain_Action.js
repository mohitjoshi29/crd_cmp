import Swal from 'sweetalert2'
import axios from "axios";

export const Get_API_Complain = "Get_API_Complain";


export const Get_API_Func = (data) => {
    return {
        type: Get_API_Complain,
        value: data
    }
}

// get API...
export const get_cmp_API = (id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_KEY}/api/empcomplains/${id}/`).then((res) => {
            dispatch(Get_API_Func(res.data));
        })
    }
}

// post API...

export const post_cmp = (formData,id) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_KEY}/api/complains/`, formData).then((res) => {    
        })
    }
}

// delete API
export const delete_cmp = (id,idd) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_KEY}/api/complains/${idd}/`).then((res) => {
            Swal.fire({
                title: 'deleted',
                text: "data deleted",
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
            })
            dispatch(get_cmp_API(id))
            // fetchdata();
        })
        // getData();

    // })
}
}




