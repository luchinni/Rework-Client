import { url } from "inspector"
import Header from "../Header/Header"
import './Developers.css'
import lucia from '../../images/LuciaChinni.jpg'
import franco from '../../images/FrancoFraiese.png'
import luis from '../../images/LuisTourn.jpg'
import juan from '../../images/JuanColaneri.jpg'
import angel from '../../images/AngelVillalba.jpg'
import lucas from '../../images/LucasPardieux.jpg'
import gabi from '../../images/GabrielMachado.jpg'
import {BsLinkedin} from 'react-icons/bs'
import { VscGithubInverted } from "react-icons/vsc"
import {FaLaptopCode} from 'react-icons/fa'


const Developers = () => {

    return (
        <div className="Dev_component">
           <Header/>
           <div className="Dev_container">
                <div className="Dev_contTop">
                    <div className="Dev_Card">
                        <div className="Dev_imageCont">
                            <span className="Dev_imageSpan">
                            <img className="Dev_imageGabi" src={gabi} alt="" />
                            </span>
                            <div className="Dev_hoverText">
                                <a className="Dev_linkLinkedin" href="https://www.linkedin.com/in/gabrielmachado-developer/" target="_blank">
                                <BsLinkedin className="Dev_iconLinkedin"/>
                                </a>
                                <a className="Dev_linkGithub" href="https://github.com/Gabriel9022" target="_blank">
                                <VscGithubInverted className="Dev_iconGithub" />                                    
                                </a>
                            </div>
                        </div>
                        <h2 className="Dev_name" >Gabriel</h2>
                        <h2 className="Dev_name" >Machado</h2>
                    </div>
                    <div className="Dev_Card">                        
                        <div className="Dev_imageCont">
                            <span className="Dev_imageSpan">
                                <img className="Dev_imageLucia" src={lucia} alt="" />
                            </span>
                            <div className="Dev_hoverText">
                                <a className="Dev_linkLinkedin" href="https://www.linkedin.com/in/lucia-belen-chinni/" target="_blank">
                                <BsLinkedin className="Dev_iconLinkedin"/>
                                </a>
                                <a className="Dev_linkGithub" href="https://github.com/luchinni" target="_blank">
                                <VscGithubInverted className="Dev_iconGithub" />
                                </a>
                            </div>
                        </div>
                        <h2 className="Dev_name" >Lucía</h2>
                        <h2 className="Dev_name" >Chinni</h2>
                    </div>
                    <div className="Dev_Card">
                        <div className="Dev_imageCont">
                            <span className="Dev_imageSpan">
                                <img className="Dev_imageAngel" src={angel} alt="" />
                            </span>
                            <div className="Dev_hoverText">
                                <a className="Dev_linkLinkedin" href="https://www.linkedin.com/in/angelvillalba/" target="_blank">
                                    <BsLinkedin className="Dev_iconLinkedin"/>
                                </a>
                                <a className="Dev_linkPortfolio" href="#" target="_blank">
                                    <FaLaptopCode className="Dev_iconPortfolio"/>
                                </a>
                                <a className="Dev_linkGithub" href="https://github.com/villalb4" target="_blank">
                                    <VscGithubInverted className="Dev_iconGithub" />
                                </a>
                            </div>
                        </div>
                        <h2 className="Dev_name" >Angel</h2>
                        <h2 className="Dev_name" >Villalba</h2>
                    </div>
                    <div className="Dev_Card">
                        <div className="Dev_imageCont">
                            <span className="Dev_imageSpan">
                                <img className="Dev_imageJuan" src={juan} alt="" />                                
                            </span>
                            <div className="Dev_hoverText">
                                <a className="Dev_linkLinkedin" href="https://www.linkedin.com/in/juanmacolaneri/" target="_blank">
                                <BsLinkedin className="Dev_iconLinkedin"/>
                                </a>
                                <a className="Dev_linkGithub" href="https://github.com/juanma2228" target="_blank">
                                <VscGithubInverted className="Dev_iconGithub" />
                                    
                                </a>
                            </div>
                        </div>
                        <h2 className="Dev_name" >Juan</h2>
                        <h2 className="Dev_name" >Colaneri</h2>
                    </div>
                </div>
                <div className="Dev_contBot">
                    <div className="Dev_Card">
                        <div className="Dev_imageCont">
                            <span className="Dev_imageSpan">
                                <img className="Dev_imageLucas" src={lucas} alt="" />                               
                            </span>
                            <div className="Dev_hoverText">
                                <a className="Dev_linkLinkedin" href="https://www.linkedin.com/in/lucaspardieux/" target="_blank">
                                <BsLinkedin className="Dev_iconLinkedin"/>
                                </a>
                                <a className="Dev_linkPortfolio" href="#" target="_blank">
                                <FaLaptopCode className="Dev_iconPortfolio"/>
                                </a>
                                <a className="Dev_linkGithub" href="https://github.com/LucasPardieux" target="_blank">
                                <VscGithubInverted className="Dev_iconGithub" />
                                </a>
                            </div>
                        </div>
                        <h2 className="Dev_name" >Lucas</h2>
                        <h2 className="Dev_name" >Pardieux</h2>
                    </div>
                    <div className="Dev_Card">
                        <div className="Dev_imageCont">
                            <span className="Dev_imageSpan">
                                <img className="Dev_imageLuis" src={luis} alt="" />
                            </span>
                            <div className="Dev_hoverText">
                                <a className="Dev_linkLinkedin" href="https://www.linkedin.com/in/luistourn/" target="_blank">
                                <BsLinkedin className="Dev_iconLinkedin"/>
                                </a>
                                <a className="Dev_linkGithub" href="https://github.com/LuisTourn" target="_blank">
                                <VscGithubInverted className="Dev_iconGithub" />
                                </a>
                            </div>
                        </div>
                        <h2 className="Dev_name" >Luis</h2>
                        <h2 className="Dev_name" >Tourn</h2>   
                    </div>
                    <div className="Dev_Card">
                        <div className="Dev_imageCont">
                            <span className="Dev_imageSpan">
                                <img className="Dev_imageFranco" src={franco} alt="" />
                            </span>
                            <div className="Dev_hoverText">
                                <a className="Dev_linkLinkedin" href="https://www.linkedin.com/in/francofraiese/" target="_blank">
                                <BsLinkedin className="Dev_iconLinkedin"/>
                                </a>
                                <a className="Dev_linkPortfolio" href="https://francofraiese.vercel.app" target="_blank">
                                <FaLaptopCode className="Dev_iconPortfolio"/></a>                                
                                <a className="Dev_linkGithub" href="https://github.com/francofraiese" target="_blank">
                                <VscGithubInverted className="Dev_iconGithub" />
                                </a>
                            </div>
                        </div>
                        <h2 className="Dev_name" >Franco</h2>
                        <h2 className="Dev_name" >Fraiese</h2>   
                    </div>
                </div>
           </div>
        </div>
    )


}

export default Developers