import { useState } from "react";
import { changePassword } from "../../../Redux/Reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Header from "../../Register/HeaderRegister/HeaderRegister"


const ChangePassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogged = useSelector((state: any) => state.workService.userLogged);
    const [ user, setUser] = useState({user_mail: "", oldPassword:"", newPassword: ""})
    const [ error, setError] = useState({oldPassword: "Campo requerido", password: "Campo requerido.", confirmPassword: "Campo requerido.", disabled: true})


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


    return (
        <div>
            <Header/>
            <div className='ChangePassword_Container'>
                <h2 className="ChangePassword_title">Restablecer contraseña</h2>
            <form className='ChangePassword_form'>
                <div>
                <h3 className='ChangePassword_subtitle'>Ingresa tu correo electrónico</h3>
                    <input 
                        className="ChangePassword_formInput" 
                        type="text" 
                        name="user_mail" 
                        onChange={handleInputChange} 
                        placeholder='Correo electrónico'/>
                    </div>
                <div>
                <h3 className='ChangePassword_subtitle'>Ingresa tu contraseña actual</h3>
                    <input 
                        className="ChangePassword_formInput" 
                        type="password" 
                        name="oldPassword" 
                        onChange={handleInputChange} 
                        placeholder='Contraseña actual'/>
                    </div>
                <div>
                    <h3 className='ResetPassword_subtitle'>Ingresa una nueva contraseña</h3>
                    <input 
                        className="ResetPassword_formInput" 
                        type="password" 
                        name="newPassword" 
                        onChange={handleInputChange} 
                        placeholder='Nueva contraseña'/>
                    </div>
                    <div>
                        {error.password ? (
                            <div className='ChangePassword_inputError'>Debe tener entre 8 y 16 caracteres y al menos 1 mayúscula, 1 minúscula y 1 número</div>
                        )
                        : null 
                    } 
                </div>
                <div>
                    <h3 className='ChangePassword_subtitle'>Repite la nueva contraseña</h3>
                    <input 
                        className="ChangePassword_formInput" 
                        type="password" 
                        name="confirmPassword" 
                        onChange={handleInputChange} 
                        placeholder='Repetir contraseña'/>
                </div>
                <div>
                        {error.confirmPassword ? (
                            <div className='ChangePassword_inputError'>Las contraseñas deben coincidir</div>
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