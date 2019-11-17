const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost/pos_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

