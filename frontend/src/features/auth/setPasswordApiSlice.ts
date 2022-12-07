import { apiSlice } from "../../app/api/apiSlice";

export const setPasswordApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        setPassword: builder.mutation({
            query: credentials => ({
                url: 'auth/users/set_password/',
                method: 'POST',
                body: {...credentials }
            })
        }),
    })
})

export const {
    useSetPasswordMutation
} = setPasswordApiSlice;