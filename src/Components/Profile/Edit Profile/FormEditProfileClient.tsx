 import React, { useState } from "react";

function FormEditProfileClient() {

 /*  const [state, setState] = useState({
    name:'',
    lastname: '',

  })

  function handleChange (e:any) {
    e.preventDefault();

  }


  function onSubmit(e: any) {
    e.preventDefault();
  } */

  return (
    <div>
     {/*  <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            className="CR_inpunt"
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={(e) => handleChange(e)}
          />
          {!errors.name ? null : (
            <div className="CR_inputError">{errors.name}</div>
          )}
        </div>
        <div>
          <input
            className="CR_inpunt"
            type="text"
            name="lastName"
            placeholder="Apellido"
            onChange={(e) => handleChange(e)}
          />
          {!errors.lastName ? null : (
            <div className="CR_inputError">{errors.lastName}</div>
          )}
        </div>
        <div>
          <input
            className="CR_inpunt"
            type="date"
            name="birthdate"
            placeholder="Fecha de Nacimiento"
            onChange={(e) => handleChange(e)}
          />
          {!errors.birthdate ? null : (
            <div className="CR_inputError">{errors.birthdate}</div>
          )}
        </div>
        <div>
          <input
            className="CR_inpunt"
            type="file"
            accept="image/*"
            name="image"
            placeholder="Imagen de perfil"
            onChange={(e) => handleChange(e)}
          />
          {!errors.image ? null : (
            <div className="CR_inputError">{errors.image}</div>
          )}
        </div>
        <input
          className="CR_inpuntSubmit"
          disabled={disabled}
          name="button"
          type="submit"
          value="Registrar"
          onClick={(e) => handleSubmit(e)}
        />
      </form> */}
    </div>
  );
}


export default FormEditProfileClient;
