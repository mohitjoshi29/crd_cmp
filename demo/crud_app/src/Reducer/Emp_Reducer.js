import { Get_API_Employee } from "../Action/Emp_Action";

const initialState={
    Emp_list: null
}

const get_func_emp=((state=initialState,action)=>{
    switch(action.type){
        case Get_API_Employee:
            return {
                ...state,
                Emp_list:action.value
            }
            default:
                return state;
    }
})
export default get_func_emp;