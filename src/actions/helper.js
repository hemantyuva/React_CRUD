import axios from "axios"
import { appConstants } from "../constants/constants"

export const request = (path, data, method) => {
  return axios({
    method,
    url: `${appConstants.WEB_SERVICE_URL}/api/${appConstants.API_V}${path}`,
    headers: {
      'Content-Type':'application/json',
    },
    data
  })
}

export const getRequest = (path, data) => request(path, data, "GET")
export const postRequest = (path, data) => request(path, data, "POST")
export const patchRequest = (path, data) => request(path, data, "PATCH")
export const deleteRequest = (path, data) => request(path, data, "DELETE")
export const putRequest = (path, data) => request(path, data, "PUT")