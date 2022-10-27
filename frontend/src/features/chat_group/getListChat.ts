import { apiSlice } from "../../app/api/apiSlice";
export const getListChatApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getListChat: builder.query({
            query: () => 'chat',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetListChatQuery
} = getListChatApiSlice;