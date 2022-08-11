import React , {useState} from 'react';
import FormPortfolio from './FormPortfolio/FormPortfolio';
import './Portfolio.css'

const Portfolio = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const portfolioItem:object[] = [
        {
            title: "titulo",
            photo: "url",
            portfolio_description: "habia una vez"
        },
        {
            title: "titulo",
            photo: "url",
            portfolio_description: "habia una vez"
        },
        {
            title: "titulo",
            photo: "url",
            portfolio_description: "habia una vez"
        },
        {
            title: "titulo",
            photo: "url",
            portfolio_description: "habia una vez"
        },
        {
            title: "titulo",
            photo: "url",
            portfolio_description: "habia una vez"
        },
        {
            title: "titulo",
            photo: "url",
            portfolio_description: "habia una vez"
        },
        {
            title: "titulo",
            photo: "url",
            portfolio_description: "habia una vez"
        },
        {
            title: "titulo",
            photo: "url",
            portfolio_description: "habia una vez"
        }
    ] 

    const handleOpen = () => {
        setModalOpen(true)
    }

    const handleClose = (value:any) => {
        setModalOpen(value)
    }

  return (
    <div className="Portfolio_component">
        <button onClick={handleOpen}><span>agregar portfolio</span></button>
            <div className="Portfolio_divContent">
                <div className="Portfolio_divMap">
               { portfolioItem?.map((e:any) => {
                return (<div className="Portfolio_divItems">{e.photo} </div>)
               })}
                </div>
            </div>
            {modalOpen && 
                <div className="Portfolio_formModal">
                    <FormPortfolio handle={handleClose}/>
                </div>
            }
    </div>
  )
}

export default Portfolio