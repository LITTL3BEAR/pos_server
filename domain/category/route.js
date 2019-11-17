var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
  const { CategoryModel } = req.models
  let categorys = await CategoryModel.find({ status: 'available' }, { __v: 0 })
  res.json(categorys)
})

router.get('/:id', async (req, res) => {
  const { CategoryModel } = req.models
  let _id = req.params.id
  let category = await CategoryModel.findOne({ _id, status: 'available' }, { __v: 0 })
  res.json(category)
})

router.post('/add', async (req, res) => {
  const { CategoryModel } = req.models
  let { name } = req.body

  if (!name) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'data must not be null'
    })
    return null
  }

  const newCategory = new CategoryModel()
  newCategory.name = name
  newCategory.createdTime = new Date()
  newCategory.updatedTime = new Date()
  newCategory.status = 'available'
  const records = await newCategory.save()
  res.json(records)
})

router.post('/edit/:id', async (req, res) => {
  const { CategoryModel } = req.models
  let { name } = req.body
  let _id = req.params.id

  const category = await CategoryModel.findOne({ _id }).catch(() => null)
  if (category === null) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'id is not found.'
    })
    return null
  }

  let flag = false
  if (name) {
    category.name = name
    flag = true
  }
  if (flag) {
    category.updatedTime = new Date()
    const records = await category.save()
    res.json(records)
    return null
  }
  res.json(category)
})

router.post('/delete/:id', async (req, res) => {
  const { CategoryModel } = req.models
  let _id = req.params.id

  const category = await CategoryModel.findOne({ _id }).catch(() => null)
  if (category === null) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'id is not found.'
    })
    return null
  }

  category.updatedTime = new Date()
  category.status = 'removed'
  const records = await category.save()
  res.json(records)
})

module.exports = router