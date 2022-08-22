import React, {useEffect, useState} from 'react';
import {checkSession, getOfferId} from '../../../Redux/Reducer/reducer';
import { useSelector, useDispatch } from 'react-redux';
import './Historial.css'
import HistorialCard from './HistorialCards/HistorialCard';

function Historial() {

  const userLogged = useSelector((state: any) => state.workService.userLogged)
  const userById = useSelector((state:any) => state.workService.offerById);
  const dispatch = useDispatch();

  console.log("userLogged", userLogged
  )

  interface OpenType {
    all: Boolean;
    onContract: Boolean;
    active: Boolean;
    cancelled: Boolean;
    finalized: Boolean;
  };

  const [open, setOpen] = useState<OpenType>({
    all: false,
    onContract: true,
    active: false,
    cancelled: false,
    finalized: false
  });

  const handleOpen = (e: any) => {
    const name = e.target.name
    setOpen({
      all: false,
      onContract: false,
      active: false,
      cancelled: false,
      finalized: false,
      [name]: true
    })
  };

  useEffect(() => {
    //dispatch(getOfferId(props.offerIdOffer));
    //dispatch(checkSession())
  }, [dispatch])

  return (
    <div className='Historial_Component'>
      {userLogged.isWorker===true ? (
        <div className='Historial_divContent'>
        <h2>Historial</h2>
        <div className='Historial_divHistorial'>
          <div className='Historial_tags'>
            <button className={open.all ? 'Historial_tag open' : 'Historial_tag'} name='all' onClick={handleOpen}>Todas</button>
            <button className={open.onContract ? 'Historial_tag open' : 'Historial_tag'} name='onContract' onClick={handleOpen}>En Contrato</button>
            <button className={open.active ? 'Historial_tag open' : 'Historial_tag'} name='active' onClick={handleOpen}>Publicadas</button>
            <button className={open.finalized ? 'Historial_tag open' : 'Historial_tag'} name='finalized' onClick={handleOpen}>Finalizadas</button>
            <button className={open.cancelled ? 'Historial_tag open' : 'Historial_tag'} name='cancelled' onClick={handleOpen}>Canceladas</button>
          </div>
          <div className='Historial_all'>
          {
              open.all ? (userLogged.proposals.length > 0 ?
              userLogged.proposals?.map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p>No has aplicado a ninguna oferta</p>) 
              :
              null
            }
          </div>
          <div className='Historial_onContract'>
          {
              open.onContract ? (userLogged.proposals.filter((e:any) => e.state === "contract started").length > 0 ?
              userLogged.proposals?.filter((e:any) => e.state === "contract started").map((e:any) => {
                return <HistorialCard props={e.proposals}/>
              })
              :
              <p>No tienes contratos iniciados</p>)
              :
              null
            }
          </div>
          <div className='Historial_finalized'>
          {
              open.finalized ? (userLogged.proposals.filter((e:any) => e.state === "finalized").length > 0 ?
              userLogged.proposals?.filter((e:any) => e.state === "finalized").map((e:any) => {
                console.log(e)
                return <HistorialCard props={e}/>
              })
              :
              <p>No tienes contratos finalizados</p>)
              :
              null
            }
          </div>
          <div className='Historial_active'>
          {
              open.active ? (userLogged.proposals.filter((e:any) => e.isActive === true).length > 0 ?
              userLogged.proposals?.filter((e:any) => e.isActive === true).map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p>No tienes postulaciones activas</p>)
              :
              null
            }
          </div>
          <div className='Historial_cancelled'>
          {
              open.cancelled ? (userLogged.proposals.filter((e:any) => e.isActive === false || e.state === "cancelled").length > 0 ?
              userLogged.proposals?.filter((e:any) => e.isActive === false || e.state === "cancelled").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p>No tienes postulaciones canceladas</p>)
              :
              null
            }
          </div>
        </div>
      </div>
      ) :
      <div className='Historial_divContent'>
        <h2>Historial</h2>
        <div className='Historial_divHistorial'>
          <div className='Historial_tags'>
            <button className={open.all ? 'Historial_tag open' : 'Historial_tag'} name='all' onClick={handleOpen}>Todas</button>
            <button className={open.onContract ? 'Historial_tag open' : 'Historial_tag'} name='onContract' onClick={handleOpen}>En Contrato</button>
            <button className={open.active ? 'Historial_tag open' : 'Historial_tag'} name='active' onClick={handleOpen}>Publicadas</button>
            <button className={open.finalized ? 'Historial_tag open' : 'Historial_tag'} name='finalized' onClick={handleOpen}>Finalizadas</button>
            <button className={open.cancelled ? 'Historial_tag open' : 'Historial_tag'} name='cancelled' onClick={handleOpen}>Canceladas</button>
          </div>
          <div className='Historial_all'>
          {
              open.all ? (userLogged.offers.length > 0 ?
              userLogged.offers?.map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p>No has publicado ninguna oferta</p>) 
              :
              null
            }
          </div>
          <div className='Historial_onContract'>
          {
              open.onContract ? (userLogged.offers.filter((e:any) => e.state === "contract started").length > 0 ?
              userLogged.offers?.filter((e:any) => e.state === "contract started").map((e:any) => {
                return <HistorialCard props={e.offers}/>
              })
              :
              <p>No tienes contratos finalizados</p>)
              :
              null
            }
          </div>
          <div className='Historial_finalized'>
          {
              open.finalized ? (userLogged.offers.filter((e:any) => e.state === "finalized").length > 0 ?
              userLogged.offers?.filter((e:any) => e.state === "finalized").map((e:any) => {
                return <HistorialCard props={e.offers}/>
              })
              :
              <p>No tienes contratos iniciados</p>)
              :
              null
            }
          </div>
          <div className='Historial_active'>
          {
              open.active ? (userLogged.offers.filter((e:any) => e.isActive === true).length > 0 ?
              userLogged.offers?.filter((e:any) => e.isActive === true).map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p>No tienes ofertas activas</p>)
              :
              null
            }
          </div>
          <div className='Historial_cancelled'>
          {
              open.cancelled ? (userLogged.offers.filter((e:any) => e.isActive === false).length > 0 ?
              userLogged.offers?.filter((e:any) => e.isActive === false).map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p>No tienes ofertas canceladas</p>)
              :
              null
            }
          </div>
        </div>
      </div>}
      
    </div>
  )
}

export default Historial