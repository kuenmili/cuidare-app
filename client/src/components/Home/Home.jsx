import { getAllNotes, deleteNote, updateNote } from "../../redux/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import style from './style.module.css'
import BlogMenu from "../Menu/Menu";


const Home = ({ access }) => {  // Recibe por parametro el estado access para proteger la pagina.
                                // Si el estado es true, la pagina se abre, si no, se redirige a "/"

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const notes = useSelector((state) => state.notes); // Llamamos al estado global para traer todas las notas.
    
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [editingNote, setEditingNote] = useState(null); // Estado local que setea si una nota esta siendo editada para mostrar los campos correspondientes.
    const [currentEdit, setCurrentEdit] = useState(null); // Estado local para setear una nota en particular y no todas.
    const [editedContent, setEditedContent] = useState({}); // Estado local que setea el contenido de la nota que ha sido modificado.

    useEffect(() => { // Se utiliza un useEffect para que cuando se monta el componente se llame a la
        dispatch(getAllNotes()) // la funcion que trae todas las notas al estado global.
    }, [dispatch, notes]);  // En el array de dependencias se ubican la funcion dispatch y el estado notes para que este atento a algun cambio de estos.
 
    useEffect(() => { // Se utiliza useEffect para estar atento al valor de access y redirigir si no hay usuario.
        !access && navigate('/');
    }, [access, navigate]);

    const handleDelete = (id) => { // Funcion para borrar una nota. Recibe por parametro el id de la nota.
        dispatch(deleteNote(id)); // Despacha la funcion delete con el ID de la nota a borrar.
        const remainingNotes = notes.filter(note => note.id !== id); // Se filtra de las notas la nota recien eliminada
        const newTotalPages = Math.ceil(remainingNotes.length / ITEMS_PER_PAGE); // para luego recalcular las paginas en caso de que sea necesario.
    
        // Verificar si es necesario actualizar currentPage
        if (currentPage > newTotalPages) { 
            setCurrentPage(newTotalPages);
        }
    };    
    const handleSaveChanges = (note) => { // Funcion para guardar los cambios de la nota recien editada.
        dispatch(updateNote( note ))    // Se despacha la funcion update con los datos de la nota.
        setEditingNote(null);           // Se resetea el estado de la nota editada a nulo para no muestre campos a rellenar.
        setCurrentEdit(null);           // Se resetea el estado
        setEditedContent({})            // Se resetea el estado que se usa para almacenar el contenido modificado.
    };        
    const handleEdit = (id) => {   // Funcion para setear el estado de edicion a true y que se muestren los campos a editar
        setEditingNote(true)      // Se pasa por parametro el id para que solo la nota que se esta editando muestre los campos 
        setCurrentEdit(id)
    };    
    const handleEditNote = (event) => {     // Funcion para controlar el estado que contiene el contenido de la nota modificada.
        const { name, value } = event.target; // Extraemos la propiedad name y value de event.target para setear el estado.
        setEditedContent(prevState => ({
            ...prevState,       // Hacemos una copia del estado anterior y le agregamos 
            [name]: value,      // las propiedades con bracket notation para que se comporte como variable, dado que pueden ser distintas keys.
        }));                    // Le damos el valor de value.
    };

    const ITEMS_PER_PAGE = 5; // Cantidad de notas por página
    // Calculamos el índice de inicio y fin del grupo de notas actual
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Obtenemos el grupo de notas actual
    const currentNotes = notes.slice(startIndex, endIndex);
    // Calculamos la cantidad de páginas necesarias
    const totalPages = Math.ceil(notes.length / ITEMS_PER_PAGE);

    return (
        < >    
        <div className={style.title}>     
            <h1>Home</h1>
        </div> 
        {/* Renderizamos la paginación solo si hay más de 5 notas */}
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
                    <BlogMenu />   {/* Renderizamos el componente para crear una nota nueva */}
                </div>

{/* Mapeamos las notas para que cada nota se renderice de una determinada manera */}
                <div className={style.notes}>
                {currentNotes.map(note => (
                    <div className={style.note} key={note.id}>
                        <div className={style.buttons}>
{/* Le pasamos un onClick al boton para que se dispare la funcion para 
borrar una nota y le pasamos por parametro el id de la nota */}
                            <button
                            className={style.deleteBtn} 
                                onClick={() => handleDelete(note.id)}
                            >
                                x
                            </button>
{/* Si editingNote es verdadero y el id de la nota es igual al Id que se 
quiere modificar se despliega el boton SAVE para guardar los cambios */}
{/** Se le pasa la copia de la nota y la copia del contenido modificado a la funcion
 *  handleSaveChanges en el onClick. Si no se esta editando la nota, se renderiza el boton de 
 * editar pasandole por parametro el id de la nota para que si se hace click en el boton se dispare 
 * el handleEdit*/}
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
{/** Si se esta editando la nota aparecen los campos a rellenar y 
 * el onChange para controlar el estado con las variables name y value.
 *  Si no se esta editando, se renderizan las propiedades de la nota. */}
                        <div >
                            {editingNote && currentEdit === note.id ? (
                                <div className={style.combination}>
                                    <input
                                        className={style.input}
                                        type="text"
                                        name="title"
                                        value={editedContent.title || note.title}
                                        onChange={(event) => handleEditNote(event)}
                                    />
                                    
                                    <textarea
                                        className={style.inputArea}
                                        name="content"
                                        value={editedContent.content || note.content}
                                        onChange={(event) => handleEditNote(event)}
                                    />
                                    <input
                                        className={style.input}
                                        type="text"
                                        name="image"
                                        value={editedContent.image}
                                        onChange={(event) => handleEditNote(event)}
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
            </div>
        </>
    );
};

export default Home;
