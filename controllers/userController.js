const User = require("../models/userModel")
const APIFeatures = require("../utils/apiFeatures")



const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el=>{
    if(allowedFields.includes(el)) 
      newObj[el] = obj[el]
  })
  return newObj;
}






exports.getAllUsers = async (req, res) => {
    
    try{
        const allUsers = await User.find()
        res.status(200).json({
            status: "Success",
            results: allUsers.length,
            data: {
              allUsers
            }
          })
    }
    
     catch (err){
      res.status(404).json({
        status: "Fail",
        message: err
      })
    }
}
exports.getUser = async(req, res) => {
  try {
    const singleUser = await User.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        singleUser
      }
    })
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err
    })
  }
}
exports.createUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "This route is not yet implemented"
    })
}
exports.updateMe = async (req, res, next) => {

  1// Create error if user POSTs password data
  if(req.body.password || req.body.passwordConfirm){
    res.status(400).json({
      status: "Failed",
      message: "Bad request, you can't change the password that way! Please use /updateMyPassword"
    })
  }
    try {
        const filteredBody = filterObj(req.body, "name", "email", "cartArray")
        const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
          new: true,
          runValidators: true
        })
        res.status(200).json({
          status: "Success", 
          data: {
            user: updatedUser
          }
        })
      } catch (err) {
        res.status(404).json({
          status: "Fail",
          message: err
        })
      }
}
exports.deleteMe = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user.id)
      
        
        res.status(200).json({
          status: "Success",
          message: "User deleted successfully!",
         

        })
      
      
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error
      })
    }
}