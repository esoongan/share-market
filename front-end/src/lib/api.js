import axios from 'axios'

export const join = ({username, password, email, addr}) => axios.post('/api/user/join', {username, password, email, addr});
export const login = ({username, password}) => axios.post('/api/user/login', {username, password});
export const checkUser = ({token}) => {
  const config = { headers: {'X-AUTH_TOKEN': token } };
  const data = {'X-AUTH-TOKEN' : token};
  return axios.get('/uauth/api/user/login', data, config );
}
export const writePost = ({title, content, category, price, deposit}) => axios.post('/uauth/api/post', {title, content, category, price, deposit});
export const editPost = ({post_id, title, content, category, price, deposit}) => axios.put(`/uauth/api/post/${post_id}`, {title, content, category, price, deposit});

export const deletePost = ({post_id})=> axios.delete(`/uauth/api/post/${post_id}`);
export const getPost = ({post_id})=> axios.get(`/api/post/${post_id}`);

export const uploadFiles = ({post_id, formData, config}) => axios.post(`/api/file/upload/${post_id}`, formData, config);
export const editFiles = ({post_id, formData, config}) => axios.put(`/api/file/upload/${post_id}`, formData, config);

export const getFiles = ({post_id})=> axios.get(`/api/file/${post_id}`);
