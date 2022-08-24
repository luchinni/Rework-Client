import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import './OptionsDash.css';
import { getAllProfession, getAllSkills, deleteProfession, deleteSkill } from "../../../Redux/Reducer/reducer";
import Swal from 'sweetalert2'

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

  console.log('professionsArray', open)

  function handleSelect(e: any) {
    let value = e.target.value;
    setOpen(value);
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
        professionsArray.filter((e: string) => e !== profession)
        Swal.fire(
          'Eliminada'
        )
      }
    })
  }

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
        skillsArray.filter((e: string) => e !== skill)
        Swal.fire(
          'Eliminada',
        )
      }
    })
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
      {open === "professions" 
      ? <div>
        <label>Nueva Profession: </label>
          <input></input> 
          </div>
          : open === "skills" ? 
          <div><label>Nueva Aptitud</label>
          <input></input></div> : null}
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
