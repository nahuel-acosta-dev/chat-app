// Need to use the React-specific entry point to import createApi
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut} from '../../features/auth/authSlice';
import {AppState} from '../../types/store';
// Define a service using a base URL and expected endpoints
export const baseQuery = fetchBaseQuery({ 
  baseUrl: `${process.env.REACT_APP_API_URL}`,
    credentials: 'include',
    'prepareHeaders': (headers, {getState}: any): Headers => {
        const token: string = getState().auth.token;
        if(token) {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set("Authorization", `JWT ${token}`);//si no funciona probar authorization
        }
        return headers;
    }

})



const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401 || result?.error?.status === 403){
      console.log('sending refresh token');
      const appState = api.getState() as AppState;
      const refresh = appState.auth.refresh;
      // send refresh token to get new acces token
      const refreshResult = await baseQuery({url:'auth/jwt/refresh/', method:'POST', body: {
          "refresh": refresh
      }}, api, extraOptions)
      if (refreshResult?.data){
        /*
          const user = api.getState().auth.user;
          // store the new token
          api.dispatch(setCredentials({...refreshResult.data, user}))
          //retry the original query with new access Token*/
          result = await baseQuery(args, api, extraOptions);
      }
      else{
          api.dispatch(logOut());
      }

  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({})
})