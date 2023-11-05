import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const NGOSignUp = () => {
  const [ngoData, setNgoData] = useState({
    ngoname: "",
    ngoemail: "",
    ngophone: "",
    ngopassword: "",
  });

  const navigate = useNavigate();

  const handleNgoSignUp = () => {
    const { ngoname, ngoemail, ngophone, ngopassword } = ngoData;

    fetch("http://localhost:5000/api/ngos/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ngoname, ngoemail, ngophone, ngopassword }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
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
        localStorage.setItem("ngoEmail", ngoData.ngoemail);
        // Handle successful login, e.g., redirect or display a success message
        console.log("Sign-in result: ", result);
        navigate("/ngo");
        // Handle the result, e.g., display a success message or handle errors
        console.log("Sign-up result: ", result);
        // Handle success, e.g., show a success message or redirect
      })
      .catch((error) => console.error("Sign-up error", error));
  };

  const handleNgoSignIn = () => {
    const { ngoemail, ngopassword } = ngoData;

    fetch("http://localhost:5000/api/ngos/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ngoemail, ngopassword }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Authentication successful") {
          console.log(result);
          // Handle successful sign-in, e.g., show a success message or redirect
        } else {
          console.error("Sign-in error: Authentication failed");
          // Handle sign-in failure, e.g., display an error message
        }
      })
      .catch((error) => console.error("Sign-in error", error));
  };

  return (
    <div id="body">
      <ToastContainer />
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="Your NGO Name"
                              id="ngoname"
                              value={ngoData.ngoname}
                              onChange={(e) =>
                                setNgoData({
                                  ...ngoData,
                                  ngoname: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              className="form-style"
                              placeholder="Your Email"
                              id="ngoemail"
                              value={ngoData.ngoemail}
                              onChange={(e) =>
                                setNgoData({
                                  ...ngoData,
                                  ngoemail: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="text"
                              className="form-style"
                              placeholder="Your PhoneNumber"
                              id="ngoemail"
                              value={ngoData.ngophone}
                              onChange={(e) =>
                                setNgoData({
                                  ...ngoData,
                                  ngophone: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              className="form-style"
                              placeholder="Your Password"
                              id="ngopass"
                              value={ngoData.ngopassword}
                              onChange={(e) =>
                                setNgoData({
                                  ...ngoData,
                                  ngopassword: e.target.value,
                                })
                              }
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button
                            className="btn mt-4"
                            onClick={handleNgoSignUp}
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

export default NGOSignUp;
