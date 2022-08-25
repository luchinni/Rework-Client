import React, {useState, useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { acceptProposal, checkSession, getAllOffersAdmin, getUserById, modifyOfferState } from '../../../Redux/Reducer/reducer';
import decode from 'jwt-decode';
import './PaysDash.css'

function PaysDash({props}:any) {

  const dispatch = useDispatch();

  let offers = useSelector((state:any) => state.workService.allOffersAdmin)

  useEffect(() => {
		dispatch(getAllOffersAdmin(''));
	}, [props])


  // ---- HANDLE OPEN Y CLOSE MODAL ----

  const [payModal, setPayModal] = useState(false)

  const [offerDatos, setOfferDatos] = useState<any>({})

  function handleOpenPayModal(e:any) {
    setPayModal(true)
    setOfferDatos(e)
  }

  function handleModalPayClose() {
    setPayModal(false)
  }

  function handleChangeState(idProposal:string, idOffer:string){

    const proposalState: {id: String, state: String} = {
      id: idProposal,
      state: 'payment released'
    }
    acceptProposal(proposalState)

    const offerState: {id: String, state: String} = {
      id: idOffer,
      state: 'payment released'
    }
    modifyOfferState(offerState)
    Swal.fire({
      icon: 'success',
      title: "Pago realizado con éxito",
      text: "El pago al freelancer se ha despachado con éxito"
    })
  }


  // ---- pagar ----

  // function handlePay() {

  // }

  if(props && props !== "") {
		offers = offers.filter((e: any) => e.title.toLowerCase().includes(props.toLowerCase()))
	}

  return (
    <div>

      { payModal &&
        <div className='OfferDash_Modal'>
        <div>
          <h3>Offer</h3>
          <div>
            <div>
              <span className='OfferDash_divModalTitle'>Id: </span>
              <span className='OfferDash_MOdalTextInfo'>{offerDatos?.idOffer}</span>
            </div>

            <div>
              <span className='OfferDash_divModalTitle'>State: </span>
              <span className='OfferDash_MOdalTextInfo'>{offerDatos?.state}</span>
            </div>
          </div>

          <hr className='OfferDash_hr' />
          <h3>Proposal</h3>
          <div>
            <div >
              <span className='OfferDash_divModalTitle'>Id: </span>
              <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.idProposal}</span>
            </div>
            <div>
              <span className='OfferDash_divModalTitle'>State: </span>
              <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.state}</span>
            </div>

            <hr className='OfferDash_hr' />
            <h3>Free lancer</h3>
            <div>
              <div>
                <span className='OfferDash_divModalTitle'>Username: </span>
                <span className='OfferDash_MOdalTextInfo'>{`${offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.userWorker.bank_data?.name} ${offerDatos.proposals[0].userWorker.bank_data?.lastname}`}</span>
            
              </div>
              <div>
                <span className='OfferDash_divModalTitle'>DNI: </span>
                <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.userWorker.bank_data?.DNI}</span>
              </div>
              <div>
                <span className='OfferDash_divModalTitle'>Email: </span>
                <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.userWorker.bank_data?.Email}</span>
              </div>
              <div>
                <span className='OfferDash_divModalTitle'>Teléfono: </span>
                <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.userWorker.bank_data?.Phone_Number}</span>
              </div>
              <div>
                <span className='OfferDash_divModalTitle'>Tarjeta: </span>
                <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.userWorker.bank_data?.Target_type}</span>
              </div>
              <div>
                <span className='OfferDash_divModalTitle'>CVU: </span>
                <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.userWorker.bank_data?.cvu}</span>
              </div>
            </div>

          </div>
        </div>
        <div className='OfferDash_modalButtonsDiv'>
          <a className='OfferDash_modalOk' href='https://www.mercadopago.com.ar/home#from-section=menu' target='_blank'>Pagar</a>
          <button className='OfferDash_modalCancelar' onClick={() => handleChangeState(offerDatos.proposals.find((e:any)=> e.state === 'finalized')?.idProposal, offerDatos.idOffer)}>liberar</button>
          <button className='OfferDash_modalCancelar' onClick={handleModalPayClose}>cancelar</button>
        </div>
      </div>
      }
      

      <table className='OfferDash_divMap'>
        <thead>
          <tr>
            <th>título de oferta</th>
            <th>ID oferta</th>
            <th>Estado</th>
            <th>Mas</th>
          </tr>
        </thead>
        <tbody className='OfferDash_tableBody'>
          {offers?.map((e:any, i:any) => {
            if(e.state === "finalized"  && e.proposals[0].state === "finalized") {
              return (
  
                <tr key={i}>
                  <td>{e.title}</td>

                  <td>{e.idOffer}</td>
  
                  <td>{e.state}</td>
  
                  <td>
                    <div>
                      <button onClick={() => handleOpenPayModal(offers[i])}>Procesar</button>
                    </div>
                  </td>
                </tr>
              )
            } 
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PaysDash