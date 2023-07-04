module.exports = app => {
    const room = require("../controllers/room.controller.js");

    var router = require("express").Router();

    router.post("/", room.create);

    router.get("/", room.find_all);

    router.get("/:id", room.find_one);

    router.put("/:id", room.update);

    router.delete("/:id", room.delete);

    app.use('/api/room', router);
};