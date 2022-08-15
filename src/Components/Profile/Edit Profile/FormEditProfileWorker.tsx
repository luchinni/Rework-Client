import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProfession,
  getAllSkills,
  putEditProfileWorker,
} from "../../../Redux/Reducer/reducer";
import { errorsTypeEditWorker, WorkerTypeUpdate } from "../../../Types";

function FormEditProfileWorker() {
  const userLogged = useSelector((state: any) => state.workService.userLogged);
  const professions = useSelector((state: any) => state.workService.professions);
  const skills = useSelector((state: any) => state.workService.skills);
  const dispatch = useDispatch();

  const [worker, setWorker] = React.useState<WorkerTypeUpdate>({
    name: "",
    lastName: "",
    born_date: "",
    photo: "",
    profession: [],
    skills: [],
    disabled: true,
    errors: {
      name: "Campo requerido",
      lastName: "Campo requerido",
      birthdate: "Campo requerido",
      image: "",
    },
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

  function validarForm(errors: errorsTypeEditWorker) {
    let valid = true;
    Object.values(errors).forEach(
      (val: any) => val.length > 0 && (valid = false)
    );
    if (valid) {
      setWorker({ ...worker, disabled: false });
    } else {
      setWorker({ ...worker, disabled: true });
    }
  }

  async function handleChange(e: any) {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    let errors: errorsTypeEditWorker;
    errors = worker.errors;

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
        let namePattern: RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/;
        errors.name = value.startsWith(" ")
          ? "El nombre no puede iniciar con un espacio."
          : !namePattern.test(value)
          ? "El nombre no puede contener caracteres especiales."
          : value.endsWith(" ")
          ? "El nombre no puede terminar con espacio."
          : "";
        break;
      case "lastName":
        let lastNamePattern: RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/;
        errors.lastName = value.startsWith(" ")
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
        errors.birthdate =
          dateNow < fechas
            ? "La fecha ingresada es invalida."
            : year[0] > date.getFullYear()
            ? "La fecha ingresada es invalida."
            : year[0] < 1940
            ? "La año debe ser mayor a 1940"
            : "";
        break;
      default:
        break;
    }
    setWorker({ ...worker, [name]: value, errors });
    validarForm(worker.errors);
  }

  function onSubmit(e: any) {
    e.preventDefault();
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    let {
      name,
      lastName,
      born_date,
      photo,
      profession,
      skills,
      disabled,
      errors,
    } = worker;
    name = name ? firstWordUpperCase(name) : name;
    lastName = lastName ? firstWordUpperCase(lastName) : lastName;

    const newWorker: WorkerTypeUpdate = {
      name,
      lastName,
      born_date,
      photo,
      profession,
      skills,
      disabled,
      errors,
    };
    const id = userLogged.id;

    putEditProfileWorker(newWorker, id);
    let form = document.getElementById("form") as HTMLFormElement | null;
    form?.reset();
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

  return (
    <div className="WorkerRegister_component">
      <div className="Worker_registerContent">
        
        <div className="Worker_registerDivForm">
          <h1>Empecemos</h1>
          <form
            className="Worker_registerForm"
            id="form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              onChange={(e) => handleChange(e)}
            />
            {!worker.errors.name ? null : (
              <div>{worker.errors.name}</div>
            )}
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              onChange={(e) => handleChange(e)}
            />
            {!worker.errors.lastName ? null : (
              <div>{worker.errors.lastName}</div>
            )}
            <input
              type="date"
              name="birthdate"
              placeholder="Fecha de Nacimiento"
              onChange={(e) => handleChange(e)}
            />
            {!worker.errors.birthdate ? null : (
              <div>{worker.errors.birthdate}</div>
            )}
            <input
              type="file"
              name="image"
              placeholder="carga una imagen de perfil"
              accept="image/*"
              onChange={(e) => handleChange(e)}
            />
            {!worker.errors.image ? null : (
              <div>{worker.errors.image}</div>
            )}
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
                  <option value={e} key={e}>
                    {" "}
                    {e}{" "}
                  </option>
                );
              })}
            </select>
            <div className="profession_div">
              {worker.profession?.map((e: any) => {
                return (
                  <span
                    className="profession_btn"
                    id="profession"
                    key={e}
                    onClick={(e) => handleDelete(e)}
                  >{`${e}`}</span>
                );
              })}
            </div>

            <select
              name="skills"
              id="skills"
              onChange={(e) => handleSelect(e)}
            >
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

            <span>Ingeniero, Diseñador</span>
            <span>Phyton, Css...</span>
            <input
              disabled={worker.disabled}
              name="button"
              type="submit"
              value="Registrar"
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormEditProfileWorker;
