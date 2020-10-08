import baseClient from '@clients/Giphy/baseClient'
import giphySearch from '@mocks/Giphy/SearchResults'
import invalidHttpStatuses from '@mocks/InvalidHttpStatuses'
import extractedRecipes from '@mocks/RecipePuppy/ExtractedRecipes'
import { successRecipes, successRecipesWithFallbackGifUrlAndErrorMessage } from '@mocks/RecipePuppy/Recipes'
import recipePuppySearch from '@mocks/RecipePuppy/SearchResults'
import ExtractRecipesFromSearchResults from '@services/RecipePuppy/ExtractRecipesFromSearchResults'
import { genericHttpError, genericError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

jest.mock('@clients/Giphy/baseClient')

const mockedBaseClient = baseClient as jest.Mocked<typeof baseClient>

const extractRecipesFromSearchResults = new ExtractRecipesFromSearchResults(recipePuppySearch.data.results)

describe('.begin', () => {
  it('should extract recipes from recipe puppy search results', () => {
    expect(extractRecipesFromSearchResults.begin()).toEqual(extractedRecipes)
  })
})

describe('.fetchRecipeGif', () => {
  const recipePuppySearchResult = recipePuppySearch.data.results[0]

  const recipeTitle = recipePuppySearchResult.title

  it('should calls baseClient get method 1 time', () => {
    extractRecipesFromSearchResults.fetchRecipeGif(recipeTitle)

    expect(mockedBaseClient.get).toHaveBeenCalledTimes(1)
  })

  describe('when gif service is available', () => {
    mockedBaseClient.get.mockResolvedValue(giphySearch)

    describe('and recipe title is not blank', () => {
      it('should return gif', () => {
        const giphyImage = giphySearch.data.data[0]

        const searchedGiphy = giphyImage.images.fixed_height

        return expect(extractRecipesFromSearchResults.fetchRecipeGif(recipeTitle)).resolves.toEqual(searchedGiphy)
      })
    })

    describe('but recipe title is blank', () => {
      it('should throws argument error', () => {
        const argumentError = new ArgumentError('Search term can\'t be blank.')

        expect(() => extractRecipesFromSearchResults.fetchRecipeGif('')).toThrow(argumentError)

        try {
          (() => extractRecipesFromSearchResults.fetchRecipeGif(''))()
        } catch (error) {
          expect(error).toBeInstanceOf(ArgumentError)
        }
      })
    })
  })

  describe('when gif service is unavailable', () => {
    describe.each(invalidHttpStatuses)('and responds with %i %s', status => {
      it('should throws http error', () => {
        const rejectedValue = { response: { status: status } }

        mockedBaseClient.get.mockRejectedValue(rejectedValue)

        return expect(extractRecipesFromSearchResults.fetchRecipeGif(recipeTitle)).rejects.toStrictEqual(genericHttpError)
      })
    })

    describe('and responds with unexpected error', () => {
      it('should throws generic error', () => {
        mockedBaseClient.get.mockRejectedValue({ error: 'Unexpected error' })

        return expect(extractRecipesFromSearchResults.fetchRecipeGif(recipeTitle)).rejects.toStrictEqual(genericError)
      })
    })
  })
})

describe('.complete', () => {
  describe('when gif service is available', () => {
    it('should return recipes', done => {
      const pastaSaladGiphyUrl = 'https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif'
      const pastaSaladGiphySearch = { data: { data: [{ images: { fixed_height: { url: pastaSaladGiphyUrl } } }] } }

      const tomatoAlfredoGiphyUrl = 'https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif'
      const tomatoAlfredoGiphySearch = { data: { data: [{ images: { fixed_height: { url: tomatoAlfredoGiphyUrl } } }] } }

      mockedBaseClient.get
        .mockResolvedValue(giphySearch)
        .mockResolvedValueOnce(pastaSaladGiphySearch)
        .mockResolvedValueOnce(tomatoAlfredoGiphySearch)

      extractRecipesFromSearchResults.begin()

      extractRecipesFromSearchResults.complete().map(recipePromise => {
        return recipePromise
          .then(recipe => expect(successRecipes).toEqual(expect.arrayContaining([recipe])))
          .then(error => done(error))
      })
    })
  })

  describe('when gif service is unavailable', () => {
    it('should return recipes with fallback gif url', done => {
      const [statusCode] = invalidHttpStatuses[0]

      const rejectedValue = { response: { status: statusCode } }

      mockedBaseClient.get.mockRejectedValue(rejectedValue)

      extractRecipesFromSearchResults.begin()

      extractRecipesFromSearchResults.complete().map(recipePromise => {
        return recipePromise
          .then(recipe => {
            expect(successRecipesWithFallbackGifUrlAndErrorMessage).toEqual(
              expect.arrayContaining([recipe])
            )
          })
          .then(error => done(error))
      })
    })
  })
})
