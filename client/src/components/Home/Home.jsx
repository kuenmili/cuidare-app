import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import style from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import BlogMenu from "../Menu/Menu";
import { getAllNotes, deleteNote, updateNote } from "../../redux/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


const Home = ({ access }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const notes = useSelector((state) => state.notes);
    
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [editingNote, setEditingNote] = useState(null);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [editedContent, setEditedContent] = useState({});

    useEffect(() => {
        dispatch(getAllNotes())
    }, [dispatch, notes]);
 
    useEffect(() => {
        !access && navigate('/');
    }, [access, navigate]);

    const handleDelete = (id) => {
        try {
            dispatch(deleteNote(id));
            const remainingNotes = notes.filter(note => note.id !== id);
            const newTotalPages = Math.ceil(remainingNotes.length / ITEMS_PER_PAGE);
    
            // Verificar si es necesario actualizar currentPage
            if (currentPage > newTotalPages) {
                setCurrentPage(newTotalPages);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };
    
    
    const handleSaveChanges = (note) => {
            dispatch(updateNote( note ))
            dispatch(getAllNotes());
            setEditingNote(null);
            setCurrentEdit(null);
            setEditedContent({})
    };    
    
    const handleEdit = (id) => {
        setEditingNote(true)
        setCurrentEdit(id)
    };
    
    const handleEditNote = (event) => {
        const { name, value } = event.target;
        setEditedContent(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const ITEMS_PER_PAGE = 5; // Cantidad de notas por página
    // Calcular el índice de inicio y fin del grupo de notas actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Obtener el grupo de notas actual
    const currentNotes = notes.reverse().slice(startIndex, endIndex);
    // Calcular la cantidad de páginas necesarias
    const totalPages = Math.ceil(notes.length / ITEMS_PER_PAGE);

    return (
        < >    
        <div className={style.title}>     
            <h1>Home</h1>
        </div> 
        {notes.length > ITEMS_PER_PAGE && (
            <div className={style.pagination}>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? style.activePage : ''}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        )} 
            <div className={style.mainContent}>
                <div className={style.blog}>
                    <BlogMenu />
                </div>
                <div className={style.notes}>
                {currentNotes.map(note => (
                    <div className={style.note} key={note.id}>
                        <div className={style.buttons}>
                            <button
                                className={style.deleteBtn}
                                onClick={() => handleDelete(note.id)}
                            >
                                x
                            </button>
                            {editingNote && currentEdit === note.id ? (
                                <button
                                    className={style.mainButtons}
                                    onClick={() => handleSaveChanges({ ...note, ...editedContent })}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className={style.mainButtons}
                                    onClick={() => handleEdit(note.id)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            )}
                        </div>
                        <div className={style.combination}>
                            {editingNote && currentEdit === note.id ? (
                                <div>
                                    <input
                                        className={style.input}
                                        type="text"
                                        name="title"
                                        value={editedContent.title || note.title}
                                        onChange={handleEditNote}
                                    />
                                    
                                    <textarea
                                        className={style.inputArea}
                                        name="content"
                                        value={editedContent.content || note.content}
                                        onChange={handleEditNote}
                                    />
                                    <input
                                        className={style.input}
                                        type="text"
                                        name="image"
                                        value={editedContent.image || note.image}
                                        onChange={handleEditNote}
                                    />
                               
                                </div>

                            ) : (
                                <div className={style.contenido}>
                                    <h3>{note.title}</h3>
                               
                                <img
                                    src={note.image}
                                    alt=""
                                    className={style.img}
                                    />
                                    <p>{note.content}</p>
                                </div>
                            )}
                        </div>
                        </div>
                ))}
                </div>
                {/* Renderizar la paginación solo si hay más de 5 notas */}
          
            </div>
        </>
    );
};

export default Home;
