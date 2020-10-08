import { FALLBACK_GIF_URL } from '@utils/constants/GiphyClient'

const successRecipes = [
  {
    title: 'BLT Pasta Salad',
    href: 'http://allrecipes.com/Recipe/BLT-Pasta-Salad/Detail.aspx',
    ingredients: ['bacon', 'dressing', 'onions', 'ranch', 'tomato'],
    gif: { url: 'https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif' }
  },
  {
    title: 'Tomato Alfredo Sauce with Artichokes',
    href: 'http://allrecipes.com/Recipe/Tomato-Alfredo-Sauce-with-Artichokes/Detail.aspx',
    ingredients: ['flour', 'onions', 'tomato', 'whole milk'],
    gif: { url: 'https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif' }
  }
]

const successRecipesWithFallbackGifUrlAndErrorMessage = [
  {
    title: 'BLT Pasta Salad',
    href: 'http://allrecipes.com/Recipe/BLT-Pasta-Salad/Detail.aspx',
    ingredients: ['bacon', 'dressing', 'onions', 'ranch', 'tomato'],
    gif: { url: FALLBACK_GIF_URL },
    message: 'The server is not available and cannot respond to your request. Please try again later.'
  },
  {
    title: 'Tomato Alfredo Sauce with Artichokes',
    href: 'http://allrecipes.com/Recipe/Tomato-Alfredo-Sauce-with-Artichokes/Detail.aspx',
    ingredients: ['flour', 'onions', 'tomato', 'whole milk'],
    gif: { url: FALLBACK_GIF_URL },
    message: 'The server is not available and cannot respond to your request. Please try again later.'
  }
]

export {
  successRecipes,
  successRecipesWithFallbackGifUrlAndErrorMessage
}
