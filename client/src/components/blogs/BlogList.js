import React, { useEffect } from "react";
import map from "lodash/map";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../actions";

function BlogList(props) {
  useEffect(() => {
    props.fetchBlogs();
  }, []);

  function renderBlogs() {
    return map(props.blogs, (blog) => {
      return (
        <div className="card darken-1 horizontal" key={blog._id}>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action">
              <Link to={`/blogs/${blog._id}`}>Read</Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return <div>{renderBlogs()}</div>;
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
