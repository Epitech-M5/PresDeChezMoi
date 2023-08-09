import { createSlice } from "@reduxjs/toolkit";

export const utilisateurSlice = createSlice({
    name: "utilisateur",
    // STATES
    initialState: {
        token: "",
        isLogin: false,
        pseudo: "",
        score: 0,
        pathImage: "",
        idRole: 0,
        idVille: 0,
        refreshToken: "",
        idutilisateur: 0
    },
    reducers: {
        isLogin: (state, action) => {
            state.isLogin = true;
        },
        fetchToken: (state, action) => {
            state.token = action.payload;
        },
        fetchRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        fetchUtilisateurData: (state, action) => {
            const { pseudo, idutilisateur, idRole, pathImage, idVille } = action.payload
            state.pseudo = pseudo
            state.idutilisateur = idutilisateur
            state.idRole = idRole
            state.idVille = idVille
            if (pathImage) {
                state.pathImage = pathImage
            }
            // score, pathImage
        }
    }
})


// En définissant mes reducer (plus haut) redux m'a crée mes action (creator action) ! ! !
export const { isLogin, fetchUtilisateurData, fetchToken, fetchRefreshToken } = utilisateurSlice.actions;