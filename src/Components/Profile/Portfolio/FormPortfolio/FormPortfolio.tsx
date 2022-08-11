import React, { useState } from 'react';
import axios from 'axios';
import * as type from "../../../../Types";
import {postNewPortfolio} from "../../../../Redux/Reducer/reducer";
import './FormPortfolio.css';

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

    const [disabled, setDisabled] = useState<boolean>(true)

    const validarForm = (errors:any)=> {
        let valid = true;
        console.log(errors);
        Object.values(errors).forEach((val:any) => val.length > 0 && (valid = false));
        if (valid) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const parseImage = (e:any) => {
        let file = e.target.files[0]
        let reader:any = new FileReader();
        reader.onload = function(){
            let base64String:any = reader.result?.replace("data:","").replace(/^.+,/,"");
            console.log(base64String);
            setState({
                ...state,
                photo:base64String
            })
        }
        reader.readAsDataURL(file)
    }

    //console.log(state);

   const handleChange = (e:any) => {
    const value = e.target.value;
    const name = e.target.name;
    const errors = state.errors;

    if(name==="photo"){
        parseImage(e)
    }

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
        let { title, portfolio_description, photo} = state;
        title = firstWordUpperCase(title);

        let newPortfolio:type.newPortfolioType = {
            title:title, portfolio_description:portfolio_description, photo:photo
        }

        postNewPortfolio(newPortfolio)

        props.handle(false)
    }

    const parseToImage = () =>{
        const image = new Image();
        image.src = state.photo
        return state.photo;
    }

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