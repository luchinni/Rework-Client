import React, {useEffect} from 'react'
import './UserDash.css'
import { useDispatch, useSelector } from 'react-redux';

function UserDash() {

	const dispatch = useDispatch()

	// const clients = useSelector((state:any) => state.workService.allClients)

  return (
    <div className='UserDash_Component'>
        <div className='UserDash_divContent'>
					<div>
						
					</div>
        </div>
    </div>
  )
}

export default UserDash