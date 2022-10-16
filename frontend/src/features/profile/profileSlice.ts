import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Profile} from '../../types/profile';

const profile = createSlice({
    name: 'profile',
    initialState: { id: null, user: null, photo: null},
    reducers: {
      setProfile: (state, action: PayloadAction<Profile>) => {
        const {id, user, photo} = action.payload;
        state.id = id; // mutate the state all you want with immer
        state.user = user; //
        state.photo = photo;
      },
    },
  })

  export const {setProfile} = profile.actions;

  export default profile.reducer;
  

  export const selectCurrentToken = (state: {profile: Profile}): Profile => {
    console.log(state)
    return state.profile; }