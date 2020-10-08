import axios from 'axios'

const baseClient = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs/search',
  params: {
    api_key: '5r7a049VRAfIfeBMds8A2ydnoZinkAtr'
  }
})

export default baseClient
