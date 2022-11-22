import { apiSlice } from "../../app/api/apiSlice";

export const resetPasswordApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        resetPassword: builder.mutation({
            query: credentials => ({
                url: 'auth/users/reset_password/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useResetPasswordMutation
} = resetPasswordApiSlice;