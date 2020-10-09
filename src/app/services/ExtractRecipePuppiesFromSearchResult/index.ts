import dotenv from 'dotenv'

import IExtractedRecipe from '@interfaces/ExtractRecipePuppiesFromSearchResult/IExtractedRecipe'
import IExtractProcess from '@interfaces/ExtractRecipePuppiesFromSearchResult/IExtractProcess'
import IRecipe from '@interfaces/Recipe'
import { IResult as RecipePuppySearchResult } from '@interfaces/RecipePuppyClient/ISearchResults'

import GiphyClient from '@clients/GiphyClient'

dotenv.config()

class ExtractRecipePuppiesFromSearchResult implements IExtractProcess {
  private recipeSearchResults: RecipePuppySearchResult[]
  private extractedRecipes!: IExtractedRecipe[]

  constructor(results: RecipePuppySearchResult[]) {
    this.recipeSearchResults = results
  }

  begin(): IExtractedRecipe[] {
    this.extractedRecipes = this.recipeSearchResults.map(recipeSearchResult => {
      const ingredients = recipeSearchResult.ingredients.split(',').map(ingredient => ingredient.trim()).sort()

      const gif = this.fetchRecipeGif(recipeSearchResult.title)

      return { ...recipeSearchResult, ingredients, gif }
    })

    return this.extractedRecipes
  }

  fetchRecipeGif(recipeTitle: string): Promise<string> {
    const giphyClient = new GiphyClient(recipeTitle)

    return giphyClient.searchGif()
  }

  complete(): Promise<IRecipe>[] {
    return this.extractedRecipes.map(async(extractedRecipe) => {
      const { title, ingredients, href: link } = extractedRecipe

      try {
        const gif = await extractedRecipe.gif

        return { title, ingredients, link, gif }
      } catch (error) {
        const gif = process.env.GIHPY_GIF_FALLBACK_URL as string

        return { title, ingredients, link, gif, message: error.message }
      }
    })
  }
}

export default ExtractRecipePuppiesFromSearchResult
