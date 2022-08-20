import HeaderRegister from '../../Register/HeaderRegister/HeaderRegister';
import imageClient from "../../../images/Online report_Isometric (1).png"
import imageWorker from "../../../images/Money_motivation _Flatline.png"
import { useDispatch} from 'react-redux';
import './LoginGoogle.css'



const LoginGoogle = () => {
    
    const dispatch = useDispatch()
    
    const handleSubmitClient = () => {
        window.open(/* "https://rework-xi.vercel.app/google/client" || */ "http://localhost:3000/google/client", "_self")

    }
    const handleSubmitWorker = () => {
        window.open(/* "https://rework-xi.vercel.app/google/worker" || */ "http://localhost:3000/google/worker", "_self")

    } 
    
    return (
        <div className='Google_component'>
        <HeaderRegister/>
        <div className='Google_Welcome'>
            <h3 className='Google_welcomeTitle'>¡Te damos la bienvenida a <span className='Google_RE'>RE</span><span className='Google_work'>work</span>!</h3>
            <h4 className='Google_welcomeSubtitle'>¿Como quieres ingresar?</h4>
        </div>
        <div className='Google_divClientWorker'>
            <div className='Google_Worker'>
                <p className='Google_orTitle'>Ingresa como <span className='Google_orTitleOrange'>FreeLancer</span></p>
                <div className='Google_divImage'>
                    <img src={imageWorker} alt='Register'/>
                </div>
                <button onClick={handleSubmitWorker} className='Google_button'>Ingresa</button>        
            </div>
            <div className='Google_Client'>
                <p className='Google_orTitle'>Ingresa como <span className='Google_orTitleOrange'>Cliente</span></p>
                <div className='Google_divImage'>
                <img src={imageClient} alt='Register'/>
                </div>
                <button onClick={handleSubmitClient} className='Google_button'>Ingresa</button>
            </div>
        </div>

    </div>
    )
}

export default LoginGoogle
