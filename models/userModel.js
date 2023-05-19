const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please add UserName"]
    },
    email: {
        type: String,
        require: [true, "Please add email address"],
        unique: [true, "Email already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);