import React, { useState } from "react";

const JobCard = ({ job }) => {
  const [saved, setSaved] = useState(false);

  const saveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (!savedJobs.find((j) => j.id === job.id)) {
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setSaved(true);
    }
  };

  return (
    <div className="job-card" style={{ position: "relative" }}>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <div
        className={`star-button ${saved ? "saved" : ""}`}
        onClick={saveJob}
        title={saved ? "Job Saved" : "Save Job"}
        style={{
          width: "30px",
          height: "30px",
          position: "absolute",
          top: "10px",
          right: "10px",
          background: saved ? "#28a745" : "#ffc107", // Green if saved, yellow otherwise
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
          transition: "transform 0.3s, background-color 0.3s",
        }}
      ></div>
    </div>
  );
};

export default JobCard;
