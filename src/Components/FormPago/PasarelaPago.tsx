import React, {useEffect, useCallback} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';

    const FORM_ID = 'payment-form'

export default function PasarelaPago ({props}:any){

    const payment = useSelector((state:any) => state.workService.paymentInfo);

    console.log(payment)
    console.log(props)

    const obtenerPreference = useCallback(
        async() => {
            if(payment){
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
                script.dataset.preferenceId = payment
                script.setAttribute('data-preference-id', payment);
                const form = document.getElementById(FORM_ID);
                form?.appendChild(script);
            }
        },[props],
    )
    useEffect(()=>{
        obtenerPreference()
    },[obtenerPreference])

    return (
        <form id={FORM_ID} method={"GET"} />
      );
}
