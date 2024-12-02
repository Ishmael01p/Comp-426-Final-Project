// import React from "react"; 
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        {/* Make Job Board clickable and route to /home */}
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
            // textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Saved Jobs
        </span>
      </nav>
      <div>{children}</div>
    </>
  );
};

export default Layout;