import decode from "jwt-decode";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  putEditProfileClient,
} from "../../../Redux/Reducer/reducer";
import { ClientTypeUpdate, errorsTypeEditClient } from "../../../Types";

function FormEditProfileClient( { props } : any) {
  const userLogged = useSelector((state: any) => state.workService.userLogged);
  const dispatch = useDispatch();

  const [client, setClient] = React.useState<ClientTypeUpdate>({
    name: "",
    lastName: "",
    born_date: "",
    photo: "",
  });

  const [errors, setErrors] = React.useState<errorsTypeEditClient>({
    name: "",
    lastName: "",
    birthdate: "",
    image: "",
    disabled: true,
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
    } else {
      setErrors({
        ...errors,
        disabled: true,
      });
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
            : year[0] < 1910
            ? "El año debe ser mayor a 1940"
            : "";
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
    let { name, lastName, born_date, photo } = client;
    name = name ? firstWordUpperCase(name) : name;
    lastName = lastName ? firstWordUpperCase(lastName) : lastName;

    const newClient: ClientTypeUpdate = {
      name: name,
      lastName: lastName,
      born_date: born_date,
      photo: photo,
    };
    const id = userLogged.id;
    putEditProfileClient(newClient, id)
    .then(() => {
      dispatch(getUserById(tokenDecode));
    });
    let form = document.getElementById("form") as HTMLFormElement | null;
    form?.reset();
    props(false)
  }

  function handleClose () {
    props(false)
  }

  return (
    <div>
      <div>
        <button onClick={() => handleClose()}>x</button>
      </div>
      {
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              className="Update_inpunt"
              type="text"
              name="name"
              placeholder="Nombre"
              onChange={(e) => handleChange(e)}
            />
            {!errors.name ? null : (
              <div className="Update_inputError">{errors.name}</div>
            )}
          </div>
          <div>
            <input
              className="Update_inpunt"
              type="text"
              name="lastName"
              placeholder="Apellido"
              onChange={(e) => handleChange(e)}
            />
            {!errors.lastName ? null : (
              <div className="Update_inputError">{errors.lastName}</div>
            )}
          </div>
          <div>
            <input
              className="Update_inpunt"
              type="date"
              name="birthdate"
              placeholder="Fecha de Nacimiento"
              onChange={(e) => handleChange(e)}
            />
            {!errors.birthdate ? null : (
              <div className="Update_inputError">{errors.birthdate}</div>
            )}
          </div>
          <div>
            <input
              className="Update_inpunt"
              type="file"
              accept="image/*"
              name="image"
              placeholder="Imagen de perfil"
              onChange={(e) => handleChange(e)}
            />
            {!errors.image ? null : (
              <div className="Update_inputError">{errors.image}</div>
            )}
          </div>
          <input
            className="Update_inpuntSubmit"
            disabled={errors.disabled}
            name="button"
            type="submit"
            value="Actualizar"
            onClick={(e) => {
              handleSubmit(e)
            }}
          />
        </form>
      }
    </div>
  );
}

export default FormEditProfileClient;
