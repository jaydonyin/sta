import axios from 'axios'
const service = axios.create({
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return error
  }
)

export default service
