module.exports = app => {
    const chat = require("../controllers/chat.controller.js");
    const { verifySignUp } = require("../middleware");
    const { authJwt } = require("../middleware");

    var router = require("express").Router();

    router.post("/", [authJwt.verifyToken], chat.create);

    router.get("/", chat.find_all);

    router.get("/:id", chat.find_one);
    
    router.get("/user/:idUtilisateur", chat.find_by_user);

    router.put("/:id", chat.update);

    router.delete("/:id", chat.delete);

    app.use('/api/chat', router);
};