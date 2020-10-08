import recipePuppySearch from '@mocks/RecipePuppy/SearchResults'
import ExtractRecipesFromSearchResults from '@services/RecipePuppy/ExtractRecipesFromSearchResults'
import { FALLBACK_GIF_URL } from '@utils/constants/GiphyClient'

const extractRecipesFromSearchResults = new ExtractRecipesFromSearchResults([])

describe.skip('.begin', () => {
  it('should extract recipes from recipe puppy search results', () => {
    expect(extractRecipesFromSearchResults.begin()).toEqual([])
  })
})

describe.skip('.fetchRecipeGif', () => {
  const recipePuppySearchResult = recipePuppySearch.data.results[0]

  const searchTerm = recipePuppySearchResult.title

  describe.skip('when gif service is available', () => {
    it('should return a gif link based on recipe title', () => {
      const gifUrl = ''

      expect(extractRecipesFromSearchResults.fetchRecipeGif(searchTerm)).toEqual(gifUrl)
    })
  })

  describe.skip('when gif service is unavailable', () => {
    it('should return a fallback gif url', () => {
      expect(extractRecipesFromSearchResults.fetchRecipeGif(searchTerm)).toEqual(FALLBACK_GIF_URL)
    })
  })
})

describe.skip('.complete', () => {
  it('should extract recipes from recipe puppy search results', () => {
    return expect(extractRecipesFromSearchResults.complete()).resolves.toEqual([])
  })
})
