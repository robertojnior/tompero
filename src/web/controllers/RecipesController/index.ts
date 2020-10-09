import { Request, Response } from 'express'

import RecipePuppyClient from '@clients/RecipePuppyClient'

import ExtractRecipePuppiesFromSearchResult from '@services/ExtractRecipePuppiesFromSearchResult'

import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE } from '@utils/constants/HttpStatuses'
import ArgumentError from '@utils/errors/ArgumentError'
import HttpError from '@utils/errors/HttpError'

function sanitizeIngredients(ingredients: string) {
  if (!ingredients) {
    return []
  }

  const splittedIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

  return splittedIngredients.filter(ingredient => ingredient !== '')
}

class RecipesController {
  async index(request: Request, response: Response): Promise<Response<unknown>> {
    const { i: ingredients } = request.query

    try {
      const sanitizedIngredients = sanitizeIngredients(ingredients as string)

      const recipePuppyClient = new RecipePuppyClient(sanitizedIngredients)
      const recipesRearchResults = await recipePuppyClient.searchRecipes()

      const extractRecipePuppiesFromSearchResult = new ExtractRecipePuppiesFromSearchResult(recipesRearchResults)

      extractRecipePuppiesFromSearchResult.begin()

      const recipes = await Promise.all(extractRecipePuppiesFromSearchResult.complete())

      return response.status(OK).json({ keywords: sanitizedIngredients, recipes })
    } catch (error) {
      if (error instanceof ArgumentError) {
        return response.status(BAD_REQUEST).json({ error: error.message })
      }

      if (error instanceof HttpError) {
        return response.status(SERVICE_UNAVAILABLE).json({ error: error.message })
      }

      return response.status(INTERNAL_SERVER_ERROR).json({ error: error.message })
    }
  }
}

export default RecipesController
