import { apiSlice } from "../../app/api/apiSlice";

export const resetEmailApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        resetEmail: builder.mutation({
            query: credentials => ({
                url: 'auth/users/reset_email/',
                method: 'POST',
                body: {...credentials }
            })
        }),
    })
})

export const {
    useResetEmailMutation
} = resetEmailApiSlice;