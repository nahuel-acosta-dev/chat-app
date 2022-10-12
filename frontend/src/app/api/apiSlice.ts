// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut} from '../../features/auth/authSlice';
// Define a service using a base URL and expected endpoints
export const baseQuery = fetchBaseQuery({ 
  baseUrl: `${process.env.REACT_APP_API_URL}`,
    credentials: 'include',
    'prepareHeaders': (headers, {getState}: any): Headers => {
        const token: string = getState().auth.token;
        if(token) {
            headers.set("Content-Type", "application/json");
            headers.set("Accept", "*/*");
            headers.set("Authorization", `JWT ${token}`);//si no funciona probar authorization
        }
        return headers;
    }

})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401 || result?.error?.status === 403){
      console.log('sending refresh token');
      const refresh = api.getState().auth.refresh
      // send refresh token to get new acces token
      const refreshResult: any = await baseQuery({url:'token/refresh/', method:'POST', body: {
          "refresh": refresh
      }}, api, extraOptions)
      if (refreshResult?.data){
          const user = api.getState().auth.user;
          // store the new token
          api.dispatch(setCredentials({...refreshResult.data, user}))
          //retry the original query with new access Token
          result = await baseQuery(args, api, extraOptions);
      }
      else{
          api.dispatch(logOut(api.getState().auth));
      }

  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})