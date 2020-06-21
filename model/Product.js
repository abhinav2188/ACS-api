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
    },
    DOI: {
      type:String,
    },
    onDisplay:{
      type:Boolean,
      required:true,
      default:true
    },
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required:true
    }

  });
  ProductSchema.index({name:1,ISN:1},{unique:true})
  
  module.exports= mongoose.model("Product",ProductSchema)