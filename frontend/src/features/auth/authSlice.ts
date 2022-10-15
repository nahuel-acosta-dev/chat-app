import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tokens} from '../../types/auth/Tokens';

const authSlice = createSlice({
    name: 'auth',
    initialState:{token: null, refresh: null},
    reducers:{
        setCredentials: (state, action: PayloadAction<Tokens>) => {
            const {access, refresh} = action.payload;
            state.token = access;
            state.refresh = refresh;
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
//export const selectCurrentUser = (state: Type) => state.auth.user;
export const selectCurrentToken = (state: any): string => {
    console.log(state)
    return state.auth.token; }
//cambiar por el tipo de dato correspondiente