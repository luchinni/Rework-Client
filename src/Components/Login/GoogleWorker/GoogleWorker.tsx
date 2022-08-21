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
        disabled: false,
        profession: [],
        skills: [],
        inputProfessions: [],
        inputSkills: []
    })

    function validarForm(errors: any) {
        let valid = true;
        Object.values(errors).forEach(
          (val: any) => val.length > 0 && (valid = false)
        );
        if (valid) {
          setUser({
            ...user,
            disabled: false,
          });
        } else {
          setUser({
            ...user,
            disabled: true,
          });
        }
      }

    async function handleSelect(e:any){
        const select = e.target.value;
        const name = e.target.name
        if (select === "default") return
        if(user.profession?.includes(e.target.value)) return
        if(user.skills?.includes(e.target.value)) return
        if(name === "profession"){
          setUser({...user,
          profession:[...user.profession, select],
          /*inputProfessions:[...user.inputProfessions, 
          this.props.professions?.find((e:any) => e === select)]*/})
        }else{  
          setUser({...user,
          skills:[...user.skills, select]})}
      
      }
      
    async function handleDelete(e:any){
          
        let del = e.target.innerText
      console.log(del)
        const name = e.target.id
        if(name === "profession"){
          let borrado = user.profession.filter(f => f !== del.trim())
          setUser({...user, profession: borrado})
         } else {
           let borrado2 = user.skills.filter(g => g !== del.trim())
           setUser({...user, skills: borrado2})
         }
        
      }

    async function postImageOnCloudinary(e: any) {
        const formData = new FormData();
        formData.append("file", e);
        formData.append("upload_preset", "re-work");
    
        try {
          console.log(formData)
          const response: AxiosResponse = await Axios.post("https://api.cloudinary.com/v1_1/luis-tourn/image/upload", formData);
          const data: any = response.data;
          return data.url;
        } catch (error) {
          console.log(error);
        }
      }

      function handleChange(e: any) {
        const value = e.target.value;
        const name = e.target.name;
        let errors: any;
        errors = user.errors;    
        switch (name){
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
                console.log(dateNow);
                console.log(fechas);
                errors.birthdate =
                dateNow < fechas
                    ? "La fecha ingresada es inválida."
                    : year[0] > date.getFullYear()
                    ? "La fecha ingresada es inválida."
                    : year[0] < 1940
                    ? "El año debe ser mayor a 1940"
                    : "";
                break
            default:
                break;
              }
        validarForm(user.errors);
        setUser({
            ...user,
            [name]: value,
            errors,
        });
    }

    async function handleSubmit(e:any){
        e.preventDefault();
        let image = await postImageOnCloudinary(user.image);
      
        let { name, lastName, password, user_mail, birthdate, profession, skills} = user;
      
        const newWorker:type.newWorkerType = {
          name:name, lastName:lastName, password:password, user_mail:user_mail, born_date:birthdate, photo:image, profession:profession, skills:skills
        }
      
        setUser({
            name: "",
            lastName: "",
            password: "",
            user_mail: "",
            birthdate: "",
            image: "",
            errors: {
                birthdate: ""
            },
            disabled: true,
            profession: [],
            skills: [],
            inputProfessions: [],
            inputSkills: []
        })
        Swal.fire("Registro exitoso!","Te llegará a tu correo un enlace de validación de cuenta, actívala para iniciar sesión.","success")
      }

    return (
        <div className='GoogleWorker_component'>
            <HeaderRegister/>
            <div className='GoogleWorker_titleContainer'>
                <h3 className='GoogleWorker_title'>¡Ya casi terminamos!</h3>
                <h4 className='GoogleWorker_subtitle'>Necesitamos algunos datos extras para continuar,<br/> por favor indícanos tu fecha de nacimiento para verificar tu edad</h4>
            </div>
            <div className='Worker_registerDivForm'>
            <form className='Worker_registerForm' id='form' onSubmit={(e) => e.preventDefault()}>
              <div className='Worker_passwordDate'>
                <div className='Worker_date'>
                  <label>Fecha de nacimiento</label>
                    <input type="date" name="birthdate" placeholder='Fecha de Nacimiento' onChange={(e) => handleChange(e)}/>
                    {!user.errors.birthdate ? null : <div className='Worker_error'>{user.errors.birthdate}</div>}
                </div>
              </div>
              <div className='Worker_bothInputs'>
                <div className='Worker_profession'>
                  <select name="profession" id='profession' onChange={(e) => handleSelect(e)}>
                    <option selected={true} hidden>Profesiones</option>
                    {
                      user.profession?.map((e:any) =>{
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