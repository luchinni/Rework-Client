import React from 'react'
import './CardOffer.css';

const CardOffer = (props:any) => {
  return (
    <div>
      <div>
        <span>info client</span>
        <img className='image' src="" alt="Foto usuario" />
        <div>
          <img src={props.photoClient} alt="Client Photo" />
          <span>{props.name}</span>
          <span>{props.rating}</span>
        </div>
      </div>
      <div>
        <span>info offer</span>
        <span>{props.title}</span>
        <span>{props.remuneration}</span>
        <span>{props.work_duration_time}</span>
        <p>{props.description}</p>
        <img src={props.photo} alt="Offer Photo" />
        <span>{props.tags}</span>
      </div>
      <button>detail</button>
    </div>
  )
}

export default CardOffer