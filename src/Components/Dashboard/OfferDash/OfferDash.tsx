import React, {useState ,useEffect} from 'react'
import './OfferDash.css'
import {useSelector, useDispatch} from 'react-redux'
import {getOffers, getUserById} from "../../../Redux/Reducer/reducer";

function OfferDash() {

	const dispatch = useDispatch();

	useEffect(() => {
    dispatch(getOffers());
  }, [])

	const offers = useSelector((state:any) => state.workService.offers);

	// console.log("offers :" ,offers)

	const [modalEdit, setModalEdit] = useState(false)
	const [modalDelete, setModalDelete] = useState(false)

	const [idOffer, setIdOffer] = useState("")

	function handleModalEdit(e:any) {
		setModalEdit(true)
		setIdOffer(e.target.value)
	}


	function handleModalEditClose() {
		setModalEdit(false)
	}


	function handleModalDelete(e:any) {
		setModalDelete(true)
		setIdOffer(e.target.value)
	}



  return (
    <div className='OfferDash_Component'>
        <div className='OfferDash_divContent'>

					{
						modalEdit &&
						<div className='OfferDash_Modal'>
							<div>

								<div className='OfferDash_divInfoModal'>
									<div>
										<p>Id de la publicacion: </p>
										<span>{idOffer}</span>
									</div>
									
									{/* <div>
										<p>Dueño de la publicacion: </p>
										<span>Esteban longo</span>
									</div> */}

									<div>
										<p>estado actual: </p>
										<span>Abierta</span>
									</div>
								</div>

								<div className='OfferDash_divInputEdit'>
									<label>Actualiza el estado</label>
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
								<p>Estas seguro que deseas borrar la oferta con el id:</p>
								<span>{idOffer}</span>
							</div>
							<div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk'>si</button>
								<button className='OfferDash_modalCancelar' onClick={() => setModalDelete(false)}>cancelar</button>
							</div>
						</div>
					}

					<table className='OfferDash_divMap'>
						<thead >
							<tr>
								<th>Dueño</th>
								<th>Id offer</th>
								<th>Fecha</th>
								<th>Estado</th>
								<th>Accion</th>
							</tr>
						</thead>
						<tbody className='OfferDash_tableBody'>
							{offers.map((offer:any, i:any) => {
								return (
									<tr className='OfferDash_divOffer' key={i}>

										<td className='OfferDash_divCardOffer'>
											<div className='OfferDash_divUserInfo'>
												<span className='OfferDash_userName'>{offer.userClient.name} </span>
												<span className='OfferDash_userName'>{offer.userClient.lastName}</span>
											</div>
										</td>

										<td className='OfferDash_divUserMail'>
											{offer.idOffer}
										</td>
										
										<td>
												{offer.post_date}
										</td>

										<td>
												{offer.isActive === false ? "Cerrada" : "Abierta"}
										</td>

										<td className='OfferDash_tdButtons'>
											<button className='OfferDash_editButton' value={offer.idOffer} onClick={handleModalEdit}>Editar</button>
											<button className='OfferDash_deleteButton' value={offer.idOffer} onClick={handleModalDelete}>Eliminar</button>
										</td>

									</tr>
								)
							})}
						</tbody>
					</table>

        </div>
    </div>
  )
}

export default OfferDash