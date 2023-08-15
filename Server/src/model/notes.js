const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const notesSchema = new Schema({
    title: String,
    content: String,
    image: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: { type: Date, default: Date.now }
})

notesSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
  },
});

const Notes = model("Note", notesSchema);

module.exports = Notes;