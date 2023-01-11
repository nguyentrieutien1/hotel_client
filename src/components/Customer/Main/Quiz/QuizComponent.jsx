import React from "react";
import { useEffect } from "react";
import styles from "./quiz.module.css";
import { allQuestion } from "./../../../../data/quiz";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuizList } from "../../../../features/quiz/quiz";
import { getCookie, setCookie } from "../../../../helpers/cookie.helper";
import axios from "axios";
export default function QuizComponent() {
  const [anwser, setAnwser] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    $(".carousel").carousel({
      interval: false,
      wrap: false,
    });
  }, []);
  const handleChange = (e) => {
    setAnwser((prevState) => [...prevState, e.target.value]);
  };
  const handleSubmitSecond = (question) => {
    list.push({ question, anwsers: anwser });
    setAnwser([]);
  };
  const handleSubmitQuiz = async (e) => {
    try {
      e.preventDefault();
      dispatch(setQuizList(list));
      setCookie("isAnswer", true);
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_SITE}/quiz`,
        { quiz: list, hotel: getCookie("hotelId") }
      );
      const { statusCode } = result.data;
      if (statusCode === 201) {
        return navigate(`/main/hotel/${getCookie("hotelId")}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showQuiz = () => {
    return allQuestion.map((quiz, index) => {
      return (
        <div
          key={index}
          className={`carousel-item ${index === 0 ? "active" : ""} ${
            styles.item
          }`}
        >
          <h2 style={{ color: "#a56c50" }}>{quiz.question}</h2>
          <div className={styles.asw}>
            {quiz.answer.map((ans) => {
              return (
                <div className={`checkbox  ${styles.checkbox}`}>
                  <label>
                    <input
                      type="checkbox"
                      value={ans.data}
                      onChange={handleChange}
                    />
                    <div className={styles.check}>{ans.data}</div>
                  </label>
                </div>
              );
            })}
          </div>
          {index !== allQuestion?.length - 1 && (
            <div className={styles.btn_group}>
              <button
                className={`carousel-control-next ${styles.next_icon}`}
                type="button"
                data-target="#carouselExampleControls"
                data-slide="next"
                onClick={() => handleSubmitSecond(quiz.question)}
              >
                <span className={`${styles.next_icon}`}>Next</span>
                <span
                  style={{ color: "black" }}
                  className={` ${styles.next_icon}`}
                ></span>
              </button>
            </div>
          )}

          {index === allQuestion?.length - 1 && (
            <button
              onClick={handleSubmitQuiz}
              type="button"
              className={`btn btn-default ${styles.btn_submit}`}
            >
              submit
            </button>
          )}
        </div>
      );
    });
  };
  return (
    <div className={`${styles.carouselExampleControls}`}>
      <div
        id="carouselExampleControls"
        className="carousel slide carousel-custom"
        data-bs-ride="carousel"
        data-bs-interval="100"
      >
        <div className={`carousel-inner ${styles.carousel_inner}`}>
          {showQuiz()}
        </div>
      </div>
    </div>
  );
}
