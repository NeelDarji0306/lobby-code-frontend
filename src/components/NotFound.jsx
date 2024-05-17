import React from "react";
import "../NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="gradient-background-notfound" style={{ color: "#ee4e4e" }}>
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Page Not Found</p>
        <Link to="/" className="not-found-link">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
