import React, { Component } from 'react'
import image1 from "../../../images/Online report_Monochromatic.png"
import image2 from "../../../images/Bank note_Monochromatic.png"
import image3 from "../../../images/Money motivation _Monochromatic.png"
import * as type from "../../../Types"

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
                name: "",
                lastName: "",
                password: "",
                user_mail: "",
                birthdate: "",
                image: "",
            },
            disabled: true
        }
    }

    firstWordUpperCase(word:any) {
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
                errors.name = value.startsWith(" ")?"El nombre no puede iniciar con un espacio": namePattern.test(value)? value.endsWith(" ")? "El nombre no puede terminar con espacio":"":"El nombre no puede contener caracteres especiales";
                break;
            case "lastName":
                
                break;
            case "password":
            
                break;
            case "user_mail":
            
                break;
            case "birthdate":
            
                break;
            case "image":
            
                break;

            default:
                break;
        }
    }

  render() {
    return (
        <div>
        
        <div>
            <img src={image1} alt="place1" />
            <img src={image2} alt="place1" />
            <img src={image3} alt="place1" />
        </div>
        <div>
            <h1>Empecemos</h1>
            <p>Ya tienes una cuenta? accede a <a href="#">Login</a></p>
            <form id='form' onSubmit={(e) => e.preventDefault()}>
                <input type="text" name="name" placeholder='Nombre' onChange={(e) => this.handleChange(e)}/>
                <input type="text" name="lastname" placeholder='Apellido' onChange={(e) => this.handleChange(e)}/>
                <input type="password" name="password" placeholder='Contraseña' onChange={(e) => this.handleChange(e)}/>
                <input type="email" name="user_mail" placeholder='E-mail' onChange={(e) => this.handleChange(e)}/>
                <input type="date" name="birthdate" placeholder='Fecha de Nacimiento' onChange={(e) => this.handleChange(e)}/>
                <input type="url" name="image" placeholder='URL - imagen de perfil' onChange={(e) => this.handleChange(e)}/>
                <input /*disabled={this.state.disabled}*/ name="button" type="submit" value="Registrar" /*onClick={(e) => this.handleChange(e)}*/ />
            </form>
        </div>
    </div>
    )
  }
}

export default ClientRegister