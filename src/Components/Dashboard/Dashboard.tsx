import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Header from "../Header/Header";
import OfferDash from "./OfferDash/OfferDash";
import UserDash from "./UserDash/UserDash";
import PaysDash from "./PaysDash/PaysDash";
import OptionsDash from "./OptionsDash/OptionsDash";
import { useDispatch, useSelector } from "react-redux";
import { changeLoading } from "../../Redux/Reducer/reducer";
import Loading from "../Loading/Loading";

function Dashboard() {
  const [offCli, setOffCli] = useState(true);
  const [user, setUser] = useState(false);
  /*   const [reports, setReports] = useState(false) */
  const [pagos, setPagos] = useState(false);
  const [options, setOptions] = useState(false);
  const isLoading = useSelector((state: any) => state.workService.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeLoading(true));
    setTimeout(() => dispatch(changeLoading(false)), 1000);
  }, []);

  function handleoffCli() {
    setOffCli(true);
    setUser(false);
    // setReports(false);
    setPagos(false);
    setOptions(false);
  }

  function handleUser() {
    setUser(true);
    setOffCli(false);
    //   setReports(false);
    setPagos(false);
    setOptions(false);
  }

  /*  function handleReports() {
    setReports(true);
    setOffCli(false);
    setUser(false);
    setPagos(false);
    setOptions(false);
  } */

  function handlePagos() {
    setPagos(true);
    //   setReports(false);
    setOffCli(false);
    setUser(false);
    setOptions(false);
  }

  function handleOptions() {
    setOptions(true);
    //   setReports(false);
    setOffCli(false);
    setUser(false);
    setPagos(false);
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="Dashboard_Component">
            <Header />
            <div className="Dashboard_divContent">
              {/* <div className='Dashboard_divTop'>
            <div className='Dashboard_divAdminProfile'>
              <div className='Dashboard_divAdminPhoto'>
                <img className='Dashboard_AdminPhoto' src="https://pbs.twimg.com/media/E1JoNK6WQAsPu5x.jpg:large" alt="Admin photo" />
              </div>
              <div className='Dashboard_divAdminInfo'>
                <div className='Dasboard_divAdminName'>
                  <span>Esteban </span>
                  <span>Longo</span>
                </div>
                <span className='Dasboard_AdminRol'>Administrador</span>
              </div>
            </div>
          </div> */}

              <div className="Dashboard_divBot">
                <div className="Dashboard_divNavigation">
                  <div className="Dashboard_divTags">
                    <button
                      className={
                        offCli ? "Dashboard_tag open" : "Dashboard_tag"
                      }
                      onClick={handleoffCli}
                    >
                      Ofertas
                    </button>
                    <button
                      className={user ? "Dashboard_tag open" : "Dashboard_tag"}
                      onClick={handleUser}
                    >
                      Usuarios
                    </button>
                    <button
                      className={
                        options ? "Dashboard_tag open" : "Dashboard_tag"
                      }
                      onClick={handleOptions}
                    >
                      Opciones
                    </button>
                    {/* <button className={reports ? 'Dashboard_tag open' : 'Dashboard_tag'} onClick={handleReports}>Reportes</button> */}
                    <button
                      className={pagos ? "Dashboard_tag open" : "Dashboard_tag"}
                      onClick={handlePagos}
                    >
                      Pagos
                    </button>
                  </div>

                  <div className="Dashboard_divSearch">
                    <input
                      className="Darshboard_search"
                      type="text"
                      placeholder="Search..."
                    />
                  </div>
                </div>

                <div className="Dashboard_divOrdenamientoCont">
                  <div className="Dashboard_divOrdenamiento">
                    <select name="" id="">
                      <option value="">asc</option>
                      <option value="">des</option>
                    </select>
                  </div>
                </div>

                {offCli && <OfferDash />}

                {user && <UserDash />}

                {/*       {
              reports && <p>falta el componente de Reportes</p>
            } */}

                {pagos && <PaysDash />}

                {options && <OptionsDash />}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Dashboard;
