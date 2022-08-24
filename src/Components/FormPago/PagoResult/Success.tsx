import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { acceptProposal, getOfferForHistory, modifyOfferState } from '../../../Redux/Reducer/reducer';

const Success = () => {
    const params:any = useParams();
    const [currentOffer, setCurrentOffer] = useState<any>({});

    useEffect(() => {
        getOfferForHistory(params.id)
        .then((response)=>{
          setCurrentOffer(response)
        })
    }, [])


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
        <h1>¡Tu pago fue recibido!</h1>
        <h2>Ahora podemos comenzar el trabajo</h2>
        <h3>Le enviaremos al trabajador tu informacion para ponerlos en contacto.</h3>
    </div>
  )
}

export default Success