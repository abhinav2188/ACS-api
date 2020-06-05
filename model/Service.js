const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    ISN: {
      type: String,
      required: true,
    },
    productImageUrl:{
      type:String
    }
  });
  ProductSchema.index({name:1,ISN:1},{unique:true})
  
  //@schema Service
  const ServiceSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    headline: {
      type: String,
      trim: true,
      required: true,
    },
    serviceLogo: {
      type: String,
    },
    products: [ProductSchema]
  });
  
  module.exports = mongoose.model("service", ServiceSchema);