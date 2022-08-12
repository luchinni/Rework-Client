import React, { useState } from 'react'
import { newProposalPost } from '../../Redux/Reducer/reducer'


const FormProposal = () => {

    type formValidate = {
        remuneration: Number,
        proposal_description: String,
        worked_time: String,
        worked_time_select: String
    }
    
    type errorFormValidate = {
        remuneration: String,
        proposal_description: String,
        worked_time: String
        disabled: boolean | undefined
    }
    
    const [formu, setFormu] = useState<formValidate>({
        remuneration: 0,
        proposal_description: "",
        worked_time: "",
        worked_time_select: ""
    })
    
    const [error, setError] =useState<errorFormValidate>({
        remuneration: "campo requerido",
        proposal_description: "campo requerido",
        worked_time: "campo requerido",
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
            case "remuneration":
                let remunerationPattern:RegExp = /^[0-9]+$/
                errors.remuneration = remunerationPattern.test(value) === false? "Solo números enteros son adimitidos."
                : value[0] === "0"? "No puede inicializar con 0."
                : parseInt(value) <=0? "La presupuesto tiene que ser mayor a 0."
                : "";
                break;
            case "proposal_description":
                errors.proposal_description = formu.proposal_description.length > 400 ? "Solo se permiten 400 caracteres."
                : formu.proposal_description.length < 50 ? "La cantidad mínima de caracteres es 50."
                : "";
                break;
            case "worked_time":
                let worked_timePattern:RegExp = /^[0-9]+$/
                errors.worked_time = worked_timePattern.test(value) === false? "Solo números enteros son adimitidos."
                : value[0] === "0"? "No puede inicializar con 0."
                : parseInt(value) <=0? "No puede ser inferior a 0."
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

    const handleSelect = (e:any) => {
        const select = e.target.value;   
        if (select === "default") return;
        if(formu.worked_time_select.includes(e.target.value)) return;
        setFormu({...formu,
            worked_time_select: select})
        }
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
    
        let {remuneration, proposal_description, worked_time, worked_time_select} = formu
    
        worked_time = `${worked_time} ${worked_time_select}`
        const newProposal:formValidate = {
            remuneration:remuneration, proposal_description:proposal_description, worked_time:worked_time, worked_time_select:worked_time_select
        }
    
        newProposalPost(newProposal)
        .then(()=>{
        let form = document.getElementById("form") as HTMLFormElement | null;
        form?.reset()
      }) 
    
        setFormu({
            remuneration: 0,
            proposal_description: "",
            worked_time: "",
            worked_time_select: ""
        })
        
    }
    
    
      return (
        <div>
            <form id="form" onSubmit={(e) => e.preventDefault()}>
                    <h1>Montro de presupuesto</h1>
                <div>
                    <input className={error.remuneration && 'danger'}
                    name="remuneration" type="number" placeholder='Ej: 2500' onChange={handleChange}/>
                        {error.remuneration && (
                                    <p className="danger">{error.remuneration}</p>
                                )}
                </div>
                <div>
                    <span>Escriba su propuesta</span>
                    <textarea className={error.proposal_description && 'danger'}
                    name="proposal_description" cols={30} rows={5} placeholder='Descripción...' onChange={handleChange}></textarea>
                        {error.proposal_description && (
                                    <p className="danger">{error.proposal_description}</p>
                                )}
                </div>
                <div>
                    <span>Tiempo estiamdo del trabajo</span>
                    <input className={error.worked_time && 'danger'}
                    name='worked_time' type='string' placeholder='Ej: 5' onChange={handleChange} />
                        {error.worked_time && (
                                    <p className="danger">{error.worked_time}</p>
                                )}
                </div>
                { <select name='worked_time_select' id='worked_time_select' onChange={(e) => handleSelect(e)}>
                        <option selected={true} hidden>Seleccione</option>
                        {["días", "semanas", "meses"].map(e => {
                            return (<option>{e}</option>)
                        })}
                    </select> }
                    <input disabled={error.disabled} name="button" type="submit" value="publicar" onSubmit={(e) => handleSubmit(e)}/>
            </form>
        </div>
      )
    }

export default FormProposal