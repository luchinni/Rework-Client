import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderRegister from '../../Register/HeaderRegister/HeaderRegister';
import * as type from "../../../Types";
import Axios, {AxiosResponse}  from "axios";
import Swal from 'sweetalert2'

const GoogleWorker = () => {
    
    const dispatch = useDispatch()
    const localData: any = localStorage.getItem("googleToken")
    const googleData: any = JSON.parse(localData)

    let name: string = ''
    let lastname: string = ''
    const splitedName: any = googleData.name.split(' ')
    
    if (splitedName.length === 3) {
        name = splitedName[0] + splitedName[1]
        lastname = splitedName[2]
    } else if (splitedName.length === 2) {
        name = splitedName[0]
        lastname = splitedName[1]
    } else if (splitedName.length === 4) {
        name = splitedName[0] + splitedName[1]
        lastname = splitedName[2] + splitedName[3]
    }

    const [user, setUser] = useState({
        name: name,
        lastName: lastname,
        password: "",
        user_mail: googleData.user_mail,
        birthdate: "",
        image: googleData.photo,
        errors: {
            birthdate: " ",
        },
        disabled: false
    })


    return (
        <div className='GoogleWorker_component'>
            <HeaderRegister/>
            <div className='GoogleWorker_titleContainer'>
                <h3 className='GoogleWorker_title'>¡Un último paso!</h3>
                <h4 className='GoogleWorker_subtitle'>Necesitamos corroborar que eres mayor de edad para continuar,<br/> por favor indícanos tu fecha de nacimiento</h4>
            </div>
            <div className='Worker_registerDivForm'>
            <form className='Worker_registerForm' id='form' onSubmit={(e) => e.preventDefault()}>
              <h1 className='Worker_empecemos'>Empecemos</h1>
              <div className='Worker_names'>
                <div className='Worker_nameInput'>
                  <label>Nombres</label>
                  <input type="text" name="name" placeholder='Nombre' onChange={(e) => handleChange(e)}/>
                  {!user.errors.name ? null : <div className='Worker_error'>{user.errors.name}</div>}
                </div>
                <div className='Worker_lastnameInput'>
                  <label>Apellidos</label>
                  <input type="text" name="lastName" placeholder='Apellido' onChange={(e) => handleChange(e)}/>
                  {!user.errors.lastName ? null : <div className='Worker_error'>{user.errors.lastName}</div>}
                </div>
              </div>
              <div className='Worker_passwordDate'>
                <div className='Worker_pass'>
                  <label>Contraseña</label>
                  <input type="password" name="password" placeholder='Contraseña' onChange={(e) => handleChange(e)}/>
                  {!user.errors.password ? <div className='Worker_br'/> : <div className='Worker_errorPw'>{user.errors.password}</div>}
                </div>
                <div className="CR_Div_inputAndError">
                <input
                  className="CR_inpunt"
                  type="password"
                  name="password2"
                  placeholder="Repita contraseña"
                  onChange={(e) => handleChange(e)}
                />
                {!user.errors.password2 ? null : (
                  <div className="CR_inputError">
                    {user.errors.password2}
                  </div>
                )}
              </div>
                <div className='Worker_date'>
                  <label>Fecha de nacimiento</label>
                    <input type="date" name="birthdate" placeholder='Fecha de Nacimiento' onChange={(e) => handleChange(e)}/>
                    {!user.errors.birthdate ? null : <div className='Worker_error'>{user.errors.birthdate}</div>}
                </div>
              </div>
              <div className='Worker_mailImage'>
                <div className='Worker_mail'>
                  <label>Email</label>
                  <input type="email" name="user_mail" placeholder='E-mail' onChange={(e) => handleChange(e)}/>
                  {!user.errors.user_mail ? null : <div className='Worker_error'>{user.errors.user_mail}</div>}
                </div>
                <div className='Worker_image'>
                  <label>¡Carga tu foto!</label>
                  <input className='Worker_image' type="file" name="image" placeholder='carga una imagen de perfil' accept="image/*" onChange={(e) => handleChange(e)}/>
                  {!user.errors.image ? null : <div className='Worker_error'>{user.errors.image}</div>}
                </div>
              </div>
              <div className='Worker_bothInputs'>
                <div className='Worker_profession'>
                  <select name="profession" id='profession' onChange={(e) => handleSelect(e)}>
                    <option selected={true} hidden>Profesiones</option>
                    {
                      user.professions?.map((e:any) =>{
                          return <option value={e} key={e}> {e} </option>
                      })
                    }
                  </select>
                  <div className='profession_div'>
                    {user.profession?.map((e:any) => {
                      return (<span className='profession_btn' id="profession" key={e} onClick = {(e) => handleDelete(e)}>{`${e}`}</span>)
                    })}
                  </div>
                </div>
                <div className='Worker_skills'>
                  <select  name="skills" id='skills' onChange={(e) => handleSelect(e)}>
                      <option selected={true} hidden>Habilidades</option>
                      {
                        user.skills?.map((e:any) =>{
                            return <option value={e} key={e}> {e} </option>
                        })
                      }
                  </select>
                  <div className='skills_div'>
                    {user.skills?.map((e:any) => {
                      return (<span className='skills_btn' id="skills" key={e} onClick = {(e) => handleDelete(e)}>{`${e}`}</span>)
                    })}
                  </div> 
                </div>
              </div>
            </form>
            <div className='Worker_submit'>
              <input  disabled={user.disabled} name="button" type="submit" value="¡Registrate!" onClick={(e) => handleSubmit(e)} />
            </div>
          </div>
        </div>
    )
}

export default GoogleWorker