import {API} from "./config";

export const getAnswers = q =>
  API.post("/", q)
    .then(res => res.data)
    .catch(() => false);
