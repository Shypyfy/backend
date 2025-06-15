const user = require("../models/user-model")

const saveuser = async(username)=>{
    return await user.create({username});
}

const getallusers = async()=>{
    return await user.find({});
}

module.exports = {
    saveuser,
    getallusers
}