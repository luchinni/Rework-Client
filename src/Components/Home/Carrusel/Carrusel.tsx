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
    
  return (
        <>
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
            slidesPerView={3}
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
        
        </>
  )
}

export default Carrusel