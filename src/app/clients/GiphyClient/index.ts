import dotenv from 'dotenv'

import GiphySearchEngine from '@interfaces/GiphyClient/ISearchEngine'
import GiphySearchResults from '@interfaces/GiphyClient/ISearchResults'

import GiphyClientContract from '@contracts/GiphyClient'

import { BAD_REQUEST } from '@utils/constants/HttpStatuses'
import { genericError, genericHttpError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

import baseClient from './baseClient'

dotenv.config()

class Giphy implements GiphySearchEngine {
  private searchTerm: string

  constructor(searchTerm: string) {
    const giphyClientContract = new GiphyClientContract()

    if (!giphyClientContract.validate(searchTerm)) {
      throw new ArgumentError('Search term can\'t be blank.')
    }

    this.searchTerm = searchTerm
  }

  async searchGif(): Promise<string> {
    const requestParams = { params: { q: this.searchTerm } }

    try {
      const response = await baseClient.get<GiphySearchResults>('', requestParams)

      const giphyImage = response.data.data[0]

      return giphyImage.images.fixed_height.url
    } catch (error) {
      if (error?.response?.status >= BAD_REQUEST) {
        throw genericHttpError
      } else {
        throw genericError
      }
    }
  }
}

export default Giphy
