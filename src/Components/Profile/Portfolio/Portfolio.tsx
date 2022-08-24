import React , {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOffers, getUserById } from '../../../Redux/Reducer/reducer';
import FormPortfolio from './FormPortfolio/FormPortfolio';
import CardPorfolio from './CardPortfolio/CardPorfolio';
import decode from "jwt-decode"
import './Portfolio.css'

const Portfolio = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const [currentId, setCurrentId] = useState("")
    const [modalCard, setCardOpen] = useState(false)

    const dispatch = useDispatch();
    const token:any = localStorage.getItem("token")
    let tokenDecode:any
    if(token) tokenDecode = decode(token)
    const userLogged = useSelector((state: any) => state.workService.userLogged)
    const loading = useSelector((state: any) => state.workService.isLoading)

    //const [user, setUser] = useState(userLogged)
    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
    dispatch(getUserById(tokenDecode))
  },[])

  useEffect(() => {
    console.log("deberia rerenderizar aca");
    forceUpdate();
  },[userLogged])


    const handleOpen = () => {
        setModalOpen(true)
    }

    const handleCardOpen = (id:any) => {
      console.log(id);
      setCurrentId(id)
      setCardOpen(true)
    }
    const handleCardClose = (value:any) => {
      setCardOpen(value)
    }

    const handleClose = (value:any) => {
        setModalOpen(value)
    }

  return (
    <div className="Portfolio_component">
            <div className="Portfolio_divContent">
              <div className="Portfolio_divMap">
              <div>
                <button className='Portfolio_buttonAddPortfolio' onClick={handleOpen}>¡Agrega un portfolio!</button>
              </div>
              {loading===false? userLogged.portfolios?.map((e:any) => {
                console.log(e)
                return (
                  <div className='Portfolio_divItemMap'>
                    <div onClick={() => handleCardOpen(e.idPortfolio)} className='Portfolio_divItems'>
                      <img src={e.photo} className="Portfolio_Item"/> 
                    </div>
                    {
                      modalCard===true && currentId===e.idPortfolio?
                    modalCard &&
                      <div className='Portfolio_CardComponent'>
                        <CardPorfolio portfolio={e} close={handleCardClose} />
                      </div>
                      :
                      false
                    }
                  </div>
                )
              }):"loading..."}
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