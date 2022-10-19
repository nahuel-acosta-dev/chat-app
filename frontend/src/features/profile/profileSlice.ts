import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Profile, User, ProfileUser} from '../../types/profile';

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
      clearProfile: (state) => {
          state.id = null;
          state.user = null;
          state.photo = null;
      }
    },
  })

  export const {setProfile, clearProfile} = profile.actions;

  export default profile.reducer;
  

  export const selectCurrentProfile = (state: {profile: ProfileUser}): ProfileUser => state.profile; 