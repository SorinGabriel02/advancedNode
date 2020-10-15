import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../../actions";

function BlogShow({ fetchBlog, blog }) {
  const { _id } = useParams();

  useEffect(() => {
    fetchBlog(_id);
  }, [fetchBlog, _id]);

  return (
    <div>
      {!blog ? (
        <h1>Loading ...</h1>
      ) : (
        <React.Fragment>
          <h3>{blog?.title}</h3>
          <p>{blog?.content}</p>
        </React.Fragment>
      )}
    </div>
  );
}

function mapStateToProps({ blogs }) {
  return { blog: blogs };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
