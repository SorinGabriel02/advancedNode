import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { googleLogin, logout } from "../actions";

function Header(props) {
  function handleClick() {
    props.googleLogin();
  }

  function handleLogout() {
    props.logout();
  }

  function renderContent() {
    switch (props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <button className="login-btn" onClick={handleClick}>
              Login With Google
            </button>
          </li>
        );
      default:
        return [
          <li key="3" style={{ margin: "0 10px" }}>
            <Link to="/blogs">My Blogs</Link>
          </li>,
          <li key="2">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>,
        ];
    }
  }

  return (
    <nav className="indigo">
      <div className="nav-wrapper">
        <Link
          to={props.auth ? "/blogs" : "/"}
          className="left brand-logo"
          style={{ marginLeft: "10px" }}
        >
          Blogster
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { googleLogin, logout })(Header);
