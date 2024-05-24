
import axios from 'axios'


export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
 
})
const useAxiosCommon = () => {
 

  return axiosSecure
}

export default useAxiosCommon
