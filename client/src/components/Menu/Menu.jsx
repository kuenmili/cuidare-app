import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import style from './style.module.css';
import { addNote } from "../../redux/actions";

const BlogMenu = () => {

    const dispatch = useDispatch();

    const [data, setData] = useState({
        title: "",
        content: "",
        image: ""
    });    

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addNote(data))
            setData({
                title: "",
                content: "",
                image: ""
            });
    };
    
    return (
        <div className={style.container}>
            <form 
            className={style.blogMenu}
            onSubmit={handleSubmit}>
                <input
                    className={style.input}
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={data.title}
                    onChange={(event) => handleChange(event)}
                />
                <textarea
                    className={style.inputArea}
                    placeholder="Content"
                    value={data.content}
                    name="content"
                    onChange={(event) => handleChange(event)}
                />
                <input
                    className={style.input}
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
