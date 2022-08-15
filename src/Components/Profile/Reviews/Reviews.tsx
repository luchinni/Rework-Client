import React from 'react'
import './Reviews.css'

function Reviews() {
  return (
    <div className='Reviews_Component'>
      <div className='Reviews_divContent'>
        <h2>Reviews</h2>
        <div className='Reviews_divReviews'>
          <div className='Reviews_review'>
            <h3>Excelente persona</h3>
            <p>Muy responsable y comprometido con su trabajo, hizo todo tal cual acordamos.</p>
          </div>
          <div className='Reviews_review'>
            <h3>Un capo</h3>
            <p>Me hizo una página medio pelo en wix 👍</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews