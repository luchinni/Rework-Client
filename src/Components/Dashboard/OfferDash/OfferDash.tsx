import React, {useEffect} from 'react'
import './OfferDash.css'
import {useSelector, useDispatch} from 'react-redux'
import {getOffers, getUserById} from "../../../Redux/Reducer/reducer";

function OfferDash() {

	const dispatch = useDispatch();

	useEffect(() => {
    dispatch(getOffers());
  }, [])

	const offers = useSelector((state:any) => state.workService.offers);

	console.log("offers :" ,offers)

  return (
    <div className='OfferDash_Component'>
        <div className='OfferDash_divContent'>
					<div className='OfferDash_divMap'>
						{offers.map((e:any, i:any) => {
							return (
								<div className='OfferDash_divOffer' key={i}>

									<div className='OfferDash_divCardOffer'>
										<div className='OfferDash_divUserImage'>
											<img className='OfferDash_userImage' src={e.userClient.photo} alt="usuario" />
										</div>
										<div className='OfferDash_divUserInfo'>
											<span className='OfferDash_userName'>{e.userClient.name} </span>
											<span className='OfferDash_userName'>{e.userClient.lastName}</span>
										</div>
									</div>

									<div className='OfferDash_divUserMail'>
										{e.userClient.user_mail}
									</div>
									
									<div className='OfferDash_divUserRol'>
										<span>
											{e.userClient.isWorker == false ? "Client" : ""}
										</span>
									</div>

									<div className='OfferDash_divUserRol'>
										<span>
											{e.userClient.premium === false ? "Regular" : "Premium"}
										</span>
									</div>

									<div>
										<button>Editar</button>
										<button>Eliminar</button>
									</div>

								</div>
							)
						})}
					</div>
        </div>
    </div>
  )
}

export default OfferDash