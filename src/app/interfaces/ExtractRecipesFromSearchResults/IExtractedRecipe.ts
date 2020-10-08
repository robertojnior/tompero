import IGiphy from '@interfaces/Giphy'

export default interface IExtractedRecipe {
  title: string
  href: string
  ingredients: string[]
  gif: Promise<IGiphy>
}
