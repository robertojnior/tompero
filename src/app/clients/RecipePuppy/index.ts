import RecipePuppyContract from '@contracts/RecipePuppy'
import SearchEngine from '@interfaces/RecipePuppy/ISearchEngine'
import SearchResults, { IResult } from '@interfaces/RecipePuppy/ISearchResults'
import { BAD_REQUEST } from '@utils/constants/HttpStatus'
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

  async searchRecipes(): Promise<IResult[]> {
    try {
      const requestParams = { params: { i: this.ingredients.join(',') } }

      const response = await baseClient.get<SearchResults>('?', requestParams)

      return response.data.results
    } catch (error) {
      if (error?.response?.status >= BAD_REQUEST) {
        throw genericHttpError
      } else {
        throw genericError
      }
    }
  }
}

export default RecipePuppy
