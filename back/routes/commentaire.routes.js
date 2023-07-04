module.exports = app => {
    const commentaire = require("../controllers/commentaire.controller.js");

    var router = require("express").Router();

    router.post("/", commentaire.create);

    router.get("/", commentaire.find_all);

    router.get("/:id", commentaire.find_one);

    router.put("/:id", commentaire.update);

    router.delete("/:id", commentaire.delete);

    app.use('/api/commentaire', router);
};