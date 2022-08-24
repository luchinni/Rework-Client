import React from 'react'

const Review = ({review}:any) => {
  return (
    <div>
      <div>
        <p>titulo de trabajo</p>
      </div>
      <div>
        {review.valoration}
      </div>
      <div>
        {review.review_description}
      </div>
    </div>
  )
}

export default Review