const express = require('express');
const router = express.Router();
const { Productdetails } = require('../models');

router.get("/", async(req, res) => {
  const listDetails = await Productdetails.findAll();
  res.json(listDetails);
});

router.post("/", async(req, res)=>{
  const post = req.body;
  await Productdetails.create(post);
  res.json(post);
});

module.exports = router;