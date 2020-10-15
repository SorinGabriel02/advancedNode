import { FETCH_BLOGS, FETCH_BLOG } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_BLOG:
      return { ...action.payload };
    case FETCH_BLOGS:
      return [...action.payload];
    default:
      return state;
  }
}
