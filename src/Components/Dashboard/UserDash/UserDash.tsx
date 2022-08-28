import React, {useEffect, useState} from 'react'
import './UserDash.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, userIsActivePut, userIsAdminChange} from '../../../Redux/Reducer/reducer';

function UserDash({props}: any) {

	const dispatch = useDispatch()

	let allUsers = useSelector((state:any) => state.workService.allUsers)
  const currentUser = useSelector((state:any) => state.workService.currentUser)

	const [modalEdit, setModalEdit] = useState(false) 
  const [modalAdmin, setModalAdmin] = useState(false) 

  const [user, setUser] = useState(true)
  const [userAdmin, setUserAdmin] = useState(true)

  const [userData, setUserData] = useState<any>({})

  const [userFiltro, setUserFiltro] = useState("true")

   useEffect( () => {
    dispatch(getAllUsers(userFiltro))
  }, [userFiltro, props])

  function handleOnchange(e: any) {
    const value = e.target.value;
    setUser(value)
  }

  function handleModalEdit(e: any) {
    setModalEdit(true)
    const value = e
		setUserData(value)
    console.log("handleModalEdit", value)
	}

  async function handleOnClick() {
    await userIsActivePut(userData.id, user.toString() , userData.isWorker, /* userData.isAdmin */)
    dispatch(getAllUsers(userFiltro))
    setModalEdit(false)
  }

  function handleModalEditClose() {
    setModalEdit(false)
  }

  function handleModalAdmin(e: any) {
    setModalAdmin(true)
    const value = e
		setUserData(value)
  }

  function handleSelect(e: any) {
    let value = e.target.value
    setUserFiltro(value)
  }

  function handleOnchangeAdmin(e: any) {
    const value = e.target.value;
    setUserAdmin(value)
  }

  async function handleOnClickAdmin() {
    await userIsAdminChange(userData.id, userAdmin.toString() , userData.isWorker, /* userData.isAdmin */)
    dispatch(getAllUsers(userFiltro))
    setModalAdmin(false)
  }

  function handleModalAdminClose(e: any) {
    setModalAdmin(false)
  }

  if(props && props !== "") {
		allUsers = allUsers.filter((e: any) => `${e.name} ${e.lastName}`.toLowerCase().includes(props.toLowerCase()))
	}

  return (
    <div className='OfferDash_Component'>
      <div className='OfferDash_firstDivSelect'>

        <select className='UserDash_select' onChange={handleSelect}>
          <option className='UserDash_option' selected={true} hidden>Mostrar usuarios</option>
          <option className='UserDash_option' value="true">Activos</option>
          <option className='UserDash_option' value="false">Inactivos</option>
          <option className='UserDash_option' value="">Todos</option>
        </select>

      </div>
        <div className='OfferDash_divContent'>

        {
						modalEdit &&
						<div className='OfferDash_Modal'>
							<div>

								<div className='OfferDash_divInfoModal'>
									<div>
										<p className='OfferDash_divModalTitle'>ID del usuario: </p>
										<span className='OfferDash_ModalIdInfo'>{userData.id}</span>
									</div>

									<div>
										<p className='OfferDash_divModalTitle'>Estado actual: </p>
										{userData.isActive === false 
                    ? 
                    <span className='OfferDash_ModalTextInactiva'>Inactivo</span>
                    : 
                    <span className='OfferDash_ModalTextActiva'>Activo</span>}
									</div>
								</div>

								<hr className='OfferDash_hr' />

								<div className='OfferDash_divInputEdit'>
									<label className='OfferDash_divModalTitle'>Actualiza el estado</label>

									<select onChange={handleOnchange}>
										<option selected={true} hidden>Selecciona uno</option>
										<option value="true">Activo</option>
										<option value="false">Inactivo</option>
									</select>
                </div>

                <div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk' onClick={()=>handleOnClick()}>Guardar</button>
								<button className='OfferDash_modalCancelar' onClick={handleModalEditClose}>Cancelar</button>
							  </div>

              </div>
            </div>
        }{
          modalAdmin &&
            <div className='OfferDash_Modal'>
							<div>

								<div className='OfferDash_divInfoModal'>
									<div>
										<p className='OfferDash_divModalTitle'>ID del usuario: </p>
										<span className='OfferDash_ModalIdInfo'>{userData.id}</span>
									</div>

									<div>
										<p className='OfferDash_divModalTitle'>Estado actual: </p>
										{userData.isAdmin === false 
                    ? 
                    <span className='OfferDash_ModalTextNoAdmin'>No Admin</span>
                    : 
                    <span className='OfferDash_ModalTextAdmin'>Admin</span>}
									</div>
								</div>

								<hr className='OfferDash_hr' />

                <div className='OfferDash_divInputEdit'>
									<label className='OfferDash_divModalTitle'>Convertir a Administrador</label>

									<select onChange={handleOnchangeAdmin}>
										<option selected={true} hidden>Selecciona uno</option>
										<option value="true">Si</option>
										<option value="false">No</option>
									</select>
								</div>
              
							  <div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk' onClick={()=>handleOnClickAdmin()}>Guardar</button>
								<button className='OfferDash_modalCancelar' onClick={handleModalAdminClose}>Cancelar</button>
							  </div>
						  </div>
            </div>
					}

					<table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>ID</th>
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
                        <span>{user.isActive ? "Activo" : "Inactivo"}</span>
                      </div>
                    </td>

                    <td className='OfferDash_tdButtons'>
											<button className='OfferDash_editButton' onClick={() => handleModalEdit(allUsers[i])}>Editar</button>

                    {currentUser.isSuper === true ? 
											<button className='OfferDash_adminButton' onClick={() => handleModalAdmin(allUsers[i])}>Administrador</button>
                      : null
                    }
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