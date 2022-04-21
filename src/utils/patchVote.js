import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://cl-fe-project-api.herokuapp.com/",
});

const patchVote = (article_id, body) => {
  return newsApi.patch(`/api/articles/${article_id}`, body);
};

export default patchVote;
