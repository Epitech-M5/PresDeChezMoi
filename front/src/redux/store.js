import { utilisateurSlice } from "./Utilisateur";
import {configureStore } from "@reduxjs/toolkit";

// Création du store qui va stocker toute les slices
export const store = configureStore({
    reducer: {
        utilisateur: utilisateurSlice.reducer,

    },
})