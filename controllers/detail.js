const User = require("../models/user");

const detailHandler = {
	getDetails : (req,res,next) => {
		User.findOne({_id:req.user.userId}).then(result => {
			res.status(200).json({
				numberofref:result.numberofrefs,
				credits: result.credits,
				refcode: result.code,
				referrals : result.referrals
			})
		})
	}
}

module.exports = detailHandler;