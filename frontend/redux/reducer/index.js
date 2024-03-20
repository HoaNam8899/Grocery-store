
// import { createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { detailsProductReducer } from "./detailsProduct"
import { addProductReducer } from "./addProduct"
import { userLoginReducer } from "./userLogin"


const persistConfig = {
    key: 'root',
    storage,
}



const reducers = combineReducers({
    detailsId: detailsProductReducer,
    miniCart: addProductReducer,
    userLogin: userLoginReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export default persistedReducer;