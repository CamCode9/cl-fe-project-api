import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://cl-fe-project-api.herokuapp.com/",
});

const patchComment = (comment_id, body) => {
  return newsApi.patch(`/api/comments/${comment_id}`, body);
};

export default patchComment;
