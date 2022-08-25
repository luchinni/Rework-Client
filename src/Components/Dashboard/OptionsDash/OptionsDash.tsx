import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import './OptionsDash.css';
import { getAllProfession, getAllSkills, deleteProfession, deleteSkill, addNewProfession, addNewSkill } from "../../../Redux/Reducer/reducer";
import Swal from 'sweetalert2';

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

  const [open, setOpen] = useState("professions");
  const [profession, setNewProfession] = useState("");
  const [skill, setNewSkill] = useState("");

  function handleSelect(e: any) {
    let value = e.target.value;
    setOpen(value);
  };

  async function handleCreationProfession(text: string) {
    if (text === "") {
      return Swal.fire({
        icon: 'warning',
        text: 'Debes ingresar una profesión',
    })};
    text = text.slice(0, 1).toUpperCase() + text.slice(1);
    if (professionsArray.includes(text)) {
      return Swal.fire({
        icon: 'error',
        text: 'La profesión ya existe!',
      })
    } else {
      await addNewProfession(text);
      dispatch(getAllProfession());
      return Swal.fire({
        icon: 'success',
        text: 'Se cargo la profesión!',
      });
    };
  };

  async function handleDeleteProfession(profession: string) {
    Swal.fire({
      title: profession,
      text: "Desea eliminar de forma permanente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProfession(professionsArray, profession);
        dispatch(getAllProfession());
        Swal.fire(
          'Eliminada'
        );
      };
    });
  };

  async function handleCreationSkill(text: string) {
    if (text === "") {
      return Swal.fire({
        icon: 'warning',
        text: 'Debes ingresar una aptitud',
    })};
    text = text.slice(0, 1).toUpperCase() + text.slice(1);
    if (professionsArray.includes(text)) {
      return Swal.fire({
        icon: 'error',
        text: 'La aptitud ya existe!',
      })
    } else {
      await addNewSkill(text);
      dispatch(getAllSkills());
      return Swal.fire({
        icon: 'success',
        text: 'Se cargo la aptitud!',
      });
    };
  };

  function handleDeleteSkill(skill: string) {
    Swal.fire({
      title: skill,
      text: "Desea eliminar de forma permanente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSkill(skillsArray, skill);
        dispatch(getAllSkills());
        Swal.fire(
          'Eliminada',
        );
      };
    });
  };

  return (
    <div className='UserDash_Component'>
      <div className='OfferDash_firstDivSelect'>
        <select onChange={handleSelect}>
          <option selected={true} hidden>
            Seleccionar
          </option>
          <option value="skills">Aptitudes</option>
          <option value="professions">Profesiones</option>
        </select>
      </div>
      <div>
      {open === "professions" 
      ? <div>
          <label>Nueva Profession: </label>
          <input className="" type="text" onChange={(e) => setNewProfession(e.target.value)}/> 
          <button
            className="OfferDash_editButton"
            value="deleteProfession"
            onClick={() => handleCreationProfession(profession)}
          >
            Agregar
          </button>
        </div>
        : open === "skills" ? 
        <div>
          <label>Nueva Aptitud: </label>
          <input className="" type="text" onChange={(e) => setNewSkill(e.target.value)}/>
          <button
            className="OfferDash_editButton"
            value="deleteProfession"
            onClick={() => handleCreationSkill(skill)}
          >
            Agregar
          </button>
        </div> : null}
      </div>
   
      <table>
        <thead>
          <tr>
            <th>Profession</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {open === "skills"
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
                      value="deleteSkill"
                      onClick={() => handleDeleteSkill(skillsArray[i])}
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
                      value="deleteProfession"
                      onClick={() => handleDeleteProfession(professionsArray[i])}
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
