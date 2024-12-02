import { useState } from 'react';
import Layout from './Layout'; 
import JobPost from './job'; 
// import { useNavigate } from 'react-router-dom'; 

const SavedJobsPage = () => {
  const [jobs, setJobs] = useState([]); // You'll have saved jobs here
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    datePosted: 'anyTime',
    salary: '',
    jobType: '',
    experienceLevel: '',
    onsiteRemote: '',
  });

  // Reuse the same filtering logic as in JobSearch
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Here you would implement the logic for getting saved jobs.
    // For rn, we simulate it by setting jobs manually or fetching them from localStorage
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || []; 
    setJobs(savedJobs); // Assuming saved jobs are stored in localStorage or similar

    setLoading(false);
  };

  return (
    <Layout>
      <div style={{ display: 'flex', marginTop: '2.75rem' }}>
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
              Search Saved Jobs
            </h3>
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
                <div style={{ border: '1px solid #ccc', padding: '0.5rem', background: '#f9f9f9' }}>
                  {options.map((option) => (
                    <div key={option}>
                      <label>
                        <input
                          type="checkbox"
                          checked={filters[key] === option}
                          onChange={() => {
                            setFilters((prev) => ({
                              ...prev,
                              [key]: prev[key] === option ? '' : option,
                            }));
                          }}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
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
          <h2>Saved Jobs</h2>
          {loading ? (
            <p>Loading...</p>
          ) : jobs.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
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
            <p>No saved jobs found.</p>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default SavedJobsPage;
