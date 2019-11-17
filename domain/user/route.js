var express = require('express')
var router = express.Router()

router.get('/', async (req, res) => {
  const { UserModel } = req.models
  let users = await UserModel.find({ status: 'available' }, { __v: 0 })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const { UserModel } = req.models
  let _id = req.params.id
  let user = await UserModel.findOne({ _id, status: 'available' }, { __v: 0 })
  res.json(user)
})

router.post('/add', async (req, res) => {
  const { UserModel } = req.models
  let { username, password } = req.body

  if (!username || !password) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'data must not be null'
    })
    return null
  }

  const newUser = new UserModel()
  newUser.username = username
  newUser.password = password
  newUser.createdTime = new Date()
  newUser.updatedTime = new Date()
  newUser.status = 'available'
  const records = await newUser.save()
  res.json(records)
})

router.post('/edit/:id', async (req, res) => {
  const { UserModel } = req.models
  let { username, password } = req.body
  let _id = req.params.id

  const user = await UserModel.findOne({ _id }).catch(() => null)
  if (user === null) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'id is not found.'
    })
    return null
  }

  let flag = false
  if (username) {
    user.username = username
    flag = true
  }
  if (password) {
    user.password = password
    flag = true
  }
  if (flag) {
    user.updatedTime = new Date()
    const records = await user.save()
    res.json(records)
    return null
  }
  res.json(user)
})

router.post('/delete/:id', async (req, res) => {
  const { UserModel } = req.models
  let _id = req.params.id

  const user = await UserModel.findOne({ _id }).catch(() => null)
  if (user === null) {
    res.status(403)
    res.json({
      status: 'error',
      message: 'id is not found.'
    })
    return null
  }

  user.updatedTime = new Date()
  user.status = 'removed'
  const records = await user.save()
  res.json(records)
})

module.exports = router