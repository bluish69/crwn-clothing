import {combineReducers} from "redux";
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['cart', "user"]
};

const cartConfig = {
    key: 'cart',
    storage,
    blacklist: ['hidden']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart : persistReducer(cartConfig, cartReducer)
})

export default persistReducer(persistConfig, rootReducer);