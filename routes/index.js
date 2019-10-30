var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Product = require('./models/product')
mongoose.connect("mongodb://localhost:27017/test");

router.get("/", async (req, res, next) => {
  const products = await Product.find()
  res.json(products)
});

router.post("/", async (req,res) => {
  const body = req.body
  const product = new Product(body)
  await product.save()
  res.status(201).end()
})

router.put('/:id', async (req, res) => {
  const payload = req.body
  const { id } = req.params

  await Product.findByIdAndUpdate(id, { $set: payload })
  res.status(201).end()
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndDelete(id)
  res.status(201).end()
})

module.exports = router;
