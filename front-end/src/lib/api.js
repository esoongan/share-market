import axios from 'axios'

export const join = ({username, password, email, addr}) => axios.post('/join', {username, password, email, addr}) 
export const login = ({username, password}) => axios.post('/login', {username, password}) 

export const writePost = ({title, content, category, price, deposit}) => axios.post('/user/api/posts', {title, content, category, price, deposit})
export const uploadFiles = ({post_id, formData, config}) => axios.post(`/uploadMultipleFiles/${post_id}`, formData, config)
/* formData
var data = new FormData();
data.append('files', fs.createReadStream('/Users/iseungjin/web_study/web/share-market/front-end/node_modules/growly/example/muffin.png'));
data.append('files', fs.createReadStream('/Users/iseungjin/web_study/web/share-market/front-end/node_modules/growly/example/cake.png'));

*/