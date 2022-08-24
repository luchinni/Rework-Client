import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import image1 from "../../../images/Team presentation _Flatline.png";
//import image2 from '../../images/Team success _Outline.png';
import { useDispatch, useSelector } from "react-redux";
import {
  checkSession,
  getAllProfession,
  postNewOffer,
} from "../../../Redux/Reducer/reducer";
import * as type from "../../../Types";
import decode from "jwt-decode";
import "./OfferPost.css";
import Axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";





const OfferPost = () => {
  const token: any = localStorage.getItem("token");
  const tokenDecode: any = decode(token);
	const navigate = useNavigate()

  const profession = useSelector((state: any) => state.workService.professions);

  type post = {
    userClientId: String;
    title: String;
    post_duration_time: Date | String;
    min_remuneration: Number;
    max_remuneration: Number;
    work_duration_time: String;
    // work_duration_time_select:String,
    offer_description: String;
    photo: String;
    profession: String[];
  };

  type errorsNewOffer = {
    title: String;
    min_remuneration: String;
    max_remuneration: String;
    // work_duration_time:Number,
    // work_duration_time_select:String,
    offer_description: String;
    photo: String;
    disabled: boolean | undefined;
  };

  const [formulario, setFormulario] = useState<post>({
    userClientId: tokenDecode.id,
    title: "",
    post_duration_time: new Date(),
    min_remuneration: 0,
    max_remuneration: 0,
    work_duration_time: "",
    // work_duration_time_select: '',
    offer_description: "",
    photo: "",
    profession: [],
  });

  const [errors, setErrors] = useState<errorsNewOffer>({
    title: "Campo requerido.",
    min_remuneration: "Campo requerido.",
    max_remuneration: "Campo requerido.",
    // work_duration_time: 0,
    // work_duration_time_select: '',
    offer_description: "Campo requerido.",
    photo: "",
    disabled: true,
  });

  const firstWordUpperCase = (word: String) => {
    return word[0]?.toUpperCase() + word.slice(1);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProfession());
    dispatch(checkSession());
  }, [dispatch]);

  const validarForm = (errors: type.errorsNewOfferType) => {
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
  };

  const postImageOnCloudinary = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e);
    formData.append("upload_preset", "re-work");

    try {
      console.log("entre al upload");
      const response: AxiosResponse = await Axios.post(
        "https://api.cloudinary.com/v1_1/luis-tourn/image/upload",
        formData
      );
      const data: any = response.data;
      return data.url;
    } catch (error) {
      console.log("entre al error");
      console.log(error);
    }
  };

  const handleChange = async (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    let error: type.errorsNewOfferType;
    error = errors;

    if (name === "photo") {
      setFormulario({
        ...formulario,
        photo: e.target.files[0],
      });
      return;
    }

    switch (name) {
      case "title":
        let titlePattern: RegExp = /^(?!\s*$)[A-Za-z0-9 _-]*$/;
        error.title = value.startsWith(" ")
          ? "El título no puede iniciar con un espacio."
          : titlePattern.test(value)
          ? value.endsWith(" ")
            ? "El título no puede terminar con espacio."
            : ""
          : "El título no puede contener caracteres especiales.";
        break;
      case "min_remuneration":
        let min_remunerationPattern: RegExp = /^[0-9]+$/;
        error.min_remuneration =
          min_remunerationPattern.test(value) === false
            ? "Solo números enteros son adimitidos."
            : //  : parseInt(value) >= formulario.max_remuneration? "La remuneración mínima no puede ser mayor o igual a la remuneración máxima"
            value[0] === "0"
            ? "No puede inicializar con 0"
            : parseInt(value) <= 0
            ? "La remuneración mínima tiene que ser mayor a 0"
            : "";
        break;
      case "max_remuneration":
        let max_remunerationPattern: RegExp = /^[0-9]+$/;
        error.max_remuneration =
          max_remunerationPattern.test(value) === false
            ? "Solo números enteros son adimitidos."
            : parseInt(value) <= formulario.min_remuneration
            ? "La remuneración máxima no puede ser menor o igual a la remuneración mínima"
            : value[0] === "0"
            ? "No puede inicializar con 0"
            : parseInt(value) <= 0
            ? "La remuneración máxima tiene que ser mayor a 0"
            : "";
        break;
      case "offer_description":
        error.offer_description =
          formulario.offer_description.length > 1000
            ? "Solo se permiten 1000 caracteres"
            : formulario.offer_description.length < 70
            ? "La cantidad mínima de caracteres es 70"
            : "";
        break;
    }

    setErrors(error);

    validarForm(error);

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: any) => {
    const select = e.target.value;
    const name = e.target.name;
    if (select === "default") return;
    if (formulario.work_duration_time.includes(e.target.value)) return;
    if (formulario.profession?.includes(select)) return;
    if (name === "profession") {
      setFormulario({
        ...formulario,
        profession: [...formulario.profession, select],
      });
    } else {
      setFormulario({
        ...formulario,
        work_duration_time: select,
      });
    }
  };

  const handleDelete = (e: any) => {
    let del = e.target.innerText;
    const name = e.target.id;
    if (name === "profs") {
      let borrado = formulario.profession?.filter((f) => f !== del.trim());
      setFormulario({ ...formulario, profession: borrado });
    }
    // else {
    //     let borrado2 = formulario.skills?.filter(g => g !== del.trim())
    //     setFormulario({...formulario, skills: borrado2})
    //   }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let photo = await postImageOnCloudinary(formulario.photo);
    let {
      userClientId,
      title,
      min_remuneration,
      max_remuneration,
      work_duration_time,
      /*work_duration_time_select, */ offer_description,
      profession,
    } = formulario;
    title = firstWordUpperCase(title);
    let hoy = new Date();
    hoy.setDate(hoy.getDate() + 10);

    const newOffer: type.newOfferType = {
      userClientId,
      title: title,
      post_duration_time: hoy,
      min_remuneration: min_remuneration,
      max_remuneration: max_remuneration,
      work_duration_time: work_duration_time,
      /*work_duration_time_select:work_duration_time_select, */ offer_description:
        offer_description,
      photo: photo,
      profession: profession,
    };

    postNewOffer(newOffer).then(async () => {
			await Swal.fire(
					"La oferta fue publicada con exito",
					"",
					'success'
				)
      let form = document.getElementById("form") as HTMLFormElement | null;
      form?.reset();
			navigate('/home')
	})

    setFormulario({
      userClientId: "",
      title: "",
      post_duration_time: new Date(),
      min_remuneration: 0,
      max_remuneration: 0,
      work_duration_time: "",
      // work_duration_time_select: '',
      offer_description: "",
      photo: "",
      profession: [],
      //skills: []
    });
  };

  return (
    <div>
      <Header />
      <div className="OfferPost_divcontent">
        <div className="OfferPost_divImage">
          <img className="OfferPost_image" src={image1} alt="place1" />
          {/* <img src={image2} alt="place2" /> */}
        </div>
        <div className="OfferPost_divForm">
          <h1>Empecemos</h1>
          <form
            className="OfferPost_Form"
            id="form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="OfferPost_titleDiv">
              <input
                className="OfferPost_title"
                type="text"
                name="title"
                placeholder="Título"
                onChange={handleChange}
              />
              {errors.title ? <p className="OfferPost_danger">{errors.title}</p> : <br/>}
            </div>
            <div className="OfferPost_remuTime">
              <div className="OfferPost_remuDiv">
                <input
                  className="OfferPost_remu"
                  type="number"
                  name="min_remuneration"
                  placeholder="Remuneracion minima"
                  onChange={handleChange}
                />
                {errors.min_remuneration ? 
                  <p className="OfferPost_dangerRemu">{errors.min_remuneration}</p>
                  :
                  <br/>
                }
              </div>
              <div className="OfferPost_remuDiv">
                <input
                  className="OfferPost_remu"
                  type="number"
                  name="max_remuneration"
                  placeholder="Remuneracion maxima"
                  onChange={handleChange}
                />
                {errors.max_remuneration ?
                  <p className="OfferPost_dangerRemu">{errors.max_remuneration}</p>
                : <br/>}
              </div>
            </div>
              {
                <select className="OfferPost_selectTime"
                  name="work_duration_time_select"
                  id="work_duration_time_select"
                  onChange={(e) => handleSelect(e)}
                >
                  <option className="OfferPost_optionTime" selected={true} hidden>
                  Duración del trabajo
                  </option>
                  {[
                    "Menos de 1 mes",
                    "1 a 3 meses",
                    "4 a 6 meses",
                    "Más de 6 meses",
                  ].map((e) => {
                    return <option>{e}</option>;
                  })}
                </select>
              }
            <div className="OfferPost_descriptionDiv">
              <textarea
                className="OfferPost_description"
                name="offer_description"
                cols={40}
                rows={5}
                placeholder="Descripción del trabajo"
                onChange={handleChange}
                
              />
              {errors.offer_description && (
                <p className="OfferPost_danger">{errors.offer_description}</p>
              )}
            </div>
            <div className="OfferPost_imageDiv">
              <input
                className="OfferPost_imageInput"
                type="file"
                accept="image/*"
                name="photo"
                placeholder="Url de imagen de referencia"
                onChange={handleChange}
              />
              {errors.photo && <p className="OfferPost_danger">{errors.photo}</p>}
            </div>
            <select
              id="profs"
              className="OfferPost_professions"
              name="profession"
              onChange={(e) => handleSelect(e)}
            >
              <option selected={true} hidden>
                Seleccione profesiones
              </option>
              {profession?.map((e: any) => {
                return (
                  <option value={e} key={e}>
                    {" "}
                    {e}{" "}
                  </option>
                );
              })}
            </select>
            <div className="professionDiv">
              {formulario.profession?.map((e: any) => {
                return (
                  <span
                    id="profs"
                    className="profession_btns"
                    key={e}
                    onClick={(e) => handleDelete(e)}
                  >{`${e}`}</span>
                );
              })}
            </div>
            <input
              disabled={errors.disabled}
              className="OfferPost_submit"
              name="button"
              type="submit"
              value="Publicar"
              onClick={(e) => handleSubmit(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfferPost;
