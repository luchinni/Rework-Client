import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import image1 from '../../images/Team presentation _Flatline.png';
//import image2 from '../../images/Team success _Outline.png';
import { useDispatch, useSelector } from 'react-redux';
import {getAllProfession, postNewOffer} from "../../Redux/Reducer/reducer";
import * as type from "../../Types";
import './OfferPost.css'


const OfferPost = () => {

    const profession = useSelector ((state:any) => state.workService.professions);

    type post = {
        userClientIdClient:String,
    title:String,
    post_duration_time:Date | String,
    min_remuneration:Number,
    max_remuneration:Number,
    // work_duration_time:Number,
    // work_duration_time_select:String,
    offer_description:String,
    photo:String,
    profession:String[]
    }

    type errorsNewOffer = {
        title:String,
        min_remuneration:String,
        max_remuneration:String,
        // work_duration_time:Number,
        // work_duration_time_select:String,
        offer_description:String,
        photo:String,
        disabled:boolean | undefined
    }
   
    const [formulario, setFormulario] = useState<post>({
        userClientIdClient:'d4e15002-614a-4c7f-9dc4-c226544b2721',
        title: '',
        post_duration_time: new Date(),
        min_remuneration: 0,
        max_remuneration: 0,
        // work_duration_time: 0,
        // work_duration_time_select: '',
        offer_description: '',
        photo: '',
        profession: []
    })

    

    const [errors, setErrors] = useState <errorsNewOffer>({
        title: "Campo requerido.",
        min_remuneration: "Campo requerido.",
        max_remuneration: "Campo requerido.",
        // work_duration_time: 0,
        // work_duration_time_select: '',
        offer_description: "Campo requerido.",
        photo: "campo requerido",
        disabled: true
    });

    const firstWordUpperCase = (word:String) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    const dispatch = useDispatch();   

    

useEffect(()=> {
    dispatch(getAllProfession())
},[dispatch])


const validarForm = (errors:type.errorsNewOfferType) => {
    let valid = true;
    Object.values(errors).forEach((val:any) => val.length > 0 && (valid = false));
    if (valid) {
        setErrors({
            ...errors,
            disabled: false
        })
    } else {
        setErrors({
            ...errors,
            disabled: true
        })
    }
}

const handleChange = (e:any) =>{
    const value = e.target.value;
    const name = e.target.name;
   console.log(typeof(value))
    let error:type.errorsNewOfferType;
    error = errors

    switch (name) {
        case "title":
            let titlePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.title = value.startsWith(" ")?"El título no puede iniciar con un espacio.": titlePattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";
            break;
        case "min_remuneration":
            let min_remunerationPattern:RegExp = /^[0-9]+$/
            error.min_remuneration = min_remunerationPattern.test(value) === false? "Solo números enteros son adimitidos."
            //  : parseInt(value) >= formulario.max_remuneration? "La remuneración mínima no puede ser mayor o igual a la remuneración máxima"
            : value[0] === "0"? "No puede inicializar con 0"
            : parseInt(value) <=0? "La remuneración mínima tiene que ser mayor a 0" : "";
            break;
        case "max_remuneration":
            let max_remunerationPattern:RegExp = /^[0-9]+$/
            error.max_remuneration = max_remunerationPattern.test(value) === false? "Solo números enteros son adimitidos."
            : parseInt(value) <= formulario.min_remuneration? "La remuneración máxima no puede ser menor o igual a la remuneración mínima"
            : value[0] === "0"? "No puede inicializar con 0"
            : parseInt(value) <=0? "La remuneración máxima tiene que ser mayor a 0" : "";
            break;
        case "offer_description":
            error.offer_description = formulario.offer_description.length > 1000 ? "Solo se permiten 1000 caracteres" 
            : formulario.offer_description.length < 20? "La cantidad mínima de caracteres es 20"
            : ""
            break;
        case "photo":
            let photoPattern = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
            errors.photo = photoPattern.test(value) ? '' : 'La url de la imagen no es una url valida.';
            break;            
    }

    setErrors(error)

    validarForm(error)  

    setFormulario({
        ...formulario,
        [e.target.name]: e.target.value
    });

};

const handleSelect = (e:any) => {
    const select = e.target.value;
    const name = e.target.name;   
    if (select === "default") return;
    // if(formulario.work_duration_time_select.includes(e.target.value)) return;
    if(formulario.profession?.includes(select)) return;
    if(name === 'profession'){
        setFormulario({...formulario,
            profession:[...formulario.profession, select]})
    }
    // else{
    //     setFormulario({
    //         ...formulario,
    //         work_duration_time_select: select})

    //}   
};

const handleDelete = (e:any) => {
    let del = e.target.innerText
    const name = e.target.id
  if(name === "profession"){
    let borrado = formulario.profession?.filter((f) => f !== del.trim())
    setFormulario({...formulario, profession: borrado})
}  
// else {
//     let borrado2 = formulario.skills?.filter(g => g !== del.trim())
//     setFormulario({...formulario, skills: borrado2})
//   }
}   

const handleSubmit = (e:any) => {
    e.preventDefault();
    let {userClientIdClient, title, min_remuneration, max_remuneration, /*work_duration_time, work_duration_time_select, */offer_description, photo, profession} = formulario
    title = firstWordUpperCase(title)
    let hoy = new Date()
    hoy.setDate(hoy.getDate()+10)
    
const newOffer:type.newOfferType = {
    userClientIdClient, title:title, post_duration_time:hoy, min_remuneration:min_remuneration, max_remuneration:max_remuneration, /*work_duration_time:work_duration_time, work_duration_time_select:work_duration_time_select, */offer_description:offer_description, photo:photo, profession:profession
}
    
    postNewOffer(newOffer)
    .then(()=>{
        let form = document.getElementById("form") as HTMLFormElement | null;
      form?.reset()
    }) 
    
    setFormulario({
        userClientIdClient: 'd4e15002-614a-4c7f-9dc4-c226544b2721',
        title: '',
        post_duration_time: new Date(),
        min_remuneration: 0,
        max_remuneration: 0,
        // work_duration_time: 0,
        // work_duration_time_select: '',
        offer_description: '',
        photo: '',
        profession: [],
        //skills: []
    })
}

  return (
    <div>
        <Header/>
        <div className='OfferPost_divcontent'>
            <div className='OfferPost_divImage'>
                <img className='OfferPost_image' src={image1} alt="place1" />
                {/* <img src={image2} alt="place2" /> */}
            </div>
            <div className='OfferPost_divForm'>
                <h1>Empecemos</h1>
                <form className='OfferPost_Form' id='form' onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input className={errors.title && 'danger'}
                        type='text' name='title' placeholder='Título' onChange={handleChange}/>
                        {errors.title && (
                                <p className="danger">{errors.title}</p>
                            )}
                    </div>
                    <div>
                        <span>Remuneración</span>
                        <div>
                            <input className={errors.min_remuneration && 'danger'}
                            type='number' name='min_remuneration' placeholder='Min' onChange={handleChange}/>
                            {errors.min_remuneration && (
                                <p className="danger">{errors.min_remuneration}</p>
                            )}
                        </div>
                        <div>
                            <input className={errors.max_remuneration && 'danger'}
                            type='number' name='max_remuneration' placeholder='Max' onChange={handleChange}/>
                            {errors.max_remuneration && (
                                <p className="danger">{errors.max_remuneration}</p>
                            )}
                        </div>
                    </div>
                    {/* <span>Duración del trabajo</span> */}
                    {/* <input type='number' name='work_duration_time' placeholder='Ej: 5' onChange={handleChange}/> */}
                    {/* <select name='work_duration_time_select' id='work_duration_time_select' onChange={(e) => handleSelect(e)}>
                        <option selected={true} hidden>Seleccione</option>
                        {['días', 'semanas', 'meses'].map(e => {
                            return (<option>{e}</option>)
                        })}
                    </select> */}
                    <div>
                        <input className={errors.offer_description && 'danger'}
                        type='text' name='offer_description' placeholder='Descripción del trabajo' onChange={handleChange}/>
                        {errors.offer_description && (
                                <p className="danger">{errors.offer_description}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.photo && 'danger'}
                        type='url' name='photo' placeholder='Url de imagen de referencia' onChange={handleChange}/>
                        {errors.photo && (
                                <p className="danger">{errors.photo}</p>
                            )}
                    </div>
                    <span>Profesiones</span>
                    <select name='profession' id='profession' onChange={(e)=> handleSelect(e)}>
                        <option selected={true} hidden>Seleccione opción</option>
                        {
                            profession?.map((e:any) => {
                                return <option  value={e} key={e}> {e} </option>
                            })
                        }
                    </select>
                    <div className="professionDiv">
                          {formulario.profession?.map((e:any) => {
                          return (<span className='profession_btns' id="profession" key={e} onClick = {(e) =>handleDelete(e)}>{`${e}`}</span>)
                        })}
                    </div>
                    <input disabled={errors.disabled} name="button" type="submit" value="Publicar" onClick={(e) => handleSubmit(e)} />
                </form>
            </div>        

        </div>
    </div>
  )
}


export default OfferPost