import {configureStore, createSlice} from "@reduxjs/toolkit";

const utilisateurSlice = createSlice({
    name: "utilisteur",
    // STATES
    initialState: {
        token:"",
        isLogin: false,
        pseudo:"",
        score:0,
        pathImage:"path/image"
    },
      reducers: {
        isLogin:(state, action)=>{
            state.isLogin = true;
            state.pseudo = action.payload
        },

      }
})


// En définissant mes reducer (plus haut) redux m'a crée mes action (creator action) ! ! !
export const {isLogin} = utilisateurSlice.actions;

// Création du store qui va stocker toute les slices
export const store = configureStore({
    reducer: {
        utilisateur: utilisateurSlice.reducer,
    },
})

