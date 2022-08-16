import React, { useEffect, useState } from 'react'
import "./Carrusel.css"
//import "./swiper-bundle.min.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper";
import { getOffersMoreRating, getworkersMoreRating } from '../../../Redux/Reducer/reducer';
import CarruselCard from "./CarruselCard"
import CardOffer from "../../Offer/CardOffer/CardOffer"
import "swiper/css";
//import "swiper/css/pagination";
//import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useSelector } from 'react-redux';
import CardWorker from '../../WorkerHome/CardWorker/CardWorker';

const Carrusel = () => {

    const [offersRating, setOffersRating] = useState([]);
    const [workersRating, setWorkersRating] = useState([]);
    const userLogged = useSelector((state: any) => state.workService.userLogged)
    const currentUser = useSelector ((state: any) => state.workService.currentUser)

    useEffect(() => {
        getOffersMoreRating()
        .then((response:any)=>{
            setOffersRating(response)
        })
        getworkersMoreRating()
        .then((response:any)=>{
            setWorkersRating(response)
        })

        
    }, [])
    console.log("offers", offersRating)
    
  return (
        <>
        {currentUser.id !== '' && offersRating[0] !== undefined?

        <div>
        {userLogged.isWorker===true?(
            <div>
            <h2>Ofertas destacadas</h2>
            <Swiper
            slidesPerView={1}
            spaceBetween={0}
            slidesPerGroup={1}
            loop={true}
            autoplay={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {offersRating && offersRating?.map((o:any, i:any) =>{
              console.log("la o", o)
              console.log("la i", i)
            return(
                <SwiperSlide><CardOffer key={i} props={o} /></SwiperSlide>
            )
          })}
          </Swiper>
          </div>
        )
          :
          <div>
            <h2>Freelancers destacados</h2>
            <Swiper
            slidesPerView={2}
            spaceBetween={30}
            slidesPerGroup={1}
            loop={true}
            autoplay={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {workersRating && workersRating?.map((o:any, i:any) =>{
            return(
                <SwiperSlide><CardWorker key={i} props={o} /></SwiperSlide>
            )
          })}
          </Swiper>
          </div>
     }
     </div>
     :
     <br/>
    }
        </>
  )
}

export default Carrusel