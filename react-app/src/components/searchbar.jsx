import { useState } from 'react';

const JobSearch = () => {
  const [datePosted, setDatePosted] = useState('anyTime');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [onsiteRemote, setOnsiteRemote] = useState('');
  const [start, setStart] = useState('0'); // Default start index for pagination
  const [jobs, setJobs] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const url = new URL('https://linkedin-data-api.p.rapidapi.com/search-jobs');
    const params = {
      datePosted,
      salary,
      jobType,
      experienceLevel,
      onsiteRemote,
      start,
      sort: 'mostRelevant', // Static sorting to "mostRelevant"
    };

    // Append parameters to the URL
    Object.keys(params).forEach((key) => {
      if (params[key]) url.searchParams.append(key, params[key]);
    });

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '5fb873a6bdmsh5ee11973e246e9ep113992jsncc19fc0e3a08',
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setJobs(result.jobs.slice(0, 10)); // Limit to 10 jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div style={{ marginTop: '2.75rem', display: 'flex' }}>
      {/* Sidebar for Search Parameters */}
      <aside
        style={{
          width: '25%',
          padding: '1rem',
          background: '#f4f4f4',
          borderRight: '1px solid darkgray', // Black line between search and results
          position: 'sticky',
          top: '4rem', // Adjust to match navbar height
          height: '100vh',
        }}
      >
        <form onSubmit={handleSearch}>
          <h3>Search Jobs</h3>
          <label>
            Date Posted:
            <select value={datePosted} onChange={(e) => setDatePosted(e.target.value)}>
              <option value="anyTime">Any Time</option>
              <option value="pastMonth">Past Month</option>
              <option value="pastWeek">Past Week</option>
              <option value="past24Hours">Past 24 Hours</option>
            </select>
          </label>
          <br />
          <label>
            Salary:
            <select value={salary} onChange={(e) => setSalary(e.target.value)}>
              <option value="">All Salaries</option>
              <option value="40k+">40k+</option>
              <option value="60k+">60k+</option>
              <option value="80k+">80k+</option>
              <option value="100k+">100k+</option>
              <option value="120k+">120k+</option>
              <option value="140k+">140k+</option>
              <option value="160k+">160k+</option>
              <option value="180k+">180k+</option>
              <option value="200k+">200k+</option>
            </select>
          </label>
          <br />
          <label>
            Job Type:
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">All Job Types</option>
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </label>
          <br />
          <label>
            Experience Level:
            <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
              <option value="">All Levels</option>
              <option value="internship">Internship</option>
              <option value="entryLevel">Entry Level</option>
              <option value="associate">Associate</option>
              <option value="midSeniorLevel">Mid-Senior Level</option>
              <option value="director">Director</option>
              <option value="executive">Executive</option>
            </select>
          </label>
          <br />
          <label>
            Onsite/Remote:
            <select value={onsiteRemote} onChange={(e) => setOnsiteRemote(e.target.value)}>
              <option value="">All</option>
              <option value="onSite">Onsite</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </label>
          <br />
          <label>
            Start:
            <select value={start} onChange={(e) => setStart(e.target.value)}>
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </label>
          <br />
          <button type="submit">Search</button>
        </form>
      </aside>

      {/* Job Results Section */}
      <section style={{ width: '75%', padding: '1rem' }}>
        <h2>Job Results</h2>
        {jobs.length === 0 ? (
          <p>No jobs found. Try adjusting your search criteria.</p>
        ) : (
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>{job.title}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default JobSearch;
