import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import {verifyClient, verifyWorker, postLogin} from "../../../Redux/Reducer/reducer";
import LoginComponent from '../../Login/LoginComponent/LoginComponent'
import Header from '../../Register/HeaderRegister/HeaderRegister';
import "./VerifyUser.css"

// esta funcion se ejecuta una sola vez y es para verificar el mail del usuario recien registrado.
const VerifyUser = () => {
    const dispatch = useDispatch()
    const location = useLocation() 
    const params = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({user_mail: "", password: ""})

    // diferenciamos si la url tiene al client o al worker y se despacha la action correspondiente
    if(location.pathname === `/confirm/client/${params.id}`) {
        dispatch(verifyClient(params.id))
    } else if(location.pathname === `/confirm/worker/${params.id}`) {
        dispatch(verifyWorker(params.id))
    }  

    const handleChange = (e:any) => {
        setUser({
          ...user,
            [e.target.name]: e.target.value
        });
      } 
    
      const handleSubmit = (e:any) =>{
        e.preventDefault();
        
        let password  = user.password
        let user_mail = user.user_mail.toLowerCase();
        let newLoggedUser = {
          user_mail:user_mail, password:password
        }
        dispatch(postLogin(newLoggedUser));/* 
        navigate('/home') */
      }
    
    
    // notificamos al user que su cuenta fue verificada y lo hacemos ingresar
    return (
        <div>
                <Header/>
            <div className='VerifyUser_Container'>
            <h2 className='VerifyUser_title'>Cuenta verificada
                <a className='VerifyUser_highlight'> exitosamente!</a></h2>
            <LoginComponent/>
            </div>
            {/* <div className="Login_divOtroDiv">
                    <div className="LoginComponent_divContent">
                        <span className="Login_inicia">Inicia sesión</span>
                        <div>
                        <form className="Login_form">
                            <input className="Login_input" type="text" name="user_mail" onChange={(e) => handleChange(e)} placeholder='e-mail'/>
                            <input className="Login_input" type="password" name="password" onChange={(e) => handleChange(e)} placeholder='contraseña'/>
                            <input className="Login_inputSubmit" type="submit" name="" value="Log in" onClick={(e) => handleSubmit(e)}/>
                        </form>
                        </div>
                </div>
            </div> */}
        </div>
    )
}

export default VerifyUser 
