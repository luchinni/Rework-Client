import HeaderRegister from '../../Register/HeaderRegister/HeaderRegister';
import imageClient from "../../../images/Online report_Isometric (1).png"
import imageWorker from "../../../images/Money_motivation _Flatline.png"
import './LoginGoogle.css'



const LoginGoogle = () => {
    
    
    const handleSubmitClient = () => {
        window.open("https://re-work-ten.vercel.app/google/client", "_self")

    }
    const handleSubmitWorker = () => {
        window.open("https://re-work-ten.vercel.app/google/worker", "_self")

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
                <h4 className='Google_orTitle'>Ingresa como <span className='Google_RE'>FreeLancer</span></h4>
                <p className='Google_detail'>Aplica a los mejores trabajos para ti</p>
                <p className='Google_detail'>Edita tu portfolio</p>
                <br/>
                <div className='Google_divImage'>
                    <img src={imageWorker} alt='Register'/>
                </div>
                <button onClick={handleSubmitWorker} className='Google_button'>Ingresa</button>        
            </div>
            <div className='Google_Client'>
                <h4 className='Google_orTitle'>Ingresa como <span className='Google_work'>Cliente</span></h4>
                <p className='Google_detail'>Recibe las mejores propuestas</p>
                <p className='Google_detail'>para tus proyectos</p>
                <p className='Google_detail'>Realiza publicaciones</p>
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
