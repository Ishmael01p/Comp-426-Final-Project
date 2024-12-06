// import React from "react"; 
import { useNavigate } from "react-router-dom";
import "../styles/app.css";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const username = localStorage.getItem('username');

    if (username) {
      localStorage.setItem('username', '');
      console.log('Logged out');
    } else {
      console.log('Navigating to Register/Sign-In');
    }

    navigate('/');
  };

  const username = localStorage.getItem('username');

  return (
    <>
      <nav className="navbar">
        <h3
          onClick={() => navigate('/home')}
          style={{
            marginRight: "40px",
            cursor: "pointer",
          }}
        >
          Job Board
        </h3>
        <h3
          className="navbar-link"
          onClick={() => navigate('/saved-jobs')}
          style={{
            cursor: "pointer",
          }}
        >
          Saved Jobs
        </ h3>
         <h3
          className="navbar-link"
          onClick={handleButtonClick}
          style={{
            marginLeft: "40px",
            cursor: 'pointer',
          }}
        >
          {username === 'no-user' ? 'Register/Sign In': 'Log Out' }
        </h3>


      </nav>
      <div className="content">{children}</div>
    </>
  );
};

export default Layout;

