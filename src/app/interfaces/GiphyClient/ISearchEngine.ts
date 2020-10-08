import Giphy from '@interfaces/Giphy'

export default interface ISearchEngine {
  searchGif(): Promise<Giphy>
}
