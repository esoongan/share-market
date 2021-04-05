import axios from 'axios'

export const join = ({username, password, email, location}) => axios.post('/join', {username, password, email, location}) 
export const login = ({username, password}) => axios.post('/login', {username, password}) 

export const writePost = ({title, content, category, price, deposit}) => axios.post('/user/api/posts', {title, content, category, price, deposit})
export const uploadPhotos = ({post_id, formData}) => axios.post(`/uploadMultipleFiles/${post_id}`, formData)
/* formData
var data = new FormData();
data.append('files', fs.createReadStream('/Users/iseungjin/web_study/web/share-market/front-end/node_modules/growly/example/muffin.png'));
data.append('files', fs.createReadStream('/Users/iseungjin/web_study/web/share-market/front-end/node_modules/growly/example/cake.png'));

*/