import React from 'react'
import './OfferDash.css'

function OfferDash() {
  return (
    <div className='OfferDash_Component'>
        <div className='OfferDash_divContent'>
            <div className='OfferDash_top'>
                <div className='OfferDash_profileDiv'>
                    <div className='OfferDash_divProfileImage'>
                        <img className='OfferDash_ProfileImage' src="https://pbs.twimg.com/media/ERqXUyAXYAA07oP.jpg" alt="Dash offer profile image" />
                    </div>
                    <div>
                        <div>
                            <span>Elba </span>
                            <span>Lazo</span>
                        </div>
                        <div>
                            <span>Rating</span>
                        </div>
                    </div>
                </div>
                <div className='OfferDash_adminButtons'>
                    <div>
                        <button>editar</button>
                    </div>
                    <div>
                        <button>eliminar</button>
                    </div>
                </div>
            </div>
            <hr />
            <div className='OfferDash_bot'>
                <p>contenido de la offer</p>
            </div>
        </div>
    </div>
  )
}

export default OfferDash