import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://cl-fe-project-api.herokuapp.com/",
});

export const getTopics = () => {
  return newsApi.get("/api/topics").then((data) => {
    return data.data.topics;
  });
};
