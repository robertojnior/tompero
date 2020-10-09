export default interface IExtractedRecipe {
  title: string
  href: string
  ingredients: string[]
  gif: Promise<string>
}
