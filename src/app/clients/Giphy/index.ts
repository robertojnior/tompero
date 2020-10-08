import { HTTP_CLIENT_ERROR } from '@constants/General'
import {
  DEFAULT_SEARCH_GIPHY_RESULT_LIMIT,
  DEFAULT_SEARCH_GIPHY_OFFSET,
  DEFAULT_SEARCH_GIPHY_RATING,
  DEFAULT_SEARCH_GIPHY_LANG
} from '@constants/GiphyClient'
import GiphyClientContract from '@contracts/GiphyClient'
import IGiphy from '@interfaces/Giphy'
import GiphySearchEngine from '@interfaces/GiphyClient/ISearchEngine'
import GiphySearchResults from '@interfaces/GiphyClient/ISearchResults'
import ArgumentError from '@utils/errors/ArgumentError'
import HttpError from '@utils/errors/HttpError'

import baseClient from './baseClient'

class Giphy implements GiphySearchEngine {
  private searchTerm: string

  constructor(searchTerm: string) {
    const giphyContract = new GiphyClientContract()

    if (!giphyContract.validate(searchTerm)) {
      throw new ArgumentError('Search term can\'t be blank.')
    }

    this.searchTerm = searchTerm
  }

  async searchGif(): Promise<IGiphy> {
    const requestParams = {
      params: {
        limit: DEFAULT_SEARCH_GIPHY_RESULT_LIMIT,
        offset: DEFAULT_SEARCH_GIPHY_OFFSET,
        raiting: DEFAULT_SEARCH_GIPHY_RATING,
        lang: DEFAULT_SEARCH_GIPHY_LANG,
        q: this.searchTerm
      }
    }

    try {
      const response = await baseClient.get<GiphySearchResults>('', requestParams)

      const giphyImage = response.data.data[0]

      return giphyImage.images.fixed_height
    } catch (error) {
      if (error?.response?.status >= HTTP_CLIENT_ERROR) {
        throw new HttpError('The server is not available and cannot respond to your request. Please try again later.')
      } else {
        throw new Error('An unexpected error occurred while trying to fetch the results. Contact support.')
      }
    }
  }
}

export default Giphy
