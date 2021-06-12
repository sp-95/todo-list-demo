import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL
const headers = {}

const axiosInstance = axios.create({ baseURL, headers })

export default axiosInstance
