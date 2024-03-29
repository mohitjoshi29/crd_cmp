import {Get_API_SELCMPNAME} from '../Action/SelCmpName_Action';

const initialState={
    list_ScmpName: null
}

const get_SCName_func=((state=initialState,action)=>{
    switch(action.type){
        case Get_API_SELCMPNAME:
            return {
                ...state,
                list_ScmpName:action.value
            }
            default:
                return state;
    }
})
export default get_SCName_func;