const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
var GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');
var IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');

const db = new sqlite3.Database("database.sqlite3");
var ipgeolocationApi = new IPGeolocationAPI("e44e691dc8664b7f9be1146e1cc9e2cb", false); 
var geolocationParams = new GeolocationParams();

module.exports = { db, jwt, geolocationParams, ipgeolocationApi };
