import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { setRecommendList } from "../../../../features/recommend/recommend";
import AuthenComponent from "../../../../HOCs/AuthenComponent";
import LoadingComponent from "../../../Loading/LoadingComponent";
import EmptyProduct from "../../EmptyProduct/EmptyProduct";
import SaveRecommentComponent from "../SaveRecommentComponent/SaveRecommentComponent";
import styles from "./../Restaurant/resutaurant.module.css";
function SpaDetailComponent() {
  const [spas, setSpa] = useState([]);
  const recommend = useSelector((state) => state.recommend);
  const dispatch = useDispatch();
  const { spaId, hotelId } = useParams();
  useEffect(() => {
    getAllRestaurantDetail().then((dishs) => {
      if (dishs?.length === 0) {
        return setSpa(null);
      }
      setSpa([...dishs]);
    });
    axios
      .get(`${import.meta.env.VITE_BACKEND_SITE}/recommend`)
      .then((res) => res.data)
      .then((data) => {
        dispatch(setRecommendList(data));
      });
  }, []);
  const getAllRestaurantDetail = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_SITE}/spas/${spaId}`
    );
    return result.data;
  };
  const showDishs = () => {
    if (spas[0]?.treatments.length > 0) {
      return spas[0].treatments.map((treatment) => {
        return (
          <div
            key={treatment?.id}
            className="col-xs-3 col-sm-3 col-md-3 col-lg-3"
          >
            <Tooltip
              title={`<div class="row ${styles.image_container}">
              ${treatment.images
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
                  <h5 className="card-title">{treatment.treatment_name}</h5>
                </div>

                <div className="card-body">
                  <img src={treatment.images[0]?.image_url} alt="" />
                  {/* */}
                  <p className={`card-text ${styles.restaurant_description}`}>
                    {treatment.treatment_description}
                  </p>
                </div>
                <div className="card-footer">
                  <h5
                    style={{ float: "right" }}
                  >{`$ ${treatment.treatment_price}`}</h5>
                </div>
              </div>
            </Tooltip>
          </div>
        );
      });
    }
  };
  console.log(spas[0]?.treatments);
  if (!spas) {
    return <EmptyProduct name="Treatment" />;
  }
  if (spas?.length === 0) {
    return <LoadingComponent />;
  }
  if (spas[0]?.treatments.length > 0) {
    return (
      <div>
        <div className="restaurant_detail_container">
          <div style={{ color: "white" }}>
            <div className={styles.restaurant_detail_header}>
              <h1>
                {`Enjoy it at ${spas[0]?.spa_name}` ||
                  "Loading name treatments"}
              </h1>
              <div className={styles.restaurant_detail_header_option}>
                <SaveRecommentComponent
                  type="spa"
                  id={spas[0]?.id}
                  recommend={recommend}
                  data={spas}
                  isShow={true}
                  hotelId={hotelId}
                  detailId={spaId}
                />
              </div>
            </div>
            <div className="my-5">
              <h2>Qi-moving full body massage </h2>
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
                Spa treatments best suited
              </h1>
            </div>
            <div className={`${styles.restaurant_container}`}>
              <div className="row">{showDishs()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AuthenComponent(SpaDetailComponent);
