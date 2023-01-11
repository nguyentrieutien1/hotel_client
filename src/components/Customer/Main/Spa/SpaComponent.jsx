import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "react-tippy";
import { Link, useParams } from "react-router-dom";
import styles from "./../Restaurant/resutaurant.module.css";
import EmptyProduct from "../../EmptyProduct/EmptyProduct";
import LoadingComponent from "../../../Loading/LoadingComponent";
import AuthenComponent from "../../../../HOCs/AuthenComponent";
function GymComponent() {
  const [spas, setSpa] = useState([]);
  const { hotelId } = useParams();
  useEffect(() => {
    getSpas().then((gyms) => {
      if (gyms?.length === 0) {
        return setSpa(null);
      }
      setSpa(gyms);
    });
  }, []);
  const getSpas = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_SITE}/hotels/spa/${hotelId}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  const showSpas = () => {
    if (spas?.length > 0) {
      return spas[0].spas.map((spa) => {
        return (
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <Tooltip
              title={`<div class="row ${styles.image_container}">
              ${spa.images
                .map((image) => {
                  return `<div class="${styles.image_tippy} col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <img
                      display="flex"
                      style="width: 100%; height: 100%; object-fit: cover"
                      src=${image.image_url}
                      alt="noimage"
                    />
                  </div>`;
                })
                .join(" ")}
              
            </div>`}
              position="right"
              arrow="true"
              arrowSize="big"
            >
              <div className={`card ${styles.card}`}>
                <div className="card-header">
                  <Link to={`${spa?.id}`}>
                    <h5 className="card-title">{spa.spa_name}</h5>
                  </Link>
                </div>

                <div className="card-body">
                  <img src={spa.images[0]?.image_url} />
                  {/* */}
                  <p className={`card-text ${styles.restaurant_description}`}>
                    {spa.spa_description}
                  </p>
                </div>
              </div>
            </Tooltip>
          </div>
        );
      });
    }
  };
  if (!spas) {
    return <EmptyProduct name="Spa" />;
  }
  if (spas?.length === 0) {
    return <LoadingComponent />;
  }
  if (spas[0]?.spas?.length > 0) {
    return (
      <div>
        {" "}
        <div className="wrapper">
          <div className="restautant_title">
            <h1 style={{ color: " #f8eee4", fontFamily: "Tenor Sans" }}>
              Spa treatments best suited for {spas[0]?.hotel_name} hotel
            </h1>
          </div>
          <div className={`${styles.restaurant_container}`}>
            <div className="row">{showSpas()}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default AuthenComponent(GymComponent);
