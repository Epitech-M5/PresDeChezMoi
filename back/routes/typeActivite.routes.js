module.exports = app => {
    const typeActivite = require("../controllers/typeActivite.controller.js");

    var router = require("express").Router();

    router.post("/", typeActivite.create);

    router.get("/", typeActivite.find_all);

    router.get("/:id", typeActivite.find_one);

    router.put("/:id", typeActivite.update);

    router.delete("/:id", typeActivite.delete);

    app.use('/api/typeActivite', router);
};