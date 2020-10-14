import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Header(props) {
  function renderContent() {
    switch (props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href={"/auth/google"}>Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="3" style={{ margin: "0 10px" }}>
            <Link to="/blogs">My Blogs</Link>
          </li>,
          <li key="2">
            <a href={"/auth/logout"}>Logout</a>
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

export default connect(mapStateToProps)(Header);
