import Giphy from '@clients/Giphy'
import IExtractedRecipe from '@interfaces/ExtractRecipesFromSearchResults/IExtractedRecipe'
import IExtractProcess from '@interfaces/ExtractRecipesFromSearchResults/IExtractProcess'
import IGiphy from '@interfaces/Giphy'
import IRecipe from '@interfaces/Recipe'
import { IResult as SearchResult } from '@interfaces/RecipePuppy/ISearchResults'
import { FALLBACK_GIF_URL } from '@utils/constants/GiphyClient'

class ExtractRecipesFromSearchResults implements IExtractProcess {
  private recipeSearchResults: SearchResult[]
  private extractedRecipes!: IExtractedRecipe[]

  constructor(results: SearchResult[]) {
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

  fetchRecipeGif(recipeTitle: string): Promise<IGiphy> {
    const giphyClient = new Giphy(recipeTitle)

    return giphyClient.searchGif()
  }

  complete(): Promise<IRecipe>[] {
    return this.extractedRecipes.map(async(extractedRecipe) => {
      try {
        const gif = await extractedRecipe.gif

        return { ...extractedRecipe, gif }
      } catch (error) {
        const gif = { url: FALLBACK_GIF_URL }

        return { ...extractedRecipe, gif, message: error.message }
      }
    })
  }
}

export default ExtractRecipesFromSearchResults
