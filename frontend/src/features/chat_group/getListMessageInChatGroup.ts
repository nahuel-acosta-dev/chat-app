import { apiSlice } from "../../app/api/apiSlice";
export const getListMessageInChatGroupApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getListMessageInChatGroup: builder.query({
            query: (id) => `messages_in_group/${id}/`,
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetListMessageInChatGroupQuery
} = getListMessageInChatGroupApiSlice;