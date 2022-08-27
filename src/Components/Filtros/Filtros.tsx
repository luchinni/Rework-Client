import React from 'react';
import { useDispatch } from 'react-redux';
import { orderAZ, orderZA, order15, order51 } from '../../Redux/Reducer/reducer';
import './Filtros.css';


function Filtros() {

  const dispatch = useDispatch();

  const handleSelect = (e:any) => {
    const name = e.target.name;
    const value = e.target.value;

    if(name === "alpha"){
      if(value==="az") dispatch(orderAZ());
      if(value==="za") dispatch(orderZA());
      return
    }
    if(name==="rating"){
      console.log("entro");
      if(value==="15") dispatch(order15());
      if(value==="51") dispatch(order51());
      return
    }
  }

  return (
    <div className='Filtros_component'>
      <div className='Filtros_title'>
        <span>Ordenamientos</span>
      </div>
      <div className='Filtros_sortDivContent'>
        <div className='Filtros_sortDiv'>
          <label>ORDENAR POR:</label> 
          <select className='Filtro_sortButton' name='alpha' id='alpha' onChange={(e)=> handleSelect(e)}>
            <option selected={true} hidden>Alfabeto</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>

        <div className='Filtros_sortDiv'>
          <label>ORDENAR POR:</label> 
          <select className='Filtro_sortButton' name='rating' id='rating' onChange={(e)=> handleSelect(e)}>
            <option selected={true} hidden>Rating</option>
            <option value="15">1-5</option>
            <option value="51">5-1</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filtros