import React, { useRef } from 'react'
import { useState } from 'react';
import more from '../../../images/more.svg';
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";
import {GoLocation} from "react-icons/go"
import save from "../../../images/icon_guardar.png"
import report from '../../../images/icon_report.svg';
import {Link} from 'react-router-dom';
import useOnClickOutside from "../../../utils/utils";
import './CardWorker.css';

export const ratingStars = (r:number) => {
    switch (true) {
        case r < 1:
            return <span>Sin valoraciones</span>
            
        case r === 1:
            return [<ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
            
        case r > 1 && r < 1.5:
            return [<ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
            
        case r >= 1.5 && r < 2:
            return [<ImStarFull />, <ImStarHalf />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
            
        case r === 2:
            return [<ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
            
        case r > 2 && r < 2.5:
            return [<ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
            
        case r >= 2.5 && r < 3:
            return [<ImStarFull />, <ImStarFull />, <ImStarHalf />, <ImStarEmpty/>, <ImStarEmpty/>]
            
        case r === 3:
            return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>]
            
        case r > 3 && r < 3.5:
            return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>]
            
        case r >= 3.5 && r < 4:
            return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarHalf />, <ImStarEmpty/>]
            
        case r === 4:
            return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>]
            
        case r > 4 && r < 4.5:
            return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>]
            
        case r >= 4.5 && r < 5:
            return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarHalf />]
            
        case r ===5:
            return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />]
            
        default:
            break;
    }
}

const CardWorker = ({props}:any) => {
    const [open, setOpen] = useState(false)

    function handleClick() {
      setOpen(!open);
    }

    const userDiv = useRef(null);

  function handleClickOutside() {
    setOpen(false)
  }

  useOnClickOutside(userDiv, handleClickOutside);

  return (
    <div className='CardWorker_component'>
        <div className='div_infoUser' > 
            <div className="div_info_imgDatos">
                <div className='div_workerButton'>
                    <button onClick={handleClick} className='workerButton_options'>
                        <img className='more' src={more} alt="more" />
                    </button>
                    {open &&
                    <div className='Card_option' ref={userDiv}>
                    <div className='CardOption_divReport'>
                        <span className='report_cardButton'>Reportar</span>
                        <img className='report_icon' src={report} alt="report" />
                    </div>
                    </div>
                    }
                </div>
                <div className='div_userDatos'>
                <div className='div_imageWorker'>
                    <img className='card_workerImage' src={props.photo} alt="profile img"/>
                </div>
                    <Link to={`/profile/${props.id}`}><h1  className='Card_userName'>{props.name}</h1></Link>
                    <div className='div_rating'>
                    {ratingStars(props.rating)}
                    </div>
                </div>
            </div>
        </div>
        <div className="div_description">
            <div>
                <div>
                    <p className='Card_userProfessions'>{props.profession?.join(", ")}</p>
                    <div>
                        <div className='Card_userHabilities'>Habilidades: <br/>
                    {
                        props.skills.length > 4 ? <span>{`${props.skills[0]}`}, {`${props.skills[1]}`}, {`${props.skills[2]}`}, {`${props.skills[3]}`}, ...</span> 
                        : <span>{props.skills?.join(", ")}</span>
                    }
                    </div>
                    </div>
                </div>
                {/* <p className="description">Descripción</p> */}
            </div>
        </div>
        <div className='div_descriptionTop'>
            <p className="valorHora">Valor hora: AR$ </p>
            <div className="div_location">
                {<GoLocation/>}
                <h3>Argentina</h3>
            </div>
        </div>  
    </div>
  )
}

export default CardWorker
