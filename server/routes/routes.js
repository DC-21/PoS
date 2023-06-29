const router = require("express").Router();
const Use = require('../models/Use');
router.post('/use', Use);


module.exports= router;