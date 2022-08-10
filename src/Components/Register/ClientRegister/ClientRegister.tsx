import React, { Component } from 'react'
import image1 from "../../../images/Online report_Monochromatic.png"
import image2 from "../../../images/Bank note_Monochromatic.png"
import image3 from "../../../images/Money motivation _Monochromatic.png"
import * as type from "../../../Types"
import { postNewClient } from '../../../Redux/Reducer/reducer'
import './ClientRegister.css';
import HeaderRegister from '../HeaderRegister/HeaderRegister';

export class ClientRegister extends Component {
    state:type.ClientType;
    constructor(props:type.ClientType) {
        super(props)
        this.state = {
            name: "",
            lastName: "",
            password: "",
            user_mail: "",
            birthdate: "",
            image: "",
            errors:{
                name: "Campo requerido.",
                lastName: "Campo requerido.",
                password: "Campo requerido",
                user_mail: "Campo requerido",
                birthdate: "Campo requerido",
                image: "",
            },
            disabled: true
        }
    }

    firstWordUpperCase(word:String) {
        return word[0].toUpperCase() + word.slice(1);
    }

    validarForm(errors:type.errorsType) {
        let valid = true;
        Object.values(errors).forEach((val:any) => val.length > 0 && (valid = false));
        if (valid) {
            this.setState({
                disabled: false
            })
        } else {
            this.setState({
                disabled: true
            })
        }
    }

    handleChange(e:any) {
        const value = e.target.value;
        const name = e.target.name;
        let errors:type.errorsType;
        errors = this.state.errors;

        switch (name) {
            case "name":
                let namePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
                errors.name = value.startsWith(" ")?"El nombre no puede iniciar con un espacio.": namePattern.test(value)? value.endsWith(" ")? "El nombre no puede terminar con espacio.":"":"El nombre no puede contener caracteres especiales.";
                break;
            case "lastName":
                let lastNamePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
                errors.lastName = value.startsWith(" ")?"El apellido no puede iniciar con un espacio.": lastNamePattern.test(value)? value.endsWith(" ")? "El apellido no puede terminar con espacio.":"":"El apellido no puede contener caracteres especiales.";
                break;
            case "password":
                let passwordPattern:RegExp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
                errors.password = passwordPattern.test(value)? "" : "Debe tener entre 8 y 16 caracteres y al menos 1 mayuscula, 1 minuscula y 1 número."
                break;
            case "user_mail":
                let user_mailPattern:RegExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
                errors.user_mail = user_mailPattern.test(value)? "" : "El campo ingresado debe ser un email valido."
                break;
            case "birthdate":
                let fechas = value;
                let year = fechas.split("-");
                let date = new Date();
                let dateNow = (date.getFullYear() + "-"+0+ (date.getMonth()+1)+ "-" +0+date.getDate());
                console.log(dateNow);
                console.log(fechas);
                errors.birthdate = dateNow<fechas? 'La fecha ingresada es invalida.' :year[0]>date.getFullYear()? 'La fecha ingresada es invalida.':year[0]<1940?'La año debe ser mayor a 1940': '';
                break;
            case "image":
                let urlPattern = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
                errors.image = urlPattern.test(value) ? '' : 'La url de la imagen no es una url valida.';
                break;
            default:
                break;
        }
        this.setState({
            [name]: value,
            errors
        });
        this.validarForm(this.state.errors)
    }

    handleSubmit(e:any){
        e.preventDefault();
        let { name, lastName, password, user_mail, birthdate, image} = this.state;
        name = this.firstWordUpperCase(name);
        lastName = this.firstWordUpperCase(lastName); 

        const newClient:type.newClientType = {
            name:name, lastName:lastName, password:password, user_mail:user_mail, born_date:birthdate, photo:image
        }

        postNewClient(newClient);
        let form = document.getElementById("form") as HTMLFormElement | null;
        form?.reset()
    }

  render() {
    return (
        <div>
            <HeaderRegister/>
            <div className='ClientRegister_component'>

                <div className='CR_divImages'>
                    <img src={image1} alt="place1" />
                    <img src={image2} alt="place1" />
                    <img src={image3} alt="place1" />
                </div>
                <div className='CR_divForm'>
                    <h1 className='CR_h1'>Empecemos</h1>
                    <p className='CR_goToLogin'>Ya tienes una cuenta? accede a <a href="#">Login</a></p>
                    <form className='CR_Form' id='form' onSubmit={(e) => e.preventDefault()}>
                        <div className='CR_Div_inputAndError'>
                            <input className='CR_inpunt' type="text" name="name" placeholder='Nombre' onChange={(e) => this.handleChange(e)}/>
                            {!this.state.errors.name ? null : <div className='CR_inputError'>{this.state.errors.name}</div>}
                        </div>
                        <div className='CR_Div_inputAndError'>
                            <input className='CR_inpunt' type="text" name="lastName" placeholder='Apellido' onChange={(e) => this.handleChange(e)}/>
                            {!this.state.errors.lastName ? null : <div className='CR_inputError'>{this.state.errors.lastName}</div>}
                        </div>
                        <div className='CR_Div_inputAndError'>
                            <input className='CR_inpunt' type="password" name="password" placeholder='Contraseña' onChange={(e) => this.handleChange(e)}/>
                            {!this.state.errors.password ? null : <div className='CR_inputError'>{this.state.errors.password}</div>}
                        </div>
                        <div className='CR_Div_inputAndError'>
                            <input className='CR_inpunt' type="email" name="user_mail" placeholder='E-mail' onChange={(e) => this.handleChange(e)}/>
                            {!this.state.errors.user_mail ? null : <div className='CR_inputError'>{this.state.errors.user_mail}</div>}
                        </div>
                        <div className='CR_Div_inputAndError'>
                            <input className='CR_inpunt' type="date" name="birthdate" placeholder='Fecha de Nacimiento' onChange={(e) => this.handleChange(e)}/>
                            {!this.state.errors.birthdate ? null : <div className='CR_inputError'>{this.state.errors.birthdate}</div>}
                        </div>
                        <div className='CR_Div_inputAndError'>
                            <input className='CR_inpunt' type="url" name="image" placeholder='URL - imagen de perfil' onChange={(e) => this.handleChange(e)}/>
                            {!this.state.errors.image ? null : <div className='CR_inputError'>{this.state.errors.image}</div>}
                        </div>
                        <input className='CR_inpuntSubmit' disabled={this.state.disabled} name="button" type="submit" value="Registrar" onClick={(e) => this.handleSubmit(e)} />
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

export default ClientRegister