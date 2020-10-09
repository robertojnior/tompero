import dotenv from 'dotenv'

dotenv.config()

const giphySearch = { data: { data: [{ images: { fixed_height: { url: process.env.GIHPY_GIF_FALLBACK_URL } } }] } }

export default giphySearch
