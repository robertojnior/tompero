import GiphyClientContract from '@contracts/GiphyClient'
import IGiphy from '@interfaces/Giphy'
import GiphySearchEngine from '@interfaces/GiphyClient/ISearchEngine'
import GiphySearchResults from '@interfaces/GiphyClient/ISearchResults'
import { HTTP_CLIENT_ERROR_CODE } from '@utils/constants'
import {
  DEFAULT_SEARCH_GIPHY_RESULT_LIMIT,
  DEFAULT_SEARCH_GIPHY_OFFSET,
  DEFAULT_SEARCH_GIPHY_RATING,
  DEFAULT_SEARCH_GIPHY_LANG
} from '@utils/constants/GiphyClient'
import { genericError, genericHttpError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

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
      if (error?.response?.status >= HTTP_CLIENT_ERROR_CODE) {
        throw genericHttpError
      } else {
        throw genericError
      }
    }
  }
}

export default Giphy
