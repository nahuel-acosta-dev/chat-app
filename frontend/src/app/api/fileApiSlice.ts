// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut} from '../../features/auth/authSlice';
import {AppState} from '../../types/store';
import {baseQuery} from './apiSlice';

// Define a service using a base URL and expected endpoints
export const fileBaseQuery = fetchBaseQuery({ 
  baseUrl: `${process.env.REACT_APP_API_URL}`,
    credentials: 'include',
    'prepareHeaders': (headers, {getState}: any): Headers => {
        const token: string = getState().auth.token;
        if(token) {
            headers.set("Authorization", `JWT ${token}`);//si no funciona probar authorization
          }
        
        return headers;
    }

})

interface RefreshResult {
      data?: any
      meta?: any
}

const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await fileBaseQuery(args, api, extraOptions);
  if (result?.error?.status === 401 || result?.error?.status === 403){
      console.log('sending refresh token');
      const appState = api.getState() as AppState;
      const refresh = appState.auth.refresh;
      // send refresh token to get new acces token
      const refreshResult: RefreshResult = await baseQuery({url:'auth/jwt/refresh/', method:'POST', body: {
          "refresh": refresh
      }}, api, extraOptions);
      
      if (refreshResult?.data){
        console.log(refreshResult)
        console.log('se refresco el token');
        /*const user = api.getState().auth.user;*/
          api.dispatch(setCredentials({
            ...refreshResult.data,
            refresh: refresh
          })); // store the new token
          
          result = await fileBaseQuery(args, api, extraOptions);
          //retry the original query with new access Token
      }
      else{
          api.dispatch(logOut());
      }

  }
  return result;
}

export const fileApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})