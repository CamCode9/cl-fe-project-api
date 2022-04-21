import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://cl-fe-project-api.herokuapp.com/",
});

const getComments = (article_id) => {
  return newsApi.get(`/api/articles/${article_id}/comments`).then((data) => {
    return data.data.comments;
  });
};

export default getComments;
