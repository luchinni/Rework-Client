import Header from "../../Header/Header"
import './ContractRedirect.css'

const ContractRedirect = () => {
    return (
        <div className="ContractRed_container">
            <Header/>
            <div className="ContractRed_message">
                <h1 className="ContractRed_title" >Hola! Parece que intentaste acceder a un contrato, pero <span className="ContractRed_highlight">sin tu sesion iniciada</span></h1>
                <h2 className="ContractRed_subtitle" >por favor, <a href='/login'>inicia tu sesion</a> y vuelve a acceder al enlace de tu correo</h2>
            </div>
        </div>
    )
}

export default ContractRedirect