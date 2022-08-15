import React , {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserByIdOther } from '../../../Redux/Reducer/reducer';
import { useParams } from 'react-router-dom';
import './Portfolio.css'

const Portfolio = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const dispatch = useDispatch();
    const params = useParams();

    const user = useSelector((state:any) => state.workService.userById)
    const loading = useSelector((state: any) => state.workService.isLoading)

    useEffect(() => {
    dispatch(getUserByIdOther(params.id))
  },[])

  return (
    <div className="Portfolio_component">
            <div className="Portfolio_divContent">
                <div className="Portfolio_divMap">
               {loading===false? user.portfolios?.map((e:any) => {
                return (<div>
                            <p>{e.title}</p>
                            <img src={e.photo} className="Portfolio_divItems"/> 
                            </div>)
                }):"loading..."}
                </div>
            </div>
    </div>
  )
}

export default Portfolio