"use strict";
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres://postgres:postgres@db/flappy_bird");

module.exports = {
  sequelize,
  DataTypes,
};
