module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controller.js");

    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      
    router.post("/", utilisateur.create);

    router.get("/", utilisateur.find_all);

    router.get("/:id", utilisateur.find_one);

    router.put("/:id", utilisateur.update);

    router.delete("/:id", utilisateur.delete);

    app.use('/api/user', router);
};