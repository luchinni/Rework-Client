import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
//import image2 from '../../images/Team success _Outline.png';
import { useDispatch, useSelector } from 'react-redux';
import {checkSession, getPaymentLink, getOfferForHistory} from "../../Redux/Reducer/reducer";
import * as type from "../../Types";
import decode from "jwt-decode";
import Axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import OfferPost from '../Offer/OfferPost/OfferPost';
import PasarelaPago from './PasarelaPago';

const FormPago = () => {

    const token:any = localStorage.getItem("token")
    const tokenDecode:any = decode(token)
    const payment = useSelector((state:any) => state.workService.paymentInfo);
    const params:any = useParams();
    const [currentOffer, setCurrentOffer] = useState<any>();

    type post = {
        Name:string,
        Lastname: string,
        Phone_Number: number,
        Email: string,
        Direction: string,
        Postal_code: number,
        City: string,
        Province: string,
        Country: string,
        DNI: number
    }

    type errorsNewOffer = {
        Name:string,
        Lastname: string,
        Phone_Number: string,
        Email: string,
        Direction: string,
        Postal_code: string,
        City: string,
        Province: string,
        Country: string,
        DNI: string,
        disabled:Boolean
    }
   
    const [formulario, setFormulario] = useState<post>({
        Name: "",
        Lastname: '',
        Phone_Number: 0,
        Email: "",
        Direction: "",
        Postal_code: 0,
        City: '',
        Province: '',
        Country: '',
        DNI: 0
    })

    

    const [errors, setErrors] = useState <type.errorsNewpayout>({
        Name: "Campo Requerido.",
        Lastname: 'Campo Requerido.',
        Phone_Number: "Campo Requerido.",
        Email: "Campo Requerido.",
        Direction: "Campo Requerido.",
        Postal_code: "Campo Requerido.",
        City: 'Campo Requerido.',
        Province: 'Campo Requerido.',
        Country: 'Campo Requerido.',
        DNI: "Campo Requerido.",
        disabled:true
    });

    const firstWordUpperCase = (word:String) => {
        return word[0].toUpperCase() + word.slice(1);
    }

    const dispatch = useDispatch();   

    
useEffect(()=> {
    getOfferForHistory(params.id)
    .then((response)=>{
        setCurrentOffer(response)
    })
    dispatch(checkSession())
},[dispatch])


const validarForm = (errors:type.errorsNewpayout) => {
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

const getCost = () => {
    const cost = currentOffer?.proposals.filter((p:any)=> p.state === "accepted")
    console.log(cost)
    return cost[0]?.remuneration
}

const handleChange = async (e:any) =>{
    const value = e.target.value;
    const name = e.target.name;
    let error:type.errorsNewpayout;
    error = errors;


    switch (name) {
        case "Name":
            let namePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.Name = value.startsWith(" ")?"El nombre no puede iniciar con un espacio.": namePattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";
            break;
        case "Lastname":
            let lastnamePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.Lastname = value.startsWith(" ")?"El apellido no puede iniciar con un espacio.": lastnamePattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";
            break;
        case "DNI":
            let dniPattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.DNI = value.startsWith(" ")?"El dni no puede iniciar con un espacio.": dniPattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";
            break;
        case "Phone_Number":
            let phonePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.Phone_Number = value.startsWith(" ")?"El telefono no puede iniciar con un espacio.": phonePattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";

            break;
        case "Email":
            let emailPattern:RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            error.Email = value.startsWith(" ")?"El email no puede iniciar con un espacio.": emailPattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";

            break;
        case "Direction":
            let directionPattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.Direction = value.startsWith(" ")?"La direccion no puede iniciar con un espacio.": directionPattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";

            break;
        case "Postal_code":
            let postalPattern:RegExp = /^[0-9]*$/
            error.Postal_code = value.startsWith(" ")?"El codigo postal no puede iniciar con un espacio.": postalPattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";

            break;
        case "City":
            let cityPattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.City = value.startsWith(" ")?"La ciudad no puede iniciar con un espacio.": cityPattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";

            break;
        case "Province":
            let provincePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.Province = value.startsWith(" ")?"La provincia no puede iniciar con un espacio.": provincePattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";

            break;
        case "Country":
            let countryPattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
            error.Country = value.startsWith(" ")?"El pais no puede iniciar con un espacio.": countryPattern.test(value)? value.endsWith(" ")? "El título no puede terminar con espacio.":"":"El título no puede contener caracteres especiales.";
        break;
     
    }

    setErrors(error)

    validarForm(error)  

    setFormulario({
        ...formulario,
        [e.target.name]: e.target.value
    });

};
  

const handleSubmit = async (e:any) => {
    e.preventDefault();

    const {Name, Lastname, DNI, Email, Phone_Number, Direction, Postal_code, City, Province, Country } = formulario;
    const name = firstWordUpperCase(Name)
    const lastname = firstWordUpperCase(Lastname)
    const city = firstWordUpperCase(City)
    const province = firstWordUpperCase(Province)
    const country = firstWordUpperCase(Country)
    const cost = getCost();

    console.log(cost)

    const newPayment:{name:string, lastname:string, cost:number, DNI:number, Email:string, Phone_Number:number, Direction:string, Postal_code:number, city:string, province:string, country:string} = {
        name, lastname, DNI, Email, cost, Phone_Number, Direction, Postal_code, city, province, country
    }

    dispatch(getPaymentLink(newPayment))
}

  return (
    <div>
        <Header/>
        <div className='OfferPost_divcontent'>
            <div className='OfferPost_divImage'>
                {/* <img className='OfferPost_image' src={image1} alt="place1" /> */}
                {/* <img src={image2} alt="place2" /> */}
            </div>
            <div className='OfferPost_divForm'>
                <h1>Empecemos</h1>
                <form className='OfferPost_Form' id='form' onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input className={errors.Name && 'danger'}
                        type='text' name='Name' placeholder='Nombre' onChange={handleChange}/>
                        {errors.Name && (
                                <p className="danger">{errors.Name}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.Lastname && 'danger'}
                        type='text' name='Lastname' placeholder='Apellido' onChange={handleChange}/>
                        {errors.Lastname && (
                                <p className="danger">{errors.Lastname}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.DNI && 'danger'}
                        type='number' name='DNI' placeholder='DNI' onChange={handleChange}/>
                        {errors.DNI && (
                                <p className="danger">{errors.DNI}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.Phone_Number && 'danger'}
                        type='number' name='Phone_Number' placeholder='Telefono' onChange={handleChange}/>
                        {errors.Phone_Number && (
                                <p className="danger">{errors.Phone_Number}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.Email && 'danger'}
                        type='text' name='Email' placeholder='Email' onChange={handleChange}/>
                        {errors.Email && (
                                <p className="danger">{errors.Email}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.Direction && 'danger'}
                        type='text' name='Direction' placeholder='Dirección' onChange={handleChange}/>
                        {errors.Direction && (
                                <p className="danger">{errors.Direction}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.Postal_code && 'danger'}
                        type='number' name='Postal_code' placeholder='Codigo postal' onChange={handleChange}/>
                        {errors.Postal_code && (
                                <p className="danger">{errors.Postal_code}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.City && 'danger'}
                        type='text' name='City' placeholder='Ciudad' onChange={handleChange}/>
                        {errors.City && (
                                <p className="danger">{errors.City}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.Province && 'danger'}
                        type='text' name='Province' placeholder='Provincia' onChange={handleChange}/>
                        {errors.Province && (
                                <p className="danger">{errors.Province}</p>
                            )}
                    </div>
                    <div>
                        <input className={errors.Country && 'danger'}
                        type='text' name='Country' placeholder='Pais' onChange={handleChange}/>
                        {errors.Country && (
                                <p className="danger">{errors.Country}</p>
                            )}
                    </div>
                    <input disabled={errors.disabled} name="button" type="submit" value="Enviar" onClick={(e) => handleSubmit(e)} />
                    {payment!==""? <PasarelaPago props={formulario}/> : <span/>}
                </form>
            </div>        

        </div>
    </div>
  )
}


export default FormPago
