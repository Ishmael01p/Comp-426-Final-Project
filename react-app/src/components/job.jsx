import PropTypes from 'prop-types';

const JobPost = ({ title, company, location, url }) => {
  return (
    <div className="job-card" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <img
        src={company.logo || 'https://via.placeholder.com/50'} // Fallback logo
        alt={`${company.name || 'Company'} Logo`}
        style={{ width: '50px', height: '50px' }}
      />
      <p>
        <strong>Company:</strong> {company.name} <br />
        <a href={company.url} target="_blank" rel="noopener noreferrer">
          Visit Company Linkedin
        </a>
      </p>
      <p><a href={url} target="_blank" rel="noopener noreferrer">
        Linkedin Job Post
      </a></p>
      <p>{location}</p>
    </div>
  );
};

JobPost.propTypes = {
  title: PropTypes.string,
  company: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    logo: PropTypes.string
  }).isRequired,
  url: PropTypes.string,
  location: PropTypes.string,
};

export default JobPost;
