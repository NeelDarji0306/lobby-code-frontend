import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import axios from "axios";
import { server } from "../constants/config";

const UpdateLobby = () => {
  const creatorName = localStorage.getItem("creator")
    ? JSON.parse(localStorage.getItem("creator")).name
    : "";
  const [updatedLobbyCode, setUpdatedLobbyCode] = useState("");
  const [updatedCreatedBy, setUpdatedCreatedBy] = useState(creatorName);
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to update lobby information
    const toastId = toast.loading("Updating lobby information...");
    setIsLoading(true);
    const config = {
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `${server}/api/v1/lobby/update`,
        {
          lobbyCode: updatedLobbyCode,
          createdBy: updatedCreatedBy,
          message: updatedMessage,
        },
        config
      );

      console.log(data.lobby);
      toast.success(data.message, {
        id: toastId,
      });
      localStorage.setItem(
        "creator",
        JSON.stringify({ name: updatedCreatedBy })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="gradient-background pt-2">
      <div className="container d-flex justify-content-center align-items-center min-vh-100 pb-2 ">
        <div
          className="card shadow p-4 mb-5"
          style={{ width: "600px", minWidth: "200px" }}
        >
          <h2 className="card-title text-primary mb-4">Create New Lobby</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="lobbyCode" className="form-label">
                Lobby Code *
              </label>
              <input
                type="text"
                className="form-control"
                id="lobbyCode"
                value={updatedLobbyCode}
                onChange={(e) => setUpdatedLobbyCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="createdBy" className="form-label">
                Created By *
              </label>
              <input
                type="text"
                className="form-control"
                id="createdBy"
                value={updatedCreatedBy}
                onChange={(e) => setUpdatedCreatedBy(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="3"
                value={updatedMessage}
                onChange={(e) => setUpdatedMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <Link to="/" className="btn btn-outline-secondary mt-3">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateLobby;
