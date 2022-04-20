import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://cl-fe-project-api.herokuapp.com/",
});

export const getArticleById = (article_id) => {
  return newsApi.get(`/api/articles/${article_id}`).then((data) => {
    return data.data.article;
  });
};
