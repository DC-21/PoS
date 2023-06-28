const express = require('express');
const router = express.Router();
const { Accountdetails } = require('../models');

router.get("/", async(req, res) => {
  const listDetails = await Accountdetails.findAll();
  res.json(listDetails);
});

router.post("/", async(req, res)=>{
  const post = req.body;
  await Accountdetails.create(post);
  res.json(post);
});

module.exports = router;