const User = require("../models/user");
const Counter = require("../models/counter");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/database");

const userAuthHandler = {
	signup: (req, res, next) => {
    const {username,email,password} = req.body
    User.findOne({email}).then(result => {
      console.log(result);
      let newuser;
      if (!result) {
        User.findOne({code:req.body.refcode}).then(resp => {
            if(resp)
            {
                bcrypt.hash(req.body.password, 10).then(hash => {
           Counter.findOne({finder:"counter"}).then(counter => {
             let code = req.body.username.substring(0,3)+counter.counter+req.body.email.substring(0,2);
             newUser = new User({
                  username: req.body.username,
                  email: req.body.email,
                  password: hash,
                  code:code
                })
             let num = counter.counter+1;
             console.log(num)
             

             newUser.save().then(result => {
                  Counter.updateOne({finder:"counter"},{counter:num,finder:'counter'}).then(res=>{
                   console.log("sxcgh")
                   })
                  User.updateOne({code:req.body.refcode},{$push : {
                    referrals: [{
                      name:req.body.username,

                    }]
                  }}).then(result => {
                    User.findOne({code:req.body.refcode}).then(user => {
                      let num = user.numberofrefs+1;
                      if(user.numberofrefs>=9)
                      {  
                        let credits = user.credits+100;
                        User.updateOne({code:req.body.refcode},{numberofrefs:num,credits:credits}).then(result => {
                          console.log(result);
                        })
                      }
                      else
                        User.updateOne({code:req.body.refcode},{numberofrefs:num}).then(result => {
                          console.log(result);
                        })
                    })
                    // User.updateOne({code:req.body.refcode},{numberofrefs:})
                    console.log(result)
                  })
                  res.status(201).json({
                    message: "User signup successfully"
                  });
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).json({
                    message: "User signup failed"
                  });
                });
               })
        }).catch(err =>{
          console.log(err);
          res.status(400).json({
            message:"Unknown error occured"
          });
        });

            }
            else{
                res.status(401)
                    .json({ message: "Invalid referal code"});
            }
        })
              } else {
        res.status(401)
          .json({ message: "User with this email id and name already exists" });
      }
    });
  },
  login: (req, res) => {
    let fetchedUser;
    return User.findOne({ email: req.body.email })
      .then(user => {
        console.log(req.body);
        if (!user) {
          console.log("what")
          return res.status(401).json({ message: "Invalid email or password" });
        } else {
          console.log("hello");
          fetchedUser = user;
          console.log(user.password);
          return bcrypt.compare(req.body.password, user.password);
        }
      })
      .then(result => {
        console.log(result);
        if (!result) {
          return res.status(201).json({ message: "Wrong Credentials" });
        } else {
          const token = jwt.sign(
            {
              username: fetchedUser.username,
              userId: fetchedUser._id 
            },
            config.JWT_KEY,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            token: token,
            expiresIn: "1h",
            userId: fetchedUser._id,
            user:fetchedUser,
            message:"Logged in successfully"
          });
          console.log(token);
        }
      })
      .catch(err => {
        return res.status(401).json({
          message: "Invalid details"
        });
      });
  },
  getId:(req,res) => {
    return res.status(200).json({
      name: req.user.userId
    });
  }
}

module.exports = userAuthHandler;
