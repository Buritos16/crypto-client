import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from "../slices/auth";
import {tradingReducer} from "../slices/trading";


export default configureStore({
    reducer: {
        auth: authReducer,
        trading: tradingReducer,
    },
});
