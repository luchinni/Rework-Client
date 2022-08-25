import decode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProfession,
  getAllSkills,
  getUserById,
  putEditProfileWorker,
} from "../../../Redux/Reducer/reducer";
import { errorsTypeEditWorker, WorkerTypeUpdate } from "../../../Types";
import './FormEditProfileWorker.css';
import Swal from 'sweetalert2';
import { isBreakOrContinueStatement } from "typescript";


function FormEditProfileWorker({ props }: any) {
  const userLogged = useSelector((state: any) => state.workService.userLogged);
  const professions = useSelector(
    (state: any) => state.workService.professions
  );
  console.log(userLogged);
  const skills = useSelector((state: any) => state.workService.skills);
  const dispatch = useDispatch();

  const [worker, setWorker] = React.useState<WorkerTypeUpdate>({
    name: userLogged.name,
    lastName: userLogged.lastName,
    born_date: "",
    photo: "",
    profession: userLogged.profession,
    skills: userLogged.skills,
    description: "",
  });
  const [errors, setErrors] = React.useState<errorsTypeEditWorker>({
    name: "",
    lastName: "",
    birthdate: "",
    image: "",
    description: "",
    disabled: false,
  });

  useEffect(() => {
    dispatch(getAllProfession());
    dispatch(getAllSkills());
  }, []);

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

  /* function validarForm(errors: errorsTypeEditWorker) {
    Object.values(errors).forEach(
      (val: any) => val.length > 0  ? setWorker({ ...worker, disabled: false }) : setWorker({ ...worker, disabled: true })
    );
  } */

  const validarForm = (errors: errorsTypeEditWorker) => {
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
  };

  async function handleChange(e: any) {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    let error: errorsTypeEditWorker = errors;

    if (name === "image") {
      return await parseImage(e, (base64String: string) => {
        setWorker({
          ...worker,
          photo: base64String,
        });
      });
    }

    switch (name) {
      case "name":
        let namePattern: RegExp = /^(?!\s*$)[A-Za-z _-]*$/;
        error.name = value.startsWith(" ")
          ? "El nombre no puede iniciar con un espacio."
          : !namePattern.test(value)
          ? "El nombre solo puede contener letras"
          : value.endsWith(" ")
          ? "El nombre no puede terminar con espacio."
          : "";
        break;
      case "lastName":
        let lastNamePattern: RegExp = /^(?!\s*$)[A-Za-z _-]*$/;
        error.lastName = value.startsWith(" ")
          ? "El apellido no puede iniciar con un espacio."
          : lastNamePattern.test(value)
          ? value.endsWith(" ")
            ? "El apellido no puede terminar con espacio."
            : ""
          : "El apellido solo puede contener letras";
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
            ? "La año debe ser mayor a 1940"
            : "";
        break;
      case "description":
        error.description = value.startsWith(" ") ?
        "La descripción no puede iniciar con un espacio."
        : worker.description.length > 500 ?
        "La cantidad máxima de caracteres es 500."
        : value.endsWith(" ") ?
        "La descripción no puede terminar en espacio."
        :"";
        break;        
      default:
        break;
    }
    setErrors(error);
    validarForm(error);
    setWorker({ ...worker, [name]: value });
  }

  function onSubmit(e: any) {
    e.preventDefault();
  }
  const token: any = localStorage.getItem("token");
  let tokenDecode: any;
  if (token) tokenDecode = decode(token);

  function handleSubmit(e: any) {
    e.preventDefault();
    let { name, lastName, born_date, photo, profession, skills, description } = worker;
    name = name ? firstWordUpperCase(name) : name;
    lastName = lastName ? firstWordUpperCase(lastName) : lastName;

    const newWorker: WorkerTypeUpdate = {
      name,
      lastName,
      born_date,
      photo,
      profession,
      skills,
      description,
    };
    const id = userLogged.id;

    putEditProfileWorker(newWorker, id).then(() => {
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

  function handleSelect(e: any) {
    const select = e.target.value;
    const name = e.target.name;
    if (select === "default") return;
    if (worker.profession?.includes(e.target.value)) return;
    if (worker.skills?.includes(e.target.value)) return;
    if (name === "profession") {
      setWorker({
        ...worker,
        profession: [...worker.profession, select],
      });
    } else {
      setWorker({ ...worker, skills: [...worker.skills, select] });
    }
  }

  function handleDelete(e: any) {
    let del = e.target.innerText;
    const name = e.target.id;
    if (name === "profession") {
      let borrado = worker.profession.filter((f) => f !== del.trim());
      setWorker({ ...worker, profession: borrado });
    } else {
      let borrado2 = worker.skills.filter((g) => g !== del.trim());
      setWorker({ ...worker, skills: borrado2 });
    }
  }
  function handleClose() {
    props(false);
  }

  return (
    <div>
      <div className="updateCli_mainContainer">
        <div className="updateCli_closeBtnContainer">
          <button className="updateCli_closeBtn" onClick={() => handleClose()}>
            x
          </button>
        </div>
          <form className="updateWorker_Form" onSubmit={(e) => onSubmit(e)}>
            <div className="update_Div_inputAndError">
              <input
                required
                className="update_inpunt"
                autoComplete="off"
                type="text"
                name="name"
                defaultValue={userLogged.name}
                onChange={(e) => handleChange(e)}
              />
              <span>Nombre</span>
              {!errors.name ? null : <div>{errors.name}</div>}
            </div>
            <div className="update_Div_inputAndError">
              <input
                required
                className="update_inpunt"
                type="text"
                name="lastName"
                autoComplete="off"
                defaultValue={userLogged.lastName}
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
                id="birthday_input"
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
              required
              className="update_inpunt"
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
            <select
              name="profession"
              id="profession"
              onChange={(e) => handleSelect(e)}
            >
              <option selected={true} hidden>
                Profesiones
              </option>
              {professions?.map((e: any) => {
                return (
                  <option className="" value={e} key={e}>
                    {" "}
                    {e}{" "}
                  </option>
                );
              })}
            </select>
            <div className="profession_divWorker">
              {worker.profession?.map((e: any) => {
                return (
                  <span
                    className="profession_spanWorker"
                    id="profession"
                    key={e}
                    onClick={(e) => handleDelete(e)}
                  >{`${e}`}</span>
                );
              })}
            </div>

            <select className="selectFormEditWorker" name="skills" id="skills" onChange={(e) => handleSelect(e)}>
              <option selected={true} hidden>
                Habilidades
              </option>
              {skills?.map((e: any) => {
                return (
                  <option value={e} key={e}>
                    {" "}
                    {e}{" "}
                  </option>
                );
              })}
            </select>
            <div className="skills_div">
              {worker.skills?.map((e: any) => {
                return (
                  <span
                    className="skills_btn"
                    id="skills"
                    key={e}
                    onClick={(e) => handleDelete(e)}
                  >{`${e}`}</span>
                );
              })}
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
    </div>
  );
}

export default FormEditProfileWorker;
