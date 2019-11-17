const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

require('./mongo')
const user = require('./domain/user')
const product = require('./domain/product')
const category = require('./domain/category')

app.use(bodyParser.json())
app.use(cors())

app.use(function (req, res, next) {
  req.models = {
    ProductModel: product.model,
    UserModel: user.model,
    CategoryModel: category.model
  }
  next()
})

app.use('/user', user.route)
app.use('/product', product.route)
app.use('/category', category.route)

app.get('/checkhealth', (_req, res) => {
  res.send('OK')
  res.end()
})

app.listen(3000, () => {
  console.log('Running server on 3000 port')
})