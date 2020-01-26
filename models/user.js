const mongoose = require('mongoose');
var moment = require('moment');

const UserSchema = mongoose.Schema({
	username:{type:String,required:true},
	password:{type:String,required:true},
	email:{type:String,required:true},
	credits:{type:Number,default:0,required:true},
	referrals : [{
		name:{type:String,required:true},
		referedOn:{type:String,default:moment().format('LLL')}
	}],
	numberofrefs:{type:Number,default:0},
	code:{type:String,required:true}
});

module.exports = mongoose.model("Users",UserSchema);