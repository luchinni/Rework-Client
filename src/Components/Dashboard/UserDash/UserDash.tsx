import React, {useEffect, useState} from 'react'
import './UserDash.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, userIsActivePut} from '../../../Redux/Reducer/reducer';

function UserDash() {

	const dispatch = useDispatch()

	const allUsers = useSelector((state:any) => state.workService.allUsers)

	const [modalEdit, setModalEdit] = useState(false) 

  const [userAdmin, setUserAdmin] = useState(true)

  const [userData, setUserData] = useState<any>({})

  const [userFiltro, setUserFiltro] = useState("true")

   useEffect( () => {
    dispatch(getAllUsers(userFiltro))
  }, [userFiltro])

  function handleOnchange(e: any) {
    const value = e.target.value;
    setUserAdmin(value)
  }

  function handleModalEdit(e: any) {
    setModalEdit(true)
    const value = e
		setUserData(value)
    console.log("handleModalEdit", value)
	}

  function handleOnClick() {

    userIsActivePut(userData.id, userAdmin.toString() , userData.isWorker, /* userData.isAdmin */)
    setModalEdit(false)
  }

  function handleModalEditClose() {
    setModalEdit(false)
  }

  function handleSelect(e: any) {
    let value = e.target.value
    console.log("handleSelect:", value)
    setUserFiltro(value)
  }

  return (
    <div className='UserDash_Component'>
      <div>

        <select onChange={handleSelect}>
          <option selected={true} hidden>Mostrar usuarios</option>
          <option value="true">Activos</option>
          <option value="false">Suspendidos</option>
          <option value="">Todos</option>
        </select>

      </div>
        <div className='UserDash_divContent'>

        {
						modalEdit &&
						<div className='OfferDash_Modal'>
							<div>

								<div className='OfferDash_divInfoModal'>
									<div>
										<p className='OfferDash_divModalTitle'>Id de la publicacion: </p>
										<span className='OfferDash_MOdalTextInfo'>{/* {dataOffer.idOffer} */}</span>
									</div>

									<div>
										<p className='OfferDash_divModalTitle'>estado actual: </p>
										<span className='OfferDash_MOdalTextInfo'>{userData.isActive === false ? "Cerrada" : "Abierta"}</span>
									</div>
								</div>

								<hr className='OfferDash_hr' />

								<div className='OfferDash_divInputEdit'>
									<label className='OfferDash_divModalTitle'>Actualiza el estado</label>

									<select onChange={handleOnchange}>
										<option selected={true} hidden>selecciona uno</option>
										<option value="true">Abierta</option>
										<option value="false">Cerrada</option>
									</select>

								</div>
							</div>
							<div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk' onClick={()=>handleOnClick()}>guardar</button>
								<button className='OfferDash_modalCancelar' onClick={handleModalEditClose}>cancelar</button>
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
                        <span>{user.isAdmin ? "Admin" : user.isWorker ? "Freelancer" : "Cliente" }</span>
                      </div>
                    </td>

                    <td>
                      <div>
                        <span>{user.isActive ? "Activo" : "No activo"}</span>
                      </div>
                    </td>

                    <td className='OfferDash_tdButtons'>
											<button className='OfferDash_editButton' onClick={() => handleModalEdit(allUsers[i])}>Editar</button>
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