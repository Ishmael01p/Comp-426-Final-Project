import React, { useState, useEffect } from "react";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  return (
    <div className="saved-jobs">
      <h2>Saved Jobs</h2>
      {savedJobs.length > 0 ? (
        savedJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
          </div>
        ))
      ) : (
        <p>No saved jobs yet.</p>
      )}
    </div>
  );
};

export default SavedJobs;
