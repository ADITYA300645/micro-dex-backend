const express = require("express")
const { User } = require("../../models/models")
const router = express.Router()

router.get("/:id",async (req,res)=>{
    var user = User.findOne({"name":req.params.id})
    user.ghInfo.repos_url

})

module.exports = router;