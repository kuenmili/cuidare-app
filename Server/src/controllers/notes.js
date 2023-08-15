const  Notes  = require("../model/notes");

//IMPORTAMOS EL MODELO.

// OBTENEMOS POR PARAMETRO LOS DATOS DE LA NOTA Y LLAMAMOS AL 
//METODO NEW DEL MODELO PASANDOLE ESOS DATOS PARA CREAR UNA NUEVA NOTA.
const createNote = async (title, content, image) => {

    const note = new Notes({
        title,
        content,
        image
    }); 
    
    await note.save(); // ESPERAMOS A GUARDAR LA NOTA.
    return note;
};

//UTILIZAMOS EL METODO findByIdAndUpdate de Mongo para actualizar una nota con los datos recibidos.
const modifyNote = async ( id, title, content, image ) => {
    const note = await Notes.findByIdAndUpdate(
        id,
        {
            title,
            content,
            image
        }
    );
    return note;
};

//UTILIZAMOS EL METODO PARA BUSCAR UN DOCUMENTO Y ELIMINARLO SEGUN SU ID.
const deleteNote = async (id) => {
    const note = await Notes.findByIdAndDelete(id);
    return "Note deleted from data base";
};

// LLAMAMOS AL METODO FIND PARA QUE NOS TRAIGA TODAS LAS NOTAS DE LA BASE DE DATOS.
const getNotes = async () => {
    const notes = await Notes.find().populate("author");
    return notes;
};


module.exports = {
    createNote,
    modifyNote,
    deleteNote,
    getNotes
}
