import Swal from 'sweetalert2'
import axios from "axios";

export const Get_API_Employee = "Get_API_Employee";

export const Get_API_EmpFun = (data) => {
    return {
        type: Get_API_Employee,
        value: data
    }
}

// get API...
export const get_Api = (id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_KEY}/api/companiesemp/${id}/`).then((res) => {
            dispatch(Get_API_EmpFun(res.data));
        })
    }
}

// post API...

export const post_Api = (formData,id) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_KEY}/api/employees/`, formData).then((res) => {
            dispatch(get_Api(id));
        })
    }
}

// Update Api...
export const Update_Api = (selectedId, formData,id) => {
    return (dispatch) => {
        axios.put(`${process.env.REACT_APP_API_KEY}/api/employees/${selectedId}/`, formData).then((res) => {
            dispatch(get_Api(id));
        })
    }
}

// delete API
export const delete_Api = (id,idd) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_KEY}/api/employees/${idd}/`).then((res) => {
            Swal.fire({
                title: 'deleted',
                text: "data deleted",
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
            })
            dispatch(get_Api(id));
        })
    }
}

