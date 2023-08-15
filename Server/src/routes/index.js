const router = require('express').Router();
const { login, signUp } = require("../controllers/user");
const { createNote, modifyNote, deleteNote, getNotes } = require("../controllers/notes");

router.post("/login", async (req, res) => {
    try {
        const dni = req.body.dni;
        const user = await login(dni)
        user ? res.json({access: true, dni: dni})
        : res.json({access:false})
    } catch (error) {
        res.status(400).json({ access: false });
    }
});

router.post("/signup", async (req, res) => {
    try {
        const dni = req.body.dni; // Extraer el valor 'dni' del cuerpo
        const user = await signUp(dni);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get("/notes", async (req, res) => {
    try {
        const notes = await getNotes()
        res.json(notes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/notes", async (req, res) => {
    const {
        title,
        content,
        image
    } = req.body

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
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

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

