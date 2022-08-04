import React , {useState} from 'react';
import './SearchBar.css';
import icon_filter from '../../../images/icon_filters.svg';
import icon_search from '../../../images/icon_search.svg';

const SearchBar = () => {
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <div className='SearchBar_component'>
      <div className='SearchBar'>
        <img className='icon_search' src={icon_search} alt="search" />
        <input className='input_search' type="text" placeholder='Busca usuario/trabajo' />
        <button className='button_filters' onClick={handleClick}><img className='icon_filters' src={icon_filter} alt="filters" /></button>
      </div>
      {open &&
        <div className='filter_dropDown'>
          <div className='filter_option'>
            <label>Usuarios</label>
            <input type="checkbox" />
          </div>
          <div className='filter_option'>
            <label>Trabajo</label>
            <input type="checkbox" />
          </div>
        </div>
      }
    </div>
  )
}

export default SearchBar