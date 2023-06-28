const express = require('express');
const router = express.Router();
const { Productdetails } = require('../models');

router.get("/product", async(req, res) => {
  const listDetails = await Productdetails.findAll();
  res.json(listDetails);
});

router.post("/product", async(req, res)=>{
  const post = req.body;
  await Productdetails.create(post);
  res.json(post);
});

module.exports = router;