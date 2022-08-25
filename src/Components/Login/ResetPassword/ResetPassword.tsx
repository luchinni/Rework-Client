import { useState, useEffect } from "react";
import { changeLoading, resetPassword } from "../../../Redux/Reducer/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import "./ResetPassword.css"
import Header from '../../Register/HeaderRegister/HeaderRegister';
import * as type from "../../../Types";
import Loading from "../../Loading/Loading";


const ResetPassword = () => {
    const token = new URLSearchParams(window.location.search).get('token')
    const isLoading = useSelector((state:any) => state.workService.isLoading);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(changeLoading(true))
        setTimeout(() => dispatch(changeLoading(false)), 1700);
    },[]);

    type errorResetPassword = {
        newPassword:string,
        confirmPassword: string,
        disabled:Boolean
    }

    const [ user, setUser] = useState({user_mail:"", newPassword:""})
    const [ error, setError] = useState <type.errorResetPassword>({
        newPassword: "",
        confirmPassword: "", 
        disabled: true
    })
    
    
    const sendChange = () => {
        dispatch(resetPassword(token,user.newPassword))
        Swal.fire({
          icon: 'success',
          title: 'Contraseña restablecida exitosamente',
      }).then((result) => {
        navigate("/login")
    })
    }

    const handleChange = () => {
    if (error.newPassword !== "" || error.confirmPassword !== ""){
        Swal.fire({
            icon: 'error',
            title: 'Se ha producido un error',
            text:'Intenta nuevamente',
        })}else{
            sendChange()
        }
    }


    const validarForm = (errors:type.errorResetPassword) => {
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

        let errors:type.errorResetPassword;
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
        }
    
        setError(error)
    
        validarForm(errors)  

        setUser({ ...user, [name]: value });
    }
        


    return(
        <>
    {isLoading ? <Loading/>:
    <>
        <div>
                <Header/>
            <div className='ResetPassword_Container'>
                <h2 className="ResetPassword_title">Restablecer contraseña</h2>
            <form className='ResetPassword_form'>
                <div className="ResetPassword_inputContainer">
                    <h3 className='ResetPassword_subtitle'>Ingresar nueva contraseña</h3>
                    <input 
                        className="ResetPassword_formInput" 
                        type="password" 
                        name="newPassword" 
                        onChange={handleInputChange} 
                        placeholder='Contraseña'/>
                    </div>
                    <div>
                        {error.newPassword ? (
                            <div className='ResetPassword_inputError'>{error.newPassword}</div>
                        )
                        : <br className="ResetPassword_br" />
                    } 
                </div>
                <div  className="ResetPassword_inputContainer">
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
                            <div className='ResetPassword_inputError'>{error.confirmPassword}</div>
                        )
                        : <br className="ResetPassword_br" />
                    } 
                </div>
            </form>
            <div>
                <button className='ResetPassword_inputSubmit' onClick={handleChange}>Restablecer</button>
            </div>
        </div>
        </div>
        </>
}
</>
    )
}

export default ResetPassword


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
