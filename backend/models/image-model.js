// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const Movie = new Schema(
//     {
//         name: { type: String, required: true },
//         time: { type: [String], required: true },
//         rating: { type: Number, required: true },
//     },
//     { timestamps: true },
// )

// module.exports = mongoose.model('movies', Movie)

var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Image', imageSchema);