export default interface ISearchResults {
  data: [
    {
      images: {
        // eslint-disable-next-line camelcase
        fixed_height: {
          url: string
        }
      }
    }
  ]
}
