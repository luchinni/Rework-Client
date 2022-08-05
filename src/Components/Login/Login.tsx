import React, { Component } from 'react'
import imgGoogle from "../../images/pngwing.com.png"

export class Login extends Component {
  render() {
    return (
      <div>
        
        <div>
            <h1>Inicia sesion</h1>
            <p>Olvidaste tu contraseña? recuperala <a href="#">Aqui</a></p>
            <div>
                <input type="text" name="user_mail" id="" placeholder='E-mail'/>
                <input type="password" name="" id="" placeholder='Constraseña'/>
                <input type="submit" name="" value="Log in" />
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
}

export default Login