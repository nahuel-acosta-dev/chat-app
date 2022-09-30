import {createSlice} from "@reduxjs/toolkit";
import { Type } from "typescript";

const authSlice = createSlice({
    name: 'auth',
    initialState:{user: null, token: null, refresh: null},
    reducers:{
        setCredentials: (state, action) => {
            const {token, refresh_token, access, refresh} = action.payload;
            state.token = token ? token : access;
            state.refresh = refresh_token ? refresh_token : refresh;
            //llenamos credenciales y guardamos en localStorage
            localStorage.removeItem("authTokens");
            localStorage.setItem("authTokens", JSON.stringify(action.payload));
        },
        logOut: (state, action) => {
            //limpiamos credenciales y localStorage
            state.token = null;
            state.refresh = null;
            //localStorage.removeItem("authTokens");
            localStorage.clear();
        }
    },
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

//export const selectCurrentUser = (state: {auth: {user: Object}): string => state.auth.user;
//export const selectCurrentToken = (state: {token: string}): string => state.token;
export const selectCurrentToken = (state: any): string => state.token; 
//cambiar por el tipo de dato correspondiente