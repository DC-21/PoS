const express = require('express');
const router = express.Router();
const { Accountdetails } = require('../models');

router.get("/", async(req, res) => {
  const listDetails = await Accountdetails.findAll();
  res.json(listDetails);
});

router.post("/", async(req, res)=>{
  const past = req.body;
  await Accountdetails.create(past);
  res.json(past);
});

module.exports = router;