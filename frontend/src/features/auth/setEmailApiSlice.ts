import { apiSlice } from "../../app/api/apiSlice";

export const setEmailApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        setEmail: builder.mutation({
            query: credentials => ({
                url: 'auth/users/set_email/',
                method: 'POST',
                body: {...credentials }
            })
        }),
    })
})

export const {
    useSetEmailMutation
} = setEmailApiSlice;