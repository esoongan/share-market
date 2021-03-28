import axios from 'axios'

export const join = ({username, password, email, location}) => axios.post('/users', {username, password, email, location})