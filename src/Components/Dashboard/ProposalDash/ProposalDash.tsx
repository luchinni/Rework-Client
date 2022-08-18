import React from 'react'
import './ProposalDash.css'

function ProposalDash() {
  return (
    <div className='ProposalDash_Component'>
        <div className='ProposalDash_divContent'>
            <div className='ProposalDash_top'>
                <div className='ProposalDash_profileDiv'>
                    <div className='ProposalDash_divProfileImage'>
                        <img className='ProposalDash_ProfileImage' src="https://pbs.twimg.com/media/ERqXUyAXYAEISbH.jpg" alt="Dash offer profile image" />
                    </div>
                    <div>
                        <div>
                            <span>Susana </span>
                            <span>Oria</span>
                        </div>
                        <div>
                            <span>Rating</span>
                        </div>
                    </div>
                </div>
                <div className='ProposalDash_adminButtons'>
                    <div>
                        <button>editar</button>
                    </div>
                    <div>
                        <button>eliminar</button>
                    </div>
                </div>
            </div>
            <hr />
            <div className='ProposalDash_bot'>
                <p>contenido de la Proposal</p>
            </div>
        </div>
    </div>
  )
}

export default ProposalDash