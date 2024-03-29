import { applyMiddleware, createStore } from 'redux';
import RootReducer from '../Reducer/RootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const store= createStore(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk))
    );
export default store;