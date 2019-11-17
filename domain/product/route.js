var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
  const { ProductModel } = req.models
  let products = await ProductModel.find({ status: 'available' }, { __v: 0 }).populate('category', 'name')
  res.json(products)
})

router.get('/:id', async (req, res) => {
  const { ProductModel } = req.models
  let _id = req.params.id
  let product = await ProductModel.findOne({ _id, status: 'available' }, { __v: 0 }).populate('category', 'name')
  res.json(product)
})

router.post('/add', async (req, res) => {
  const { ProductModel } = req.models
  let { name, image_url, price, amount, category } = req.body

  if (!name || !image_url || !price || !amount || !category) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'data must not be null'
    })
    return null
  }

  const newProduct = new ProductModel()
  newProduct.name = name
  newProduct.image_url = image_url
  newProduct.price = price
  newProduct.amount = amount
  newProduct.category = category
  newProduct.createdTime = new Date()
  newProduct.updatedTime = new Date()
  newProduct.status = 'available'
  const records = await newProduct.save()
  res.json(records)
})

router.post('/edit/:id', async (req, res) => {
  const { ProductModel } = req.models
  let { name, image_url, price, amount, category } = req.body
  let _id = req.params.id

  const product = await ProductModel.findOne({ _id }).catch(() => null)
  if (product === null) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'id is not found.'
    })
    return null
  }

  let flag = false
  if (name) {
    product.name = name
    flag = true
  }
  if (image_url) {
    product.image_url = image_url
    flag = true
  }
  if (price) {
    product.price = price
    flag = true
  }
  if (amount) {
    product.amount = amount
    flag = true
  }
  if (category) {
    product.category = category
    flag = true
  }
  if (flag) {
    product.updatedTime = new Date()
    const records = await product.save()
    res.json(records)
    return null
  }
  res.json(product)
})

router.post('/delete/:id', async (req, res) => {
  const { ProductModel } = req.models
  let _id = req.params.id

  const product = await ProductModel.findOne({ _id }).catch(() => null)
  if (product === null) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'id is not found.'
    })
    return null
  }

  product.updatedTime = new Date()
  product.status = 'removed'
  const records = await product.save()
  res.json(records)
})

module.exports = router