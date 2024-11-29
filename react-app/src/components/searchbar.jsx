import { useState } from 'react';
import JobPost from './job';

// const myAPI = import.meta.env.VITE_API_KEY

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState(''); // Separate state for keywords
  const [locationId, setLocationId] = useState(''); // Separate state for locationId
  const [dropdowns, setDropdowns] = useState({
    datePosted: false,
    salary: false,
    jobType: false,
    experienceLevel: false,
    onsiteRemote: false,
  });

  const [filters, setFilters] = useState({
    datePosted: 'anyTime',
    salary: '',
    jobType: '',
    experienceLevel: '',
    onsiteRemote: '',
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? '' : value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = new URL('https://linkedin-data-api.p.rapidapi.com/search-jobs');
    const params = { keywords, locationId, ...filters, sort: 'mostRelevant' };

    Object.keys(params).forEach((key) => {
      if (params[key]) url.searchParams.append(key, params[key]);
    });

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '8029f2bb09msha2b39da22aa0d64p1a9894jsn1f655c05d860', // Replace with your actual API key
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const jobsArray = result.data || []; // Extract jobs array from API response
      setJobs(jobsArray);
      console.log('API Request URL:', url.toString());
      console.log('API Request Options:', options);
      console.log(jobsArray);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '2.75rem', display: 'flex' }}>
      {/* Sidebar for filters */}
      <aside
        style={{
          width: '25%',
          padding: '0',
          background: '#f4f4f4',
          borderRight: '1px solid gray',
          position: 'sticky',
          top: '4rem',
          height: '100vh',
        }}
      >
        <form onSubmit={handleSearch}>
          <h3 style={{ margin: '0', padding: '1rem', background: 'gray', color: 'white' }}>
            Search Jobs
          </h3>
          {/* Keywords Input */}
          <div style={{ margin: '1rem 0', display: 'inline-block', width: '75%', textAlign: 'center' }}>
            <label htmlFor="keywordsInput" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Keyword
            </label>
            <input
              id="keywordsInput"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Enter keywords..."
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
              }}
            />
          </div>
          {/* locationId Input */}
          <div style={{ margin: '1rem 0', display: 'inline-block', width: '75%'}}>
            <label htmlFor="locationIdInput" style={{ display: 'block', marginBottom: '0.5rem' }}>
              locationId
            </label>
            <input
              id="locationIdInput"
              type="text"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              placeholder="Enter GEOId..."
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
              }}
            />
          </div>
          {/* Filters */}
          {[
            { key: 'datePosted', label: 'Date Posted', options: ['anyTime', 'pastMonth', 'pastWeek', 'past24Hours'] },
            { key: 'salary', label: 'Salary', options: ['40k+', '60k+', '80k+', '100k+', '120k+', '140k+', '160k+', '180k+', '200k+'] },
            { key: 'jobType', label: 'Job Type', options: ['fullTime', 'partTime', 'contract', 'internship'] },
            { key: 'experienceLevel', label: 'Experience Level', options: ['internship', 'entryLevel', 'associate', 'midSeniorLevel', 'director', 'executive'] },
            { key: 'onsiteRemote', label: 'Onsite/Remote', options: ['onSite', 'remote', 'hybrid'] },
          ].map(({ key, label, options }) => (
            <div key={key} style={{ borderBottom: '1px solid #ccc' }}>
              <div
                onClick={() => toggleDropdown(key)}
                style={{
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  padding: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#fff',
                }}
              >
                {label} <span>&#9660;</span>
              </div>
              {dropdowns[key] && (
                <div style={{ border: '1px solid #ccc', padding: '0.5rem', background: '#f9f9f9' }}>
                  {options.map((option) => (
                    <div key={option}>
                      <label>
                        <input
                          type="checkbox"
                          checked={filters[key] === option}
                          onChange={() => handleCheckboxChange(key, option)}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '40%',
              padding: '.75rem',
              background: 'gray',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              margin: 10,
            }}
          >
            Search
          </button>
        </form>
      </aside>

      {/* Main Content Area */}
      <section style={{ width: '75%', padding: '1rem' }}>
        <h2>Job Results</h2>
        <p>In order to search for a specific locations pull the GeoID from <a href={'https://www.linkedin.com/'}>Linkedin</a></p>
        {loading ? (
          <p>Loading...</p>
        ) : jobs.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive columns
              gap: '1rem', // Space between grid items
            }}
          >
            {jobs.map((job, index) => (
              <JobPost
                key={index}
                title={job.title || 'No Title'}
                company={job.company || { name: 'Unknown Company' }}
                location={job.location || 'location Not Specified'}
                url={job.url}
              />
            ))}
          </div>
        ) : (
          <p>No jobs found.</p>
        )}
      </section>

    </div>
  );
};

export default JobSearch;
