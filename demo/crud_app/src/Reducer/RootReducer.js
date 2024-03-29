import { combineReducers } from "redux";
import Reducer from "./Reducer";
import get_func from './Reducer';
import get_func_emp from "./Emp_Reducer";
import get_func_cmp from "./Comp_Reducer";
import get_SCName_func from "./SelCmpName_Reducer";

 const RootReducer= combineReducers({
    Reducer,
    get_func,
    get_func_emp,
    get_func_cmp,
    get_SCName_func

})

export default RootReducer