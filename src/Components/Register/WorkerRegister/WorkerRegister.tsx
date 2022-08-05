import React from 'react'

const WorkerRegister = () => {
  return (
    <div>
        
        <div>
            {/* <img src={image1} alt="place1" />
            <img src={image2} alt="place1" />
            <img src={image3} alt="place1" /> */}
        </div>
        <div>
            <h1>Empecemos</h1>
            <p>Ya tienes una cuenta? accede a <a href="#">Login</a></p>
            <form id='form' onSubmit={(e) => e.preventDefault()}>
                <input type="text" name="name" placeholder='Nombre'/>
                <input type="text" name="lastname" placeholder='Apellido'/>
                <input type="password" name="password" placeholder='Contraseña'/>
                <input type="email" name="user_mail" placeholder='E-mail'/>
                <input type="date" name="birthdate" placeholder='Fecha de Nacimiento'/>
                <input type="url" name="image" placeholder='URL - imagen de perfil'/>
                <input type="text" name="professions" placeholder='Profesiones'/>
                <input type="text" name="skills" placeholder='Habilidades'/>
                <span>Ingeniero, Diseñador</span>
                <span>Phyton, Css...</span>
                <input /*disabled={this.state.disabled}*/ name="button" type="submit" value="Registrar" /*onClick={(e) => handleSubmit(e)}*/ />
            </form>
        </div>
    </div>
  )
}

export default WorkerRegister