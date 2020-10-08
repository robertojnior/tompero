import { HTTP_CLIENT_ERROR } from '@constants/General'
import RecipePuppyContract from '@contracts/RecipePuppy'
import Recipe from '@interfaces/RecipePuppy/IRecipe'
import SearchEngine from '@interfaces/RecipePuppy/ISearchEngine'
import SearchResults from '@interfaces/RecipePuppy/ISearchResults'
import ArgumentError from '@utils/errors/ArgumentError'
import HttpError from '@utils/errors/HttpError'

import baseClient from './baseClient'

class RecipePuppy implements SearchEngine {
  private ingredients: string[]

  constructor(ingredients: string[]) {
    const recipePuppyContract = new RecipePuppyContract()

    if (!recipePuppyContract.validate(ingredients)) {
      throw new ArgumentError('Must have less than four ingredients.')
    }

    this.ingredients = ingredients
  }

  async searchRecipes(): Promise<Recipe[]> {
    try {
      const requestParams = { params: { i: this.ingredients.join(',') } }

      const response = await baseClient.get<SearchResults>('?', requestParams)

      return response.data.results
    } catch (error) {
      if (error?.response?.status >= HTTP_CLIENT_ERROR) {
        throw new HttpError('The server is not available and cannot respond to your request. Please try again later.')
      } else {
        throw new Error('An unidentified error occurred while trying to fetch recipes. Contact support.')
      }
    }
  }
}

export default RecipePuppy
