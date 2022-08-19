import { useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import {verifyClient, verifyWorker} from "../../../Redux/Reducer/reducer"
import HeaderRegister from '../HeaderRegister/HeaderRegister';

// esta funcion se ejecuta una sola vez y es para verificar el mail del usuario recien registrado.
const VerifyUser = () => {
    const dispatch = useDispatch()
    const location = useLocation() 
    const params = useParams()

    // diferenciamos si la url tiene al client o al worker y se despacha la action correspondiente
    if(location.pathname === `/confirm/client/${params.id}`) {
        dispatch(verifyClient(params.id))
    } else if(location.pathname === `/confirm/worker/${params.id}`) {
        dispatch(verifyWorker(params.id))
    }  
    
    // notificamos al user que su cuenta fue verificada y lo hacemos ingresar
    return (
        <div>
            {/* <HeaderRegister /> */}
            <h2>Cuenta verificada exitosamente!</h2>
            <Link to={"/login"}>Ingresar!</Link>
        </div>
    )
}

export default VerifyUser 