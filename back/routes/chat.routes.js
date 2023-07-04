module.exports = app => {
    const chat = require("../controllers/chat.controller.js");

    var router = require("express").Router();

    router.post("/", chat.create);

    router.get("/", chat.find_all);

    router.get("/:id", chat.find_one);

    router.put("/:id", chat.update);

    router.delete("/:id", chat.delete);

    app.use('/api/chat', router);
};