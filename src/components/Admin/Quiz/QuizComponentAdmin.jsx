import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { exportFile } from "../../../helpers/exportFile";

export default function QuizComponentAdmin() {
  const [hotels, setHotels] = useState([]);
  const [quizs, setQuizs] = useState([]);
  const [mainQuiz, setMainQuiz] = useState([]);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    getQuizs().then((result) => {
      const { quizs, hotels } = result;
      setHotels(hotels);
      setMainQuiz(quizs);
      setQuizs(quizs);
    });
  }, []);
  const getQuizs = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_SITE}/quiz`
      );
      return result.data;
    } catch (error) {}
  };
  const showHotels = () => {
    if (hotels?.length > 0) {
      const result = hotels.reduce((prevState, currentState) => {
        const check = prevState.every(hotel => hotel?.hotels?.id != currentState?.hotels?.id)
        if(check) {
          prevState.push(currentState)
        }
        return [...prevState]
      }, [])
      return result.map((hotel) => {
        return (
          <option key={hotel?.id} value={hotel?.hotels?.id}>
            {hotel?.hotels?.hotel_name}
          </option>
        );
      });
    }
  };
  const showQuizs = () => {
    if (isShow) {
      if (quizs?.length > 0) {
        return quizs?.map((quiz) => {
          return (
            <tr key={quiz?.id}>
              <td>{quiz?.hotels?.hotel_name}</td>
              <td>{quiz?.hotels?.hotel_email}</td>
              <td>{quiz?.quiz[0]?.question}</td>
              <td>{quiz?.quiz[0]?.anwsers?.join(", ")}</td>
            </tr>
          );
        });
      }
    }
  };
  const handleChangeHotel = (e) => {
    setIsShow(true);
    const { value } = e.target;
    const quizsMap = mainQuiz.filter((quiz) => quiz?.hotels?.id == value);
    setQuizs(quizsMap);
  };
  const handleExport = () => {
    exportFile(document.querySelector(".quiz"), "quiz");
  };
  return (
    <div>
      <div className="row my-4">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <button
            onClick={handleExport}
            type="button"
            className="btn btn-danger"
          >
            EXPORT
          </button>
        </div>

        <div class="row my-4">
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <select
              id="input"
              className="form-control"
              required="required"
              onChange={handleChangeHotel}
            >
              <option>SELECT HOTEL TO SHOW QUIZ</option>
              {showHotels()}
            </select>
          </div>

          <div
            className="col-xs-9 col-sm-9 col-md-9 col-lg-9"
            style={{ height: "700px", overflowY: "scroll" }}
          >
            <table
              className="table table-hover"
              style={{ height: "700px", overflowY: "scroll" }}
            >
              <thead>
                <tr>
                  <th style={{ width: "300px" }}>Hotel Name</th>
                  <th>Hotel Email</th>
                  <th style={{ width: "300px" }}>Question</th>
                  <th>Answer</th>
                </tr>
              </thead>
              <tbody>{showQuizs()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
