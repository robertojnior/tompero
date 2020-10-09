import giphyBaseClient from '@clients/GiphyClient/baseClient'

import ExtractRecipePuppiesFromSearchResult from '@services/ExtractRecipePuppiesFromSearchResult'

import { genericHttpError, genericError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

import giphySearch from '@mocks/GiphyClient/SearchResults'
import invalidHttpStatuses from '@mocks/InvalidHttpStatuses'
import extractedRecipes from '@mocks/RecipePuppyClient/ExtractedRecipes'
import { recipes as mockedRecipes, recipesWithFallbackGifUrlAndErrorMessage } from '@mocks/RecipePuppyClient/Recipes'
import recipePuppySearch from '@mocks/RecipePuppyClient/SearchResults'

jest.mock('@clients/GiphyClient/baseClient')

const mockedGiphyBaseClient = giphyBaseClient as jest.Mocked<typeof giphyBaseClient>

const extractRecipePuppiesFromSearchResult = new ExtractRecipePuppiesFromSearchResult(recipePuppySearch.data.results)

describe('.begin', () => {
  it('should extract recipes from recipe puppy search results', () => {
    expect(extractRecipePuppiesFromSearchResult.begin()).toEqual(extractedRecipes)
  })
})

describe('.fetchRecipeGif', () => {
  const recipePuppySearchResult = recipePuppySearch.data.results[0]

  const recipeTitle = recipePuppySearchResult.title

  it('should calls baseClient get method 1 time', () => {
    extractRecipePuppiesFromSearchResult.fetchRecipeGif(recipeTitle)

    expect(mockedGiphyBaseClient.get).toHaveBeenCalledTimes(1)
  })

  describe('when gif service is available', () => {
    mockedGiphyBaseClient.get.mockResolvedValue(giphySearch)

    describe('and recipe title is not blank', () => {
      it('should return gif', () => {
        const giphyImage = giphySearch.data.data[0]

        const searchedGiphy = giphyImage.images.fixed_height.url

        return expect(extractRecipePuppiesFromSearchResult.fetchRecipeGif(recipeTitle)).resolves.toEqual(searchedGiphy)
      })
    })

    describe('but recipe title is blank', () => {
      it('should throws argument error', () => {
        const argumentError = new ArgumentError('Search term can\'t be blank.')

        expect(() => extractRecipePuppiesFromSearchResult.fetchRecipeGif('')).toThrow(argumentError)

        try {
          (() => extractRecipePuppiesFromSearchResult.fetchRecipeGif(''))()
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

        mockedGiphyBaseClient.get.mockRejectedValue(rejectedValue)

        return expect(extractRecipePuppiesFromSearchResult.fetchRecipeGif(recipeTitle)).rejects.toStrictEqual(genericHttpError)
      })
    })

    describe('and responds with unexpected error', () => {
      it('should throws generic error', () => {
        mockedGiphyBaseClient.get.mockRejectedValue({ error: 'Unexpected error' })

        return expect(extractRecipePuppiesFromSearchResult.fetchRecipeGif(recipeTitle)).rejects.toStrictEqual(genericError)
      })
    })
  })
})

describe('.complete', () => {
  describe('when gif service is available', () => {
    it('should return recipes', () => {
      const pastaSaladGiphyUrl = 'https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif'
      const pastaSaladGiphySearch = { data: { data: [{ images: { fixed_height: { url: pastaSaladGiphyUrl } } }] } }

      const tomatoAlfredoGiphyUrl = 'https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif'
      const tomatoAlfredoGiphySearch = { data: { data: [{ images: { fixed_height: { url: tomatoAlfredoGiphyUrl } } }] } }

      mockedGiphyBaseClient.get
        .mockResolvedValueOnce(pastaSaladGiphySearch)
        .mockResolvedValueOnce(tomatoAlfredoGiphySearch)

      extractRecipePuppiesFromSearchResult.begin()

      return Promise.all(extractRecipePuppiesFromSearchResult.complete()).then(recipes => {
        expect(recipes).toEqual(expect.arrayContaining(mockedRecipes))
      })
    })
  })

  describe('when gif service is unavailable', () => {
    it('should return recipes with fallback gif url', () => {
      const [statusCode] = invalidHttpStatuses[0]

      const rejectedValue = { response: { status: statusCode } }

      mockedGiphyBaseClient.get.mockRejectedValue(rejectedValue)

      extractRecipePuppiesFromSearchResult.begin()

      return Promise.all(extractRecipePuppiesFromSearchResult.complete()).then(recipes => {
        expect(recipesWithFallbackGifUrlAndErrorMessage).toEqual(
          expect.arrayContaining(recipes)
        )
      })
    })
  })
})
