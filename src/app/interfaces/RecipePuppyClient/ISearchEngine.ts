import { IResult as RecipePuppySearchResult } from './ISearchResults'

export default interface ISearchEngine {
  searchRecipes(): Promise<RecipePuppySearchResult[]>
}
