const express = require('express');
const router = express.Router();
const { Userdetails } = require('../models');

router.get("/", async(req, res) => {
  const listDetails = await Userdetails.findAll();
  res.json(listDetails);
});

router.post("/", async(req, res)=>{
  const post = req.body;
  await Userdetails.create(post);
  res.json(post);
});

module.exports = router;
