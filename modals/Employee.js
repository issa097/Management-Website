const mongoose = require('mongoose');

const Schema =mongoose.Schema

const userschema = new Schema({
  name: String,
  email: String,
  password: String,
  is_deleted: {
      type: Boolean,
      default: false,
  },
});

  const user =mongoose.model('user',userschema)

  module.exports=user