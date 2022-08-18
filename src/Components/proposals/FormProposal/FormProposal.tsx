import React, { useEffect, useState } from "react";
import { newProposalPost, editProposalWorkerPremium } from "../../../Redux/Reducer/reducer";
import "./FormProposal.css";
import image from "../../../images/modal_image_proposal.jpg";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../Redux/Reducer/reducer";
import OfferPost from "../../Offer/OfferPost/OfferPost";
import { isBreakOrContinueStatement } from "typescript";

const FormProposal = (props: any) => {
  console.log("esto es props: ", props);

  const dispatch = useDispatch();

  const token: any = localStorage.getItem("token");
  const tokenDecode: any = decode(token);
  const userLogged = useSelector((state: any) => state.workService.userLogged);

  //console.log(userLogged)

  useEffect(() => {
    dispatch(getUserById(tokenDecode));
  }, []);

  type formValidate = {
    idWorker?: String;
    idOffer?: String;
    idProposal?: String;
    remuneration: Number;
    proposal_description: String;
    worked_time: String;
    worked_time_select: String;
  };

  type errorFormValidate = {
    remuneration: String;
    proposal_description: String;
    worked_time: String;
    disabled: boolean | undefined;
  };

  const [formu, setFormu] = useState<formValidate>({
    idWorker: userLogged.id,
    idOffer: props.idOferta,
    remuneration: 0,
    proposal_description: "",
    worked_time: "",
    worked_time_select: "",
  });

  const [error, setError] = useState<errorFormValidate>({
    remuneration: "campo requerido",
    proposal_description: "campo requerido",
    worked_time: "campo requerido",
    disabled: true,
  });

  const validarForm = (errors: errorFormValidate) => {
    let valid = true;
    Object.values(errors).forEach(
      (val: any) => val.length > 0 && (valid = false)
    );
    if (valid) {
      setError({
        ...error,
        disabled: false,
      });
    } else {
      setError({
        ...error,
        disabled: true,
      });
    }
  };

  function handleModalClose() {
    props.close(false);
  }

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    let errors: errorFormValidate;
    errors = error;
    console.log("name: ", name, "value: ", value);
    switch (name) {
      case "remuneration":
        let remunerationPattern: RegExp = /^[0-9]+$/;
        errors.remuneration =
          remunerationPattern.test(value) === false
            ? "Solo números enteros son adimitidos."
            : value[0] === "0"
            ? "No puede inicializar con 0."
            : parseInt(value) <= 0
            ? "La presupuesto tiene que ser mayor a 0."
            : "";
        break;
      case "proposal_description":
        errors.proposal_description =
          formu.proposal_description.length > 400
            ? "Solo se permiten 400 caracteres."
            : formu.proposal_description.length < 50
            ? "La cantidad mínima de caracteres es 50."
            : "";
        break;
      case "worked_time":
        let worked_timePattern: RegExp = /^[0-9]+$/;
        errors.worked_time =
          worked_timePattern.test(value) === false
            ? "Solo números enteros son adimitidos."
            : value[0] === "0"
            ? "No puede inicializar con 0."
            : parseInt(value) <= 0
            ? "No puede ser inferior a 0."
            : "";
        break;
    }

    setError(errors);

    validarForm(errors);

    setFormu({
      ...formu,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e: any) => {
    const select = e.target.value;
    console.log(select);
    if (select === "default") return;
    if (formu.worked_time_select.includes(e.target.value)) return;
    setFormu({ ...formu, worked_time_select: select });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("si entré iupi");
    if (e.target.value === "Publicar") {
      let {
        remuneration,
        proposal_description,
        worked_time,
        worked_time_select,
        idWorker,
        idOffer,
      } = formu;
      if (worked_time_select === "") worked_time_select = "días";
      worked_time = `${worked_time} ${worked_time_select}`;
      const newProposal: formValidate = {
        remuneration: remuneration,
        proposal_description: proposal_description,
        worked_time: worked_time,
        worked_time_select: worked_time_select,
        idWorker: idWorker,
        idOffer: idOffer,
      };

      newProposalPost(newProposal).then(() => {
        let form = document.getElementById("form") as HTMLFormElement | null;
        form?.reset();
      });
    } else if (e.target.value === "Editar") {
        let { worked_time, worked_time_select } = formu;
      if (worked_time_select === "" && worked_time) worked_time_select = "días";
      worked_time = `${worked_time} ${worked_time_select}`;
      const editProposal: formValidate = {
        remuneration: (!formu.remuneration || formu.remuneration === props.proposal.remuneration) ? props.proposal.remuneration : formu.remuneration,
        proposal_description: (!formu.proposal_description || formu.proposal_description === props.proposal.proposal_description) ? props.proposal.proposal_description : formu.proposal_description,
        worked_time: (!formu.worked_time || formu.worked_time === props.proposal.worked_time) ? props.proposal.worked_time : formu.worked_time,
        worked_time_select: formu.worked_time_select,
        idProposal: props.proposal.id
      };

      editProposalWorkerPremium(editProposal).then(() => {
        let form = document.getElementById("form") as HTMLFormElement | null;
        form?.reset();
      });
    }

    setFormu({
      idWorker: "",
      idOffer: "",
      remuneration: 0,
      proposal_description: "",
      worked_time: "",
      worked_time_select: "",
    });

    props.close(false);
  };

  return (
    <div className="DetailModal_component">
      <div className="DetailModal_divPadre">
        <div className="DetailModal_divContent">
          <div>
            <p className="DetailModal_title">Envia tu propuesta</p>
            <form id="form" onSubmit={(e) => e.preventDefault()}>
              <div className="DetailModal_contentInputs">
                <div className="DetailModal_divInputs">
                  <label className="DetailModal_label">Tu presupuesto</label>
                  <input
                    className="DetailModal_input" /*className={error.remuneration && 'danger'}*/
                    name="remuneration"
                    type="number"
                    placeholder={
                      props.proposal?.remuneration
                        ? props.proposal?.remuneration
                        : "Ej: 2500"
                    }
                    onChange={handleChange}
                  />
                  {error.remuneration && (
                    <p className="danger">{error.remuneration}</p>
                  )}
                </div>
                <div className="DetailModal_divInputs">
                  <label className="DetailModal_label">
                    Tiempo estiamdo del trabajo
                  </label>
                  <input
                    className="DetailModal_input" /*className={error.worked_time && 'danger'}*/
                    name="worked_time"
                    type="string"
                    placeholder={
                      props.proposal?.worked_time
                        ? props.proposal?.worked_time
                        : "Ej: 5"
                    }
                    onChange={handleChange}
                  />
                  {error.worked_time && (
                    <p className="danger">{error.worked_time}</p>
                  )}
                </div>
                <div className="DetailModal_divSelect">
                  {
                    <select
                      name="worked_time_select"
                      id="worked_time_select"
                      onChange={(e) => handleSelect(e)}
                    >
                      <option selected={true} hidden>
                        Seleccione
                      </option>
                      {["días", "semanas", "meses"].map((e) => {
                        return <option>{e}</option>;
                      })}
                    </select>
                  }
                </div>
              </div>
              <div className="DetailModal_divInputs">
                <label className="DetailModal_label">Descripcion</label>
                <textarea
                  className="DetailModal_input" /*className={error.proposal_description && 'danger'}*/
                  name="proposal_description"
                  cols={30}
                  rows={3}
                  placeholder={
                    props.proposal?.proposal_description
                      ? props.proposal?.proposal_description
                      : "Descripción..."
                  }
                  onChange={handleChange}
                ></textarea>
                {error.proposal_description && (
                  <p className="danger">{error.proposal_description}</p>
                )}
              </div>

              {props.proposal ? (
                <input
                  className="DetailModal_submit"
                  disabled={error.disabled}
                  name="button"
                  type="submit"
                  value="Editar"
                  onClick={(e) => handleSubmit(e)}
                />
              ) : (
                <input
                  className="DetailModal_submit"
                  name="button"
                  type="submit"
                  value="Publicar"
                  onClick={(e) => handleSubmit(e)}
                />
              )}
            </form>
          </div>
        </div>
        <div>
          <div className="DetailModal_divImage">
            <div className="DetailModal_divButtonClose">
              <button
                className="DetailModal_buttonClose"
                onClick={handleModalClose}
              >
                x
              </button>
            </div>
            <img className="DetailModal_image" src={image} alt="example" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProposal;
