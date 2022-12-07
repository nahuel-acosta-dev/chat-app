import { apiSlice } from "../../app/api/apiSlice";

export const resetEmailConfirmApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        resetEmailConfirm: builder.mutation({
            query: credentials => ({
                url: 'auth/users/reset_email_confirm/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useResetEmailConfirmMutation
} = resetEmailConfirmApiSlice;