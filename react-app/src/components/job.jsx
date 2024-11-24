import PropTypes from 'prop-types';

const JobPost = ({ title, company, location }) => {
  return (
    <div className="job-card" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <p>
        <strong>Company:</strong> {company.name} <br />
        <a href={company.url} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      </p>
      <p>{location}</p>
    </div>
  );
};

JobPost.propTypes = {
  title: PropTypes.string,
  company: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  location: PropTypes.string,
};

export default JobPost;
