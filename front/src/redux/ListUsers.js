import { createSlice } from "@reduxjs/toolkit";

export const listUsersSlice = createSlice({
    name: "listUsers",
    // STATES
    initialState: {
        rooms: []
    },
      reducers: {
        fetchMembers:(state,action)=>{
            state.rooms = action.payload;
        }
    }
})


// En définissant mes reducer (plus haut) redux m'a crée mes action (creator action) ! ! !
export const {fetchMembers} = listUsersSlice.actions;