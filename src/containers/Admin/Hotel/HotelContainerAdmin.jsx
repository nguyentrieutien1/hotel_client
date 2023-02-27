import React, { useEffect, useRef, useState } from "react";
import HotelComponentdmin from "../../../components/Admin/Hotel/HotelComponentdmin";
import axios from "axios";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setHotelList } from "../../../features/hotel/hotel";
import { uploadFile } from "../../../helpers/uploadFile";
import {getCookie} from "./../../../helpers/cookie.helper"
export default function HotelContainerAdmin() {
  const alert = useAlert();
  const inputElement = useRef();
  const hotels = useSelector((state) => state.hotels);
  const dispatch = useDispatch();
  const [hotel, setHotel] = useState({
    hotel_name: "",
    hotel_email: "",
    hotel_address: "",
  });
  const [idUpdate, setIdUpdate] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    getAllHotel().then((hotels) => {
      dispatch(setHotelList(hotels));
    });
  }, []);
  const createOrUpdateSuccess = (message) => {
    alert.success(message);
    getAllHotel().then((hotels) => {
      dispatch(setHotelList(hotels));
    });
    setHotel({
      hotel_name: "",
      hotel_email: "",
      hotel_address: "",
    });
    setIsUpdate(false);
  };
  const createOrUpdateFail = (message) => {
    return alert.error(message);
  };
  const getAllHotel = async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_SITE}/hotels`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getCookie("access_token")}`,
        },
      }
    );
    return result.data;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleCreateHotel = async (e) => {
    try {
      e.preventDefault();
      if (!isUpdate) {
        const images = await uploadFile(inputElement.current.files);
        const hotelResult = await axios.post(
          `${import.meta.env.VITE_BACKEND_SITE}/hotels`,
          { ...hotel, images }
        );
        const { statusCode, message } = hotelResult.data;
        if (statusCode === 201) {
          return createOrUpdateSuccess(message);
        }
        return createOrUpdateFail(message);
      } else {
        const images = await uploadFile(inputElement.current.files);
        const resultUpdateHotel = await axios.patch(
          `${import.meta.env.VITE_BACKEND_SITE}/hotels/${idUpdate}`,
          { ...hotel, images }
        );
        const { message, statusCode } = resultUpdateHotel.data;
        if (statusCode === 202) {
          return createOrUpdateSuccess(message);
        }
        return createOrUpdateFail(message);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { message } = error.response.data;
        alert.error(message[0]);
      }
    }
  };
  const handleDeleteHotel = async (id) => {
    if (window.confirm("Are your sure delete hotel ?")) {
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_SITE}/hotels/${id}`
      );
      const { message, statusCode } = result.data;
      if (statusCode === 202) {
        getAllHotel().then((hotels) => {
          dispatch(setHotelList(hotels));
        });
        return alert.success(message);
      }
      return alert.error(message);
    }
  };
  const handleUpdateHotel = async (hotel) => {
    const { hotel_name, hotel_address, hotel_email, id } = hotel;
    setHotel({ hotel_name, hotel_address, hotel_email });
    setIdUpdate(id);
    setIsUpdate(true);
  };
  return (
    <div>
      <HotelComponentdmin
        inputElement={inputElement}
        handleChange={handleChange}
        handleCreateHotel={handleCreateHotel}
        hotels={hotels}
        hotel={hotel}
        handleDeleteHotel={handleDeleteHotel}
        handleUpdateHotel={handleUpdateHotel}
        isUpdate={isUpdate}
      />
    </div>
  );
}
