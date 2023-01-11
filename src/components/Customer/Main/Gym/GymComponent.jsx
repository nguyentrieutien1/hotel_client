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
  const [restaurants, setRestaurants] = useState([]);
  const { hotelId } = useParams();
  useEffect(() => {
    getAllGym().then((gyms) => {
      setRestaurants(gyms);
    });
  }, []);
  const getAllGym = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_SITE}/hotels/gym/${hotelId}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  const showGyms = () => {
    if (restaurants?.length > 0) {
      return restaurants[0].gyms.map((gym) => {
        return (
          <div key={gym?.id} className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <Tooltip
              title={`<div class="row ${styles.image_container}">
              ${gym.images
                .map((image) => {
                  return `<div key={${image?.id}} class="${
                    styles.image_tippy
                  } ${`col-xs-6 col-sm-6 col-md-6 col-lg-6`} ">
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
                  <Link to={`${gym?.id}`}>
                    <h5 className={`card-title`}>{gym.gym_name}</h5>
                  </Link>
                </div>

                <div className="card-body">
                  <img src={gym.images[0]?.image_url} alt="" />
                  {/* */}
                  <p className={`card-text ${styles.restaurant_description}`}>
                    {gym.gym_description}
                  </p>
                </div>
              </div>
            </Tooltip>
          </div>
        );
      });
    }
  };
  if (restaurants?.length === 0) {
    return <LoadingComponent />;
  }
  if (restaurants[0]?.gyms.length > 0) {
    return (
      <div>
        {" "}
        <div className="wrapper">
          <div className="restautant_title">
            <h1 style={{ color: " #f8eee4", fontFamily: "Tenor Sans" }}>
              Fitness & workouts best suited for {restaurants[0]?.hotel_name}
            </h1>
          </div>
          <div className={`${styles.restaurant_container}`}>
            <div className="row">{showGyms()}</div>
          </div>
        </div>
      </div>
    );
  }
  return <EmptyProduct name="Gym" />;
}
export default AuthenComponent(GymComponent);
