import axios from "axios";
import { getUser } from "../_lib/user";

interface postArticleRequest {
  title: string;
  content: string;
  writer_name: string;
  image?: File | null;
}

interface updateArticleRequest {
  article_id: string;
  title: string;
  content: string;
  image?: File | null;
}

interface postArticleForm {
  formData: postArticleRequest
}

export const getMyArticle = async (username) => {
  // const data = await axios.get('/_f/articles/all');
  const data = await axios.get('http://localhost:6002/articles/my-articles/'+username)
  return data;
}

export const getAllArticle = async () => {
  const data = await axios.get('http://ams-api:8000/articles/all')
  return data;
}

export const post_article = async ({
  title,
  content,
  writer_name,
  image
}: postArticleRequest): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify({"title": title, 
                                            "content": content, 
                                            "writer_name": writer_name}));

    if (image) {
      formData.append('image', image);
    }

    const response = await axios
      .post<any>(
        'http://localhost:6002/articles',
        formData,
      )
      .then(({ data }) => ({
        success: true,
        ...data,
      })) 
      .catch(({ response}) => {
        return {
          success: false,
          status: response.status,
        }
      });

    return response;

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message, // You can include the server's error message if available
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }

    return {
      success: false,
      status: 500, // Default to a generic server error status
    };

  }
  
};

export const update_article = async ({
  article_id,
  title,
  content,
  image,
}: updateArticleRequest): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify({"article_id": article_id, 
                                            "title": title, 
                                            "content": content }));
                                           
    if (image) {
      formData.append('image', image);
    }

    const response = await axios
      .put<any>(
        'http://localhost:6002/articles',
        formData,
      )
      .then(({ data }) => ({
        success: true,
        ...data,
      })) 
      .catch(({ response}) => {
        return {
          success: false,
          status: response.status,
        }
      });

    return response;

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      return {
        success: false,
        status: error.response.status,
        message: error.response.data.message, // You can include the server's error message if available
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }

    return {
      success: false,
      status: 500, // Default to a generic server error status
    };

  }
  
}