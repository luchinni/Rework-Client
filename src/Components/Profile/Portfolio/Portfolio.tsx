import React , {useState, useEffect, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOffers, getUserById } from '../../../Redux/Reducer/reducer';
import FormPortfolio from './FormPortfolio/FormPortfolio';
import decode from "jwt-decode"
import './Portfolio.css'

const Portfolio = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const dispatch = useDispatch();
    const token:any = localStorage.getItem("token")
    const tokenDecode:any = decode(token)
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

    const handleClose = (value:any) => {
        setModalOpen(value)
    }

  return (
    <div className="Portfolio_component">
        <button onClick={handleOpen}><span>agregar portfolio</span></button>
            <div className="Portfolio_divContent">
                <div className="Portfolio_divMap">
               {loading===false? userLogged.portfolios?.map((e:any) => {
                return (<div>
                            <p>{e.title}</p>
                            <img src={`data:image/png;base64,${e.photo}`} className="Portfolio_divItems"/> 
                            </div>)
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