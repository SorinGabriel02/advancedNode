import axios from "axios";
import {
  FETCH_USER,
  FETCH_BLOGS,
  FETCH_BLOG,
  GOOGLE_LOGIN,
  LOGOUT,
} from "./types";

export const logout = () => async (dispatch) => {
  await axios.get("/auth/logout");

  dispatch({ type: LOGOUT });
};

export const googleLogin = () => async (dispatch) => {
  window.open("http://localhost:5000/auth/google", "_self");
  dispatch({ type: GOOGLE_LOGIN });
};

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/blogs", values);

  history.push("/blogs");
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async (dispatch) => {
  const res = await axios.get("/api/blogs");

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = (id) => async (dispatch) => {
  const res = await axios.get(`/api/blogs/${id}`);
  dispatch({ type: FETCH_BLOG, payload: res.data });
};
