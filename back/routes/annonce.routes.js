module.exports = app => {
    const annonce = require("../controllers/annonce.controller.js");

    var router = require("express").Router();

    router.post("/", annonce.create);

    router.get("/", annonce.find_all);

    router.get("/:id", annonce.find_one);

    router.put("/:id", annonce.update);

    router.delete("/:id", annonce.delete);

    app.use('/api/annonce', router);
};