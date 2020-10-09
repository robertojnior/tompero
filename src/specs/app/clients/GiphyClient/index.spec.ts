import giphySearch from '@mocks/GiphyClient/SearchResults'
import { defaultSearchTerm, emptySearchTerm } from '@mocks/GiphyClient/SearchTerms'
import invalidHttpStatuses from '@mocks/InvalidHttpStatuses'

import GiphyClient from '@clients/GiphyClient'
import giphyBaseClient from '@clients/GiphyClient/baseClient'

import { genericError, genericHttpError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

jest.mock('@clients/GiphyClient/baseClient')

const mockedGiphyBaseClient = giphyBaseClient as jest.Mocked<typeof giphyBaseClient>

describe('#constructor', () => {
  describe('when search term is not empty', () => {
    it('should instantiate Giphy', () => {
      expect(new GiphyClient(defaultSearchTerm)).toBeInstanceOf(GiphyClient)
    })
  })

  describe('when has empty search term', () => {
    it('should throws argument error', () => {
      const argumentError = new ArgumentError('Search term can\'t be blank.')

      expect(() => new GiphyClient(emptySearchTerm)).toThrow(argumentError)

      try {
        (() => new GiphyClient(emptySearchTerm))()
      } catch (error) {
        expect(error).toBeInstanceOf(ArgumentError)
      }
    })
  })
})

describe('.searchGif', () => {
  const giphy = new GiphyClient(defaultSearchTerm)

  it('should calls baseClient get method 1 time', () => {
    giphy.searchGif()

    expect(mockedGiphyBaseClient.get).toHaveBeenCalledTimes(1)
  })

  describe('when gif service is available', () => {
    mockedGiphyBaseClient.get.mockResolvedValue(giphySearch)

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

        mockedGiphyBaseClient.get.mockRejectedValue(rejectedValue)

        return expect(giphy.searchGif()).rejects.toStrictEqual(genericHttpError)
      })
    })

    describe('and responds with unexpected error', () => {
      it('should throws generic error', () => {
        mockedGiphyBaseClient.get.mockRejectedValue({ error: 'Unexpected error' })

        return expect(giphy.searchGif()).rejects.toStrictEqual(genericError)
      })
    })
  })
})
