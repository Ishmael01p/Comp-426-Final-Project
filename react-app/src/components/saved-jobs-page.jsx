import { useState } from 'react';
import Layout from './Layout';
import JobPost from './job';

const SavedJobsPage = () => {
  const [jobs, setJobs] = useState([]); // Stores saved jobs
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // For handling errors

  const fetchSavedJobs = async () => {
    const username = localStorage.getItem('username'); // Check if the user is signed in

    if (!username) {
      setErrorMessage('You must be signed in to view saved jobs.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:8080/get-saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const message = await response.text();
        setErrorMessage(message);
        return;
      }

      const savedJobs = await response.json();
      const jobsWithSavedState = savedJobs.map((job) => ({
        ...job,
        isSaved: true, // Initially mark as saved
      }));
      setJobs(jobsWithSavedState); // Save jobs to state
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setErrorMessage('Failed to fetch saved jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', marginTop: '2.75rem', textAlign: 'center' }}>
        <section
          style={{
            width: '75%',
            padding: '1rem',
          }}
        >
          <h2>Saved Jobs</h2>
          {/* Button to Fetch Saved Jobs */}
          <button
            onClick={fetchSavedJobs}
            style={{
              padding: '0.5rem 1rem',
              margin: '1rem 0',
              cursor: 'pointer',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Load Saved Jobs
          </button>

          {/* Display Error Message */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {/* Loading Indicator */}
          {loading && <p>Loading...</p>}

          {/* Render Jobs List */}
          {!loading && jobs.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem',
              }}
            >
              {jobs.map((job) => (
                <JobPost
                  key={job._id}
                  title={job.title || 'No Title'}
                  company={job.company || { name: 'Unknown Company' }}
                  location={job.location || 'Location Not Specified'}
                  url={job.url}
                  isSaved={job.isSaved}
                  username={localStorage.getItem('username')}
                />
              ))}
            </div>
          )}

          {!loading && jobs.length === 0 && !errorMessage && <p>No saved jobs found.</p>}
        </section>
      </div>
    </Layout>
  );
};

export default SavedJobsPage;




