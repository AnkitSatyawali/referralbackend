const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkauth");
const detailHandler = require("../controllers/detail");
router.get('/userdetail',checkAuth,detailHandler.getDetails);

module.exports = router;