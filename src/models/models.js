const { default: mongoose } = require("mongoose")
const userSchema = require("../schema/user")
const projectSchema = require("../schema/project")

const User = new mongoose.model("User",userSchema)
const Project = new mongoose.model("Project",projectSchema)

module.exports = {User}