import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://cl-fe-project-api.herokuapp.com/",
});

export const getArticles = () => {
  return newsApi.get("/api/articles").then((data) => {
    return data.data.articles;
  });
};
