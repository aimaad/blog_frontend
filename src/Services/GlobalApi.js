import axios from 'axios';

const BASE_URL = 'http://localhost:8084/api';

export const getPost = (keyword) => {
  return axios.get(`${BASE_URL}/posts/search?q=${keyword}`);
};
export const addPost = (postData) => {
  return axios.post(`${BASE_URL}/posts`, postData);
};

export const getUsers = () => {
  return axios.get(`${BASE_URL}/users`);
};

export const editPost = (id, postData) => { 
  return axios.put(`${BASE_URL}/posts/${id}`, postData); 
};

export const deletePost = (id) => {
  return axios.delete(`${BASE_URL}/posts/${id}`);
};
export const getPostById = (id) => {
  return axios.get(`${BASE_URL}/posts/${id}`);
};
