import React, { Component } from 'react';
import image1 from "../../../images/Coins_Monochromatic.png";
import image2 from "../../../images/Piggy_bank_Monochromatic.png";
import image3 from "../../../images/Video_call_Monochromatic_1.png";
import * as type from "../../../Types";
import { connect, ConnectedProps } from "react-redux";
import {postNewWorker, getAllProfession, getAllSkills} from "../../../Redux/Reducer/reducer"
import HeaderRegister from '../HeaderRegister/HeaderRegister';
import './WorkerRegister.css';
import { resolve } from 'node:path/win32';
import { createBrotliCompress } from 'node:zlib';

interface HeaderState{

}
export class WorkerRegister extends Component<HeaderProps, HeaderState> {
  state: type.WorkerType;
  constructor(props: HeaderProps) {
    super(props)

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
        name: "Campo requerido.",
        lastName: "Campo requerido.",
        password: "Campo requerido.",
        user_mail: "Campo requerido.",
        birthdate: "Campo requerido.",
        image: "",
      },
      disabled: true,
      inputProfessions: [],
      inputSkills: []
    }
    this.setState = this.setState.bind(this);
  }

componentDidMount(){
  this.props.getAllProfession();
  this.props.getAllSkills()
}

  firstWordUpperCase(word:String) {
    console.log(word);
    return word[0].toUpperCase() + word.slice(1);
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

async parseImage(e:any, cb:Function){
  let file = e.target.files[0]
  let reader:any = new FileReader();
  let base64String:any = reader.onload = async function(){
    base64String = reader.result?.replace("data:","").replace(/^.+,/,""); 
    //resolve(reader.result);
    cb(reader.result)
    // this.setState({
    //   image:base64String
    // })
  }
  const algo = await reader.readAsDataURL(file);
  console.log(reader.result);
}

async handleChange(e:any) {
  const value = e.target.value;
  const name = e.target.name;
  let errors:type.errorsTypeWorker;
  errors = this.state.errors;

  if(name==="image"){
     return await this.parseImage(e, (base64String:any) => {
      this.setState({
         image:base64String
       })
     })
}

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
      let passwordPattern:RegExp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
      errors.password = passwordPattern.test(value)? "" : "La contraseña debe tener entre 8 y 16 caracteres y al menos 1 mayuscula, 1 minuscula y un 1 número."
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

  let { name, lastName, password, user_mail, birthdate, image, profession, skills} = this.state;
  name = name?this.firstWordUpperCase(name):name;
  lastName = lastName? this.firstWordUpperCase(lastName):lastName; 

  const newWorker:type.newWorkerType = {
    name:name, lastName:lastName, password:password, user_mail:user_mail, born_date:birthdate, photo:image, profession:profession, skills:skills
  }
  postNewWorker(newWorker);
  let form = document.getElementById("form") as HTMLFormElement | null;
      form?.reset()

  this.setState({
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
      disabled: true,
      inputProfessions: [],
      inputSkills: []
  })

}

handleSelect(e:any){
  const select = e.target.value;
  const name = e.target.name
  if (select === "default") return
  if(this.state.profession?.includes(e.target.value)) return
  if(this.state.skills?.includes(e.target.value)) return
  if(name === "profession"){
    this.setState({...this.state,
    profession:[...this.state.profession, select],
    /*inputProfessions:[...this.state.inputProfessions, 
    this.props.professions?.find((e:any) => e === select)]*/})
  }else{  
    this.setState({...this.state,
    skills:[...this.state.skills, select]})}

}

handleDelete(e:any){
    
  let del = e.target.innerText
console.log(del)
  const name = e.target.id
  if(name === "profession"){
    let borrado = this.state.profession.filter(f => f !== del.trim())
    this.setState({...this.state, profession: borrado})
   } else {
     let borrado2 = this.state.skills.filter(g => g !== del.trim())
     this.setState({...this.state, skills: borrado2})
   }
  
}

  render() {
    return (
      <div className='WorkerRegister_component'>
        <HeaderRegister/>
        <div className='Worker_registerContent'>

          <div className='Worker_registerDivImage'>
            <img className='Worker_registerImage' src={image1} alt="place1" />
            <img className='Worker_registerImage' src={image2} alt="place2" />
            <img className='Worker_registerImage' src={image3} alt="place3" />
          </div>
          <div className='Worker_registerDivForm'>
            <h1>Empecemos</h1>
            <form className='Worker_registerForm' id='form' onSubmit={(e) => e.preventDefault()}>
              <input type="text" name="name" placeholder='Nombre' onChange={(e) => this.handleChange(e)}/>
              {!this.state.errors.name ? null : <div>{this.state.errors.name}</div>}
              <input type="text" name="lastName" placeholder='Apellido' onChange={(e) => this.handleChange(e)}/>
              {!this.state.errors.lastName ? null : <div>{this.state.errors.lastName}</div>}
              <input type="password" name="password" placeholder='Contraseña' onChange={(e) => this.handleChange(e)}/>
              {!this.state.errors.password ? null : <div>{this.state.errors.password}</div>}
              <input type="email" name="user_mail" placeholder='E-mail' onChange={(e) => this.handleChange(e)}/>
              {!this.state.errors.user_mail ? null : <div>{this.state.errors.user_mail}</div>}
              <input type="date" name="birthdate" placeholder='Fecha de Nacimiento' onChange={(e) => this.handleChange(e)}/>
              {!this.state.errors.birthdate ? null : <div>{this.state.errors.birthdate}</div>}
              <input type="file" name="image" placeholder='carga una imagen de perfil' accept="image/*" onChange={(e) => this.handleChange(e)}/>
              {!this.state.errors.image ? null : <div>{this.state.errors.image}</div>}
              <select name="profession" id='profession' onChange={(e) => this.handleSelect(e)}>
                  <option selected={true} hidden>Profesiones</option>
                  {
                    this.props.professions?.map((e:any) =>{
                        return <option value={e} key={e}> {e} </option>
                    })
                  }
              </select>
              <div className='profession_div'>
                {this.state.profession?.map((e:any) => {
                  return (<span className='profession_btn' id="profession" key={e} onClick = {(e) => this.handleDelete(e)}>{`${e}`}</span>)
                })}
              </div>

              <select  name="skills" id='skills' onChange={(e) => this.handleSelect(e)}>
                  <option selected={true} hidden>Habilidades</option>
                  {
                    this.props.skills?.map((e:any) =>{
                        return <option value={e} key={e}> {e} </option>
                    })
                  }
              </select>
              <div className='skills_div'>
                {this.state.skills?.map((e:any) => {
                  return (<span className='skills_btn' id="skills" key={e} onClick = {(e) => this.handleDelete(e)}>{`${e}`}</span>)
                })}
              </div>  
                  
              <span>Ingeniero, Diseñador</span>
              <span>Phyton, Css...</span>
              <input disabled={this.state.disabled} name="button" type="submit" value="Registrar" onClick={(e) => this.handleSubmit(e)} />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

 export const mapStateToProps = (state:any) => {
   return {
       professions: state.workService.professions,
       
        skills: state.workService.skills
   }
 };
 export const mapDispatchToProps = (dispatch:any) => {
   return {
    postNewWorker: (newWorker:type.newWorkerType) => dispatch(postNewWorker(newWorker)),
    getAllProfession: () => dispatch(getAllProfession()),
    getAllSkills: () => dispatch(getAllSkills())
   }
 };

 const connector = connect(mapStateToProps, mapDispatchToProps)

 type HeaderProps = ConnectedProps<typeof connector>

 export default connector(WorkerRegister)