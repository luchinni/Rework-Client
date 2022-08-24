import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { useSelector } from "react-redux";
import icon_filter from "../../../images/icon_filters.png";
import icon_search from "../../../images/icon_search.png";
import { searchWorker, searchOffer } from "../../../Redux/Reducer/reducer";
import { useDispatch } from "react-redux";
import { getAllProfession } from "../../../Redux/Reducer/reducer";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

  const [open, setOpen] = useState(false);
  const profession = useSelector((state:any) => state.workService.professions);
  const [workerOrOffer, setworkerOrOffer] = useState("offer");
  const [remuneration, setRemuneration] = useState({
    min:0,
    max:0
  })
  const [workDuration, setWorkDurantion] = useState("")
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
    const filters = {rating:rating, profession:prof, remuneration:remuneration, workDuration:workDuration}
    if(workerOrOffer === "worker"){
      dispatch(searchWorker(inputSearch?inputSearch:"", filters))
    }else if(workerOrOffer === "offer"){
      dispatch(searchOffer(inputSearch?inputSearch:"", filters))
    }
    let form = document.getElementById("form") as HTMLFormElement | null;
    form?.reset()
    history("/home")

  }

  const handleSelect = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    
    if(name === "remuneration-min"){
      setRemuneration({
        ...remuneration,
        min:value
      })
    }

    if(name === "remuneration-max"){
      setRemuneration({
        ...remuneration,
        max:value
      })
    }

    if(name === "workDuration"){
      setWorkDurantion(value)
    }
    
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
        <form id="form" action="" onSubmit={(e) => submitHandler(e)}>
        <input className='input_search' type="text" id='inputSearch' placeholder='Busca' />
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
          <div className="Filter_divOptionsCheckbox">
            <div className='filter_type_option'>
              <label>FreeLancers</label>
              <input type="checkbox" id='worker' value="worker" onChange={(e) => handleCheck(e)}/>
            </div>
            <div className='filter_type_option'>
              <label>Ofertas</label>
              <input type="checkbox" defaultChecked id='offer' value="offer" onChange={(e) => handleCheck(e)}/>
            </div>
          </div>
          {/*workerOrOffer===?*/}
          <div className="Filter_divOptions">

            <div className='filter_option'>
              <select name='rating' id='rating' onChange={(e)=> handleSelect(e)}>
                <option selected={true} hidden>Rating</option>
                {["1+","2+","3+","4+","5+"].map((e:any) => {
                  return <option value={e} key={e}> {e} </option>
                })}
              </select>
            </div>
            <div className='filter_option'>
              <select name='profession' id='profession' onChange={(e)=> handleSelect(e)}>
              <option selected={true} hidden>Profesiones</option>
                {profession.map((e:any) => {
                  return <option value={e} key={e}> {e} </option>
                })}
              </select>
            </div>
            {workerOrOffer==="offer"?(
              <div>
                  <div className='filter_option'>
                      <label>Remuneración</label>
                      <input className='filter_remu' type="number" name='remuneration-min' id='remuneration-min' placeholder="Min" onChange={(e)=> handleSelect(e)}/>
                      <input className='filter_remu' type="number"  name='remuneration-max' id='remuneration-max' placeholder="Max" onChange={(e)=> handleSelect(e)}/>
                  </div>
                  <div className='filter_workDuration'>
                    <select name='workDuration' id='workDuration' onChange={(e)=> handleSelect(e)}>
                     <option selected={true} hidden>Duración del trabajo</option>
                       {["Menos de 1 mes","1 a 3 meses","4 a 6 meses","Más de 6 meses"].map((e:any) => {
                        return <option value={e} key={e}> {e} </option>
                        })}
                    </select>
            </div>
              </div>
            
            ):<span></span>
              }
          </div>
          
        </div>
      }
    </div>
  )
}


export default SearchBar;
