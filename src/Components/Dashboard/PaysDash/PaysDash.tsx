import React, {useState, useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import './PaysDash.css'
import getAllOffersAdmin from '../../../Redux/Reducer/reducer'

function PaysDash() {

  const dispatch = useDispatch();

  const offers = useSelector((state:any) => state.workService.allOffersAdmin)

  console.log("PaysDash ",offers)
  
  

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


  // ---- pagar ----

  function handlePay() {

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
              <span className='OfferDash_MOdalTextInfo'>{offerDatos.idOffer}</span>
            </div>

            <div>
              <span className='OfferDash_divModalTitle'>State: </span>
              <span className='OfferDash_MOdalTextInfo'>{offerDatos.state}</span>
            </div>
          </div>

          <hr className='OfferDash_hr' />
          <h3>Proposal</h3>
          <div>
            <div >
              <span className='OfferDash_divModalTitle'>Id: </span>
              <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals[0].idProposal}</span>
            </div>
            <div>
              <span className='OfferDash_divModalTitle'>State: </span>
              <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals[0].state}</span>
            </div>

            <hr className='OfferDash_hr' />
            <h3>UserWorker</h3>
            <div>
              <div>
                <span className='OfferDash_divModalTitle'>Username: </span>
                <span className='OfferDash_MOdalTextInfo'>{offerDatos.proposals[0].userWorker.name}</span>
              </div>
            </div>

          </div>
        </div>
        <div className='OfferDash_modalButtonsDiv'>
          <button className='OfferDash_modalOk' onClick={handlePay}>Pagar</button>
          <button className='OfferDash_modalCancelar' onClick={handleModalPayClose}>cancelar</button>
        </div>
      </div>
      }

      <table className='OfferDash_divMap'>
        <thead>
          <tr>
            <th>Id offer</th>
            <th>State</th>
            <th>Mas</th>
          </tr>
        </thead>
        <tbody className='OfferDash_tableBody'>
          {offers?.map((e:any, i:any) => {
            if(e.state === "finalized" && e.proposals[0].state === "finalized") {
              return (
  
                <tr key={i}>
                  <td>{e.idOffer}</td>
  
                  <td>{e.state}</td>
  
                  <td>
                    <div>
                      <button onClick={() => handleOpenPayModal(offers[i])}>hola</button>
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