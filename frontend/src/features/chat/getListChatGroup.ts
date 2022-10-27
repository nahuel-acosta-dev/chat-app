import { apiSlice } from "../../app/api/apiSlice";
export const getListChatGroupApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getListChatGroup: builder.query({
            query: () => 'chat_group',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetListChatGroupQuery
} = getListChatGroupApiSlice;