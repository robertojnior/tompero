import dotenv from 'dotenv'

dotenv.config()

const recipes = [
  {
    title: 'BLT Pasta Salad',
    ingredients: ['bacon', 'dressing', 'onions', 'ranch', 'tomato'],
    link: 'http://allrecipes.com/Recipe/BLT-Pasta-Salad/Detail.aspx',
    gif: 'https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif'
  },
  {
    title: 'Tomato Alfredo Sauce with Artichokes',
    ingredients: ['flour', 'onions', 'tomato', 'whole milk'],
    link: 'http://allrecipes.com/Recipe/Tomato-Alfredo-Sauce-with-Artichokes/Detail.aspx',
    gif: 'https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif'
  }
]

const recipesWithFallbackGifUrlAndErrorMessage = [
  {
    title: 'BLT Pasta Salad',
    ingredients: ['bacon', 'dressing', 'onions', 'ranch', 'tomato'],
    link: 'http://allrecipes.com/Recipe/BLT-Pasta-Salad/Detail.aspx',
    gif: process.env.GIPHY_GIF_FALLBACK_URL,
    message: 'The server is not available and cannot respond to your request. Please try again later.'
  },
  {
    title: 'Tomato Alfredo Sauce with Artichokes',
    ingredients: ['flour', 'onions', 'tomato', 'whole milk'],
    link: 'http://allrecipes.com/Recipe/Tomato-Alfredo-Sauce-with-Artichokes/Detail.aspx',
    gif: process.env.GIPHY_GIF_FALLBACK_URL,
    message: 'The server is not available and cannot respond to your request. Please try again later.'
  }
]

export {
  recipes,
  recipesWithFallbackGifUrlAndErrorMessage
}
