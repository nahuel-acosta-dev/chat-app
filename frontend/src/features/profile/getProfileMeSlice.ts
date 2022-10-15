import { apiSlice } from "../../app/api/apiSlice";
export const getProfileMeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfileMe: builder.query({
            query: () => 'profile/me',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetProfileMeQuery
} = getProfileMeApiSlice;