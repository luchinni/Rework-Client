import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOut } from '../../../Redux/Reducer/reducer'
import './User.css'
import { useNavigate } from 'react-router-dom'
import decode from "jwt-decode";

function User() {

  const currentUser = useSelector((state: any) => state.workService.currentUser)
  const userLogged = useSelector((state: any) => state.workService.userLogged)

  const token:any = localStorage.getItem("token")
  if(token){
    const tokenDecode:any = decode(token)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  function handleLogOut(e: any){
    e.preventDefault()
    dispatch(logOut())
    navigate('/')
  }

  return (
    <div className='User_Component'>
      <div className='User_DivProfile'>
        <button onClick={handleClick} className='User_divImageProfile'>
          <img className='User_ImageProfile' src={userLogged?.photo} alt="profile" />
        </button>
      </div>
      {open &&
      
        <div className='User_Dropdown'>
          <div className='User_DropdownOptions'>
            { 
              currentUser?.id !== '' && userLogged?.name !== '' ? 
              <div className='User_dropUserName'>
                <span>Hola, <b>{userLogged?.name}</b>!</span>
              </div>
              : ""
            }

            {
              currentUser?.id !== '' && userLogged?.isWorker === true ? 
              <div className='User_typeOfUser'>
                <span>Worker</span>
              </div>
              :
              <div className='User_typeOfUser'>
                <span>Client</span>
              </div>
            }

            <hr className='User_hr' />
            <Link className='UserDropdownItem' to={'/myProfile'}>Perfil</Link>
            <Link className='UserDropdownItem' to='/post'>Nueva oferta</Link>
            <Link className='UserDropdownItem' to='#'>Opciones</Link>
            <hr className='User_hr' />
            <div>
              <button className='User_buttonLogout' onClick={handleLogOut} >Logout</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default User