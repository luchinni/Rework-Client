import React, {useRef, useState} from 'react'
import notification from '../../../images/notification.svg'
import useOnClickOutside from "../../../utils/utils"
import './Notification.css'

function Notification() {
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(!open)
  }

  const userDiv = useRef(null);

  function handleClickOutside() {
    setOpen(false)
  }

  useOnClickOutside(userDiv, handleClickOutside);

  return (
    <div className='Notification_Component'>
      <div className='Notification_divContent'>
        <button onClick={handleOpen} className='Notificatoin_divImage'>
          <img className='Notification_image' src={notification} alt="notification" />
        </button>
      </div>
      
      {open && 
        <div className='Notification_Dropdown' ref={userDiv}>
          <div className='Notification_divMessageContent'>
            <div className='Notification_divMessage'>
              <p className='Notification_message'><b>Esteban longo</b> a aplicado a tu propuesta! aaaa</p>
            </div>
            {/* <span className='Notification_messageSpan'>Has click para ver</span> */}
          </div>
        </div>
      }
    </div>
  )
}

export default Notification