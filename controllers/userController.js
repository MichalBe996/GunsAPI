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
exports.updateUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "This route is not yet implemented"
    })
}
exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "This route is not yet implemented"
    })
}