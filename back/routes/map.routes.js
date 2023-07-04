module.exports = app => {
    const map = require("../controllers/map.controller.js");

    var router = require("express").Router();

    router.post("/", map.create);

    router.get("/", map.find_all);

    router.get("/:id", map.find_one);

    router.put("/:id", map.update);

    router.delete("/:id", map.delete);

    app.use('/api/map', router);
};