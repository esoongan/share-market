import axios from 'axios'
import qs from 'qs';



export const join = ({username, password, email, addr}) => axios.post('/join', {username, password, email, addr});
export const login = ({username, password}) => axios.post('/login', {username, password});
export const checkUser = ({token}) => {
  const config = { headers: {'X-AUTH_TOKEN': token } };
  const data = {'X-AUTH-TOKEN' : token};
  return axios.get('/user/api/check', data, config );
}
export const writePost = ({title, content, category, price, deposit}) => axios.post('/user/api/posts', {title, content, category, price, deposit});
export const uploadFiles = ({post_id, formData, config}) => axios.post(`/uploadMultipleFiles/${post_id}`, formData, config);
export const getPost = ({post_id})=> axios.get(`/api/posts/${post_id}`);
export const getFiles = ({post_id})=> axios.get(`/post/${post_id}/files`);


export const getMyPost = ({token}) => {
  const config = { headers: {'X-AUTH_TOKEN': token } };
  const data = {'X-AUTH-TOKEN' : token};
  return axios.get('/uauth/api/post', data, config );
}

export const getContractSeller = ({state}) => {
  const queryString = qs.stringify({
    state,
  });
  return axios.get('/uauth/api/contract/seller?{queryString}');
};

export const getContractBuyer = ({state}) => {
  const queryString = qs.stringify({
    state,
  });
  return axios.get('/uauth/api/contract/buyer?{queryString}');
};