const express = require("express");
const { User } = require("../../models/models");
const router = express.Router();
require("dotenv").config();

router.get("/getAccessToken", async (req, res) => {
    var code = req.query.code;
    const params =
        "?client_id=" +
        process.env.clientId +
        "&client_secret=" +
        process.env.clientSecreat +
        "&code=" +
        code;

    const response = await fetch(
        "https://github.com/login/oauth/access_token" + params,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        }
    );
    const data = await response.json();
    var userData = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${data["access_token"]}`,
        },
    });
    var userInfo = await userData.json()
    console.log(userInfo)
    var user = await User.findOne({ userName: userInfo["login"] });

    if(user){
        user.tokens.push({"token":data["access_token"]})
        await user.save()
        res.json({"access_token":data["access_token"],"userId":userInfo["login"],userInfo});
        return
    }else{
        user = new User({
            userName:userInfo["login"],
            name:userInfo["name"],
            avatar_url:userInfo["avatar_url"],
            ghInfo:userInfo,
            tokens:[{"token":data["access_token"]}]
        })
        var userRes = await user.save()
        data["userId"] = userInfo["login"]
        res.json({"access_token":data["access_token"],"userId":userInfo["login"],userInfo});
        return
    }
});

router.get("/getuserData", async (req, res) => {
    console.log("Request Made with", req.get("Authorization"));
    var response = await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            Authorization: req.get("Authorization"),
        },
    });
    var data = await response.json();
    res.json(data);
});

module.exports = router;
