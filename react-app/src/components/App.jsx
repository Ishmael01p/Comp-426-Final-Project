import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "./SearchResults";
import SavedJobs from "./SavedJobs";
import StarButton from "./StarButton";

const App = () => {
  const jobs = [
    { id: 1, title: "Software Engineer", company: "Tech Corp" },
    { id: 2, title: "Data Scientist", company: "Data Inc." },
    // Add more jobs here
  ];

  return (
    <Router>
      <StarButton />
      <Routes>
        <Route path="/" element={<SearchResults jobs={jobs} />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
      </Routes>
    </Router>
  );
};

export default App;
