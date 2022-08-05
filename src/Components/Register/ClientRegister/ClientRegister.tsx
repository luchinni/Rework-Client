import React, { Component } from 'react'
import image1 from "../../../images/Online report_Monochromatic.png"
import image2 from "../../../images/Bank note_Monochromatic.png"
import image3 from "../../../images/Money motivation _Monochromatic.png"

export class ClientRegister extends Component {

    constructor(props:any) {
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
                <input type="text" name="name" placeholder='Nombre'/>
                <input type="text" name="lastname" placeholder='Apellido'/>
                <input type="password" name="password" placeholder='Contraseña'/>
                <input type="email" name="user_mail" placeholder='E-mail'/>
                <input type="date" name="birthdate" placeholder='Fecha de Nacimiento'/>
                <input type="url" name="image" placeholder='URL - imagen de perfil'/>
                <input /*disabled={this.state.disabled}*/ name="button" type="submit" value="Registrar" /*onClick={(e) => handleSubmit(e)}*/ />
            </form>
        </div>
    </div>
    )
  }
}

export default ClientRegister