import React, {useEffect, useState} from 'react'
import './UserDash.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../Redux/Reducer/reducer';

function UserDash() {

	const dispatch = useDispatch()

	const allUsers = useSelector((state:any) => state.workService.allUsers)

  console.log("users :", allUsers)

	const [modalDelete, setModalDelete] = useState(false)
	const [dataUser, setDataUser] = useState<any>({})

	function handleModalDelete(user:any) {
		setModalDelete(true)
		setDataUser(user)
	}

  console.log(allUsers)

  const [userAdmin, setUserAdmin] = useState("") 

   useEffect( () => {
    dispatch(getAllUsers(userAdmin))
  }, [userAdmin])

  function handleOnchange(e: any) {
    const value = e.target.value;
    setUserAdmin(value)
  }

  return (
    <div className='UserDash_Component'>
      <div>
        <select onChange={handleOnchange}>
          <option selected={true} hidden>Monstrar usuarios</option>
          <option value="true">Activos</option>
          <option value="false">Baneados</option>
          <option value="">Todos</option>
        </select>
      </div>
        <div className='UserDash_divContent'>

					{
						modalDelete &&
						<div className='OfferDash_Modal'>
							<div className='OfferDash_modalDeleteText'>
								<p className='OfferDash_divModalTitle'>Estas seguro que deseas borrar al usuario:</p>
                <hr />
                <p className='OfferDash_divModalTitle'>Nombre: <span className='OfferDash_MOdalTextInfo'>{`${dataUser.name} ${dataUser.lastName}`}</span></p>
                <p className='OfferDash_divModalTitle'>Id: <span className='OfferDash_MOdalTextInfo'>{dataUser.id}</span></p>
							</div>
							<div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk'>si</button>
								<button className='OfferDash_modalCancelar' onClick={() => setModalDelete(false)}>cancelar</button>
							</div>
						</div>
					}

					<table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Id</th>
                <th>Tipo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {
                allUsers?.map((user: any, i:any) => {
                  return (
                  <tr key={i}>
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
                        <span>{user.isActive ? "True" : "False"}</span>
                      </div>
                    </td>

                    <td className='OfferDash_tdButtons'>
											<button className='OfferDash_deleteButton' onClick={() => handleModalDelete(user)}>Eliminar</button>
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