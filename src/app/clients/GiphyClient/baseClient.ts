import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const baseClient = axios.create({
  baseURL: process.env.GIPHY_BASE_URL,
  params: {
    api_key: process.env.GIPHY_API_KEY
  }
})

export default baseClient
