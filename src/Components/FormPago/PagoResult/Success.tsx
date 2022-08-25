import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./Success.css"
import { acceptProposal, checkSession, getOfferForHistory, modifyOfferState } from '../../../Redux/Reducer/reducer';
import HeaderRegister from '../../Register/HeaderRegister/HeaderRegister';
import Header from '../../Header/Header';
import { useDispatch, useSelector } from 'react-redux';

const Success = () => {
    const params:any = useParams();
    const [currentOffer, setCurrentOffer] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const currentUser = useSelector((state:any) => state.workService.currentUser);
    useEffect(() => {
      dispatch(checkSession())
    }, [])

    useEffect(() => {
        getOfferForHistory(params.id)
        .then((response)=>{
          setCurrentOffer(response)
        })
    }, [])

    const goHome = () => {
        navigate("/home")
    }


    useEffect(() => {
        if(currentOffer.hasOwnProperty("idOffer")){
            const proposal = currentOffer.proposals?.find((p:any) => p.state === "contract accepted")

            if(proposal){
                let offerState: { state: string; id: string } = {
                    state:"contract started",
                    id:currentOffer.idOffer,
                };
                modifyOfferState(offerState)
                let state = "contract started";
                let id = proposal.idProposal;
                let proposalState: { state: string; id: string } = {
                    state,
                    id,
                    };
                acceptProposal(proposalState);
            }
        }
    }, [currentOffer])
    
  return (
    <div>
        <Header/>
        <div className='success_background'>
            <div className='success_display'>
                <h1>¡Tu pago fue recibido!</h1>
                <h2>Ahora podemos comenzar el trabajo</h2>
                <h3>Le enviaremos al trabajador tu informacion para ponerlos en contacto.</h3>
                <button className='succes_back' onClick={goHome}>Volver al sitio</button>
            </div>
        </div>
    </div>
  )
}

export default Success