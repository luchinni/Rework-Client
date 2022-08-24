import { useState } from "react";
import { changePassword } from "../../../Redux/Reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Header from "../../Register/HeaderRegister/HeaderRegister";
import "./ChangePassword.css"


const ChangePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogged = useSelector((state: any) => state.workService.userLogged);
    const [ user, setUser] = useState({user_mail: "", oldPassword:"", newPassword: ""})
    const [ error, setError] = useState({password: "", confirmPassword: "", disabled: true})


    const handleInputChange = (e:any) => {
        e.preventDefault()
        const value = e.target.value;
        const name = e.target.name;
        console.log("etargetvalue", e.target.value)
        console.log("e.target.name", e.target.name)
        setUser({ ...user, [name]: value });
    }
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
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,60}$/.test(user.oldPassword)){
          Swal.fire({
              icon: 'error',
              title: 'Se ha producido un error',
              text:'Intenta nuevamente',
          })}else{
           sendChange()
        }
     }

     //Debe tener entre 8 y 16 caracteres y al menos 1 mayúscula, 1 minúscula y 1 número
     //Las contraseñas deben coincidir



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
                        {error.password ? (
                            <div className='ChangePassword_inputError'>{error.password}</div>
                        )
                        : null 
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
                        )
                        : null 
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