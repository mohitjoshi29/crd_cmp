import { Get_API_Response } from "../Action/Action";

const initialState={
    list: null
}

const get_func=((state=initialState,action)=>{
    switch(action.type){
        case Get_API_Response:
            return {
                ...state,
                list:action.value
            }
            default:
                return state;
    }
})
export default get_func;