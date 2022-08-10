import React, { useState } from 'react';
import { newReviewPost } from '../../../Redux/Reducer/reducer';


const FormReview = () => {

type formValidate = {
    valoration: Number,
    review_description: String
}

type errorFormValidate = {
    valoration: String,
    review_description: String,
    disabled: boolean | undefined
}

const [formu, setFormu] = useState<formValidate>({
    valoration: 0,
    review_description: ""
})

const [error, setError] =useState<errorFormValidate>({
    valoration: "campo requerido",
    review_description: "campo requerido",
    disabled: true  
})

const validarForm = (errors:errorFormValidate) => {
    let valid = true;
    Object.values(errors).forEach((val:any) => val.length > 0 && (valid = false));
    if (valid) {
        setError({
            ...error,
            disabled: false
        })
    } else {
        setError({
            ...error,
            disabled: true
        })
    }
}

const handleChange = (e:any) => {
    const value = e.target.value
    const name = e.target.name
    let errors:errorFormValidate
    errors = error

    switch(name) {
        case "valoration":
            let valorationPattern:RegExp = /^[0-9]+$/
            errors.valoration = valorationPattern.test(value) === false? "Solo números enteros son adimitidos."
            : value[0] === "0"? "No puede inicializar con 0."
            : parseInt(value) <=0? "La valoración tiene que ser entre 1 a 5."
            : parseInt(value) >5? "La valoración tiene que ser entre 1 a 5." : "";
            break;
        case "description":
            errors.review_description = formu.review_description.length > 200 ? "Solo se permiten 200 caracteres"
            : formu.review_description.length < 20 ? "La cantidad mínima de caracteres es 20"
            : "";
            break;
    }

    setError(errors)

    validarForm(errors)

    setFormu({
        ...formu,
        [e.target.name]: e.target.value
    });
}

const handleSubmit = (e:any) => {
    e.preventDefault();

    let {valoration, review_description} = formu

    const newReview:formValidate = {
        valoration:valoration, review_description:review_description
    }

    newReviewPost(newReview)
    .then(()=>{
    let form = document.getElementById("form") as HTMLFormElement | null;
    form?.reset()
  }) 

    setFormu({
        valoration: 0,
        review_description: ""
    })
    
}


  return (
    <div>
        <form id="form" onSubmit={(e) => e.preventDefault()}>
                <h1>Dejar una valoración</h1>
            <div>
                <input className={error.valoration && 'danger'}
                name="valoration" type="number" placeholder='puntaje de 1 a 5' onChange={handleChange}/>
                    {error.valoration && (
                                <p className="danger">{error.valoration}</p>
                            )}
            </div>
            <div>
                <span>Escriba un comentario</span>
                <input className={error.review_description && 'danger'}
                name="description" type="text" onChange={handleChange}/>
                    {error.review_description && (
                                <p className="danger">{error.review_description}</p>
                            )}
            </div>
                <input disabled={error.disabled} name="button" type="submit" value="publicar" onSubmit={(e) => handleSubmit(e)}/>
        </form>
    </div>
  )
}

export default FormReview