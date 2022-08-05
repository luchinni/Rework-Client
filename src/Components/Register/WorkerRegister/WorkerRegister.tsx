import React, { Component } from 'react';
import image1 from "../../../images/Coins_Monochromatic.png";
import image2 from "../../../images/Piggy_bank_Monochromatic.png";
import image3 from "../../../images/Video_call_Monochromatic_1.png";
import * as type from "../../../Types";

export class WorkerRegister extends Component {
  state: type.WorkerType;
  inputSkills: string[]
  constructor(props: type.WorkerType) {
    super(props)
    this.inputSkills = []

    this.state = {
      name: "",
      lastName: "",
      password: "",
      user_mail: "",
      birthdate: "",
      image: "",
      profession: [],
      skills: [],
      errors: {
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
    return word[0].toUpperCase() + word.slice(1); //ver 2 nombres y 2 apellidos
}

validarForm(errors:type.errorsTypeWorker) {
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
  let errors:type.errorsTypeWorker;
  errors = this.state.errors;

  switch (name) {
    case "name":
        let namePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
        errors.name = value.startsWith(" ")?"El nombre no puede iniciar con un espacio": namePattern.test(value)? value.endsWith(" ")? "El nombre no puede terminar con espacio":"":"El nombre no puede contener caracteres especiales";
        break;
    case "lastName":
      let lastNamePattern:RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/
      errors.lastName = value.startsWith(" ")?"El apellido no puede iniciar con un espacio": lastNamePattern.test(value)? value.endsWith(" ")? "El apellido no puede terminar con espacio":"":"El apellido no puede contener caracteres especiales";
        break;
    case "password":
      let passwordPattern:RegExp = /^(?=\w\d)(?=\w[A-Z])(?=\w*[a-z])\S{8,16}$/
      errors.password = value.startsWith(" ")? "La contraseña no puede iniciar con un espacio": passwordPattern.test(value)? value.endsWith(" ")? "La contraseña no puede terminar con espacio" : "" : "La contraseña debe tener entre 8 y 16 caracteres, al menos 1 mayúscula y 1 minúscula";
        break;
    case "user_mail":
      let user_mailPattern:RegExp = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i
      errors.user_mail = value.startsWith(" ")? "El mail no puede iniciar con un espacio": user_mailPattern.test(value) ? value.endsWith(" ")? "el mail no puede terminar con espacio" : "" : "mail inválido";
        break;
    case "birthdate":
      let fechas = value;
      let year = fechas.split("-");
      let date = new Date();
      let dateNow = (date.getFullYear() + "-"+0+ (date.getMonth()+1)+ "-" +date.getDate());
      errors.birthdate = dateNow<fechas? 'La fecha ingresada es invalida.' :year[0]>date.getFullYear()? 'La fecha ingresada es invalida.':year[0]<1940?'La año debe ser mayor a 1940': '';
        break;
    case "image":
      let urlPattern = /[-a-zA-Z0-9@:%.~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%.~#?&//=]*)?/gi;
      errors.image = urlPattern.test(value) ? '' : 'La url de la imagen no es una url valida.';
        break;

    default:
        break;
  }
}

handleSubmit(e:any){
this.setState(this.state.skills = this.inputSkills)

}

  render() {

    return (
      <div>

        <div>
          <img src={image1} alt="place1" />
            <img src={image2} alt="place2" />
            <img src={image3} alt="place3" />
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
            <input type="text" name="profession" placeholder='Profesiones' />
            <input type="text" name="skills" placeholder='Habilidades' onChange={(e) => this.handleChange(e)}/>
            <span>Ingeniero, Diseñador</span>
            <span>Phyton, Css...</span>
            <input disabled={this.state.disabled} name="button" type="submit" value="Registrar" onClick={(e) => this.handleSubmit(e)} />
          </form>
        </div>
      </div>
    )
  }
}

export default WorkerRegister