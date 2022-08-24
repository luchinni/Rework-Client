import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Swal from "sweetalert2";
import { forgotPassword } from '../../../Redux/Reducer/reducer';
import "./ForgotPassword.css"
import Header from '../../Register/HeaderRegister/HeaderRegister';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({user_mail: ""})
    const [error, setError] = useState({user_mail: ""})
  
    const handleChange = (e:any) => {
        setUser({
        ...user,
            [e.target.name]: e.target.value
        })
        /* setError({
            ...error,
        
        }) */
    } 

    /* case "user_mail":
        let user_mailPattern: RegExp =
          /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        error.user_mail = user_mailPattern.test(value)
          ? ""
          : "El campo ingresado debe ser un email valido.";
        break; */

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        console.log("entre al handle submit")
        let email = user.user_mail.toLowerCase();
        setUser({
            user_mail: email
        })
        console.log("voy a despachar la action", user)
        dispatch(forgotPassword(user.user_mail, "passwordreset"))
        console.log("asi se envia el mail", email)
        Swal.fire({
            icon: 'success',
            title: 'En unos minutos te enviaremos un enlace para restablecer tu contraseña',
            text:'Por favor, revisa tu casilla de correo electrónico',
        })
        
    }



/*     const sendReset = () => {
        dispatch(forgotPassword(input.user_mail,"passwordreset"))
        Swal.fire({
          icon: 'success',
          title: 'Se ha enviado un enlace para restablecer tu contraseña',
          text:'Por favor, revisa tu casilla de correo electrónico',
      })}
      const handleReset = () => {
        if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(input.email)){
          Swal.fire({
              icon: 'error',
              title: 'No es un mail válido',
              text:'Por favor, inserta mail válido',
          })}else{
           sendReset()
        }
     } */





    return (
        <div>
            <Header/>
        <div className='ForgotPassword_Container'>
            <h2 className='ForgotPassword_title'>Ingresa tu correo electrónico</h2> 
            <h2 className='ForgotPassword_subtitle'>y te enviaremos un enlace </h2>
            <h2 className='ForgotPassword_subtitle'>para restablecer tu contraseña:</h2>
            <form className='ForgotPassword_form'>
                <div className='ForgotPassword_inputError'>
                    <input 
                        className='ForgotPassword_formInput'
                         type="text" 
                         name="user_mail" 
                         onChange={(e) => handleChange(e)} 
                         placeholder='Correo electrónico'
                         />
                    </div>
                         <div>
                        {error.user_mail ? (
                            <div className='ForgotPassword_inputError' >Inserta un mail válido</div>
                        )
                        : null 
                    } 
                    {/* <div className='ForgotPassword_inputError'>Inserta un mail válido</div> */}
                </div>
                <button className='ForgotPassword_inputSubmit' onClick={(e) => handleSubmit(e)}>Enviar enlace</button>
            </form>
        </div>
        </div>
    )
}

export default ForgotPassword