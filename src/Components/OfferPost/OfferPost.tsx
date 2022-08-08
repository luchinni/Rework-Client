import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import image1 from '../../images/Team presentation _Flatline.png';
import image2 from '../../images/Team success _Outline.png';
import { useDispatch, useSelector } from 'react-redux';
import {getAllProfession, postNewOffer} from "../../Redux/Reducer/reducer";
import * as type from "../../Types";
import './OfferPost.css'


const OfferPost = () => {

    const profession = useSelector ((state:any) => state.workService.professions);

    type Hola = {
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
    //const [prof, setProf] = useState('')
   
    const [formulario, setFormulario] = useState<Hola>({

        userClientIdClient:'99cfa5ce-ea90-45ed-99ee-5821eb36a2f1',
        title: '',
        post_duration_time: new Date,
        min_remuneration: 0,
        max_remuneration: 0,
        // work_duration_time: 0,
        // work_duration_time_select: '',
        offer_description: '',
        photo: '',
        profession: []
    })

    

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();   

    

useEffect(()=> {
    dispatch(getAllProfession())
},[dispatch])


const handleChange = (e:any) =>{
      
    setFormulario({
        ...formulario,
        [e.target.name]: e.target.value
    });
    //setErrors()
};

const validate = (/*formulario*/) => {
    let errors = {};

}

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
// console.log(formulario)    

const handleSubmit = (e:any) => {
    e.preventDefault();
    let {userClientIdClient, title, post_duration_time, min_remuneration, max_remuneration, /*work_duration_time, work_duration_time_select, */offer_description, photo, profession} = formulario
    let  post_duration_date = new Date(post_duration_time + 'T00:00:00')
    let fecha = (post_duration_date.getFullYear() + "-"+0+ (post_duration_date.getMonth()+1)+ "-" +post_duration_date.getDate()+ " 23:59:59")
    
const newOffer:type.newOfferType = {
    userClientIdClient, title:title, post_duration_time:fecha, min_remuneration:min_remuneration, max_remuneration:max_remuneration, /*work_duration_time:work_duration_time, work_duration_time_select:work_duration_time_select, */offer_description:offer_description, photo:photo, profession:profession
}
    
    postNewOffer(newOffer)
    .then(()=>{
        let form = document.getElementById("form") as HTMLFormElement | null;
      form?.reset()
    }) 
    
    setFormulario({
        userClientIdClient: '99cfa5ce-ea90-45ed-99ee-5821eb36a2f1',
        title: '',
        post_duration_time: new Date,
        min_remuneration: 0,
        max_remuneration: 0,
        // work_duration_time: 0,
        // work_duration_time_select: '',
        offer_description: '',
        photo: '',
        profession: []
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
                    <input type='text' name='title' placeholder='Título' onChange={handleChange}/>
                    <span>Tiempo de publicación</span>
                    {/* <select name='post_duration_time' id='post_duration_time' onChange={(e) => handleSelect(e)}>
                        <option selected={true} hidden>Seleccione opción</option>
                        {['5 días', '7 días', '10 días', '14 días'].map(e => {
                            return ( <option>{e}</option> )
                        })}                    
                    </select> */}
                    <input type='date' name='post_duration_time' placeholder='Duración de publicación' onChange={handleChange}/>
                    <span>Remuneración</span>
                    <input type='number' name='min_remuneration' placeholder='Min' onChange={handleChange}/>
                    <input type='number' name='max_remuneration' placeholder='Max' onChange={handleChange}/>
                    {/* <span>Duración del trabajo</span> */}
                    {/* <input type='number' name='work_duration_time' placeholder='Ej: 5' onChange={handleChange}/> */}
                    {/* <select name='work_duration_time_select' id='work_duration_time_select' onChange={(e) => handleSelect(e)}>
                        <option selected={true} hidden>Seleccione</option>
                        {['días', 'semanas', 'meses'].map(e => {
                            return (<option>{e}</option>)
                        })}
                    </select> */}
                    <input type='text' name='offer_description' placeholder='Descripción del trabajo' onChange={handleChange}/>
                    <input type='url' name='photo' placeholder='Url de imagen de referencia' onChange={handleChange}/>
                    <span>Profesiones</span>
                    <select name='profession' id='profession' onChange={(e)=> handleSelect(e)}>
                        <option selected={true} hidden>Seleccione opción</option>
                        {
                            profession?.map((e:any) => {
                                return <option value={e} key={e}> {e} </option>
                            })
                        }
                    </select>
                    <div>
                        {formulario.profession?.map((e:any) => {
                        return (<span className='profession_btn' id="profession" key={e} onClick = {(e) =>handleDelete(e)}>{`${e}`}</span>)
                        })}
                    </div>
                    <input disabled={false} name="button" type="submit" value="Publicar" onClick={(e) => handleSubmit(e)} />
                </form>
            </div>
        </div>
    </div>
  )
}

export default OfferPost