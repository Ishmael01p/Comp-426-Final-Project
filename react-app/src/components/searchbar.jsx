import { useState } from 'react';

const JobSearch = () => {
  const [customInput, setCustomInput] = useState('')
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
    const url = new URL('https://linkedin-data-api.p.rapidapi.com/search-jobs');
    const params = { ...filters, sort: 'mostRelevant', start: '0' };

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
      console.log(result.jobs.slice(0, 10)); // Debugging log for jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div style={{ marginTop: '2.75rem', display: 'flex' }}>
      <aside
        style={{
          width: '25%',
          padding: '0', // Remove padding
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
          {/* {Open Section Keyword} */}
          <div style={{ margin: '1rem 0' }}>
            <label htmlFor="customInput" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Keywords
            </label>
            <input
              id="customInput"
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type anything..."
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
              }}
            />
          </div>
          <div style={{ margin: '1rem 0' }}>
            <label htmlFor="customInput" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Location
            </label>
            <input
              id="customInput"
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type anything..."
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #ccc',
              }}
            />
          </div>

          {/* Dropdowns */}
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
                  margin: '0', // Remove space
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#fff',
                }}
              >
                {label} <span>&#9660;</span>
              </div>
              {dropdowns[key] && (
                <div style={{ border: '1px solid #ccc', margin: '0', padding: '0.5rem', background: '#f9f9f9' }}>
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

          <button
            type="submit"
            style={{
              width: '40%',
              padding: '.75rem',
              background: 'gray',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              margin: 10
            }}
          >
            Search
          </button>
        </form>
      </aside>

      <section style={{ width: '75%', padding: '1rem' }}>
        <h2>Job Results</h2>
        <div>Some of the locations you may be looking for are not some of the preset options.
          If you want to get a location that we do not provide go to the Linkedin Jobs tab and
          type in a location and press enter. In the url copy the number after the &quot;geoid&ldquo;
          and paste it into the location box found at the top of search Jobs</div>
        {/* Render job results here */}
      </section>
    </div>
  );
};

export default JobSearch;
