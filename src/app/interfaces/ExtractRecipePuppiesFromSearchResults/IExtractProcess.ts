import IRecipe from '@interfaces/Recipe'

import IExtractedRecipe from './IExtractedRecipe'

export default interface IExtractProcess {
  begin(): IExtractedRecipe[]
  fetchRecipeGif(recipeTitle: string): Promise<string>
  complete(): Promise<IRecipe>[]
}
