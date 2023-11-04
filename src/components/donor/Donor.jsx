import React, { useState } from "react";
import "./donor.css";
import DonorSignUp from "../donorSignUp/DonorSignUp";
import { Link } from "react-router-dom";

const Donor = () => {
  const [popUp, setPopUp] = useState(false);

  return (
    <div>
      <nav id="nav">
        <div className="nav-logo">
          <div className="nav-heading">
            <Link to="/">
              <span
                style={{
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Hope Heaven
              </span>
            </Link>
          </div>

          <div className="hamburger">
            <a href="#">
              <i className="far fa-moon white "></i>
            </a>
            <a href="#">
              <i className="fas fa-bars "></i>
            </a>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <a>HOME</a>
          </li>
          <li>
            <a>ABOUT</a>
          </li>
        </ul>
      </nav>
      {/* <DonorSignUp /> */}
      {popUp ? (
        <div className="main_container">
          <div className="popup">
            <div class="container_popup">
              <div class="card">
                <div className="form">
                  <input type="text" placeholder="Username" />
                  <input type="password" placeholder="Password" />
                  <div class="buttons">
                    <button
                      class="register-button"
                      onClick={() => setPopUp(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" class="login-button">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <section className="container">
            <header>
              <div className="button-col">
                <button
                  className="btn"
                  name="Add Task"
                  onClick={() => setPopUp(true)}
                >
                  {" "}
                  Add Happiness{" "}
                </button>
              </div>
            </header>
            <h2 className="text">Already Added Items </h2>
            <ul className="task-items">
              <li className="item type1">
                <div className="task">
                  <div className="icon"> </div>
                  <div className="name" style={{ width: "150px" }}>
                    {" "}
                  </div>
                </div>

                <div className="dates">
                  <div className="bar"> </div>
                </div>

                <div className="priority">
                  <div className="bar"> </div>
                </div>

                <div className="user"></div>
              </li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Donor;
