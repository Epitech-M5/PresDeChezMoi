module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controller.js");
    const { verifySignUp } = require("../middleware");
    const { authJwt } = require("../middleware");
    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      
    router.post("/auth/signup", 
                  [
                    verifySignUp.checkDuplicateUsernameOrEmail,
                    verifySignUp.checkRolesExisted
                  ],
                  utilisateur.signup
                );
    router.post("/auth/signin", utilisateur.signin);

    router.post("/auth/refreshtoken", utilisateur.refreshToken);
    
    router.get("/", 
                [authJwt.verifyToken, authJwt.isModerator],
                utilisateur.find_all
              );

    router.put("/:id", utilisateur.update);

    router.delete("/:id", utilisateur.delete);

    app.use('/api/user', router);
};
//x-access-token