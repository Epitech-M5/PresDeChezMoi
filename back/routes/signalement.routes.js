module.exports = app => {
    const signalement = require("../controllers/signalement.controller.js");

    var router = require("express").Router();

    router.post("/", signalement.create);

    router.get("/", signalement.find_all);

    router.get("/:id", signalement.find_one);

    router.put("/:id", signalement.update);

    router.delete("/:id", signalement.delete);

    app.use('/api/signalement', router);
};