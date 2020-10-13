// BlogNew shows BlogForm and BlogFormReview
import React, { useState } from "react";
import { reduxForm } from "redux-form";
import BlogForm from "./BlogForm";
import BlogFormReview from "./BlogFormReview";

function BlogNew() {
  const [showFormReview, setShowFormReview] = useState(false);

  function renderContent() {
    if (showFormReview) {
      return <BlogFormReview onCancel={() => setShowFormReview(false)} />;
    }

    return <BlogForm onBlogSubmit={() => setShowFormReview(true)} />;
  }

  return <div>{renderContent()}</div>;
}

export default reduxForm({
  form: "blogForm",
})(BlogNew);
