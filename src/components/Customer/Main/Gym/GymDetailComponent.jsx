import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./../Restaurant/resutaurant.module.css";
import { Tooltip } from "react-tippy";
import EmptyProduct from "../../EmptyProduct/EmptyProduct";
import { useSelector, useDispatch } from "react-redux";
import SaveRecommentComponent from "../SaveRecommentComponent/SaveRecommentComponent";
import { setRecommendList } from "../../../../features/recommend/recommend";
import LoadingComponent from "../../../Loading/LoadingComponent";
import AuthenComponent from "../../../../HOCs/AuthenComponent";
function GymDetailComponent() {
  const [workouts, setWorkouts] = useState([]);
  const recommend = useSelector((state) => state.recommend);
  const dispatch = useDispatch();
  const { gymId, hotelId } = useParams();
  useEffect(() => {
    getWorkouts().then((workouts) => {
      if (workouts?.length === 0) {
        setWorkouts(null);
        return;
      }
      setWorkouts(workouts);
    });
    axios
      .get(`${import.meta.env.VITE_BACKEND_SITE}/recommend`)
      .then((res) => res.data)
      .then((data) => {
        dispatch(setRecommendList(data));
      });
  }, []);
  const getWorkouts = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_SITE}/gyms/${gymId}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  const showWorkouts = () => {
    if (workouts?.length > 0) {
      return workouts[0].workouts.map((workout) => {
        return (
          <div
            key={workout?.id}
            className="col-xs-3 col-sm-3 col-md-3 col-lg-3"
          >
            <Tooltip
              title={`<div class="row ${styles.image_container}">
              ${workout.images
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
                  <h5 className="card-title">{workout.workout_name}</h5>
                </div>

                <div className={`card-body ${styles.card_body}`}>
                  <img
                    src={`${workout.images[0]?.image_url}`}
                    alt=""
                    sizes=""
                  />
                  {/* */}

                  <p className={`card-text ${styles.restaurant_description}`}>
                    {workout.workout_description}
                  </p>
                </div>
                <div className="card-footer">
                  <h5
                    style={{ float: "right" }}
                  >{`$ ${workout.workout_price}`}</h5>
                </div>
              </div>
            </Tooltip>
          </div>
        );
      });
    }
  };
  if (!workouts) {
    return <EmptyProduct name="Workout" />;
  }
  if (workouts?.length === 0) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <div>
        {/* {workouts[0]?.workouts.length > 0 ? ( */}
        <div className={styles.restaurant_detail_container}>
          <div>
            <div className={styles.restaurant_detail_header}>
              <h1>
                {`Enjoy it at ${workouts[0]?.gym_name}` || "Loading name gym"}
              </h1>
              <div className={styles.restaurant_detail_header_option}>
                <SaveRecommentComponent
                  type="gym"
                  id={workouts[0]?.id}
                  recommend={recommend}
                  data={workouts}
                  isShow={true}
                  hotelId={hotelId}
                  detailId={gymId}
                />
              </div>
            </div>
            {/* <div>
                <img
                  className={styles.restaurant_detail_images}
                  src={`${workouts[0]?.image.image_url}`}
                />
              </div>{" "} */}
            <div className="my-5">
              <h2>Why we curated this for you </h2>
              <ul>
                <li> Provides immune support</li>
                <li> Clear phlegm</li>
                <li>Stabilizes blood sugar</li>
                <li>Prevents liver damage</li>
              </ul>
            </div>
            <div className="restaurant_detail_description my-5">
              <h4>{`Discover a dining experience built on craft, service and ambience. Madame Fan offers Cantonese cuisine in a contemporary setting.`}</h4>
            </div>
          </div>
          <div className="wrapper">
            <div className="restautant_title">
              <h1 style={{ color: " #f8eee4", fontFamily: "Tenor Sans" }}>
                Fitness & workouts best suited
              </h1>
            </div>
            <div className={`${styles.restaurant_container}`}>
              <div className="row">{showWorkouts()}</div>
            </div>
          </div>
        </div>
        {/* ) : ( */}
        {/* )} */}
      </div>
    </div>
  );
}
export default AuthenComponent(GymDetailComponent);
