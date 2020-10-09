import Giphy from '@clients/Giphy'
import baseClient from '@clients/Giphy/baseClient'
import giphySearch from '@mocks/Giphy/SearchResults'
import { defaultSearchTerm, emptySearchTerm } from '@mocks/Giphy/SearchTerms'
import invalidHttpStatuses from '@mocks/InvalidHttpStatuses'
import { genericError, genericHttpError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

jest.mock('@clients/Giphy/baseClient')

const mockedBaseClient = baseClient as jest.Mocked<typeof baseClient>

describe('#constructor', () => {
  describe('when search term is not empty', () => {
    it('should instantiate Giphy', () => {
      expect(new Giphy(defaultSearchTerm)).toBeInstanceOf(Giphy)
    })
  })

  describe('when has empty search term', () => {
    it('should throws argument error', () => {
      const argumentError = new ArgumentError('Search term can\'t be blank.')

      expect(() => new Giphy(emptySearchTerm)).toThrow(argumentError)

      try {
        (() => new Giphy(emptySearchTerm))()
      } catch (error) {
        expect(error).toBeInstanceOf(ArgumentError)
      }
    })
  })
})

describe('.searchGif', () => {
  const giphy = new Giphy(defaultSearchTerm)

  it('should calls baseClient get method 1 time', () => {
    giphy.searchGif()

    expect(mockedBaseClient.get).toHaveBeenCalledTimes(1)
  })

  describe('when gif service is available', () => {
    mockedBaseClient.get.mockResolvedValue(giphySearch)

    it('should return gif', () => {
      const giphyImage = giphySearch.data.data[0]

      const searchedGiphy = giphyImage.images.fixed_height.url

      return expect(giphy.searchGif()).resolves.toEqual(searchedGiphy)
    })
  })

  describe('when gif service is unavailable', () => {
    describe.each(invalidHttpStatuses)('and responds with %i %s', status => {
      it('should throws http error', () => {
        const rejectedValue = { response: { status: status } }

        mockedBaseClient.get.mockRejectedValue(rejectedValue)

        return expect(giphy.searchGif()).rejects.toStrictEqual(genericHttpError)
      })
    })

    describe('and responds with unexpected error', () => {
      it('should throws generic error', () => {
        mockedBaseClient.get.mockRejectedValue({ error: 'Unexpected error' })

        return expect(giphy.searchGif()).rejects.toStrictEqual(genericError)
      })
    })
  })
})
