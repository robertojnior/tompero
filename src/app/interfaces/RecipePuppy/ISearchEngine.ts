import Recipe from './IRecipe'

export default interface ISearchEngine {
  searchRecipes(): Promise<Recipe[]>
}
