import axios from 'axios'

const baseClient = axios.create({
  baseURL: 'http://www.recipepuppy.com/api'
})

export default baseClient
