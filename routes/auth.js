const express = require("express");
const router = express.Router();
const userAuthHandler = require("../controllers/userAuth");
const checkAuth = require("../middleware/checkauth");

router.post('/login',userAuthHandler.login);
router.post('/signup',userAuthHandler.signup);
router.get('/getId',checkAuth,userAuthHandler.getId);

module.exports = router;
