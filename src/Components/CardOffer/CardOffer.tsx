import React from 'react'
import './CardOffer.css';
import {Link} from 'react-router-dom';
import more from '../../images/more.svg'

const CardOffer = ({props}:any) => {

  return (
    <div className='CardOffer_component'>
      <div className='div_profileSection'>
        <div className='div_infoUser'>
          <div className='div_imageProfile'>
            <img className='card_profileImage' src={props.photoClient} alt="Client Photo" />
          </div>
          <div className='div_userDatos'>
            <span>{props.name}</span>
            <span>{props.rating}</span>
          </div>
        </div>
        <button className='cardButton_options'><img src={more} alt="more" /></button>
      </div>
      <hr />
      <div className='div_infoWorkSection'>
        <span className='card_title'>{props.title}</span>
        <div className='div_remuneration'>
          <span>ARS </span>
          <span>{props.remuneration.join(' - ')}</span>
        </div>
        <div className='div_cardDescription'>
          <p>{props.description}</p>
        </div>
        <div className='card_divTags'>
          <span className='card_tags'>{props.tags.join(', ')}</span>
        </div>
        <div>
          <Link className='button_details' to={`/detailOffer/${props.id}`}><button>Ver mas</button></Link>
        </div>
      </div>
    </div>
  )
}

export default CardOffer