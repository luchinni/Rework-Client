import React , {useState, useEffect} from 'react';
import './SearchBar.css';
import { useSelector } from 'react-redux';
import icon_filter from '../../../images/icon_filters.svg';
import icon_search from '../../../images/icon_search.svg';
import { searchWorker, searchOffer } from '../../../Redux/Reducer/reducer';
import { useDispatch } from 'react-redux';
import { getAllProfession } from '../../../Redux/Reducer/reducer';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

  const [open, setOpen] = useState(false);
  const profession = useSelector((state:any) => state.workService.professions);
  const [workerOrOffer, setworkerOrOffer] = useState("offer");
  const history = useNavigate()
  const [rating, setRating] = useState("");
  const [prof, setProf] = useState("");

  const dispatch = useDispatch();

  function handleClick() {
    setOpen(!open)
  }

  useEffect(()=> {
    dispatch(getAllProfession())
},[dispatch])

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
    const filters = {rating:rating, profession:prof}
    if(workerOrOffer === "worker"){
      dispatch(searchWorker(inputSearch?inputSearch:"", filters))
    }else if(workerOrOffer === "offer"){
      dispatch(searchOffer(inputSearch?inputSearch:"", filters))
    }
    history("/home")
  }

  const handleSelect = (e:any) => {
    const value = e.target.value;
    const name = e.target.name;    
    
    console.log(name, value)
    if(name === "rating"){
      setRating(value);
    }
    if(name === "profession"){
      setProf(value);
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
            <label>FreeLancers</label>
            <input type="checkbox" id='worker' value="worker" onChange={(e) => handleCheck(e)}/>
          </div>
          <div className='filter_option'>
            <label>Ofertas</label>
            <input type="checkbox" defaultChecked id='offer' value="offer" onChange={(e) => handleCheck(e)}/>
          </div>
          <div className='filter_option'>
          <select name='rating' id='rating' onChange={(e)=> handleSelect(e)}>
          <option selected={true} hidden>Rating</option>
            {[1,2,3,4,5].map((e:any) => {
               return <option value={e} key={e}> {e} </option>
            })}
            </select>
          </div>
          <div className='filter_option'>
          <select name='profession' id='profession' onChange={(e)=> handleSelect(e)}>
          <option selected={true} hidden>Professions</option>
            {profession.map((e:any) => {
               return <option value={e} key={e}> {e} </option>
            })}
            </select>
          </div>
        </div>
      }
    </div>
  )
}

export default SearchBar