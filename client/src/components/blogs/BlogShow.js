import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBlog } from "../../actions";

function BlogShow({ fetchBlog, match, blog }) {
  useEffect(() => {
    fetchBlog(match.params._id);
  }, [fetchBlog, match.params._id]);

  if (!blog) {
    return "";
  }

  const { title, content } = blog;

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
