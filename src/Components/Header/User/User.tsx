import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './User.css'

function User() {

  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <div className='User_Component'>
      <div className='User_DivProfile'>
        <button onClick={handleClick} className='User_divImageProfile'>
          <img className='User_ImageProfile' src="https://i.ytimg.com/vi/hjk4nLDxNAs/hqdefault.jpg" alt="profile" />
        </button>
      </div>
      {open &&
      
        <div className='User_Dropdown'>
          <div className='User_DropdownOptions'>
            <Link to='/home/profile/:452h2'>Perfil</Link>
            <Link to='/post'>Nueva oferta</Link>
            <div>
              <button>Logout</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default User