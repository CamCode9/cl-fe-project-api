import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://cl-fe-project-api.herokuapp.com/",
});

const getUser = (username) => {
  return newsApi.get(`/api/users/${username}`);
};

export default getUser;
