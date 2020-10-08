import RecipePuppy from '@clients/RecipePuppy'
import baseClient from '@clients/RecipePuppy/baseClient'
import invalidHttpStatuses from '@mocks/InvalidHttpStatuses'
import recipePuppySearch from '@mocks/RecipePuppy/SearchResults'
import { genericError, genericHttpError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

jest.mock('@clients/RecipePuppy/baseClient')

const mockedBaseClient = baseClient as jest.Mocked<typeof baseClient>

describe('#constructor', () => {
  describe('when have more than three ingredients', () => {
    it('should throws argument error', () => {
      const ingredients = ['onion', 'tomato', 'pineapple', 'garlic']

      const argumentError = new Error('Must have less than four ingredients.')

      expect(() => new RecipePuppy(ingredients)).toThrow(argumentError)

      try {
        (() => new RecipePuppy(ingredients))()
      } catch (error) {
        expect(error).toBeInstanceOf(ArgumentError)
      }
    })
  })

  describe('when have less than four ingredients', () => {
    it('should instantiate RecipePuppy', () => {
      const ingredients = ['onion', 'tomato', 'garlic']

      expect(new RecipePuppy(ingredients)).toBeInstanceOf(RecipePuppy)
    })
  })
})

describe('.fetchRecipes', () => {
  const recipePuppy = new RecipePuppy(['onion', 'tomato'])

  it('should calls baseClient get method 1 time', () => {
    recipePuppy.searchRecipes()

    expect(mockedBaseClient.get).toHaveBeenCalledTimes(1)
  })

  describe('when recipes service is available', () => {
    mockedBaseClient.get.mockResolvedValue(recipePuppySearch)

    it('should return recipes', () => {
      const recipes = recipePuppySearch.data.results

      return expect(recipePuppy.searchRecipes()).resolves.toEqual(recipes)
    })
  })

  describe('when recipes service is unavailable', () => {
    describe.each(invalidHttpStatuses)('and responds with %i %s', status => {
      it('should throws http error', () => {
        const rejectedValue = { response: { status: status } }

        mockedBaseClient.get.mockRejectedValue(rejectedValue)

        return expect(recipePuppy.searchRecipes()).rejects.toStrictEqual(genericHttpError)
      })
    })

    describe('and responds with unexpected error', () => {
      it('should throws generic error', () => {
        mockedBaseClient.get.mockRejectedValue({ error: 'Unexpected error' })

        return expect(recipePuppy.searchRecipes()).rejects.toStrictEqual(genericError)
      })
    })
  })
})
