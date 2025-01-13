import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Redirect the user to the login page
    location.href = "/";
  };

  return (
    <div className="appContainer">
      <div className="appHeaderContainer">
        <header className="appHeader">
          <h2>tdog blog</h2>
          <div className="headerButtons">
            <button className="backButton">
              <Link to={"/dashboard"}>Back to Dashboard</Link>
            </button>
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
      </div>
      <main className="appMain">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
