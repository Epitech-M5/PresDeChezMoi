import { utilisateurSlice } from "./Utilisateur";
import { listUsersSlice } from "./ListUsers";
import { configureStore } from "@reduxjs/toolkit";

// Création du store qui va stocker toute les slices
export const store = configureStore({
    reducer: {
        utilisateur: utilisateurSlice.reducer,
        listUsers: listUsersSlice.reducer,
    },
})