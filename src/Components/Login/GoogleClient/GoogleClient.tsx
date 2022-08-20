import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderRegister from '../../Register/HeaderRegister/HeaderRegister';
import * as type from "../../../Types";
import Axios, {AxiosResponse}  from "axios";
import Swal from 'sweetalert2'


const GoogleClient = () => {
    //Requerimos la data de google del estado global y dividimos el nombre completo en nombre y apellido
    const dispatch = useDispatch()
    const googleData: any = useSelector((state: any) => state.workService.googleData)
    let name: string = ''
    let lastname: string = ''
    const splitedName: any = googleData.name.split(' ')
    //dependiendo de la cantidad de palabras suponemos cuales son nombres y cuales apellidos
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
        user_mail: googleData.email,
        birthdate: "",
        image: googleData.photo,
        errors: {
            birthdate: " ",
        },
        disabled: false
    })

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

    setUser({
        ...user,
        [name]: value,
        errors,
      });
      validarForm(user.errors);

    }
    async function postImageOnCloudinary(e: any) {
        const formData = new FormData();
        formData.append("file", e);
        formData.append("upload_preset", "re-work");
    
        try {
          const response: AxiosResponse = await Axios.post("https://api.cloudinary.com/v1_1/luis-tourn/image/upload", formData);
          const data: any = response.data;
          return data.url;
        } catch (error) {
          console.log(error);
        }
      }
    async function handleSubmit(e: any) {
        e.preventDefault();
        let image = await postImageOnCloudinary(user.image);
    
        let { name, lastName, password, user_mail, birthdate } = user;
    
        const newClient = {
          name: name,
          lastName: lastName,
          password: password,
          user_mail: user_mail,
          born_date: birthdate,
          photo: image,
        };
         //hacer action en reducir para registrar al client enviando newClient como param
        //postNewClient(newClient);
        let form = document.getElementById("form") as HTMLFormElement | null;
        form?.reset();
        Swal.fire("¡Cuenta creada!","Te llegará un correo con tu contraseña provisoria, puedes cambiarla cuando quieras.","success")
      }

    return (
        <div className='GoogleClient_component'>
            <HeaderRegister/>
            <div className='GoogleClient_titleContainer'>
                <h3 className='GoogleClient_title'>¡Un último paso!</h3>
                <h4 className='GoogleClient_subtitle'>Necesitamos corroborar que eres mayor de edad para continuar,<br/> por favor indícanos tu fecha de nacimiento</h4>
            </div>
            <div className="GoogleClient_inputAndError">
                <input
                  className="GoogleClient_inputDate"
                  type="date"
                  name="birthdate"
                  placeholder="Fecha de Nacimiento"
                  onChange={(e) => handleChange(e)}
                />
                {!user.errors.birthdate ? null : (
                  <div className="CR_inputError">
                    {user.errors.birthdate}
                  </div>
                )}
                <input
                className="CR_inputSubmit"
                disabled={user.disabled}
                name="button"
                type="submit"
                value="Registrar"
                onClick={(e) => handleSubmit(e)}
                />
            </div>
        </div>
    )
}

export default GoogleClient