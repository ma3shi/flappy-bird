"use strict";
const express = require("express");
const Result = require("../models/result");
const router = express.Router();

router.post("/", (req, res, next) => {
  console.log(req.body);
  Result.create({
    username: req.body.username.slice(0, 255) || "名前未設定",
    score: req.body.score,
  }).then(res.redirect("/"));
});

module.exports = router;
