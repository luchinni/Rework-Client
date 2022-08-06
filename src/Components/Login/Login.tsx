import React, { Component, useState } from 'react'
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import imgGoogle from "../../images/pngwing.com.png"
import * as type from "../../Types";
import {postLogin} from "../../Redux/Reducer/reducer"

const Login = () => {

  const [user, setUser] = useState({user_mail: "", password: ""})
  const dispatch = useDispatch()
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
    console.log (password, user_mail)
    let newLoggedUser = {
      user_mail:user_mail, password:password
    }
    dispatch(postLogin(newLoggedUser));
  }
      //Ejemplo de useSelector con Toolkit.
  /* const global = useSelector((state: any) => state.workService.currentUser) */
   
  return (
    <div>
      
      <div>
          <h1>Inicia sesion</h1>
          <p>Olvidaste tu contraseña? recuperala <a href="#">Aqui</a></p>
          <div>
            <form action="">
              <input type="text" name="user_mail" id="" onChange={(e) => handleChange(e)} placeholder='E-mail'/>
              <input type="password" name="password" id="" onChange={(e) => handleChange(e)} placeholder='Constraseña'/>
              <input type="submit" name="" value="Log in" onClick={(e) => handleSubmit(e)}/>
            </form>
              <span/>
              <p>O continua con</p>
              <span/>
              <span>
                  <img src={imgGoogle} alt="googleLink" />
                  <p>Google</p>
              </span>
          </div>
      </div>
    </div>
  )
}

export default Login