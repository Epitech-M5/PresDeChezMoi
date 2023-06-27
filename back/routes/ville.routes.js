module.exports = app => {
    const ville = require("../controllers/ville.controller.js");

    var router = require("express").Router();

    router.post("/", ville.create);

    router.get("/", ville.find_all);

    router.get("/:id", ville.find_one);

    router.put("/:id", ville.update);

    router.delete("/:id", ville.delete);

    app.use('/api/ville', router);
};