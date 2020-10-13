import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBlog } from "../../actions";

function BlogShow(props) {
  useEffect(() => {
    props.fetchBlog(props.match.params._id);
  }, []);

  if (!props.blog) {
    return "";
  }

  const { title, content } = props.blog;

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
