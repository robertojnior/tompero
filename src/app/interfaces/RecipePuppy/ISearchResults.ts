export interface IResult {
  title: string
  href: string
  ingredients: string
}

export default interface ISearchResults {
  results: IResult[]
}
