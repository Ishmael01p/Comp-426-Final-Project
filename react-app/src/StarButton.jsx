import React from "react";
import { useNavigate } from "react-router-dom";

const StarButton = () => {
  const navigate = useNavigate();

  return (
    <div
      className="star-button"
      onClick={() => navigate("/saved-jobs")}
      title="Go to Saved Jobs"
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        width: "50px",
        height: "50px",
        background: "#ffc107",
        clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        zIndex: 999,
        transition: "transform 0.3s, background-color 0.3s",
      }}
    ></div>
  );
};

export default StarButton;
