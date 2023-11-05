import React, { useState } from "react";
import "./donor_signup.css";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const DonorSignUp = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    useremail: "",
    password: "",
  });

  const [userData, setUserData] = useState({
    username: "",
    userphone: "",
    useremail: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleUsernameChange = (e) => {
    setUserData({
      ...userData,
      username: e.target.value,
    });
  };

  const handleUserphoneChange = (e) => {
    setUserData({
      ...userData,
      userphone: e.target.value,
    });
  };

  const handleUseremailChange = (e) => {
    setUserData({
      ...userData,
      useremail: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setUserData({
      ...userData,
      password: e.target.value,
    });
  };

  // User Sign-Up
  const signUp = (userData) => {
    if (!userData.useremail) {
      toast.error("Enter Data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch("http://localhost:5000/api/users/signup", requestOptions) // Adjust the URL
      .then((response) => response.json())
      .then((result) => {
        toast.success("Authentication successful 😀", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Store userEmail in localStorage after successful login
        localStorage.setItem("userEmail", userData.useremail);
        // Handle successful login, e.g., redirect or display a success message
        console.log("Sign-in result: ", result);
        navigate("/donor");
        // Handle the result, e.g., display a success message or handle errors
        console.log("Sign-up result: ", result);
      })
      .catch((error) => console.error("Sign-up error", error));
  };

  // User Sign-In
  const signIn = (loginData) => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };

    fetch("http://localhost:5000/api/users/signin", requestOptions) // Adjust the URL
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Authentication successful") {
          toast.success("Authentication successful 😀", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // Store userEmail in localStorage after successful login
          localStorage.setItem("userEmail", loginData.useremail);
          // Handle successful login, e.g., redirect or display a success message
          console.log("Sign-in result: ", result);
          navigate("/donor");
        } else {
          // Handle login errors, e.g., display an error message
          console.error("Sign-in error: ", result.message);
        }
      })
      .catch((error) => console.error("Sign-in error", error));
  };

  return (
    <div id="body">
      <ToastContainer />
      <nav id="nav">
        <div class="nav-logo">
          <div class="nav-heading">
            <Link to="/">
              <span
                href="#"
                style={{
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                Hope Haven
              </span>
            </Link>
          </div>

          <div class="hamburger">
            <a href="#">
              <i class="far fa-moon white "></i>
            </a>
            <a href="#">
              <i class="fas fa-bars "></i>
            </a>
          </div>
        </div>

        <ul class="nav-links">
          <li>
            <a>HOME</a>
          </li>
          <li>
            <a>ABOUT</a>
          </li>
          <span>
            <i class="far fa-moon white night"></i>
          </span>
        </ul>
      </nav>
      <div class="section">
        <div class="container">
          <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
              <div class="section pb-5 pt-5 pt-sm-2 text-center">
                <input
                  class="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label for="reg-log"></label>
                <div class="card-3d-wrap mx-auto">
                  <div class="card-3d-wrapper">
                    <div class="card-front">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="mb-4 pb-3">Log In</h4>
                          <div class="form-group">
                            <input
                              type="email"
                              name="logemail"
                              class="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autocomplete="off"
                              value={loginData.useremail}
                              onChange={handleLoginChange}
                            />
                            <i class="input-icon uil uil-at"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              class="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autocomplete="off"
                              value={loginData.password}
                              onChange={handleLoginChange}
                            />
                            <i class="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            class="btn mt-4"
                            onClick={() => signIn(loginData)}
                          >
                            SignIn
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="card-back">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="mb-4 pb-3">Sign Up</h4>
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-style"
                              placeholder="Your Full Name"
                              id="logname"
                              autoComplete="off"
                              value={userData.username}
                              onChange={handleUsernameChange}
                            />
                            <i class="input-icon uil uil-user"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input
                              type="text"
                              class="form-style"
                              placeholder="Your Phone Number"
                              id="logphone"
                              autoComplete="off"
                              value={userData.userphone}
                              onChange={handleUserphoneChange}
                            />
                            <i class="input-icon uil uil-at"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input
                              type="email"
                              class="form-style"
                              placeholder="Your Email"
                              id="logemail"
                              autoComplete="off"
                              value={userData.useremail}
                              onChange={handleUseremailChange}
                            />
                            <i class="input-icon uil uil-at"></i>
                          </div>
                          <div class="form-group mt-2">
                            <input
                              type="password"
                              class="form-style"
                              placeholder="Your Password"
                              id="logpass"
                              autoComplete="off"
                              value={userData.password}
                              onChange={handlePasswordChange}
                            />
                            <i class="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            class="btn mt-4"
                            onClick={() => signUp(userData)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorSignUp;
