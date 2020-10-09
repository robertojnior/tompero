import RecipePuppySearchEngine from '@interfaces/RecipePuppyClient/ISearchEngine'
import RecipePuppySearchResults, { IResult as RecipePuppySearchResult } from '@interfaces/RecipePuppyClient/ISearchResults'

import RecipePuppyClientContract from '@contracts/RecipePuppyClient'

import { BAD_REQUEST } from '@utils/constants/HttpStatuses'
import { genericError, genericHttpError } from '@utils/errors'
import ArgumentError from '@utils/errors/ArgumentError'

import baseClient from './baseClient'

class RecipePuppy implements RecipePuppySearchEngine {
  private ingredients: string[]

  constructor(ingredients: string[]) {
    const recipePuppyClientContract = new RecipePuppyClientContract()

    if (!recipePuppyClientContract.validate(ingredients)) {
      throw new ArgumentError('Must have less than four ingredients.')
    }

    this.ingredients = ingredients
  }

  async searchRecipes(): Promise<RecipePuppySearchResult[]> {
    try {
      const requestParams = { params: { i: this.ingredients.join(',') } }

      const response = await baseClient.get<RecipePuppySearchResults>('?', requestParams)

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
