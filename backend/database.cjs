const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");

const db = new sqlite3.Database("Data/database.sqlite3");

module.exports = { db, jwt };
