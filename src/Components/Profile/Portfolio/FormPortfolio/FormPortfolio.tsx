import React, { useState } from 'react';
import axios from 'axios';
import * as type from "../../../../Types";
import {postNewPortfolio, setLoading, getUserById} from "../../../../Redux/Reducer/reducer";
import decode from "jwt-decode"
import './FormPortfolio.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Axios, { AxiosResponse } from 'axios';

//falta linkear el ID del worker

const FormPortfolio = (props:any) => {

    //450068a29be8a7447c325e8023535a86

    const [state, setState] = useState<any>({
        title:"",
        photo:"",
        portfolio_description:"",
        errors:{
            title:"campo requerido",
            portfolio_description:"campo requerido"
        },
    });
    const dispatch = useDispatch();
    const token:any = localStorage.getItem("token")
    const tokenDecode:any = decode(token)
    const Navigate = useNavigate();

    const [disabled, setDisabled] = useState<boolean>(true)

    const validarForm = (errors:any)=> {
        let valid = true;
        Object.values(errors).forEach((val:any) => val.length > 0 && (valid = false));
        if (valid) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const postImageOnCloudinary = async (e: any) => {
        const formData = new FormData();
        formData.append("file", e);
        formData.append("upload_preset", "re-work");
    
        try {
          const response: AxiosResponse = await Axios.post("https://api.cloudinary.com/v1_1/luis-tourn/image/upload", formData);
          const data: any = response.data;
          return data.url;
        } catch (error) {
          console.log(error);
        };
      };

    //console.log(state);

   const handleChange = (e:any) => {
    const value = e.target.value;
    const name = e.target.name;
    const errors = state.errors;

    if(name==="photo"){
        setState({
            ...state,
            photo: e.target.files[0]
          });
          return
   };

    setState({
        ...state,
        [name]: value,
        errors,
    });


    switch (name) {
        case "title":
            let titlePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            errors.title = value.startsWith(" ")?"El título no puede iniciar con un espacio.": titlePattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";
            break;
        case "portfolio_description":
            errors.portfolio_description = state.portfolio_description.length > 1000 ? "Solo se permiten 1000 caracteres" 
            : state.portfolio_description.length < 20? "La cantidad mínima de caracteres es 20"
            : ""
            break;       
    }

    validarForm(state.errors);
   } 

   const firstWordUpperCase = (word:String) => {
    return word[0].toUpperCase() + word.slice(1);
}

    const uploadForm = async (e:any) => {
        e.preventDefault()
        let photo = await postImageOnCloudinary(state.photo);
        let { title, portfolio_description} = state;
        title = firstWordUpperCase(title);

        let newPortfolio:type.newPortfolioType = {
            title:title, portfolio_description:portfolio_description, photo:photo
        }
        dispatch(setLoading(true))
        postNewPortfolio(newPortfolio, tokenDecode.id)
        .then(() => {
            dispatch(getUserById(tokenDecode))
            dispatch(setLoading(false))
        })
        props.handle(false)
        Navigate(`/myProfile`)

    }

/*     const parseToImage = () =>{
        const image = new Image();
        image.src = state.photo
        return state.photo;
    } */

    const handleClose = () => {
        props.handle(false)
    }

  return (
    <div className='FormPortfolio_component'>
        <div>
            <button onClick={handleClose}>x</button>
            <p>Empecemos</p>
        </div>
         <form className='FormPortfolio_form' onSubmit={(e)=> uploadForm(e)}>
            <input type="text" name='title' placeholder='Título...' onChange={(e) => handleChange(e)}/>
            <textarea name="portfolio_description" cols={30} rows={5} placeholder='Descripción...' onChange={(e) => handleChange(e)}></textarea>
         <input type="file" name='photo' onChange={(e) => handleChange(e)} accept="image/*"/> 
        <input type="submit" disabled={disabled} />
        </form> 
        {/* <div>
            <h1>{state.title}</h1>
            <h4>{state.portfolio_description}</h4>
        <img src={`data:image/png;base64,${parseToImage()}`} alt="asd" />
        </div> */}
    </div>
  )
}

export default FormPortfolio