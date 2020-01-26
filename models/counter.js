const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
	counter:{type:Number,default:0},
	finder:{type:String}
});

module.exports = mongoose.model("Counters",CounterSchema);