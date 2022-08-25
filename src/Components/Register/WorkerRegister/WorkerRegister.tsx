import React, { Component } from "react";
import image1 from "../../../images/bannerWorker2.jpg";
import * as type from "../../../Types";
import { connect, ConnectedProps } from "react-redux";
import {
  postNewWorker,
  getAllProfession,
  getAllSkills,
  changeLoading,
} from "../../../Redux/Reducer/reducer";
import HeaderRegister from "../HeaderRegister/HeaderRegister";
import "./WorkerRegister.css";
import { resolve } from "node:path/win32";
import { createBrotliCompress } from "node:zlib";
import Axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";
//import { Redirect } from "react-router-dom";

interface HeaderState {}
export class WorkerRegister extends Component<HeaderProps, HeaderState> {
  state: type.WorkerType;
  constructor(props: HeaderProps) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      password: "",
      user_mail: "",
      birthdate: "",
      image: "",
      profession: [],
      skills: [],
      description: "",
      errors: {
        name: "Campo requerido.",
        lastName: "Campo requerido.",
        password: "Campo requerido.",
        password2: "Campo requerido",
        user_mail: "Campo requerido.",
        birthdate: "Campo requerido.",
        image: "",
        description: "",
      },
      disabled: true,
      inputProfessions: [],
      inputSkills: [],
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.props.getAllProfession();
    this.props.getAllSkills();
    this.props.changeLoadingTrue();
    setTimeout(() => this.props.changeLoadingFalse(), 2500)
  }

  firstWordUpperCase(word: String) {
    console.log(word);
    return word[0].toUpperCase() + word.slice(1);
  }

  validarForm(errors: type.errorsTypeWorker) {
    let valid = true;
    Object.values(errors).forEach(
      (val: any) => val.length > 0 && (valid = false)
    );
    if (valid) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  async postImageOnCloudinary(e: any) {
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "re-work");

    try {
      const response: AxiosResponse = await Axios.post(
        "https://api.cloudinary.com/v1_1/luis-tourn/image/upload",
        formData
      );
      const data: any = response.data;
      return data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async handleChange(e: any) {
    const value = e.target.value;
    const name = e.target.name;
    let errors: type.errorsTypeWorker;
    errors = this.state.errors;

    if (name === "image") {
      this.setState({
        image: e.target.files[0],
      });
      return;
    }

    switch (name) {
      case "name":
        let namePattern: RegExp = /^(?!\s*$)[A-Za-z-Ñ-ñ _-]*$/;
        errors.name = value.startsWith(" ")
          ? "El nombre no puede iniciar con un espacio"
          : namePattern.test(value)
          ? value.endsWith(" ")
            ? "El nombre no puede terminar con espacio"
            : ""
          : "El nombre no puede contener números o caracteres especiales.";
        break;
      case "lastName":
        let lastNamePattern: RegExp = /^(?!\s*$)[A-Za-z-Ñ-ñ _-]*$/;
        errors.lastName = value.startsWith(" ")
          ? "El apellido no puede iniciar con un espacio"
          : lastNamePattern.test(value)
          ? value.endsWith(" ")
            ? "El apellido no puede terminar con espacio"
            : ""
          : "El apellido no puede contener números o caracteres especiales.";
        break;
      case "password":
        let passwordPattern: RegExp =
          /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        errors.password = passwordPattern.test(value)
          ? ""
          : "Debe tener entre 8 y 16 caracteres, 1 mayuscula, 1 minuscula y un 1 número.";
        break;
      case "password2":
        let passwordPattern2: RegExp =
          /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        errors.password2 = passwordPattern2.test(value)
          ? value === this.state.password
            ? ""
            : "Las contraseñas no coinciden"
          : "Las contraseñas no coinciden";
        break;
      case "user_mail":
        let user_mailPattern: RegExp =
          /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;
        errors.user_mail = value.startsWith(" ")
          ? "El mail no puede iniciar con un espacio"
          : user_mailPattern.test(value)
          ? value.endsWith(" ")
            ? "el mail no puede terminar con espacio"
            : ""
          : "mail inválido";
        break;
      case "birthdate":
        let fechas = value;
        let year = fechas.split("-");
        let date = new Date();
        let dateNow =
          date.getFullYear() +
          "-" +
          0 +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
        errors.birthdate =
        dateNow < fechas
          ? "La fecha ingresada es inválida."
          : year[0] > date.getFullYear()
          ? "La fecha ingresada es inválida."
          : year[0] < 1940
          ? "El año debe ser mayor a 1940"
          : parseInt(year[0]) + 18> date.getFullYear() 
          ? "Debes ser mayor de edad"
          : parseInt(year[0]) + 18 === date.getFullYear() && parseInt(year[1]) > (date.getMonth() + 1)
          ? "Debes ser mayor de edad"
          : parseInt(year[0]) + 18=== date.getFullYear() && parseInt(year[1]) === (date.getMonth() + 1) && parseInt(year[2]) > date.getDate()
          ? "Debes ser mayor de edad"
          : "";
        break;
    case "description":
      errors.description = value.startsWith(" ") ?
      "La descripción no puede iniciar con un espacio."
      : this.state.description.length > 500 ?
      "La cantidad máxima de caracteres es 500."
      : value.endsWith(" ") ?
      "La descripción no puede terminar en espacio."
      :"";
      break;
    default:
        break;
    }
    this.setState({
      [name]: value,
      errors,
    });
    this.validarForm(this.state.errors);
  }

  async handleSubmit(e: any) {
    e.preventDefault();
    let image = await this.postImageOnCloudinary(this.state.image);

  let { name, lastName, password, user_mail, birthdate, profession, skills, description} = this.state;
  name = name?this.firstWordUpperCase(name):name;
  lastName = lastName? this.firstWordUpperCase(lastName):lastName; 

  const newWorker:type.newWorkerType = {
    name:name, lastName:lastName, password:password, user_mail:user_mail, born_date:birthdate, photo:image, profession:profession, skills:skills, description:description
  }
  await postNewWorker(newWorker);
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
        password2: "",
        user_mail: "",
        birthdate: "",
        image: "",
      },
      disabled: true,
      inputProfessions: [],
      inputSkills: []
  })
  Swal.fire({
    icon: 'success',
    title: 'Registro exitoso',
    text: 'En los próximos minutos un enlace para validar tu cuenta será enviado a tu correo'
}).then((result) => {
  if (result.isConfirmed){
    window.open("https://re-work-ten.vercel.app/home", "_self")
  }
})  
}

  handleSelect(e: any) {
    const select = e.target.value;
    const name = e.target.name;
    if (select === "default") return;
    if (this.state.profession?.includes(e.target.value)) return;
    if (this.state.skills?.includes(e.target.value)) return;
    if (name === "profession") {
      this.setState({
        ...this.state,
        profession: [...this.state.profession, select],
        /*inputProfessions:[...this.state.inputProfessions, 
    this.props.professions?.find((e:any) => e === select)]*/
      });
    } else {
      this.setState({ ...this.state, skills: [...this.state.skills, select] });
    }
    console.log(this.state.profession)
  }

  handleDelete(e: any) {
    let del = e.target.innerText;
    const name = e.target.id;
    if (name === "professions") {
      let borrado = this.state.profession.filter((f) => f !== del.trim());
      this.setState({ ...this.state, profession: borrado });
    } else {
      let borrado2 = this.state.skills.filter((g) => g !== del.trim());
      this.setState({ ...this.state, skills: borrado2 });
    }
  }

  render() {
    return (
      <>
      {
        this.props.isLoading ? <Loading /> :
      <>
      <div className="WorkerRegister_component">
        <HeaderRegister />
        <div className="Worker_registerContent">
          <div className="Worker_imageContainer">
            <img className="Worker_registerImage" src={image1} alt="place1" />
          </div>
          <div className="Worker_registerDivForm">
            <form
              className="Worker_registerForm"
              id="form"
              onSubmit={(e) => e.preventDefault()}
            >
              <h1 className="CR_h1">Empecemos</h1>
              <div className="Worker_names">
                <div className="Worker_Input">
                  <input
                    className="CR_inpunt"
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    onChange={(e) => this.handleChange(e)}
                  />
                  {!this.state.errors.name ? (
                    <div className="Worker_brpw" />
                  ) : (
                    <div className="Worker_error">{this.state.errors.name}</div>
                  )}
                </div>
                <div className="Worker_Input">
                  <input
                    className="CR_inpunt"
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    onChange={(e) => this.handleChange(e)}
                  />
                  {!this.state.errors.lastName ? (
                    <div className="Worker_brpw" />
                  ) : (
                    <div className="Worker_error">
                      {this.state.errors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="Worker_Input">
                <input
                  className="CR_inpunt"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.password ? (
                  <div className="Worker_brpw" />
                ) : (
                  <div className="CR_inputError">
                    {this.state.errors.password}
                  </div>
                )}
              </div>
              <div className="Worker_Input">
                <input
                  className="CR_inpunt"
                  type="password"
                  name="password2"
                  placeholder="Repita contraseña"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.password2 ? (
                  <div className="Worker_br" />
                ) : (
                  <div className="CR_inputError">
                    {this.state.errors.password2}
                  </div>
                )}
              </div>
              <div className="Worker_mailDate">
                <div className="Worker_Input">
                  <input
                    className="CR_inpunt"
                    type="date"
                    name="birthdate"
                    placeholder="Fecha de Nacimiento"
                    onChange={(e) => this.handleChange(e)}
                  />
                  {!this.state.errors.birthdate ? <div className='Worker_br'/> : <div className='Worker_error'>{this.state.errors.birthdate}</div>                  }
                </div>
                <div className='Worker_Input'>
                  <input className="CR_inpunt" type="email" name="user_mail" placeholder='E-mail' onChange={(e) => this.handleChange(e)}/>
                  {!this.state.errors.user_mail ? <div className='Worker_br'/> : <div className='Worker_error'>{this.state.errors.user_mail}</div>}
                </div>
                </div>
              <div className='Worker_description'>
                <textarea className='CR_input' name="description" placeholder='Descripción profesional...' cols={40} rows={5} onChange={(e) => this.handleChange(e)}/>
                {!this.state.errors.description ? <div className='Worker_br'/> : <div className='Worker_error'>{this.state.errors.description}</div>}
              </div>
              <div className="Worker_image">
                <input
                  className="Worker_image"
                  type="file"
                  name="image"
                  placeholder="carga una imagen de perfil"
                  accept="image/*"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.image ? (
                  <div className="Worker_br" />
                ) : (
                  <div className="Worker_error">{this.state.errors.image}</div>
                )}
              </div>
              <div className="Worker_bothInputs">
                <div className="Worker_profession">
                  <select
                    name="profession"
                    id="profession"
                    onChange={(e) => this.handleSelect(e)}
                  >
                    <option selected={true} hidden>
                      Profesiones
                    </option>
                    {this.props.professions?.map((e: any) => {
                      return (
                        <option value={e} key={e}>
                          {" "}
                          {e}{" "}
                        </option>
                      );
                    })}
                  </select>
                  <div className="profession_div">
                    {this.state.profession?.map((e: any) => {
                      return (
                        <span
                          className="profession_btn"
                          id="professions"
                          key={e}
                          onClick={(e) => this.handleDelete(e)}
                        >{`${e}`}</span>
                      );
                    })}
                  </div>
                </div>
                <div className="Worker_skills">
                  <select
                    name="skills"
                    id="skill"
                    onChange={(e) => this.handleSelect(e)}
                  >
                    <option selected={true} hidden>
                      Habilidades
                    </option>
                    {this.props.skills?.map((e: any) => {
                      return (
                        <option value={e} key={e}>
                          {" "}
                          {e}{" "}
                        </option>
                      );
                    })}
                  </select>
                  <div className="skills_div">
                    {this.state.skills?.map((e: any) => {
                      return (
                        <span
                          className="skills_btn"
                          id="skills"
                          key={e}
                          onClick={(e) => this.handleDelete(e)}
                        >{`${e}`}</span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <input
                className="Worker_submit"
                disabled={this.state.disabled}
                name="button"
                type="submit"
                value="Registrar"
                onClick={(e) => this.handleSubmit(e)}
              />
            </form>
          </div>
        </div>
      </div>
      </>
      }
      </>
    );
  }
}

export const mapStateToProps = (state: any) => {
  return {
    professions: state.workService.professions,
    skills: state.workService.skills,
    isLoading: state.workService.isLoading,
  };
};
export const mapDispatchToProps = (dispatch: any) => {
  return {
    postNewWorker: (newWorker: type.newWorkerType) =>
      dispatch(postNewWorker(newWorker)),
    getAllProfession: () => dispatch(getAllProfession()),
    getAllSkills: () => dispatch(getAllSkills()),
    changeLoadingTrue: () => dispatch(changeLoading(true)),
    changeLoadingFalse: () => dispatch(changeLoading(false)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type HeaderProps = ConnectedProps<typeof connector>;

export default connector(WorkerRegister);
