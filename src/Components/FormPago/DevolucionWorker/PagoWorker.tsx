import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as type from "../../../Types";
import {checkSession, setBankInfo} from "../../../Redux/Reducer/reducer"
import "./PagoWorker.css"
import img1 from "../../../images/Card Payment_Outline.png"
import img2 from "../../../images/Currency_Two Color.png"
import imgCard from "../../../images/Credit Card_Flat.png"
import Header from '../../Header/Header';
import Swal from 'sweetalert2';

const PagoWorker = () => {

  const userLogged = useSelector((state: any) => state.workService.userLogged)
  const currentUser = useSelector((state: any) => state.workService.currentUser)
  const dispatch = useDispatch(); 
  
  useEffect(()=> {
    dispatch(checkSession())
  },[])

  type post = {
    Name:string,
    Lastname: string,
    Phone_Number: number,
    Email: string,
    DNI: number,
    Target_type:string,
    Card_number:number,
}

type errorsNewOffer = {
    Name:string,
    Lastname: string,
    Phone_Number: string,
    Email: string,
    DNI: string,
    Target_type:string,
    Card_number:string,
    disabled:boolean | undefined
}
const [formulario, setFormulario] = useState<any>({
    Name: "",
    Lastname: '',
    Phone_Number: 0,
    Email: "",
    Target_type:"",
    Card_number:0,
    DNI: 0
});

const [errors, setErrors] = useState <errorsNewOffer>({
  Name: "Campo Requerido.",
  Lastname: 'Campo Requerido.',
  Phone_Number: "Campo Requerido.",
  Email: "Campo Requerido.",
  DNI: "Campo Requerido.",
  Target_type:"Campo Requerido.",
  Card_number:"Campo Requerido.",
  disabled:true
});

const validarForm = (errors:errorsNewOffer) => {
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

const firstWordUpperCase = (word:String) => {
  return word[0].toUpperCase() + word.slice(1);
}

const handleChange = (e:any) => {
  let visaCheck = document.getElementById("visaCheck") as HTMLInputElement;
  let masterCheck = document.getElementById("masterCheck") as HTMLInputElement;
  const value = e.target.value;
  const name = e.target.name;
  let error:errorsNewOffer;
  error = errors;
  console.log(value)
  if(value === "Visa" && masterCheck?.checked === true){
    masterCheck.checked = false;
  }
  else if(value === "MasterCard" && visaCheck?.checked === true){
    visaCheck.checked = false;
  }

  switch (name) {
      case "Name":
          let namePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
          error.Name = value.startsWith(" ")?"El nombre no puede iniciar con un espacio.": namePattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";
          break;
      case "Lastname":
          let lastnamePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
          error.Lastname = value.startsWith(" ")?"El apellido no puede iniciar con un espacio.": lastnamePattern.test(value)? value.endsWith(" ")? "El apellido no puede terminar con espacio.":"":"El apellido no puede contener caracteres especiales.";
          break;
      case "DNI":
          let dniPattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
          error.DNI = value.startsWith(" ")?"El dni no puede iniciar con un espacio.": dniPattern.test(value)? value.endsWith(" ")? "El dni no puede terminar con espacio.":"":"El dni no puede contener caracteres especiales.";
          break;
      case "Email":
          let emailPattern:RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
          error.Email = value.startsWith(" ")?"El email no puede iniciar con un espacio.": emailPattern.test(value)? value.endsWith(" ")? "El email no puede terminar con espacio.":"":"El email no puede contener caracteres especiales.";

        break;
      case "Phone_Number":
          let phonePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
          error.Phone_Number = value.startsWith(" ")?"El telefono no puede iniciar con un espacio.": phonePattern.test(value)? value.endsWith(" ")? "El telefono no puede terminar con espacio.":"":"El telefono no puede contener caracteres especiales.";

          break;
      case "Target_type":
          error.Target_type = "";
          break;
      case "Card_number":
          error.Card_number = "";
          break;
   
  }

  setErrors(error)

  validarForm(error)  

  setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
  });
};

