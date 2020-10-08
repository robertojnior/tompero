import RecipePuppyContract from '@contracts/RecipePuppy'
import Recipe from '@interfaces/RecipePuppy/IRecipe'
import SearchEngine from '@interfaces/RecipePuppy/ISearchEngine'
import SearchResults from '@interfaces/RecipePuppy/ISearchResults'
import { HTTP_CLIENT_ERROR_CODE } from '@utils/constants'
import { genericError, genericHttpError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

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
      if (error?.response?.status >= HTTP_CLIENT_ERROR_CODE) {
        throw genericHttpError
      } else {
        throw genericError
      }
    }
  }
}

export default RecipePuppy
