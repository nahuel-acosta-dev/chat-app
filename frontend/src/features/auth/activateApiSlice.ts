import { apiSlice } from "../../app/api/apiSlice";

export const activateApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        activate: builder.mutation({
            query: credentials => ({
                url: 'auth/users/activation/',
                method: 'POST',
                body: {...credentials }
            })
        }),
    })
})

export const {
    useActivateMutation
} = activateApiSlice;