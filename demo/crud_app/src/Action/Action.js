import Swal from 'sweetalert2'
import axios from "axios";

export const Get_API_Response = "Get_API_Response";


export const Get_API_Func = (data) => {
    return {
        type: Get_API_Response,
        value: data
    }
}

// get API...
export const GET_API = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_KEY}/api/companies/`).then((res) => {
            dispatch(Get_API_Func(res.data.sort((a, b) => {
                const fir_name = a.name.toLowerCase();
                const sec_name = b.name.toLowerCase();
                if (fir_name < sec_name) {
                    return -1;
                }
                if (fir_name > sec_name) {
                    return 1;
                }
                return 0;
            })));
        })
    }
}

// post API...

export const POST_API = (formData) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_KEY}/api/companies/`, formData).then((res) => {
            dispatch(GET_API());
        })
    }
}

// Update Api...
export const UPDATE_API = (selectedId, formData) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_API_KEY}/api/companies/${selectedId}/`, formData).then((res) => {
            dispatch(GET_API());
        })
    }
}

// delete API
export const DELETE_API = (id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_KEY}/api/companies/${id}/`).then((res) => {
            Swal.fire({
                title: 'deleted',
                text: "data deleted",
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
            })
            // getData();
            dispatch(GET_API())

        })
    }
}




