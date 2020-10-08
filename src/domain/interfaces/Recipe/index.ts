import IGiphy from '@interfaces/Giphy'

export default interface IRecipe {
  title: string
  href: string
  ingredients: string[]
  gif: IGiphy
  message?: string
}
