import React from "react";
import JobCard from "./JobCard";

const SearchResults = ({ jobs }) => {
  return (
    <div
      className="search-results"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Adjust grid for responsiveness
        gap: "1rem",
        padding: "1rem",
        background: "#350048", // Matches the rest of the page
      }}
    >
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p>No jobs found. Try adjusting your search.</p>
      )}
    </div>
  );
};

export default SearchResults;
