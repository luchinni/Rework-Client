import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import './OptionsDash.css';
import { getAllProfession, getAllSkills } from "../../../Redux/Reducer/reducer";

function OptionsDash() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProfession());
    dispatch(getAllSkills());
  }, [dispatch]);

  const professionsArray: string[] = useSelector(
    (state: any) => state.workService.professions
  );
  const skillsArray: string[] = useSelector(
    (state: any) => state.workService.skills
  );

  const [open, setOpen] = useState("skills");
  const [modal, setModal] = useState({
    state: "none",
    data: ""
  });

  console.log('professionsArray', open)

  function handleSelect(e: any) {
    let value = e.target.value;
    setOpen(value);
  };

  function handleEditionModal(e: any, text: string) {
    const value = e.target.value;
    console.log("value", value)
    setModal({
      state: value,
      data: text
    });
  };

  function handleEditionModalClose() {
    setModal({
      state: "none",
      data: ""
    });
  };

  function handleOnClick() {

  };

  return (
    <div>
      <div /* className="Filter_divOptionsCheckbox" */>
        <select onChange={handleSelect}>
          <option selected={true} hidden>
            Seleccionar
          </option>
          <option value="professions">Profesiones</option>
          <option value="skills">Aptitudes</option>
        </select>
      </div>

      <div>
        {modal.state === "none" 
        ? null : modal.state === "editProfession" 
        ? <div className='OfferDash_Modal'>
            <div className='OfferDash_divInfoModal'>
              <div>
								<p className='OfferDash_divModalTitle'>Dato a modificar: </p>
                <span className='OfferDash_MOdalTextInfo'>{modal.data}</span>
              </div>
              <div>
                <p className='OfferDash_divModalTitle'>Ingresa el cambio: </p>
                <input className='OfferDash_MOdalTextInfo' type="text" />
						  </div>
            </div>
              <div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk' onClick={handleOnClick}>Guardar</button>
								<button className='OfferDash_modalCancelar' onClick={handleEditionModalClose}>Cancelar</button>
							</div>
          </div> :
        modal.state === "editSkill" ?
        <div><input placeholder={`${modal.data}`}></input></div> :
        null}
      </div>

      <table>
        <thead>
          <tr>
            <th>Profession</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {open === "professions"
            ? skillsArray?.map((e: any, i: any) => {
              return (
                <tr key={i}>
                  <td>
                    <div>
                      <span>{`${e}`}</span>
                    </div>
                  </td>
                  <td className="OfferDash_tdButtons">
                    <button
                      className="OfferDash_editButton"
                      name="editSkill"
                   /*    onClick={() => handleEditionModal(skillsArray[i])} */
                    >
                      Editar
                    </button>
                    <button
                      className="OfferDash_editButton"
              /*         onClick={() => handleEditionModal(skillsArray[i])} */
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
            : professionsArray?.map((e: string, i: number) => {
              return (
                <tr key={i}>
                  <td>
                    <div>
                      <span>{`${e}`}</span>
                    </div>
                  </td>
                  <td className="OfferDash_tdButtons">
                    <button
                      className="OfferDash_editButton"
                      value="editProfession"
                      onClick={(e) => handleEditionModal(e, professionsArray[i])}
                    >
                      Editar
                    </button>
                    <button
                      className="OfferDash_editButton"
                     /*  onClick={() => handleEditionModal(professionsArray[i])} */
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default OptionsDash;
