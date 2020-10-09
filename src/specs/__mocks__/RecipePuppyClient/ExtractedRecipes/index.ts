const pastaSaladGiphyPromise = new Promise<string>(resolve => {
  resolve('https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif')
})

const tomatoAlfredoGiphyPromise = new Promise<string>(resolve => {
  resolve('https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif')
})

const extractedRecipes = [
  {
    title: 'BLT Pasta Salad',
    href: 'http://allrecipes.com/Recipe/BLT-Pasta-Salad/Detail.aspx',
    ingredients: ['bacon', 'dressing', 'onions', 'ranch', 'tomato'],
    gif: pastaSaladGiphyPromise
  },
  {
    title: 'Tomato Alfredo Sauce with Artichokes',
    href: 'http://allrecipes.com/Recipe/Tomato-Alfredo-Sauce-with-Artichokes/Detail.aspx',
    ingredients: ['flour', 'onions', 'tomato', 'whole milk'],
    gif: tomatoAlfredoGiphyPromise
  }
]

export default extractedRecipes
