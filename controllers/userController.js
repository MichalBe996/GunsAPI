const User = require("../models/userModel")
const APIFeatures = require("../utils/apiFeatures")






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
exports.getUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "This route is not yet implemented"
    })
}
exports.createUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "This route is not yet implemented"
    })
}
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          //// below parameter returns new document after the update is applied
          new: true,
          // runValidators checks e.g. whether parameters are of desired type
          runValidators: true
        })
        res.status(200).json({
          status: "Success", 
          data: {
            user: user
          }
        })
      } catch (err) {
        res.status(404).json({
          status: "Fail",
          message: err
        })
      }
}
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "This route is not yet implemented"
    })
}