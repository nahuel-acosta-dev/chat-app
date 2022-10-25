import { apiSlice } from "../../app/api/apiSlice";

export const authGoogleSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        google: builder.mutation({
            query: details => {
                const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
                return ({
                url: `auth/o/google-oauth2/?${formBody}`,
                method: 'POST'
            })
        }
        }),
    })
})

export const {
    useGoogleMutation
} = authGoogleSlice;