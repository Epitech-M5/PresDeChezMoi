module.exports = app => {
    const Ticket = require("../controllers/ticket.controller.js");

    var router = require("express").Router();

    router.post("/", Ticket.create);

    router.get("/", Ticket.find_all);

    router.get("/:id", Ticket.find_one);

    router.get("/status/:id", Ticket.find_all_by_status);

    router.get("/byDate/:order", Ticket.find_all_by_date);

    router.put("/:id", Ticket.update);

    router.delete("/:id", Ticket.delete);

    app.use('/api/ticket', router);
};