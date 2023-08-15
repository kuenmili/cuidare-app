import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import style from './style.module.css';
import { addNote } from "../../redux/actions";

const BlogMenu = () => {

    const dispatch = useDispatch(); // utilizamos dispatch para despachar las funciones que creamos en redux.

    const [data, setData] = useState({   // utilizamos el estado local con las propiedades de 
        title: "",                       // una nota en blanco para luego rellenar los campos.
        content: "",
        image: ""
    });    

    const handleChange = (event) => {   // Funcion para actualizar el estado local con los valores de name y value del
        setData({                       // event que se pasa por parametro desde la funcion onChange
            ...data,
            [event.target.name]: event.target.value // utilizamos bracket notation porque no sabemos cual sera el nombre de la propiedad y le asignamos el valor correspondiente.
        })
    }

    const handleSubmit = (event) => { // Funcion para enviar la nota nueva como parametro de la funcion addNote de redux.
        event.preventDefault();
        dispatch(addNote(data))
            setData({               // Se resetea el estado local con las propiedades vacias para que no se rendericen 
                title: "",          // los campos de la ultima nota creada.
                content: "",
                image: ""
            });
    };
    
    return (
        <div className={style.container}>
            {/** Formulario para crear una nota. Le asignamos onSubmit para que cuando se apreta el boton de type submit se dispare la funcion handleSubmit */}
            <form 
            className={style.blogMenu}
            onSubmit={handleSubmit}>
            {/** para cada campo se le asigna un onChange con una callback que le envie el evento por parametro a la funcion handleChange */}
                <input
                    className={style.input}
                    type="text"
                    placeholder="Title"
                    required
                    name="title"
                    value={data.title}
                    onChange={(event) => handleChange(event)}
                />
                <textarea
                    className={style.inputArea}
                    required
                    placeholder="Content"
                    value={data.content}
                    name="content"
                    onChange={(event) => handleChange(event)}
                />
                <input
                    className={style.input}
                    required
                    type="text"
                    placeholder="Image"
                    name="image"
                    value={data.image}
                    onChange={(event) => handleChange(event)}
                />
                <button 
                    className={style.mainButtons}
                    type="submit">Add Note
                </button>  
                {/** Si hay una url con la imagen de la nota se renderiza abajo */}
                {
                data.image && 
                <img
                    src={data.image}
                    alt=""
                    className={style.img}
                />}        
            </form>
        </div>
    );
};

export default BlogMenu;
