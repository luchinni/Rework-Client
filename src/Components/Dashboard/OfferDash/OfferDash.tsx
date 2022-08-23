import React, {useState ,useEffect} from 'react'
import './OfferDash.css'
import {useSelector, useDispatch} from 'react-redux'
import {getOffers, getUserById, isActiveFalseOfferPost, isActiveOffer, getAllOffersAdmin} from "../../../Redux/Reducer/reducer";


function OfferDash() {

	const dispatch = useDispatch();

	const [modalEdit, setModalEdit] = useState(false)

	const [modalDelete, setModalDelete] = useState(false)

	const [dataOffer, setDataOffer] = useState<any>({})

	const offers = useSelector((state:any) => state.workService.allOffersAdmin);

	function handleModalEdit(offers:any) {
		setModalEdit(true)
		setDataOffer(offers)
	}

	function handleModalEditClose() {
		setModalEdit(false)
	}

	function handleModalDelete(offers:any) {
		setModalDelete(true)
		setDataOffer(offers)
	}

	const [offerState, setOfferState] = useState(true)

	function handleSelect( e: any) {

		const select = e.target.value

		let isSet: boolean = true;
		 
		if (select.toLowerCase() === 'true') {
			isSet = true;
		}
		 
		if (select.toLowerCase() === 'false') {
			isSet = false;
		}		
		setOfferState(isSet)
	}


	const [admin, setAdmin] = useState("")

	useEffect(() => {
		dispatch(getAllOffersAdmin(admin));
	}, [admin])

	function handleSelectAdmin(e: any) {
		const selectAdmin = e.target.value
		setAdmin(selectAdmin)
	}

	function handleOnClick() {
		let id = dataOffer.idOffer
		let isActive = offerState
		isActiveOffer(id , isActive)
		.then(()=> {
			dispatch(getAllOffersAdmin(admin))
		})
		setModalEdit(false)
	}

	function handleDeleteOffer() {
		let id = dataOffer.idOffer
		isActiveFalseOfferPost(id)
		.then(()=> {
			dispatch(getOffers())
		})
		setModalDelete(false)
	}


  return (
    <div className='OfferDash_Component'>

		<div className='OfferDash_firstDivSelect'>
			<select  onChange={handleSelectAdmin}>
				<option selected={true} hidden>Mostrar Ofertas</option>
				<option value="true">Abiertas</option>
				<option value="false">Cerradas</option>
				<option value="">Todas</option>
			</select>
		</div>

        <div className='OfferDash_divContent'>

					{
						modalEdit &&
						<div className='OfferDash_Modal'>
							<div>

								<div className='OfferDash_divInfoModal'>
									<div>
										<p className='OfferDash_divModalTitle'>Id de la publicacion: </p>
										<span className='OfferDash_MOdalTextInfo'>{dataOffer.idOffer}</span>
									</div>

									<div>
										<p className='OfferDash_divModalTitle'>estado actual: </p>
										<span className='OfferDash_MOdalTextInfo'>{dataOffer.isActive === false ? "Cerrada" : "Abierta"}</span>
									</div>
								</div>

								<hr className='OfferDash_hr' />

								<div className='OfferDash_divInputEdit'>
									<label className='OfferDash_divModalTitle'>Actualiza el estado</label>

									<select onChange={handleSelect}>
										<option selected={true} hidden>selecciona uno</option>
										<option value="true">Abierta</option>
										<option value="false">Cerrada</option>
									</select>

								</div>
							</div>
							<div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk' onClick={handleOnClick}>guardar</button>
								<button className='OfferDash_modalCancelar' onClick={handleModalEditClose}>cancelar</button>
							</div>
						</div>
					}

					{
						modalDelete &&
						<div className='OfferDash_Modal'>
							<div className='OfferDash_modalDeleteText'>
								<p className='OfferDash_divModalTitle'>Estas seguro que deseas borrar la oferta con el id:</p>
								<span className='OfferDash_MOdalTextInfo'>{dataOffer.idOffer}</span>
							</div>
							<div className='OfferDash_modalButtonsDiv'>
								<button className='OfferDash_modalOk' onClick={handleDeleteOffer}>si</button>
								<button className='OfferDash_modalCancelar' onClick={() => setModalDelete(false)}>cancelar</button>
							</div>
						</div>
					}

					<table className='OfferDash_divMap'>
						<thead >
							<tr>
								<th>Id</th>
								<th>Fecha</th>
								<th>Estado</th>
							</tr>
						</thead>
						<tbody className='OfferDash_tableBody'>
							{offers?.map((offer:any, i:any) => {
								return (
									<tr className='OfferDash_divOffer' key={i}>

										<td className='OfferDash_divUserMail'>
											{offer.idOffer}
										</td>
										
										<td>
											{offer.post_date.slice(0,10)}
										</td>

										<td>
											{offer.isActive === false ? "Cerrada" : "Abierta"}
										</td>
										
										<td className='OfferDash_tdButtons'>
											<button className='OfferDash_editButton' onClick={() => handleModalEdit(offers[i])}>Editar</button>
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