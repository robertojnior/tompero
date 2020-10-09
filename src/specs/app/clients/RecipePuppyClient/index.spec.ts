import RecipePuppyClient from '@clients/RecipePuppyClient'
import recipePuppyBaseClient from '@clients/RecipePuppyClient/baseClient'

import { genericError, genericHttpError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

import invalidHttpStatuses from '@mocks/InvalidHttpStatuses'
import recipePuppySearch from '@mocks/RecipePuppyClient/SearchResults'

jest.mock('@clients/RecipePuppyClient/baseClient')

const mockedRecipePuppyBaseClient = recipePuppyBaseClient as jest.Mocked<typeof recipePuppyBaseClient>

describe('#constructor', () => {
  describe('when have more than three ingredients', () => {
    it('should throws argument error', () => {
      const ingredients = ['onion', 'tomato', 'pineapple', 'garlic']

      const argumentError = new Error('You must provide one to three ingredients.')

      expect(() => new RecipePuppyClient(ingredients)).toThrow(argumentError)

      try {
        (() => new RecipePuppyClient(ingredients))()
      } catch (error) {
        expect(error).toBeInstanceOf(ArgumentError)
      }
    })
  })

  describe('when don\'t have any ingredient', () => {
    it('should throws argument error', () => {
      const ingredients = ['', '']

      const argumentError = new Error('You must provide one to three ingredients.')

      expect(() => new RecipePuppyClient(ingredients)).toThrow(argumentError)

      try {
        (() => new RecipePuppyClient(ingredients))()
      } catch (error) {
        expect(error).toBeInstanceOf(ArgumentError)
      }
    })
  })

  describe('when have less than four ingredients', () => {
    it('should instantiate RecipePuppy', () => {
      const ingredients = ['onion', 'tomato', 'garlic']

      expect(new RecipePuppyClient(ingredients)).toBeInstanceOf(RecipePuppyClient)
    })
  })
})

describe('.fetchRecipes', () => {
  const recipePuppy = new RecipePuppyClient(['onion', 'tomato'])

  it('should calls baseClient get method 1 time', () => {
    recipePuppy.searchRecipes()

    expect(mockedRecipePuppyBaseClient.get).toHaveBeenCalledTimes(1)
  })

  describe('when recipes service is available', () => {
    mockedRecipePuppyBaseClient.get.mockResolvedValue(recipePuppySearch)

    it('should return recipes', () => {
      const recipes = recipePuppySearch.data.results

      return expect(recipePuppy.searchRecipes()).resolves.toEqual(recipes)
    })
  })

  describe('when recipes service is unavailable', () => {
    describe.each(invalidHttpStatuses)('and responds with %i %s', status => {
      it('should throws http error', () => {
        const rejectedValue = { response: { status: status } }

        mockedRecipePuppyBaseClient.get.mockRejectedValue(rejectedValue)

        return expect(recipePuppy.searchRecipes()).rejects.toStrictEqual(genericHttpError)
      })
    })

    describe('and responds with unexpected error', () => {
      it('should throws generic error', () => {
        mockedRecipePuppyBaseClient.get.mockRejectedValue({ error: 'Unexpected error' })

        return expect(recipePuppy.searchRecipes()).rejects.toStrictEqual(genericError)
      })
    })
  })
})
