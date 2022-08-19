import React, {useEffect} from 'react'
import './UserDash.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../Redux/Reducer/reducer';

function UserDash() {

	const dispatch = useDispatch()

  useEffect( () => {
    dispatch(getAllUsers())
  }, [])

	const allUsers = useSelector((state:any) => state.workService.allUsers)

  console.log("users:", allUsers)

  return (
    <div className='UserDash_Component'>
        <div className='UserDash_divContent'>
					<table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Id usuario</th>
                <th>tipo usuario</th>
                <th>plan</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody>
              {
                allUsers?.map((user: any, i:any) => {
                  return (
                  <tr>
                    <td>
                      <div>
                        <span>{`${user.name} ${user.lastName}`}</span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <span>{user.id}</span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <span>{user.isAdmin ? "Admin" : user.isWorker ? "Worker" : "Client" }</span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <span>{user.premium ? "Premium" : "Regular"}</span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <span>{user.isActive ? "True" : "False"}</span>
                      </div>
                    </td>

                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default UserDash