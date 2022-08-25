import { useState } from "react";
import { changePassword } from "../../../Redux/Reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as type from "../../../Types";
import Swal from 'sweetalert2'
import Header from "../../Register/HeaderRegister/HeaderRegister";
import "./ChangePassword.css"


const ChangePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    type errorsPassword = {
        user_mail: string,
        newPassword:string,
        confirmPassword: string,
        disabled:Boolean
    }

    const [ user, setUser] = useState({user_mail: "", oldPassword:"", newPassword:"", confirmPassword: ""})
    const [error, setError] = useState <type.errorsPassword>({
        user_mail: "",
        newPassword:"",
        confirmPassword: "",
        disabled: true
    });


    const sendChange = () => {
        dispatch(changePassword(user.user_mail, user.oldPassword, user.newPassword))
        Swal.fire({
            icon: 'success',
            title: 'Contraseña restablecida exitosamente',
      }).then((result) => {
          navigate("/home")
    })
    }

      const handleChange = () => {
        //si set error tiene algo
        if(error.user_mail !== "" || error.newPassword !== "" || error.confirmPassword !== ""){
        /* setError({...error}) */
          Swal.fire({
              icon: 'error',
              title: 'Se ha producido un error',
              text:'Intenta nuevamente',
          })}else{
           sendChange()
        }
    }
    

    const validarForm = (errors:type.errorsPassword) => {
        let valid = true;
        Object.values(errors).forEach((val:any) => val.length > 0 && (valid = false));
        if (valid) {
            setError({
                ...error,
                disabled: false
            })
        } else {
            setError({
                ...error,
                disabled: true
            })
        }
    }
    
    const handleInputChange = (e:any) => {
        e.preventDefault()
        const value = e.target.value;
        const name = e.target.name;
        let errors:type.errorsPassword;
        errors = error;
        
        
        switch (name) {
            case "newPassword":
            let newPasswordPattern: RegExp =
              /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
            error.newPassword = newPasswordPattern.test(value)
              ? ""
              : "Debe tener entre 8 y 16 caracteres y al menos 1 mayúscula, 1 minúscula y 1 número.";
            break;
          case "confirmPassword":
              let confirmPasswordPattern: RegExp =
              /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
              error.confirmPassword = confirmPasswordPattern.test(value)
              ? value !== user.newPassword
              ? "Las contraseñas no coinciden"
              : ""
              : "Las contraseñas no coinciden";
            break;
            case "user_mail":
                let user_mailPattern: RegExp =
                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                error.user_mail = user_mailPattern.test(value)
                ? ""
                : "El campo ingresado debe ser un email válido.";
                break;
        }
    
        setError(error)
    
        validarForm(errors)  

        setUser({ ...user, [name]: value });
    }


    return (
        <div>
            <Header/>
            <div className='ChangePassword_Container'>
                <h2 className="ChangePassword_title">Restablecer contraseña</h2>
            <form className='ChangePassword_form'>
            <div className="ChangePassword_div">
                <h3 className='ChangePassword_subtitle'>Correo electrónico</h3>
                    <input 
                        className="ChangePassword_formInput" 
                        type="text" 
                        name="user_mail" 
                        onChange={handleInputChange} 
                        placeholder='Correo electrónico'/>
                    </div>
                    <div>
                        {error.user_mail ? (
                            <div className='ChangePassword_inputError'>{error.user_mail}</div>
                        ) : <br className="ChangePassword_br"/>
                        } 
                </div>
                <div className="ChangePassword_div">
                <h3 className='ChangePassword_subtitle'>Contraseña actual</h3>
                    <input 
                        className="ChangePassword_formInput" 
                        type="password" 
                        name="oldPassword" 
                        onChange={handleInputChange} 
                        placeholder='Contraseña actual'/>
                    </div>
                    <div className="ChangePassword_div">
                    <h3 className='ChangePassword_subtitle'>Nueva contraseña</h3>
                    <input 
                        className="ChangePassword_formInput" 
                        type="password" 
                        name="newPassword" 
                        onChange={handleInputChange} 
                        placeholder='Nueva contraseña'/>
                    </div>
                    <div>
                        {error.newPassword ? (
                            <div className='ChangePassword_inputError'>{error.newPassword}</div>
                        ) : <br className="ChangePassword_br"/>
                    } 
                </div>
                <div className="ChangePassword_div">
                    <h3 className='ChangePassword_subtitle'>Repetir contraseña</h3>
                    <input 
                        className="ChangePassword_formInput" 
                        type="password" 
                        name="confirmPassword" 
                        onChange={handleInputChange} 
                        placeholder='Repetir contraseña'/>
                </div>
                <div>
                        {error.confirmPassword ? (
                            <div className='ChangePassword_inputError'>{error.confirmPassword}</div>
                        ) : <br className="ChangePassword_br"/>
                    } 
                </div>
            </form>
            <div>
                <button className='ChangePassword_inputSubmit' onClick={handleChange}>Restablecer</button>
            </div>
        </div>
            </div>
    )
}

export default ChangePassword