const handleSubmit = (e:any) => {
  e.preventDefault();
  const {Name, Lastname, DNI, Email, Phone_Number, Target_type, Card_number} = formulario;
  
  const name = firstWordUpperCase(Name)
  const lastname = firstWordUpperCase(Lastname)
  console.log(Card_number)
  const bank_data:{name:string, lastname:string, DNI:number, Email:string, Phone_Number:number, Target_type:string, cvu:number} = {
    name, lastname, DNI, Email, Phone_Number, Target_type, cvu:Card_number
 }

 setBankInfo(bank_data, userLogged.id)
 .then(()=> {

  /*Swal.fire({
                        icon: 'success',
                        title: 'GENIAL!',
                        text: 'Estamos a punto de comenzar el trabajo! Enviaremos el contrato al cliente para que lo firme, te avisaremos cuando todo esté listo para comenzar',*/
  Swal.fire({
    icon: 'success',
    title: '¡Gracias!',
    text: 'En un plazo de 5 a 10 dias estarás recibiendo el pago por tu trabajo en la cuenta ingresada. Recuerda que si eres premium el tiempo de entrega se reduce a 72 horas.'
  })
 })
};


  return (
    <div className='pay_cont'>
      <Header></Header>
      <div>
        <img className='img1' src={img1} alt="" />
        <img className='img2' src={img2} alt="" />
      </div>
      <div className='header_cont'>
        <div className='header_cont'>
            <h1>Bienvenido de nuevo!</h1>
            <h3>Vamos a pedirte unos pocos datos para poder realizar tu pago</h3>
            <h4>Comencemos...</h4>
        </div>
        <div className="CR_divForm">
        <form className="CR_Form" id='form' onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input className="CR_input"
                        type='text' name='Name' placeholder='Nombre' onChange={handleChange}/>
                        {errors.Name && (
                                <p className="danger">{errors.Name}</p>
                            )}
                    </div>
                    <div>
                        <input className="CR_input"
                        type='text' name='Lastname' placeholder='Apellido' onChange={handleChange}/>
                        {errors.Lastname && (
                                <p className="danger">{errors.Lastname}</p>
                            )}
                    </div>
                    <div>
                        <input className="CR_input"
                        type='number' name='DNI' placeholder='DNI' onChange={handleChange}/>
                        {errors.DNI && (
                                <p className="danger">{errors.DNI}</p>
                            )}
                    </div>
                    <div>
                        <input className="CR_input"
                        type='number' name='Phone_Number' placeholder='Telefono' onChange={handleChange}/>
                        {errors.Phone_Number && (
                                <p className="danger">{errors.Phone_Number}</p>
                            )}
                    </div>
                    <div>
                        <input className="CR_input"
                        type='text' name='Email' placeholder='Email' onChange={handleChange}/>
                        {errors.Email && (
                                <p className="danger">{errors.Email}</p>
                            )}
                    </div>
                    <div className='inputs_checks'>
                      <div className='each_check'>
                      <label>Visa</label>
                      <input type="checkbox" name='Target_type' id='visaCheck' value={"Visa"} onChange={handleChange}/>
                      </div>
                      <div className='each_check'>
                      <label>MasterCard</label>
                      <input type="checkbox" name='Target_type' id='masterCheck' value={"MasterCard"} onChange={handleChange}/>
                      </div>
                    </div>
                      {errors.Target_type&&(<p className="danger">{errors.Target_type}</p>)}
                    <div>
                      <label>Ingresa tu cbu/cvu</label>
                      <div className="cbu_input">
                      <img className="img_label" src={imgCard} alt="" />
                      <input className="CR_input"
                        type='number' name='Card_number' placeholder='CBU/CVU' onChange={handleChange}/>
                      </div>
                        {errors.Card_number && (
                                <p className="danger">{errors.Card_number}</p>
                            )}
                    </div>
                    <input className="CR_inputSubmit" disabled={errors.disabled} name="button" type="submit" value="Enviar" onClick={(e) => handleSubmit(e)} />
                </form>
        </div>
    </div>
    </div>
    
  )
}

export default PagoWorker