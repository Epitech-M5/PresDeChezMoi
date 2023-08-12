import { createSlice } from "@reduxjs/toolkit";

export const listUsersSlice = createSlice({
  name: "listUsers",
  // STATES
  initialState: {
    rooms: [],
    pseudo: "",
    photoProfil: "",
  },
  reducers: {
    fetchConv: (state, action) => {
      state.rooms = action.payload;
    },
    fetchHeader: (state, action) => {
      state.pseudo = action.payload.pseudo;
      state.photoProfil= action.payload.photoProfil;
    },
  },
});

// En définissant mes reducer (plus haut) redux m'a crée mes action (creator action) ! ! !
export const { fetchConv, fetchHeader } = listUsersSlice.actions;
