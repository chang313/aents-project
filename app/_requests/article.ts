import axios from "axios";

export const getAllArticle = async () => {
  // const data = await axios.get('/_f/articles/all');
  const data = await axios.get('http://ams-api:8000/articles/all')
  return data;
}
