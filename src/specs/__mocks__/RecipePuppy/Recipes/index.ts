import dotenv from 'dotenv'

dotenv.config()

const successRecipes = [
  {
    title: 'BLT Pasta Salad',
    link: 'http://allrecipes.com/Recipe/BLT-Pasta-Salad/Detail.aspx',
    ingredients: ['bacon', 'dressing', 'onions', 'ranch', 'tomato'],
    gif: 'https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif'
  },
  {
    title: 'Tomato Alfredo Sauce with Artichokes',
    link: 'http://allrecipes.com/Recipe/Tomato-Alfredo-Sauce-with-Artichokes/Detail.aspx',
    ingredients: ['flour', 'onions', 'tomato', 'whole milk'],
    gif: 'https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif'
  }
]

const successRecipesWithFallbackGifUrlAndErrorMessage = [
  {
    title: 'BLT Pasta Salad',
    link: 'http://allrecipes.com/Recipe/BLT-Pasta-Salad/Detail.aspx',
    ingredients: ['bacon', 'dressing', 'onions', 'ranch', 'tomato'],
    gif: process.env.GIHPY_GIF_FALLBACK_URL,
    message: 'The server is not available and cannot respond to your request. Please try again later.'
  },
  {
    title: 'Tomato Alfredo Sauce with Artichokes',
    link: 'http://allrecipes.com/Recipe/Tomato-Alfredo-Sauce-with-Artichokes/Detail.aspx',
    ingredients: ['flour', 'onions', 'tomato', 'whole milk'],
    gif: process.env.GIHPY_GIF_FALLBACK_URL,
    message: 'The server is not available and cannot respond to your request. Please try again later.'
  }
]

export {
  successRecipes,
  successRecipesWithFallbackGifUrlAndErrorMessage
}
