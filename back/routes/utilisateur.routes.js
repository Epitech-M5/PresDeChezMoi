module.exports = app => {
  const utilisateur = require("../controllers/utilisateur.controller.js");
  const { verifySignUp } = require("../middleware");
  const { authJwt } = require("../middleware");
  var router = require("express").Router();

  // Initialisation du header
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Inscription d'un utilisateur
  router.post("/auth/signup",
    // Check si le mail existe ET si l'utilisateur à un rôle
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    utilisateur.signup
  );

  // Connexion d'un utilisateur pour obtenir un token  
  router.post("/auth/signin", utilisateur.signin);

  // Refresh token: permet de récup un token valide lorsque l'ancien ne l'est plus
  router.post("/auth/refreshtoken", utilisateur.refreshToken);

  // Liste de tout les utilisateurs
  router.get("/",
    [authJwt.verifyToken],
    utilisateur.find_all
  );

  // Modification d'un utilisateur en utilisant l'id utilisateur depuis le token ou bien par choix de l'administrateur
  router.put("/:id", [authJwt.verifyToken], utilisateur.update);

  // Suppression d'un utilisateur grâce à l'id utilisateur depuis le token ou bien par choix de l'administrateur
  router.delete("/:id", utilisateur.delete);

  // Base de la route API pour l'utilisateur 
  app.use('/api/user', router);
};
