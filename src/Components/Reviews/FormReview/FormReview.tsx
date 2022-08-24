import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { acceptProposal, getOfferForHistory, modifyOfferState, newReviewPost } from '../../../Redux/Reducer/reducer';
import Header from '../../Header/Header';
import "./FormReview.css";
import Swal from "sweetalert2";


const FormReview = ({offer}:any) => {
const navigate = useNavigate()
const userLogged = useSelector((state: any) => state.workService.userLogged);
const params:any = useParams();
const [currentOffer, setCurrentOffer] = useState<any>({});
const [destinatario, setDestinatario] = useState("");

useEffect(() => {
    getOfferForHistory(params.id)
    .then((response)=>{
      setCurrentOffer(response)
    })
}, [])

type formValidate = {
    valoration: any,
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

const currentUser = useSelector(
    (state: any) => state.workService.currentUser
  );

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
        case "review_description":
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
    let type:string
    const review:formValidate = {
        valoration:parseInt(valoration), review_description:review_description
    }

    const newReview:any = {
        id:getDestinationId(), idOffer:currentOffer.idOffer, review:review
    }

    console.log(newReview)
    if(userLogged.isWorker){
        type="worker"
    }else{
        type="client"
    }

     newReviewPost(newReview, type)
     .then(()=>{
     let form = document.getElementById("form") as HTMLFormElement | null;
     form?.reset();
        if (userLogged.isWorker){
            let state = "finalized";
            let proposal = currentOffer.proposals?.find((p:any) => p.state === "contract started")
            if(proposal){
            let id = proposal.idProposal;
            let proposalState: { state: string; id: string } = {
              state,
              id,
            };
            acceptProposal(proposalState);
            Swal.fire("¡Se registró la review!",
            "",
            "success").then( (response) => {
                if(response.isConfirmed){
                    navigate('/home')
                }
            }
             
            )
            
            

            }
        } else {
            let offerState: {id: String, state: String} = {
                id: currentOffer.idOffer, state: "finalized"};
            modifyOfferState(offerState);
            Swal.fire("¡Se registró la review!",
            "",
            "success").then( (response) => {
                if(response.isConfirmed){
                    navigate('/home')
                }
            })
            
        }
          
   }) 

     setFormu({
         valoration: 0,
         review_description: ""
     })
    
}

const getDestinationId = () => {
    if(userLogged.isWorker){
        setDestinatario(currentOffer.userClient.id)
        return currentOffer.userClient.id
    }else{
        let proposal = currentOffer?.proposals.find((p:any)=> p.state==="finalized")
        if(proposal){
            setDestinatario(proposal.userWorker.id)
            return proposal.userWorker.id
        }
    }

}

  return (
    <div>
        <div>
        <Header/>
    </div>
    <div className='form_review'>
        
        <form id="form" onSubmit={(e) => e.preventDefault()}>
                <h1>Dejar una valoración</h1>
            <div>
                <input 
                name="valoration" type="number" placeholder='puntaje de 1 a 5' onChange={handleChange}/>
                    {error.valoration && (
                                <p className="danger">{error.valoration}</p>
                            )}
            </div>
            <div>
                <span>Escriba un comentario</span>
                <input 
                name="review_description" type="text" onChange={handleChange}/>
                    {error.review_description && (
                                <p className="danger">{error.review_description}</p>
                            )}
            </div>
                <input disabled={error.disabled} name="button" type="submit" value="publicar" onClick={(e) => handleSubmit(e)}/>
        </form>
    </div>
    </div>
  )
}

export default FormReview