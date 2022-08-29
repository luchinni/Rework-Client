import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardFavorite from '../CardFavorite/CardFavorite';
import { getUserById, remFavoritestoDB } from '../../../Redux/Reducer/reducer';
import decode from "jwt-decode"
import './CardsFavorites.css';


const CardsFavorites = ({favoriteInfo}:any) => {

  const currentUser = useSelector((state:any) => state.workService.currentUser);
  const userLogged = useSelector((state:any) => state.workService.userLogged);
  const dispatch = useDispatch()
  const token:any = localStorage.getItem("token")
  let tokenDecode:any = decode(token)

  async function onClose (favoriteInfo:any){
    if(userLogged.favorites?.find((f:any) => f.idOffer === favoriteInfo.idOffer)){
      await remFavoritestoDB(favoriteInfo, userLogged.id);
      return dispatch(getUserById(tokenDecode))
    }
  }


  return (
    <div className='CardsFavorites_component'>
      <div className='Favorites_title'>
        <span>Ofertas guardadas</span>
      </div>
      {currentUser.id === '' 
      ? <span className='CardsFavorites_guestMessage'>Tus ofertas guardadas aparecerán al iniciar sesión</span> 
      : currentUser.id !== '' ? favoriteInfo?.length === 0
      ? <span className='CardsFavorites_guestMessage'>Aún no has guardado ofertas</span>
      : "" : ""}
      <div className='CardFavorite_component'>
            {
              favoriteInfo && favoriteInfo?.map((o:any, i:any) =>{
          return  <CardFavorite key={i} props={o} onClose={onClose} />
        })

      }     
      </div>
    </div>
  )
}

export default CardsFavorites