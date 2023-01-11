import React, { useEffect, useState } from "react";
import { account as getAccount } from "../../../../helpers/account.helper";
import styles from "./profile.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import AuthenComponent from "../../../../HOCs/AuthenComponent";
function ProfileComponent() {
  const [account, setAccount] = useState(null);
  const [recommend, setRecommend] = useState([]);
  const [recovery, setRecovery] = useState([]);
  const [recommendMain, setRecommendMain] = useState([]);
  const [value, setValue] = useState("restaurant");
  const [updateAccount, setUpdateAccount] = useState(null);
  const alert = useAlert();
  useEffect(() => {
    getAccount().then((account) => {
      setAccount(account);
      delete account.password;
      delete account.role;
      setUpdateAccount(account);
    });
    axios
      .get(`${import.meta.env.VITE_BACKEND_SITE}/recommend/all`)
      .then((res) => res.data)
      .then((recommends) => {
        console.log(recommends);
        const { recommend, recovery } = recommends;
        setRecommend(recommend);
        setRecovery(recovery);
        setRecommendMain(recommend);
      });
  }, []);
  const handleFilterRecommend = (e) => {
    const { value } = e.target;
    const list = recommendMain.filter((recommend) => recommend.type === value);
    setValue(value);
    setRecommend(list);
  };
  // PUSH 1
  console.log(recovery);
  const showRecommend = () => {
    if (recommend?.length === 0) {
      return (
        <h1 className="text-center">{`No Recommend for ${value.toUpperCase()} `}</h1>
      );
    }
    if (recommend?.length > 0) {
      const list = recommendMain.filter(
        (recommend) => recommend.type === value
      );
      const name = `${[value]}_name`;
      const description = `${[value]}_description`;
      return list.map((v) => {
        const images = `images${value}`;
        return (
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <div className={`card ${styles.card}`}>
              <div className="card-header">
                <Link
                  to={`/main/hotel/${v?.hotel?.id}/${value}/${v?.[value]?.id}`}
                >
                  <h5 className="card-title">{v[value]?.[name]}</h5>
                </Link>
              </div>
              <div className="card-body">
                <img src={v[images][0].image_url} alt="" />
                <p className={`card-text ${styles.restaurant_description}`}>
                  {v[value]?.[description]}
                </p>
              </div>
            </div>{" "}
            {/* </Tooltip> */}
          </div>
        );
      });
    }
  };
  const showRecovery = () => {
    const IsEmpty = recovery.every((recovery) => recovery.recoverys === null);
    if (IsEmpty) {
      return <h1 className="text-center">Body Recovery Is Empty</h1>;
    }
    return recovery.map((recovery) => {
      if (recovery.recoverys) {
        return (
          <div
            key={recovery?.id}
            className={`col-xs-3 col-sm-3 col-md-3 col-lg-3`}
          >
            <Link to={`/main/body-recovery/${recovery?.recoverys?.id}`}>
              <div className={`card ${styles.card} my-3`}>
                <img
                  className="card-img-top"
                  src={recovery?.image?.image_url}
                  alt="Card image cap"
                />
                <h2>{recovery?.recoverys?.body_recovery_name}</h2>
                <p
                  className={`card-text ${styles.text}`}
                  style={{ color: "black", float: "right" }}
                >
                  Some quick
                </p>
              </div>
            </Link>
          </div>
        );
      }
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateAccount((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleUpdate = async () => {
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_BACKEND_SITE}/accounts/${account?.id}`,
        updateAccount
      );
      const data = result.data;
      const { statusCode } = data;
      if (statusCode === 202) {
        return window.location.reload();
      } else {
      }
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        alert.error(message);
      }
    }
  };
  return (
    <div className={styles.profile_container}>
      <div
        className={`header d-flex justify-content-between align-items-center`}
      >
        <h1>Hello {account?.username}</h1>
        <p
          className={`${styles.edit_btn} `}
          data-toggle="modal"
          data-target="#exampleModal"
        >
          EDIT PROFILE
        </p>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  style={{ color: "black" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
                  Update Account
                </h5>
                <div data-dismiss="modal" aria-label="Close">
                  X
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={updateAccount?.username || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={updateAccount?.email || ""}
                    onChange={handleChange}
                  />
                </div>{" "}
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="address"
                    name="address"
                    value={updateAccount?.address || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <select
                    name="sex"
                    id="input"
                    className="form-control"
                    required="required"
                    value={updateAccount?.sex || "male"}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">FeMale</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    value={updateAccount?.password || ""}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Confirm Passowrd"
                    name="comfirmPassword"
                    onChange={handleChange}
                    value={updateAccount?.comfirmPassword || ""}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleUpdate}
                  type="button"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span>
        Here you can access your past assessment results and save favorites
      </span>

      <div className="row">
        <div className={styles.cons}>
          <div className="name">
            <h3>Body Constitution</h3>
          </div>
          <p
            data-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            VIEW RESULT
          </p>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
            <select
              id="input"
              className="form-control"
              required="required"
              onChange={handleFilterRecommend}
              value={value}
            >
              <option value="restaurant">Restaurant</option>
              <option value="spa">Spa</option>
              <option value="gym">Gym</option>
            </select>
          </div>
          <div className="recommend">
            <div className="row">{showRecommend()}</div>
          </div>
        </div>
        <div className={styles.cons}>
          <div className="name">
            <h3>Body Recovery And Guided Pratices</h3>
          </div>
          <p
            data-toggle="collapse"
            href="#ss"
            role="button"
            aria-expanded="false"
            aria-controls="ss"
          >
            VIEW RESULT
          </p>
        </div>
        <div className="collapse" id="ss">
          <div className="row">{showRecovery()}</div>
        </div>
      </div>
    </div>
  );
}
export default AuthenComponent(ProfileComponent);
