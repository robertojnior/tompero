import Contract from './IContract'

class GiphyContract implements Contract {
  validate(searchTerm: string): boolean {
    return searchTerm.length !== 0
  }
}

export default GiphyContract
