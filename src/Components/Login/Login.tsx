import React, { Component } from 'react'
import { connect, ConnectedProps } from "react-redux";
import imgGoogle from "../../images/pngwing.com.png"
import * as type from "../../Types";
import {postLogin} from "../../Redux/Reducer/reducer"

interface HeaderState{
  // props: any;
  //inputSkills: string[]
}
export class Login extends Component<HeaderProps, HeaderState> {
  state: type.userLogin;
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
    console.log (password, user_mail)
    let newLoggedUser = {
      user_mail:user_mail, password:password
    }
    console.log (newLoggedUser)
    postLogin(newLoggedUser);
  }

  handleChange(e:any) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
        [name]: value
    });
  }

  render() {
    return (
      <div>
        
        <div>
            <h1>Inicia sesion</h1>
            <p>Olvidaste tu contraseña? recuperala <a href="#">Aqui</a></p>
            <div>
              <form action="">
                <input type="text" name="user_mail" id="" onChange={(e) => this.handleChange(e)} placeholder='E-mail'/>
                <input type="password" name="password" id="" onChange={(e) => this.handleChange(e)} placeholder='Constraseña'/>
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
    postLogin: (newLoggedUser:type.userLogin) => dispatch(postLogin(newLoggedUser))
  }
};

const connector = connect(mapStateToProps, mapDispatchToProps)

type HeaderProps = ConnectedProps<typeof connector>

export default connector(Login)