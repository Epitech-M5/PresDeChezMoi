module.exports = app => {
    const commentaireAdmin = require("../controllers/commentaireAdmin.controller.js");

    var router = require("express").Router();

    router.post("/", commentaireAdmin.create);

    router.get("/", commentaireAdmin.find_all);

    router.get("/:id", commentaireAdmin.find_one);

    router.put("/:id", commentaireAdmin.update);

    router.delete("/:id", commentaireAdmin.delete);

    app.use('/api/commentaireAdmin', router);
};