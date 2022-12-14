import {useEffect, useState} from 'react';
import { Outlet } from "react-router-dom";
import {useDispatch} from "react-redux";
import { setCredentials } from '../../features/auth/authSlice';
import {Tokens} from '../../types/tokens';
import { Type } from 'typescript';
//cambiar nombre a PersistLogin, y enviar a carpeta features/auth
//guardar tokens en cookies una vez abierta la sesion.
//cada vez que se reinicie el navegador obtener los tokens de session y guardalos en setCredentials
//Si cierra la session limpiar los tokens de cookies

const PersistLogin = () => {
    const dispatch = useDispatch();
    let [authTokens, setAuthTokens] = useState<Tokens | null>(()=> localStorage.getItem("authTokens") ? 
    JSON.parse(localStorage.getItem("authTokens") || "[]") : null);
    
    useEffect(() =>  {
        const dataUser = () => {
            if (authTokens !== null){
                dispatch(setCredentials({ ...authTokens}))
            }
        }

        dataUser();
    }, []);

    return <Outlet />
}

export default PersistLogin;