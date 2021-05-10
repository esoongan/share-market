import axios from 'axios'

export const join = ({username, password, email, addr}) => axios.post('/join', {username, password, email, addr});
export const login = ({username, password}) => axios.post('/login', {username, password});
export const checkUser = ({token}) => {
  const config = { headers: {'X-AUTH_TOKEN': token } };
  const data = {'X-AUTH-TOKEN' : token};
  return axios.get('/user/api/check', data, config );
}
export const writePost = ({title, content, category, price, deposit}) => axios.post('/user/api/posts', {title, content, category, price, deposit});
export const deletePost = ({post_id})=> axios.delete(`/user/api/posts/${post_id}`);
export const getPost = ({post_id})=> axios.get(`/api/posts/${post_id}`);

export const uploadFiles = ({post_id, formData, config}) => axios.post(`/uploadMultipleFiles/${post_id}`, formData, config);
export const getFiles = ({post_id})=> axios.get(`/post/${post_id}/files`);
