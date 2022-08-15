import React from 'react'
import "./CarruselCard.css"


const CarruselCard = () => {
  return (
    <div className="body">
            {/* <div className="slide-container swiper">
                <div className="slide-content">
                    <div className="card-wrapper swiper-wrapper"> */}
                        <div className="card swiper-slide">
                            <div className="image-content">
                                <span className="overlay"></span>
                                
                                <div className="card-image">
                                    <img src="https://socialtools.me/wp-content/uploads/2016/04/foto-de-perfil.jpg" alt="algo" className="card-img" />
                                </div>
                            </div>

                            <div className="card-content">
                                <h2 className="name">asdasd</h2>
                                <p className="description">asdasdasdasdasdasd</p>
                                <button className="button">Ver mas</button>
                            </div>
                        </div>
                    </div>
            //     </div>
            // </div>
    // </div>
  )
}

export default CarruselCard