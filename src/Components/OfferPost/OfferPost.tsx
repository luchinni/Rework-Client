import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import image1 from '../../images/Team presentation _Flatline.png';
import image2 from '../../images/Team success _Outline.png';
import { useDispatch, useSelector } from 'react-redux';
import {getAllProfession, postNewOffer} from "../../Redux/Reducer/reducer";
import * as type from "../../Types";



const OfferPost = () => {

    const profession = useSelector ((state:any) => state.workService.professions);

    // const [prof, setProf] = useState('')

    const [formulario, setFormulario] = useState({
        title: '',
        post_duration_time: '',
        min_rem: 0,
        max_rem: 0,
        work_duration_time: 0,
        work_duration_time_select: '',
        description: '',
        photo: '',
        profession: ''
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
    if(formulario.work_duration_time_select.includes(e.target.value)) return;
    if(formulario.profession.includes(e.target.value)) return;
    if(name === 'profession'){
        setFormulario({...formulario,
            profession: select})
    }else{
        setFormulario({
            ...formulario,
            work_duration_time_select: select})

    }   
};

const handleSubmit = (e:any) => {
    e.preventDefault();
    let {title, post_duration_time, min_rem, max_rem, work_duration_time, work_duration_time_select, description, photo, profession} = formulario
const newOffer:type.newOfferType = {
    title:title, post_duration_time:post_duration_time, min_rem:min_rem, max_rem:max_rem, work_duration_time:work_duration_time, work_duration_time_select:work_duration_time_select, description:description, photo:photo, profession:profession
}
    postNewOffer(newOffer)
    .then(()=>{
        let form = document.getElementById("form") as HTMLFormElement | null;
      form?.reset()
    }) 
    
    setFormulario({
        title: '',
        post_duration_time: '',
        min_rem: 0,
        max_rem: 0,
        work_duration_time: 0,
        work_duration_time_select: '',
        description: '',
        photo: '',
        profession: ''
    })
}

  return (
    <div>
        <Header/>
        <div>
            <img src={image1} alt="place1" />
            <img src={image2} alt="place2" />
        </div>
        <div>
            <h1>Empecemos</h1>
            <form id='form' onSubmit={(e) => e.preventDefault()}>
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
                <input type='number' name='min_rem' placeholder='Min' onChange={handleChange}/>
                <input type='number' name='max_rem' placeholder='Max' onChange={handleChange}/>
                <span>Duración del trabajo</span>
                <input type='number' name='work_duration_time' placeholder='Ej: 5' onChange={handleChange}/>
                <select name='work_duration_time_select' id='work_duration_time_select' onChange={(e) => handleSelect(e)}>
                    <option selected={true} hidden>Seleccione</option>
                    {['días', 'semanas', 'meses'].map(e => {
                        return (<option>{e}</option>)
                    })}
                </select>
                <input type='text' name='description' placeholder='Descripción del trabajo' onChange={handleChange}/>
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
                {/*profession?.map((e:any) => {
                return (<span className='profession_btn' id="profession" key={e} onClick = {(e) =>handleDelete(e)}>{`${e}`}</span>)
              })*/}
                </div>
                <input disabled={false} name="button" type="submit" value="Publicar" onClick={(e) => handleSubmit(e)} />
            </form>
        </div>
    </div>
  )
}

export default OfferPost