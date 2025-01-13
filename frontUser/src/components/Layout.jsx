import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="appContainer">
      <div className="appHeaderContainer">
        <header className="appHeader">
          <Link to={"/dashboard"}>
            <h2>tdog blog</h2>
          </Link>
          <div className="headerButtons">
            <button className="backButton">
              <Link to={"/dashboard"}>Back to Dashboard</Link>
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
