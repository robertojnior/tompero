import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const baseClient = axios.create({
  baseURL: process.env.RECIPE_PUPPY_BASE_URL
})

export default baseClient
