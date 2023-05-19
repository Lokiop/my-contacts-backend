const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add contact name"],
    },
    email: {
        type: String,
        require: [true, "Please add contact email"],
    },
    phone: {
        type: String,
        require: [true, "Please ad contact Phone number"],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Contact", contactSchema);