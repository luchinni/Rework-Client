import React, { Component } from 'react'
import { connect, ConnectedProps } from "react-redux";
import imgGoogle from "../../images/pngwing.com.png"
import * as type from "../../Types";
import {loginUser} from "../../Redux/Reducer/reducer"

interface HeaderState{
  // props: any;
  //inputSkills: string[]
}
export class Login extends Component<HeaderProps, HeaderState> {
  state: type.loginType;
  constructor(props: HeaderProps){
    super(props)

    this.state = {
      user_mail:"",
      password:""
    }
  }

  handleSubmit(e:any){
    e.preventDefault();

    let { password, user_mail } = this.state;
    user_mail = user_mail.toLowerCase();

    let newLoggedUser = {
      user_mail:user_mail, password:password
    }

    loginUser(newLoggedUser);

  }


  render() {
    return (
      <div>
        
        <div>
            <h1>Inicia sesion</h1>
            <p>Olvidaste tu contraseña? recuperala <a href="#">Aqui</a></p>
            <div>
              <form action="">
                <input type="text" name="user_mail" id="" placeholder='E-mail'/>
                <input type="password" name="password" id="" placeholder='Constraseña'/>
                <input type="submit" name="" value="Log in" onClick={(e) => this.handleSubmit(e)}/>
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
}

export const mapStateToProps = (state:any) => {
  return {

  }
};
export const mapDispatchToProps = (dispatch:any) => {
  return {
    loginUser: (newLoggedUser:type.newWorkerType) => dispatch(loginUser(newLoggedUser))
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps)

type HeaderProps = ConnectedProps<typeof connector>

export default connector(Login)