import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Tokens, Auth} from '../../types/tokens';

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
        logOut: (state) => {
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

export const selectCurrentToken = (state: Auth): string => {
    console.log(state)
    return state.auth.token; }
//cambiar por el tipo de dato correspondiente