import React, {useState} from 'react';
import './CardOffer.css';
import {Link} from 'react-router-dom';
import more from '../../images/more.svg';
import report from '../../images/icon_report.svg';

const CardOffer = ({props}:any) => {

  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className='CardOffer_component'>
      <div className='div_profileSection'>
        <div className='div_infoUser'>
          <div className='div_imageProfile'>
            <img className='card_profileImage' src={props.userClient.photo} alt="Client Photo" />
          </div>
          <div className='div_userDatos'>
            <Link to="#" className='Card_userName'>{props.userClient.name}</Link>
            <span className='Card_userRating'>Rating: {props.userClient.rating}</span>
          </div>
        </div>
        <div className='div_cardButton'>
          <button onClick={handleClick} className='cardButton_options'>
            <img className='more' src={more} alt="more" />
          </button>
          {open &&
            <div className='Card_option'>
              <div className='CardOption_divReport'>
                <span className='report_cardButton'>Reportar</span>
                <img className='report_icon' src={report} alt="report" />
              </div>
            </div>
          }
        </div>
      </div>
      <hr />
      <div className='div_infoWorkSection'>
        <span className='card_title'>{props.title}</span>
        <div className='div_remuneration'>
          <span>ARS </span>
          <span>{props.remuneration?.join(' - ')}</span>
          <span>$</span>
        </div>
        <div className='div_cardDescription'>
          <p>{props.offer_description}</p>
        </div>
        <div className='card_divTags'>
          <span className='card_tags'>{props.profession?.join(', ')}</span>
        </div>
        <div>
          <Link className='button_details' to={`/detailOffer/${props.idOffer}`}>Ver mas</Link>
        </div>
      </div>
    </div>
  )
}

export default CardOffer