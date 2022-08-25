import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserByIdOther } from "../../../Redux/Reducer/reducer";
import "./Reviews.css";
import { ratingStars } from "../../WorkerHome/CardWorker/CardWorker";
import { useNavigate } from 'react-router-dom';

function Reviews({ user }: any) {
  const userById = useSelector((state: any) => state.workService.userById);
  const currentUser = useSelector ((state:any) => state.workService.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserByIdOther(user));
  }, [dispatch]);

  return (
    <div className="Reviews_Component">
      <div className="Reviews_divContent">
        <h2 className="Reviews_title">Reviews</h2>
        <div className="Reviews_divReviews">
          {userById.reviews?.length > 0 ? (
            userById.reviews?.map((e: any) => {
              return (
                <div className="Reviews_review">
                  <div className="Reviews_textCont">
                    <h3>Valoración: <span className='span_rating' >{ratingStars(e.valoration)}</span></h3>
                    <div className="Reviews_divValoracion">
                      <p className='p_valoriacionReview'>{e.review_description}</p>
                    </div>
                  </div>
                  {userById?.id === currentUser?.id ? 
                  <div className="Reviews_buttonCont">
                    <button className="Reviews_button" onClick={()=>navigate(`/detailOffer/${e.offerIdOffer}`)}>Ver trabajo</button>
                  </div> :
                  false}                  
                </div>
              );
            })
          ) : userById.isWorker === false ? (
            <p>
              No cuentas con reviews. Recibirás la primera cuando finalice el trabajo de una oferta que hayas publicado!
            </p>
          ) : (
            <p>
              No cuentas con reviews. Recibirás una cuando finalice el trabajo de una propuesta que te hayan aceptado!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
