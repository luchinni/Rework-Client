import React from 'react'
import './CardOffer.css';

const CardOffer = ({props}:any) => {

  return (
    <div>
      <div>
        <span>info client</span>
        <div>
          <img src={props.photoClient} alt="Client Photo" />
          <span>{props.name}</span><br/>
          <span>{props.rating}</span><br/>
        </div>
      </div>
      <div>
        <span>info offer</span><br/>
        <span>{props.title}</span><br/>
        <span>{props.remuneration.join(' - ')}</span><br/>
        <span>{props.work_duration_time}</span><br/>
        <p>{props.description}</p><br/>
        <img src={props.photo} alt="Offer Photo" />
        <span>{props.tags.join(', ')}</span>
      </div>
      <button>detail</button>
    </div>
  )
}

export default CardOffer