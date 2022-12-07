import { fileApiSlice } from "../../app/api/fileApiSlice";
export const patchUserApiSlice = fileApiSlice.injectEndpoints({
    endpoints: builder => ({
        patchUser: builder.mutation({
            query: ({first_name, id}) => {
                console.log(first_name);
                console.log(id);
                return({
                url: `auth/users/${id}/`,
                method: 'PATCH',
                body: {
                    'first_name': first_name
                    }
            })}
        })
    })
})

export const {
    usePatchUserMutation
} = patchUserApiSlice;