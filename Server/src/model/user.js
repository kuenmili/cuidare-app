const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const userSchema = new Schema({
    dni: {
        type: String,
        required: true
    },
})

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = model("User", userSchema);

module.exports = User;