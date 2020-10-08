import IGiphy from '@interfaces/Giphy'
import IRecipe from '@interfaces/Recipe'

import IExtractedRecipe from './IExtractedRecipe'

export default interface IExtractProcess {
  begin(): IExtractedRecipe[]
  fetchRecipeGif(recipeTitle: string): Promise<IGiphy>
  complete(): Promise<IRecipe>[]
}
