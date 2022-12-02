import { fileApiSlice } from "../../app/api/fileApiSlice";
export const updateProfileMeApiSlice = fileApiSlice.injectEndpoints({
    endpoints: builder => ({
        updateProfileMe: builder.mutation({
            query: ({data, id}) => {
                return({
                url: `profile/${id}/`,
                method: 'PATCH',
                body: data
            })}
        })
    })
})

export const {
    useUpdateProfileMeMutation
} = updateProfileMeApiSlice;