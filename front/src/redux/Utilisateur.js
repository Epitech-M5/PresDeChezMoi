import { createSlice} from "@reduxjs/toolkit";

export const utilisateurSlice = createSlice({
    name: "utilisteur",
    // STATES
    initialState: {
        token:"",
        isLogin: false,
        pseudo:"",
        score:0,
        pathImage:"path/image",
        idRole:0,
        refreshToken:"",
        idutilisateur:0
    },
      reducers: {
        isLogin:(state, action)=>{
            state.isLogin = true;
        },
        fetchToken:(state,action)=>{
            state.token = action.payload;
        },
        fetchRefreshToken:(state,action)=> {
            state.refreshToken = action.payload;
        },
        fetchUtilisateurData:(state,action)=> {
            const {pseudo, idutilisateur, idRole} = action.payload
            state.pseudo = pseudo
            state.idutilisateur = idutilisateur
            state.idRole = idRole
            // score, pathImage
        }

      }
})


// En définissant mes reducer (plus haut) redux m'a crée mes action (creator action) ! ! !
export const {isLogin,fetchUtilisateurData,fetchToken,fetchRefreshToken} = utilisateurSlice.actions;



