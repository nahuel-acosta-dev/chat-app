import { apiSlice } from "../../app/api/apiSlice";

export const resendEmailActivationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        resendEmailActivation: builder.mutation({
            query: credentials => ({
                url: 'auth/users/resend_activation/',
                method: 'POST',
                body: {...credentials }
            })
        }),
    })
})

export const {
    useResendEmailActivationMutation
} = resendEmailActivationApiSlice;