const mongooes = require("mongoose")

const userSchema = new mongooes.Schema({
    name: String,
    email: String,
    password: String,
    gender:String
})

const userModel = mongooes.model("users", userSchema);

module.exports = userModel;