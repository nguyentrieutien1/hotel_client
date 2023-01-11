import axios from "axios";
import React, { memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { exportFile } from "../../../helpers/exportFile";
function OrderComponent() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [type, setType] = useState("restaurant");
  const [id, setId] = useState(null);
  useEffect(() => {
    getOrder().then((orders) => {
      console.log(orders);
      setData(orders);
    });
  }, []);
  const getOrder = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_SITE}/order`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeId = (e) => {
    const { value } = e.target;
    setId(value);
  };
  const handleChangeType = (e) => {
    const { value } = e.target;
    if (value) {
      setType(value);
      setResult(data?.[value]);
    } else {
      setResult([]);
    }
  };
  const showHotel = () => {
    if (data?.hotels?.length) {
      console.log(data);
      return data?.hotels?.map((hotel) => {
        return (
          <option
            key={hotel.id}
            value={hotel?.hotels?.id}
          >{`${hotel?.hotels?.id} . ${hotel?.hotels?.hotel_name}`}</option>
        );
      });
    }
  };
  const showResult = () => {
    console.log(result);
    if (result?.length) {
      return result.map((r) => {
        if (r?.hotel?.id == id) {
          return (
            <tr key={r.id}>
              <td>{r?.[type]?.[`${type}_name`]}</td>
              <td>{r?.account?.username}</td>
              <td>{r?.account?.email}</td>
              <td>{r?.account?.phone_number}</td>
              <td>{r?.time}</td>
            </tr>
          );
        }
      });
    }
  };
  const dowloadPdf = () => {
    const input = document.getElementById("table");
    exportFile(input, `${type}`);
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
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <select
            id="input"
            className="form-control"
            required="required"
            onChange={handleChangeId}
          >
            <option value="">SELECT HOTEL</option>
            {showHotel()}
          </select>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
          <select
            id="input"
            className="form-control"
            required="required"
            onChange={handleChangeType}
          >
            <option value="">SELECT TYPE</option>
            <option value="restaurant">Restaurant</option>
            <option value="spa">Spa</option>
            <option value="gym">Gym</option>
          </select>
        </div>
        <div
          className="col-xs-8 col-sm-8 col-md-8 col-lg-8"
          style={{ height: "700px", overflowY: "scroll" }}
        >
          <table className="table table-hover" id="table">
            <thead>
              <tr>
                <th>{type?.toUpperCase()}</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>PHONE NUMBER</th>
                <th>TIME</th>
              </tr>
            </thead>
            <tbody>{showResult()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default memo(OrderComponent);
