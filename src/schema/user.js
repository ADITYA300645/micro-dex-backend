const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    name: String,
    avatar_url: String,
    ghInfo:{},
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = userSchema