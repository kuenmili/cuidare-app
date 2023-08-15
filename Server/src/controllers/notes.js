const  Notes  = require("../model/notes");

const createNote = async (title, content, image) => {

    const note = new Notes({
        title,
        content,
        image
    }); 
    
    await note.save();
    return note;
};

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
const deleteNote = async (id) => {
    const note = await Notes.findByIdAndDelete(id);
    return "Note deleted from data base";
};

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
