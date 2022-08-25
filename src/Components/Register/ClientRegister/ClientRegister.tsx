import React, { Component } from "react";
import image1 from "../../../images/business-man-banner-concept-with-copy-space.jpg";
import * as type from "../../../Types";
import { changeLoading, postNewClient } from "../../../Redux/Reducer/reducer";
import "./ClientRegister.css";
import HeaderRegister from "../HeaderRegister/HeaderRegister";
import Axios, {AxiosResponse}  from "axios";
import Swal from "sweetalert2";
import { connect, ConnectedProps } from "react-redux";
import Loading from "../../Loading/Loading";

interface HeaderState {

}
export class ClientRegister extends Component<HeaderProps, HeaderState> {
  state: type.ClientType;
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      password: "",
      user_mail: "",
      birthdate: "",
      image: "",
      description: "",
      errors: {
        name: "Campo requerido.",
        lastName: "Campo requerido.",
        password: "Campo requerido",
        password2: "Campo requerido",
        user_mail: "Campo requerido",
        birthdate: "Campo requerido",
        image: "",
        description: "",
      },
      disabled: true,
    };
  }
  firstWordUpperCase(word: String) {
    return word[0].toUpperCase() + word.slice(1);
  }
  validarForm(errors: type.errorsType) {

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
      const response: AxiosResponse = await Axios.post("https://api.cloudinary.com/v1_1/luis-tourn/image/upload", formData);
      const data: any = response.data;
      return data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async handleChange(e: any) {
    const value = e.target.value;
    const name = e.target.name;
    let errors: type.errorsType;
    errors = this.state.errors;

    if (name === "image") {
      this.setState({
        image: e.target.files[0]
      });
      return
    };

    switch (name) {
      case "name":
        let namePattern: RegExp = /^(?!\s*$)[A-Za-z-Ñ-ñ _-]*$/;
        errors.name = value.startsWith(" ")
          ? "El nombre no puede iniciar con un espacio."
          : !namePattern.test(value)
          ? "El nombre no puede contener números o caracteres especiales."
          : value.endsWith(" ")
          ? "El nombre no puede terminar con espacio."
          : "";
        break;
      case "lastName":
        let lastNamePattern: RegExp = /^(?!\s*$)[A-Za-z-Ñ-ñ _-]*$/;
        errors.lastName = value.startsWith(" ")
          ? "El apellido no puede iniciar con un espacio."
          : lastNamePattern.test(value)
          ? value.endsWith(" ")
            ? "El apellido no puede terminar con espacio."
            : ""
          : "El apellido no puede contener números o caracteres especiales.";
        break;
      case "password":
        let passwordPattern: RegExp =
          /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        errors.password = passwordPattern.test(value)
          ? ""
          : "Debe tener entre 8 y 16 caracteres y al menos 1 mayuscula, 1 minuscula y 1 número.";
        break;
      case "password2":
        let passwordPattern2: RegExp =
          /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        errors.password2 = passwordPattern2.test(value)
          ? value !== this.state.password
            ? "Las contraseñas no coinciden"
            : ""
          : "Las contraseñas no coinciden";
        break;
      case "user_mail":
        let user_mailPattern: RegExp =
          /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        errors.user_mail = user_mailPattern.test(value)
          ? ""
          : "El campo ingresado debe ser un email valido.";
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
          0 +
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

    console.log(typeof this.state.image)
    let image = await this.postImageOnCloudinary(this.state.image);

    let { name, lastName, password, user_mail, birthdate, description } = this.state;
    name = name ? this.firstWordUpperCase(name) : name;
    lastName = lastName ? this.firstWordUpperCase(lastName) : lastName;

    const newClient: type.newClientType = {
      name: name,
      lastName: lastName,
      password: password,
      user_mail: user_mail,
      born_date: birthdate,
      photo: image,
      description: description,
    };
    await postNewClient(newClient);
    let form = document.getElementById("form") as HTMLFormElement | null;
    form?.reset();

    this.state = {
      name: "",
      lastName: "",
      password: "",
      user_mail: "",
      birthdate: "",
      image: "",
      description: "",
      errors: {
        name: "Campo requerido.",
        lastName: "Campo requerido.",
        password: "Campo requerido",
        password2: "Campo requerido",
        user_mail: "Campo requerido",
        birthdate: "Campo requerido",
        image: "",
        description: ""
      }, 
      disabled: true,
    }; 
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
  componentDidMount() {
    this.props.changeLoadingTrue();
    setTimeout(() => this.props.changeLoadingFalse(), 1000)
  }

  render() {
    return (
      <>
      {
        this.props.isLoading ? <Loading /> :

      <>
      <div>
        <HeaderRegister />
        <div className="ClientRegister_component">
          <div className="ClientRegister_imageContainer">
            <img className="ClientRegister_image" src={image1} alt="place1" />
          </div>
          <div className="CR_divForm">
            <h1 className="CR_h1">Empecemos</h1>
            <form
              className="CR_Form"
              id="form"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="CR_Div_inputAndError">
                <input
                  className="CR_input"
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.name ? null : (
                  <div className="CR_inputError">{this.state.errors.name}</div>
                )}
              </div>
              <div className="CR_Div_inputAndError">
                <input
                  className="CR_input"
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.lastName ? null : (
                  <div className="CR_inputError">
                    {this.state.errors.lastName}
                  </div>
                )}
              </div>
              <div className="CR_Div_inputAndError">
                <input
                  className="CR_input"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.password ? null : (
                  <div className="CR_inputError">
                    {this.state.errors.password}
                  </div>
                )}
              </div>
              <div className="CR_Div_inputAndError">
                <input
                  className="CR_input"
                  type="password"
                  name="password2"
                  placeholder="Repita contraseña"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.password2 ? null : (
                  <div className="CR_inputError">
                    {this.state.errors.password2}
                  </div>
                )}
              </div>
              <div className="CR_Div_inputAndError">
                <input
                  className="CR_input"
                  type="email"
                  name="user_mail"
                  placeholder="E-mail"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.user_mail ? null : (
                  <div className="CR_inputError">
                    {this.state.errors.user_mail}
                  </div>
                )}
              </div>
              <div className="CR_Div_inputAndError">
                <input
                  className="CR_input"
                  type="date"
                  name="birthdate"
                  placeholder="Fecha de Nacimiento"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.birthdate ? null : (
                  <div className="CR_inputError">
                    {this.state.errors.birthdate}
                  </div>
                )}
              </div>
              <div className="CR_Div_description">
                <textarea
                  className="CR_input"
                  name="description"
                  cols={40}
                  rows={5}
                  placeholder="Descripción personal..."
                  onChange={(e) => this.handleChange(e)}
              />
                {!this.state.errors.description ? null : (
                  <div className="CR_inputError">
                    {this.state.errors.description}
                  </div>
              )}
              </div>
              <div className="CR_Div_inputAndError">
                <input
                  className="CR_input"
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Imagen de perfil"
                  onChange={(e) => this.handleChange(e)}
                />
                {!this.state.errors.image ? null : (
                  <div className="CR_inputError">{this.state.errors.image}</div>
                )}
              </div>
              <input

                className="CR_inputSubmit"
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
    isLoading: state.workService.isLoading,
  };
};
export const mapDispatchToProps = (dispatch: any) => {
  return {
    changeLoadingTrue: () => dispatch(changeLoading(true)),
    changeLoadingFalse: () => dispatch(changeLoading(false)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type HeaderProps = ConnectedProps<typeof connector>;

export default connector(ClientRegister);
