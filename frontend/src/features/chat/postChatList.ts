import { apiSlice } from "../../app/api/apiSlice";
export const postChatListApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        postChatList: builder.mutation({
            query: (credentials) => {
                return ({
                url: `chat/chat_list/`,
                method: 'POST',
                body:  { ...credentials },
            })}
        }),
    })
})

export const {
    usePostChatListMutation
} = postChatListApiSlice;