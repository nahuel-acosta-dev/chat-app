import { apiSlice } from "../../app/api/apiSlice";

export const resendEmailApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        resendEmail: builder.mutation({
            query: credentials => ({
                url: 'auth/users/resend_activation/',
                method: 'POST',
                body: {...credentials }
            })
        }),
    })
})

export const {
    useResendEmailMutation
} = resendEmailApiSlice;