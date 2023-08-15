const mongoose = require("mongoose");
const { model, Schema } = mongoose;

// Establecemos el modelo de la nota con el Schema y el Model de mongoose. Lo mismo con el modelo del USER
// Mongoose nos provee de un Schema para establecer las propiedades y los valores y luego definirlo como modelo que utilizaremos 
// en nuestra aplicacion

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

// toJSON se utiliza para configurar cómo se serializan los documentos del modelo 
//en formato JSON cuando se devuelven como respuestas en las solicitudes.
notesSchema.set("toJSON", {
  transform: (document, returnedObject) => { // transforma el documento de mongo y lo devuelve
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v; // le quitamos la propiedad __v porque no la utilizaremos.
  },
});

const Notes = model("Note", notesSchema); // establecemos el modelo.

module.exports = Notes;