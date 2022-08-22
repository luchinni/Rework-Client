import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserByIdOther } from "../../../Redux/Reducer/reducer";
import "./Reviews.css";

function Reviews({ user }: any) {
  const userById = useSelector((state: any) => state.workService.userById);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByIdOther(user));
  }, [dispatch]);

  return (
    <div className="Reviews_Component">
      <div className="Reviews_divContent">
        <h2>Reviews</h2>
        <div className="Reviews_divReviews">
          {userById.reviews?.length > 0 ? (
            userById.reviews?.map((e: any) => {
              return (
                <div className="Reviews_review">
                  <h3>Valoración: {e.valoration}</h3>
                  <p>{e.review_description}</p>
                </div>
              );
            })
          ) : userById.isWorker === false ? (
            <p>
              No cuentas con reviews. Recibirás la primera cuando finalice el
              trabajo de una oferta que hayas publicado!
            </p>
          ) : (
            <p>
              No cuentas con reviews. Recibirás una cuando finalice el trabajo
              de una propuesta que te hayan aceptado!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;

{
  /* <div className='Reviews_review'>
            <h3>Excelente persona</h3>
            <p>Muy responsable y comprometido con su trabajo, hizo todo tal cual acordamos.</p>
          </div>
          <div className='Reviews_review'>
            <h3>Un capo</h3>
            <p>Me hizo una página medio pelo en wix 👍</p>
          </div> */
}
