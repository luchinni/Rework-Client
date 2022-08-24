import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Historial.css'
import HistorialCard from './HistorialCards/HistorialCard';

function Historial() {

  const userLogged = useSelector((state: any) => state.workService.userLogged)

  interface OpenType {
    all: Boolean;
    onContract: Boolean;
    active: Boolean;
    cancelled: Boolean;
    finalized: Boolean;
  };

  const [open, setOpen] = useState<OpenType>({
    all: false,
    onContract: false,
    active: true,
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

  return (
    <div className='Historial_Component'>
      {userLogged.isWorker===true ? (
        <div className='Historial_divContent'>
          <h2 className="Historial_title">Historial</h2>
        <div className='Historial_divHistorial'>
          <div className='Historial_tags'>
            <button className={open.all ? 'Historial_tag open' : 'Historial_tag'} name='all' onClick={handleOpen}>Todas</button>
            <button className={open.active ? 'Historial_tag open' : 'Historial_tag'} name='active' onClick={handleOpen}>Publicadas</button>
            <button className={open.onContract ? 'Historial_tag open' : 'Historial_tag'} name='onContract' onClick={handleOpen}>En Contrato</button>
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
              <p className="Historial_no">No has aplicado a ninguna oferta</p>) 
              :
              null
            }
          </div>
          <div className='Historial_onContract'>
          {
              open.onContract ? (userLogged.proposals.filter((e:any) => e.state === "contract started").length > 0 ?
              userLogged.proposals?.filter((e:any) => e.state === "contract started").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p className="Historial_no">No tienes contratos en proceso</p>)
              :
              null
            }
          </div>
          <div className='Historial_finalized'>
          {
              open.finalized ? (userLogged.proposals.filter((e:any) => e.state === "finalized" || e.state === "released payment").length > 0 ?
              userLogged.proposals?.filter((e:any) => e.state === "finalized" || e.state === "released payment").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p className="Historial_no">No tienes contratos finalizados</p>)
              :
              null
            }
          </div>
          <div className='Historial_active'>
          {
              open.active ? (userLogged.proposals.filter((e:any) => e.isActive === true && e.state === "posted").length > 0 ?
              userLogged.proposals?.filter((e:any) => e.isActive === true && e.state === "posted").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p className="Historial_no">No tienes postulaciones activas</p>)
              :
              null
            }
          </div>
          <div className='Historial_cancelled'>
          {
              open.cancelled ? (userLogged.proposals.filter((e:any) => e.state === "cancelled" || e.state === "contract cacelled" || e.state === "rejected" ||  e.state === "contract rejected").length > 0 ?
              userLogged.proposals?.filter((e:any) => e.state === "cancelled" || e.state === "contract cacelled" || e.state === "rejected" || e.state === "contract rejected").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p className="Historial_no">No tienes postulaciones canceladas</p>)
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
            <button className={open.active ? 'Historial_tag open' : 'Historial_tag'} name='active' onClick={handleOpen}>Publicadas</button>
            <button className={open.onContract ? 'Historial_tag open' : 'Historial_tag'} name='onContract' onClick={handleOpen}>En Contrato</button>
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
              <p className="Historial_no">No has publicado ninguna oferta</p>) 
              :
              null
            }
          </div>
          <div className='Historial_onContract'>
          {
              open.onContract ? (userLogged.offers.filter((e:any) => e.state === "contract started").length > 0 ?
              userLogged.offers?.filter((e:any) => e.state === "contract started").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p className="Historial_no">No tienes contratos en proceso</p>)
              :
              null
            }
          </div>
          <div className='Historial_finalized'>
          {
              open.finalized ? (userLogged.offers.filter((e:any) => e.state === "finalized" || e.state === "released payment").length > 0 ?
              userLogged.offers?.filter((e:any) => e.state === "finalized" || e.state === "released payment").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p className="Historial_no">No tienes contratos finalizados</p>)
              :
              null
            }
          </div>
          <div className='Historial_active'>
          {
              open.active ? (userLogged.offers.filter((e:any) => e.isActive === true && e.state === "active").length > 0 ?
              userLogged.offers?.filter((e:any) => e.isActive === true && e.state === "active").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p className="Historial_no">No tienes ofertas activas</p>)
              :
              null
            }
          </div>
          <div className='Historial_cancelled'>
          {
              open.cancelled ? (userLogged.offers.filter((e:any) => e.isActive === false && e.state === "cancelled").length > 0 ?
              userLogged.offers?.filter((e:any) => e.isActive === false && e.state === "cancelled").map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p className="Historial_no">No tienes ofertas canceladas</p>)
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