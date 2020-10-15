import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../../actions";

function BlogList({ fetchBlogs, blogs }) {
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const blogList = () =>
    blogs.map((blog) => {
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

  if (!blogs.length) return <h1>Loading...</h1>;

  return <div>{blogList()}</div>;
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
