import React , {useState} from 'react';
import './SearchBar.css';
import icon_filter from '../../../images/icon_filters.svg';
import icon_search from '../../../images/icon_search.svg';
import { searchWorker, searchOffer } from '../../../Redux/Reducer/reducer';
import { useDispatch } from 'react-redux';

const SearchBar = () => {

  const [open, setOpen] = useState(false);
  const [workerOrOffer, setworkerOrOffer] = useState("offer");
  const dispatch = useDispatch();

  function handleClick() {
    setOpen(!open)
  }

  const handleCheck = (e:any) => {
    let workerCheck = document.getElementById("worker") as HTMLInputElement;
    let offerCheck = document.getElementById("offer") as HTMLInputElement;
    const value = e.target.value;
    const check = e.target.checked;

    console.log(value);

    if(value === "offer" &&workerCheck?.checked === true){
      workerCheck.checked = false;
    }
    else if(value === "worker" && offerCheck?.checked === true){
      offerCheck.checked = false;
    }

    if(check===false){
      setworkerOrOffer("offer")
    }else{
      setworkerOrOffer(value)
    }
  }

  const submitHandler = (e:any) => {
    e.preventDefault();
    const input = document.getElementById("inputSearch") as HTMLInputElement | null;
    const inputSearch = input?.value;
    if(workerOrOffer === "worker"){
      dispatch(searchWorker(inputSearch?inputSearch:""))
    }else if(workerOrOffer === "offer"){
      dispatch(searchOffer(inputSearch?inputSearch:""))
    }
  }



  return (
    <div className='SearchBar_component'>
      <div className='SearchBar'>
        <form action="" onSubmit={(e) => submitHandler(e)}>
        <input className='input_search' type="text" id='inputSearch' placeholder='Busca usuario/trabajo' />
        </form>
        <div className='SearchBar_buttons'>
          <button className='button_filters' onClick={handleClick}>
            <img className='icon_filters' src={icon_filter} alt="filters" /></button>
          <button className='button_search'>
            <img className='icon_search' src={icon_search} alt="search" onClick={(e) => submitHandler(e)} />
          </button>
        </div>
      </div>
      {open &&
        <div className='filter_dropDown'>
          <div className='filter_option'>
            <label>Usuarios</label>
            <input type="checkbox" id='worker' value="worker" onChange={(e) => handleCheck(e)}/>
          </div>
          <div className='filter_option'>
            <label>Trabajo</label>
            <input type="checkbox" id='offer' value="offer" onChange={(e) => handleCheck(e)}/>
          </div>
        </div>
      }
    </div>
  )
}

export default SearchBar