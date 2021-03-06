import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://cl-fe-project-api.herokuapp.com/",
});

const postComment = (article_id, body) => {
  return newsApi
    .post(`/api/articles/${article_id}/comments`, body)
    .then(({ data }) => {
      return data.comment;
    });
};

export default postComment;
