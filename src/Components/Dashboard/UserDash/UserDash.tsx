import React, {useEffect, useState} from 'react'
import './UserDash.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../Redux/Reducer/reducer';

function UserDash() {

	const dispatch = useDispatch()

  useEffect( () => {
    dispatch(getAllUsers())
  }, [])

	const allUsers = useSelector((state:any) => state.workService.allUsers)



  const [modalEdit, setModalEdit] = useState(false)
	const [modalDelete, setModalDelete] = useState(false)

	const [dataUser, setDataUser] = useState<any>({})

	function handleModalEdit(user:any) {
		setModalEdit(true)
		setDataUser(user)
	}

	function handleModalEditClose() {
		setModalEdit(false)
	}

	function handleModalDelete(user:any) {
		setModalDelete(true)
		setDataUser(user)
	}

  console.log(allUsers)

  return (
    <div className='UserDash_Component'>
        <div className='UserDash_divContent'>

        {
						modalEdit &&
						<div className='OfferDash_Modal'>
							<div>

								<div className='OfferDash_divInfoModal'>
									<div>
										<p className='OfferDash_divModalTitle'>Id del usuario: </p>
										<span className='OfferDash_MOdalTextInfo'>{dataUser.id}</span>
									</div>
									
									<div>
										<p className='OfferDash_divModalTitle'>Usuario: </p>
										<span className='OfferDash_MOdalTextInfo'>{dataUser.name} </span>
										<span className='OfferDash_MOdalTextInfo'>{dataUser.lastName}</span>
									</div>

									{/* <div>
										<p className='OfferDash_divModalTitle'>estado actual: </p>
										<span className='OfferDash_MOdalTextInfo'>Abierta</span>
									</div> */}
								</div>

								<hr className='OfferDash_hr' />

								<div className='OfferDash_divInputEdit'>
									<label className='OfferDash_divModalTitle'>Actualiza el estado</label>
									<select name="" id="">
										<option value="">Abierta</option>
										<option value="">Cerrada</option>
									</select>
								</div>
							</div>
							<div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk'>guardar</button>
								<button className='OfferDash_modalCancelar' onClick={handleModalEditClose}>cancelar</button>
							</div>
						</div>
					}

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
                <th>Plan</th>
                <th>Activo</th>
                <th>Mas</th>
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

                    <td className='OfferDash_tdButtons'>
											<button className='OfferDash_editButton' onClick={() => handleModalEdit(user)}>Editar</button>
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