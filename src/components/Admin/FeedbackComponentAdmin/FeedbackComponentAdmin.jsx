import axios from "axios";
import React, { memo, useState } from "react";
import { useEffect } from "react";
import { exportFile } from "../../../helpers/exportFile";
function FeedbackComponentAdmin() {
  const [feedback, setFeedback] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  useEffect(() => {
    try {
      getAllFeedback().then((feedbackList) => {
        const { feedbacks, hotels } = feedbackList;
        
        setHotels(hotels);
        setFeedbackList(feedbacks);
        const firstHotel = hotels.length > 0 ??  hotels[0]?.hotels?.id;
        const filterFirstHotel = feedbacks.filter(
          (hotel) => hotel?.hotel?.id == firstHotel
        );
        setFeedback(filterFirstHotel);
      });
    } catch (error) {}
  }, []);
  const getAllFeedback = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_SITE}/feedback`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  const showFeedback = () => {
    if (feedback?.length > 0) {
  
      return feedback.map((feedback) => {
        return (
          <tr key={feedback?.id}>
            <td>{feedback?.hotel?.hotel_name}</td>
            <td>{feedback?.account?.email}</td>
            <td>{feedback?.account?.username}</td>
            <td>{feedback?.rate}</td>
            <td>{feedback?.feedback}</td>
          </tr>
        );
      });
    }
  };
  const handleChangeHotel = (e) => {
    const { value } = e.target;
    filterFeedback(value);
  };
  const filterFeedback = (id) => {
    const filterFeedback = feedbackList.filter(
      (hotel) => hotel?.hotel?.id == id
    );
    setFeedback(filterFeedback);
  };
  const showHotels = () => {
    console.log(hotels)
    if (hotels?.length) {
      const result = hotels.reduce((prevState, currentState) => {
        const check = prevState.every(hotel => hotel?.hotel?.id != currentState?.hotel?.id)
        if(check) {
          prevState.push(currentState)
        }
        return [...prevState]
      }, [])
      return result.map((hotel, index) => {
        return (
          <option
            key={hotel?.id}
            selected={index === 0}
            value={hotel?.hotels?.id}
          >
            {hotel?.hotels?.hotel_name}
          </option>
        );
      });
    }
  };
  const dowloadPdf = () => {
    const feedback = document.querySelector(".feedback");
    exportFile(feedback, "feedback");
  };
  return (
    <div>
      <div className="row">
        <div className="row">
          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 ">
            <button
              onClick={dowloadPdf}
              type="button"
              className="btn btn-danger my-4 "
            >
              EXPORT
            </button>
          </div>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <select
            className="form-control"
            required="required"
            onChange={handleChangeHotel}
          >
            {showHotels()}
          </select>
        </div>
        <div
          className="col-xs-9 col-sm-9 col-md-9 col-lg-9"
          style={{ height: "700px", overflowY: "scroll" }}
        >
          <table className="table feedback table-hover">
            <thead>
              <tr>
                <th>HOTEL</th>
                <th>EMAIL</th>
                <th>USERNAME</th>
                <th>RATING</th>
                <th>FEEDBACK</th>
              </tr>
            </thead>
            <tbody>{showFeedback()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default memo(FeedbackComponentAdmin);
