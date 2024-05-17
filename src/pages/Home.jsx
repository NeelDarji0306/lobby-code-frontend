import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { FaPlus } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import moment from "moment";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

import { server } from "../constants/config";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const [adminMessage, setAdminMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lobbyInfo, setLobbyInfo] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    // Add logic to fetch lobby information from database
    setIsLoading(true);
    axios
      .get(`${server}/api/v1/lobby/`)
      .then((res) => {
        setLobbyInfo(res.data?.lobby);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAdminMessageChange = (e) => {
    setAdminMessage(e.target.value);
  };

  const handleSubmitAdminMessage = async (e) => {
    e.preventDefault();
    setDisableBtn(true);
    try {
      await addDoc(collection(db, "messages"), {
        message: adminMessage,
        sender: localStorage.getItem("creator")
          ? JSON.parse(localStorage.getItem("creator")).name
          : "",
        createdAt: new Date(),
      });
      toast.success("Message sent successfully");
      setAdminMessage("");
      setDisableBtn(false);
    } catch (error) {
      toast.error("Error");
      console.log(error);
      setAdminMessage("");
      setDisableBtn(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div style={{ minHeight: "100vh" }} className="gradient-background pt-5">
      <div className="msgFromNeel"></div>
      <div className="d-flex justify-content-center align-items-center vh-90">
        <div className="card shadow-lg p-3 mb-5 rounded text-center">
          <div className="card-body">
            <h5 className="card-title text-primary mb-3">Lobby Code</h5>
            <p className="card-text display-4 text-secondary">
              {lobbyInfo?.lobbyCode}
            </p>
            <hr />
            <h6 className="card-subtitle mb-2 text-muted">Created By</h6>
            <p className="card-text font-weight-bold">{lobbyInfo?.createdBy}</p>
            <hr />
            <h6 className="card-subtitle mb-2 text-muted">Creation Time</h6>
            <p className="card-text font-weight-bold">
              {moment(lobbyInfo?.updatedAt).fromNow()}
            </p>
            <hr />
            <h6 className="card-subtitle mb-2 text-muted">Message</h6>
            <p className="card-text font-italic">
              {lobbyInfo?.message
                ? lobbyInfo?.message
                : `No message given by ${lobbyInfo?.createdBy}`}
            </p>
            <Link
              to="/update"
              className="btn btn-outline-primary mt-3 d-flex justify-content-center align-items-center gap-2"
            >
              <FaPlus />
              Create New Lobby
            </Link>
          </div>
        </div>
      </div>

      <form
        className="mt-2 pb-2 msgToNeel"
        onSubmit={handleSubmitAdminMessage}
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            color: "black",
            fontWeight: "500",
            fontSize: "12px",
            padding: "5px",
          }}
        >
          Want to say something to Admin (Neel Darji)?
        </div>
        <div className="input-group pb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Message to Admin"
            value={adminMessage}
            onChange={handleAdminMessageChange}
            style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={disableBtn}
            style={
              disableBtn
                ? {
                    backgroundColor: "rgb(237,237,237",
                    cursor: "not-allowed",
                  }
                : {}
            }
          >
            <IoIosSend size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
