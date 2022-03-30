const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.status(200).send({
    Title: "Node API Start 🚀",
    VersionNode: "14.17.6",
  });
});

module.exports = router;