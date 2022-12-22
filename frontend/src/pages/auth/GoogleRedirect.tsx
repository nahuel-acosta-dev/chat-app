import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setCredentials } from '../../features/auth/authSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import {useGoogleMutation} from '../../features/auth/authGoogleSlice';
import queryString from 'query-string';

interface Details {
    state: string;
    code: string;
}

const GoogleRedirect = () => {
    let location = useLocation();
    const token = useSelector(selectCurrentToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [google, { isLoading }] = useGoogleMutation();

    


    const googleAuth = async (urlDetails: any) => {
        try{
            const googleData: any = await google(urlDetails);
            const email = googleData.data.user;
            dispatch(setCredentials({ ...googleData.data,  email }));
            console.log(googleData);
            console.log(googleData.data);
            console.log(googleData.refresh);
            navigate('/app/home');
        }
        catch(err){
            console.log(err);
            navigate('/auth/errorLogin?error=error');
        }
    }

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            
            const urlDetails = {
                state: state,
                code: code
              }
            
            googleAuth(urlDetails);
        }
    }, [location]);

    if(token){
        return <Navigate to="/app/home" />
    }

    return (
        <div className='container text-center'>
            Espere un Momento sera redirigido...
        </div>
    );
}

export default GoogleRedirect;