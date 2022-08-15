import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import {verifyClient, verifyWorker} from "../../../Redux/Reducer/reducer"
import HeaderRegister from '../HeaderRegister/HeaderRegister';

const VerifyUser = () => {
    const dispatch = useDispatch()
    
    const location = useLocation() 
    const params = useParams()

    if(location.pathname === `/confirm/client/${params.id}`) {
        dispatch(verifyClient(params.id))
    } else if(location.pathname === `/confirm/worker/${params.id}`) {
        dispatch(verifyWorker(params.id))
    }  
    
    return (
        <div>
            {/* <HeaderRegister /> */}
            <h2>Cuenta verificada exitosamente!</h2>
            <Link to={"/login"}>Ingresar!</Link>
        </div>
    )
}

export default VerifyUser 