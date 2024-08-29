import axios from 'axios'
import { config } from '../utils/customLocalStorage'

const dynamicAPI = async (method, url, obj = {}) => {
  try {
    switch (method) {
      case 'get':
        return await axios
          .get(`https://htcapi.aiotechsoft.com${url}`, config())
          .then((res) => res.data)

      case 'post':
        return await axios
          .post(`https://htcapi.aiotechsoft.com${url}`, obj, config())
          .then((res) => res.data)

      case 'put':
        return await axios
          .put(`https://htcapi.aiotechsoft.com${url}`, obj, config())
          .then((res) => res.data)

      case 'delete':
        return await axios
          .delete(`https://htcapi.aiotechsoft.com${url}`, config())
          .then((res) => res.data)
    }
  } catch (error) {
    throw error.response.data.error
  }
}

export default dynamicAPI
