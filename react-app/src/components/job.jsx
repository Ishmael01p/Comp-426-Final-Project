import PropTypes from 'prop-types';
import { useState } from 'react';
import '../styles/job-post.css'

const JobPost = ({ title, company, location, url, username }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


  const toggleSaveJob = async () => {
    const job = { title, company, location, url };

    try {
      const response = await fetch(
        `http://localhost:8080/${isSaved ? 'unsave-job' : 'save-job'}`,
        {
          method: isSaved ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, job }),
        }
      );

      if (response.ok) {
        setIsSaved(!isSaved); // Toggle the saved state
        setErrorMessage(null);
        console.log(
          isSaved ? 'Job unsaved successfully' : 'Job saved successfully'
        );
      } else {
        console.error('Error:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while saving the job.');
    }
  };



return (
  <div
    className="job-card"
    style={{
      position: 'relative',
      border: '1px solid #ccc',
      padding: '1rem',
      marginBottom: '1rem',
    }}
  >
    <h3>{title}</h3>
    <img
      src={company.logo || 'https://via.placeholder.com/50'}
      alt={`${company.name || 'Company'} Logo`}
      style={{ width: '50px', height: '50px' }}
    />
    <p>
      <strong>Company:</strong> {company.name} <br />
      <a href={company.url} target="_blank" rel="noopener noreferrer">
        Visit Company LinkedIn
      </a>
    </p>
    <p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        LinkedIn Job Post
      </a>
    </p>
    <p>{location}</p>

    {/* Star Button */}
    <div
      className={`star-button ${isSaved ? 'saved' : ''}`}
      onClick={toggleSaveJob}
    ></div>
    {errorMessage && (
        <p style={{ color: 'red', position: 'absolute', top: '10px', right: '10px' }}>
          {errorMessage}
        </p>
      )}
  </div>
);
}

export default JobPost;

JobPost.propTypes = {
  title: PropTypes.string,
  company: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
  url: PropTypes.string,
  location: PropTypes.string,
  username: PropTypes.string
};
