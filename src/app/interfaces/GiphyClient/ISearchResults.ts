import Giphy from '@interfaces/Giphy'

interface IGiphyImage {
  // eslint-disable-next-line camelcase
  fixed_height: Giphy
}

export default interface ISearchResults {
  data: [
    { images: IGiphyImage }
  ]
}
