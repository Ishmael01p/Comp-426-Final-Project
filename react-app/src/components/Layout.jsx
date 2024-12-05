import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <h3 
          onClick={() => navigate('/home')}
          style={{
            marginRight: "40px",
            cursor: "pointer",
          }}
        >
          Job Board
        </h3>
        <span
          className="navbar-link"
          onClick={() => navigate('/saved-jobs')}
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Saved Jobs
        </span>
      </nav>
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;

