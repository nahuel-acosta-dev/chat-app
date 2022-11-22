import { apiSlice } from "../../app/api/apiSlice";

export const resetPasswordConfirmApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        resetPasswordConfirm: builder.mutation({
            query: credentials => ({
                url: 'auth/users/reset_password_confirm/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useResetPasswordConfirmMutation
} = resetPasswordConfirmApiSlice;