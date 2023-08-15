const router = require('express').Router();
const { login, signUp } = require("../controllers/user");
const { createNote, modifyNote, deleteNote, getNotes } = require("../controllers/notes");


//ESTABLECEMOS UN METODO PARA CADA RUTA. UTILIZAMOS REQ Y RES PARA EXTRAER 
//DATOS ENVIADOS DESDE EL CLIENTE Y PARA DARUNA RESPUESTA DESDE EL SERVIDOR.

router.post("/login", async (req, res) => {
    try {
        const dni = req.body.dni;  // EXTRAEMOS DNI DEL BODY Y LO ENVIAMOS COMO PARAMETRO AL CONTROLLER LOGIN.
        const user = await login(dni)
        user ? res.json({access: true})   // SI HAY UN USUARIO ESTABLECE EL ACCESS EN TRUE. SI NO, EN FALSE.
        : res.json({access:false})
    } catch (error) {
        res.status(400).json({ access: false, error: error.message }); //MANEJO DE ERRORES DEL BACK.
    }
});

router.post("/signup", async (req, res) => {
    try {
        const dni = req.body.dni; // Extraemos el valor 'dni' del cuerpo y se lo enviamos al controller.
        const user = await signUp(dni);
        res.json(user);     // enviamos un json con el usuario.
    } catch (error) {
        res.status(400).json({ error: error.message }); // manejamos el error enviando el mensaje.
    }
});


router.get("/notes", async (req, res) => {
    try {
        const notes = await getNotes()  // llamamos al controller para que busque en la db todas las notas y las enviamos.
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/notes", async (req, res) => { //funcion asincrona para crear nota
    const {
        title,
        content,
        image
    } = req.body

    // extraemos del body los datos de la nota y se los enviamos por parametro al controller create note.
    // esperamos que el controller devuelva una respuestay enviamos al cliente la nueva nota.
    try {
        const note = await createNote(
            title,
            content,
            image
            )

        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ruta dinamica para modificar una nota. 
// Extraemos el id de la propiedad params de body y se la enviamos al controller junto con toda la nota
router.put("/notes/:id", async (req, res) => {
    const {
        title,
        content,
        image
    } = req.body

    const id = req.params.id;
    try {
        const note = await modifyNote(
            id,
            title,
            content,
            image
            )
        res.json(note);  // enviamos la nota al cliente
    } catch (error) {
        res.status(400).json({ error: error.message }); // manejamos el error del back
    }
});
// ruta dinamica para eliminar una nota.
// extraemos de params el id y se lo pasamos al controller por parametro.
router.delete("/notes/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await deleteNote(id)
        res.json("Note deleted");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

