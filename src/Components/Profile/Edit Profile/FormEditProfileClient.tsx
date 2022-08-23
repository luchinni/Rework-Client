import decode from "jwt-decode";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  putEditProfileClient,
} from "../../../Redux/Reducer/reducer";
import { ClientTypeUpdate, errorsTypeEditClient } from "../../../Types";
import "./FormEditProfileClient.css";
import Swal from 'sweetalert2';

function FormEditProfileClient({ props }: any) {
  const userLogged = useSelector((state: any) => state.workService.userLogged);
  const dispatch = useDispatch();

  const [client, setClient] = React.useState<ClientTypeUpdate>({
    name: userLogged.name,
    lastName: userLogged.lastName,
    born_date: "",
    photo: "",
    description: "",
  });

  const [errors, setErrors] = React.useState<errorsTypeEditClient>({
    name: "",
    lastName: "",
    birthdate: "",
    image: "",
    description: "",
    disabled: false,
  });

  async function parseImage(e: any, cb: Function) {
    let file = e.target.files[0];
    let reader: any = new FileReader();
    reader.onload = async function () {
      reader.result?.replace("data:", "").replace(/^.+,/, "");
      cb(reader.result);
    };
    await reader.readAsDataURL(file);
  }

  function firstWordUpperCase(word: String) {
    return word[0].toUpperCase() + word.slice(1);
  }

  function validarForm(errors: errorsTypeEditClient) {
    let valid = true;
    Object.values(errors).forEach(
      (val: any) => val.length > 0 && (valid = false)
    );
    if (valid) {
      setErrors({
        ...errors,
        disabled: false,
      });
      let inputSubmit = document.getElementById("btnEditDisabled")
      inputSubmit?.setAttribute("id","btnEditEnabled")
    } else {
      setErrors({
        ...errors,
        disabled: true,
      });
      let inputSubmit = document.getElementById("btnEditEnabled")
      inputSubmit?.setAttribute("id","btnEditDisabled")
    }
  }

  async function handleChange(e: any) {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    let error: errorsTypeEditClient = errors;

    if (name === "image") {
      return await parseImage(e, (base64String: string) => {
        setClient({
          ...client,
          photo: base64String,
        });
      });
    }

    switch (name) {
      case "name":
        let namePattern: RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/;
        error.name = value.startsWith(" ")
          ? "El nombre no puede iniciar con un espacio."
          : !namePattern.test(value)
          ? "El nombre no puede contener caracteres especiales."
          : value.endsWith(" ")
          ? "El nombre no puede terminar con espacio."
          : "";
        break;
      case "lastName":
        let lastNamePattern: RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/;
        error.lastName = value.startsWith(" ")
          ? "El apellido no puede iniciar con un espacio."
          : lastNamePattern.test(value)
          ? value.endsWith(" ")
            ? "El apellido no puede terminar con espacio."
            : ""
          : "El apellido no puede contener caracteres especiales.";
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
        error.birthdate =
          dateNow < fechas
            ? "La fecha ingresada es invalida."
            : year[0] > date.getFullYear()
            ? "La fecha ingresada es invalida."
            : year[0] < 1940
            ? "El año debe ser mayor a 1940"
            : "";
        break;
      case "description":
        error.description = value.startsWith(" ") ?
        "La descripción no puede iniciar con un espacio."
        : client.description.length > 500 ?
        "La cantidad máxima de caracteres es 500."
        : value.endsWith(" ") ?
        "La descripción no puede terminar en espacio."
        :"";
        break;  
      default:
        break;
    }
    validarForm(error);
    setClient({ ...client, [name]: value });
  }

  function onSubmit(e: any) {
    e.preventDefault();
  }

  const token: any = localStorage.getItem("token");
  let tokenDecode: any;
  if (token) tokenDecode = decode(token);

  function handleSubmit(e: any) {
    e.preventDefault();
    let { name, lastName, born_date, photo, description } = client;
    name = name ? firstWordUpperCase(name) : name;
    lastName = lastName ? firstWordUpperCase(lastName) : lastName;

    const newClient: ClientTypeUpdate = {
      name: name,
      lastName: lastName,
      born_date: born_date,
      photo: photo,
      description: description,
    };
    const id = userLogged.id;
    putEditProfileClient(newClient, id).then(() => {
      dispatch(getUserById(tokenDecode));
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Datos actualizados correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    });
    let form = document.getElementById("form") as HTMLFormElement | null;
    form?.reset();
    props(false);
  }

  function handleClose() {
    props(false);
  }

  return (
      <div className="updateCli_mainContainer">
        <div className="updateCli_closeBtnContainer">
          <button className="updateCli_closeBtn" onClick={() => handleClose()}>
            x
          </button>
        </div>
        <form className="updateCli_Form" onSubmit={(e) => onSubmit(e)}>
          <div className="update_Div_inputAndError">
            <input
              required
              className="update_inpunt"
              type="text"
              name="name"
              defaultValue={userLogged.name}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <span>Nombre</span>
            {!errors.name ? null : (
              <div className="update_inputError">{errors.name}</div>
            )}
          </div>
          <div className="update_Div_inputAndError">
            <input
              required
              className="update_inpunt"
              type="text"
              name="lastName"
              defaultValue={userLogged.lastName}
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <span>Apellido</span>
            {!errors.lastName ? null : (
              <div className="update_inputError">{errors.lastName}</div>
            )}
          </div>
          <div className="update_Div_inputAndError">
            <input
              required
              className="update_inpunt"
              id= 'birthday_input'
              type="date"
              name="birthdate"
              onChange={(e) => handleChange(e)}
              />
              <span>Fecha de Nacimiento</span>
            {!errors.birthdate ? null : (
              <div className="update_inputError">{errors.birthdate}</div>
              )}
          </div>
          <div className="update_Div_inputAndError">
              <input
              className="update_description"
              id="description_input"
              type="text"
              name="description"
              onChange={(e)=> handleChange(e)}
              />
              <span>Descripción</span>
              {!errors.description ? null : (
                <div className="update_inputError">{errors.description}</div>
              )}
            </div>
          <div className="update_Div_inputFile">
            <input
              className="update_inpuntImg"
              id="file_input"
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {!errors.image ? null : (
              <div className="update_inputError">{errors.image}</div>
            )}
          </div>
          <div className="updateCli_submitBtnContainer">
            <input
              className="update_inputSubmit"
              disabled={errors.disabled}
              id= "btnEditEnabled"
              name="button"
              type="submit"
              value="Actualizar"
              onClick={(e) => {
                handleSubmit(e);
              }}
            />
          </div>
        </form>
      </div>
  );
}

export default FormEditProfileClient;
