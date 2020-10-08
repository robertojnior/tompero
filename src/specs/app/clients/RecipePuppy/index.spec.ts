import RecipePuppy from '@clients/RecipePuppy'
import baseClient from '@clients/RecipePuppy/baseClient'
import ArgumentError from '@utils/errors/ArgumentError'
import HttpError from '@utils/errors/HttpError'

import baseClientResponse from './mocks/baseClientResponse'

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
    mockedBaseClient.get.mockResolvedValue(baseClientResponse)

    it('should return recipes', () => {
      return expect(recipePuppy.searchRecipes()).resolves.toEqual(baseClientResponse.data.results)
    })
  })

  describe('when recipes service is unavailable', () => {
    const invalidHttpStatues = [
      [400, 'Bad Request'],
      [500, 'Internal Server Error']
    ]

    const genericError = new Error('An unidentified error occurred while trying to fetch recipes. Contact support.')
    const httpError = new HttpError('The server is not available and cannot respond to your request. Please try again later.')

    describe.each(invalidHttpStatues)('and responds with %i %s', status => {
      it('should throws http error', () => {
        const rejectedValue = { response: { status: status } }

        mockedBaseClient.get.mockRejectedValue(rejectedValue)

        return expect(recipePuppy.searchRecipes()).rejects.toStrictEqual(httpError)
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
