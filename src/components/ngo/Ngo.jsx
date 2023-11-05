import React, { useEffect, useState } from "react";
import "./ngo.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Ngo = () => {
  const [popUp, setPopUp] = useState(false);
  const [item, setItem] = useState("");
  const [excessItem, setExcessItem] = useState([]);
  const [ngoEmail, setNgoEmail] = useState("");
  const [userEmail, setuserEmail] = useState("");
  useEffect(() => {
    // Get the item from localStorage
    const itemFromLocalStorage = localStorage.getItem("ngoEmail");
    const uEmail = localStorage.getItem("userEmail");
    // Check if the item is not null (i.e., it exists in localStorage)
    if (itemFromLocalStorage !== null) {
      setNgoEmail(itemFromLocalStorage);
      setuserEmail(uEmail);
    }
  }, []);

  const [uId, setuId] = useState();
  const [userDetails, setUserDetails] = useState();
  const [flag, setFlag] = useState();
  const getItemFromExcessTable = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/excess-items", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setExcessItem(result.filter((e, i) => e.itemname === item));
        result.filter((e, i) => {
          if (e.itemname === item) {
            setFlag(1);
          } else {
            setFlag(0);
          }
        });
        setuId(excessItem.userid);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (excessItem.length !== 0) {
      getUser();
      setPopUp(false);
      toast.success("Yaay, We found a match!", {
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
    } else if (flag === 0) {
      addItem(item);
      setExcessItem([]);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        itemname: item,
        ngoemail: ngoEmail,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://localhost:5000/api/ngo-items", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setPopUp(false);
          if (result) {
            toast.success("Happiness Added Successfully 😀", {
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
        })
        .catch((error) => console.log("error", error));
    } else {
      console.log("no");
    }
  }, [flag]);

  const addItem = (itemName) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
    };

    fetch("http://localhost:5000/api/items", requestOptions) // Adjust the URL
      .then((response) => response.json())
      .then((result) => {
        // Handle the result, e.g., display a success message or handle errors
        console.log("Item added successfully: ", result);
      })
      .catch((error) => {
        console.error("Item addition error", error);
      });
  };
  const [itemArray, setItemArray] = useState([]);
  const getItems = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/ngo-items", requestOptions)
      .then((response) => response.json())
      .then((result) => setItemArray(result.reverse().map((e, i) => e)))
      .catch((error) => console.log("error", error));
  };

  const [ngoDetails, setNgoDetails] = useState();
  const getNgo = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/ngos/${ngoEmail}`, requestOptions) // Replace 'ngoemail' with the actual NGO's email
      .then((response) => response.json())
      .then((result) => setNgoDetails(result))
      .catch((error) => console.log("error", error));
  };

  const getUser = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://localhost:5000/api/users/${userEmail}`, requestOptions) // Replace 'useremail' with the actual user's email
      .then((response) => response.json())
      .then((result) => setUserDetails(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getNgo();
    getItems();
  }, [getNgo]);

  return (
    <>
      <div>
        <ToastContainer />
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
                  Hope Haven
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
            <Link to="/">
              <li>
                <a>LOGOUT</a>
              </li>
            </Link>
          </ul>
        </nav>
        {/* <DonorSignUp /> */}
        {popUp ? (
          <div className="main_container">
            <div className="popup">
              <div class="container_popup">
                <div class="card">
                  <div className="form">
                    <input
                      type="text"
                      placeholder="Enter what is your need..."
                      onChange={(e) => {
                        setItem(e.target.value);
                      }}
                    />
                    <div class="buttons">
                      <button
                        class="register-button"
                        onClick={() => setPopUp(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="login-button"
                        onClick={getItemFromExcessTable}
                      >
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
                    Hoping Happiness{" "}
                  </button>
                </div>
              </header>
              {excessItem.length !== 0 && userDetails ? (
                <>
                  <h2 className="text">You Found the match</h2>
                  <ul className="task-items">
                    {excessItem.map((e, i) => {
                      const newDate = new Date(e.date);
                      let year = newDate.getFullYear();
                      let day = newDate.getDate();
                      let month = newDate.getMonth();

                      let finalDate = `${day}/${month}/${year}`;

                      return (
                        <li className="item type1">
                          <div className="task">
                            <div className="icon"> </div>
                            <div className="name" style={{ width: "150px" }}>
                              {e?.itemname}
                            </div>
                          </div>

                          {/* <div className="dates">
                            <div className="bar"> {e?.username}</div>
                          </div>

                          <div className="dates">
                            <div className="bar"> {e?.userphone}</div>
                          </div> */}
                          <div className="dates">
                            <div> {e?.useremail}</div>
                          </div>

                          <div className="user"></div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <>
                  <h2 className="text">Already Added Hopes By NGOs :)</h2>
                  <ul className="task-items">
                    {itemArray.map((e, i) => {
                      console.log(itemArray);
                      const newDate = new Date(e.date);
                      let year = newDate.getFullYear();
                      let day = newDate.getDate();
                      let month = newDate.getMonth();

                      let finalDate = `${day}/${month}/${year}`;

                      return (
                        <li className="item type1">
                          <div className="task">
                            <div className="icon"> </div>
                            <div className="name" style={{ width: "150px" }}>
                              {e?.itemname}
                            </div>
                          </div>

                          <div className="dates">
                            <div className="bar"> {finalDate}</div>
                          </div>

                          <div className="priority">
                            <div className="bar"> {e?.ngoemail} </div>
                          </div>

                          <div className="user"></div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default Ngo;
