import React , {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOffers, getUserById } from '../../../Redux/Reducer/reducer';
import FormPortfolio from './FormPortfolio/FormPortfolio';
import CardPorfolio from './CardPortfolio/CardPorfolio';
import decode from "jwt-decode"
import './Portfolio.css'

const Portfolio = () => {

    const [modalOpen, setModalOpen] = useState(false)

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

    const handleCardOpen = () => {
      setCardOpen(true)
    }

    const handleClose = (value:any) => {
        setModalOpen(value)
    }

  return (
    <div className="Portfolio_component">
            <div className="Portfolio_divContent">
              <div className="Portfolio_divMap">
              <div>
                <button className='Portfolio_buttonAddPortfolio' onClick={handleOpen}>agregar portafolio</button>
              </div>
              {loading===false? userLogged.portfolios?.map((e:any) => {
                return (
                  <div className='Portfolio_divItemMap'>
                    <div onClick={handleCardOpen} className='Portfolio_divItems'>
                      <img src={e.photo} className="Portfolio_Item"/> 
                    </div>
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

            {
              modalCard &&
              <div className='Portfolio_CardComponent'>
                <CardPorfolio />
              </div>
            }
    </div>
  )
}

export default Portfolio