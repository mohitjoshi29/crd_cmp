import { Get_API_Complain } from "../Action/Complain_Action";

const initialState={
    cmpList: null
}

const get_func_cmp=((state=initialState,action)=>{
    switch(action.type){
        case Get_API_Complain:
            return {
                ...state,
                cmpList:action.value
            }
            default:
                return state;
    }
})
export default get_func_cmp;