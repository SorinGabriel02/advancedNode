// BlogFormReview shows users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

function BlogFormReview(props) {
  function renderFields() {
    const { formValues } = props;

    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  function renderButtons() {
    const { onCancel } = props;

    return (
      <div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }

  function onSubmit(event) {
    event.preventDefault();

    const { submitBlog, history, formValues } = props;

    submitBlog(formValues, history);
  }

  return (
    <form onSubmit={onSubmit.bind(this)}>
      <h5>Please confirm your entries</h5>
      {renderFields()}

      {renderButtons()}
    </form>
  );
}

function mapStateToProps(state) {
  return { formValues: state.form.blogForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(BlogFormReview));
