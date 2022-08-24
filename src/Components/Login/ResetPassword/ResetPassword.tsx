import { useState, useEffect } from "react";
import { resetPassword } from "../../../Redux/Reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "./ResetPassword.css"
import Header from '../../Register/HeaderRegister/HeaderRegister';


const ResetPassword = () => {
    const token = new URLSearchParams(window.location.search).get('token')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userByEmail = useSelector((state: any) => state.workService.userByEmail);
    const [ user, setUser] = useState({user_mail:"", password:""})
    const [ error, setError] = useState({password: "Campo requerido.", confirmPassword: "Campo requerido.", disabled: true})
    /* const location = useLocation() 
    const params = useParams() */
/* 
    useEffect(() => {
        if(params.id === userByEmail.id){
        dispatch(getResetPassword(params.id))
        } else {
            console.log("id params", params.id)
            console.log("userByEMAIL id", userByEmail.id)
            Swal.fire("Usuario incorrecto.","warning")
        }
     }, [dispatch])
    
 */
    /* const validateForm = (errors: any) => {
        let valid = true;
        Object.values(errors).forEach(
            (val: any) => val.length > 0 && (valid = false)
            );            
            if (valid) {
                setError({
                    ...error,
                    disabled: false,
                });
                let inputSubmit = document.getElementById("btnEditDisabled")
                inputSubmit?.setAttribute("id","btnEditEnabled")
            } else {
                setError({
                    ...error,
                    disabled: true,
                });
                let inputSubmit = document.getElementById("btnEditEnabled")
                inputSubmit?.setAttribute("id","btnEditDisabled")
            }
            
  }; */

  /* const handleChange = (e:any) => {
    e.preventDefault()
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
        case "password":
            let passwordPattern:RegExp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
            error.password = passwordPattern.test(value)? "" : "Debe tener entre 8 y 16 caracteres, 1 mayúscula, 1 minúscula y un 1 número."
        break;
        case "passwordConfirmed":
            let passwordConfirmedPattern: RegExp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/; 
            error.confirmPassword = passwordConfirmedPattern.test(value) ?
            value === user.password ? "" 
            : "Las contraseñas no coinciden"
            : "Debe tener entre 8 y 16 caracteres y al menos 1 mayuscula, 1 minuscula y 1 número.";
         break;
    default:
        break;
    } 
    setUser({ ...user, [name]: value });
} */

  /* const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(resetPassword(user));
    } */
    
    const handleInputChange = (e:any) => {
        e.preventDefault()
        const value = e.target.value;
        const name = e.target.name;
        setUser({ ...user, [name]: value });
    }
    const sendChange = () => {
        dispatch(resetPassword(token,user.password))
        Swal.fire({
          icon: 'success',
          title: 'Contraseña restablecida exitosamente',
      }).then((result) => {
        navigate("/login")
    })
    }

      const handleChange = () => {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,60}$/.test(user.password)){
          Swal.fire({
              icon: 'error',
              title: 'Se ha producido un error',
              text:'Intenta nuevamente',
          })}else{
           sendChange()
        }
     }



    return(
        <div>
                <Header/>
            <div className='ResetPassword_Container'>
                <h2 className="ResetPassword_title">Restablecer contraseña</h2>
            <form className='ResetPassword_form'>
                <div>
                    <h3 className='ResetPassword_subtitle'>Ingresar nueva contraseña</h3>
                    <input 
                        className="ResetPassword_formInput" 
                        type="password" 
                        name="password" 
                        onChange={handleInputChange} 
                        placeholder='Contraseña'/>
                    </div>
                    <div>
                        {error.password ? (
                            <div className='ResetPassword_inputError'>Debe tener entre 8 y 16 caracteres y al menos 1 mayúscula, 1 minúscula y 1 número</div>
                        )
                        : null 
                    } 
                </div>
                <div>
                    <h3 className='ResetPassword_subtitle'>Repetir contraseña</h3>
                    <input 
                        className="ResetPassword_formInput" 
                        type="password" 
                        name="confirmPassword" 
                        onChange={handleInputChange} 
                        placeholder='Repetir contraseña'/>
                </div>
                <div>
                        {error.confirmPassword ? (
                            <div className='ResetPassword_inputError'>Las contraseñas deben coincidir</div>
                        )
                        : null 
                    } 
                </div>
            </form>
            <div>
                <button className='ResetPassword_inputSubmit' onClick={handleChange}>Restablecer</button>
            </div>
        </div>
        </div>
    )
}

export default ResetPassword

