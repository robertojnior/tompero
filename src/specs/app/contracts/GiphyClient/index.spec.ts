import { defaultSearchTerm, emptySearchTerm } from '@mocks/GiphyClient/SearchTerms'

import GiphyClientContract from '@contracts/GiphyClient'

const giphyClientContract = new GiphyClientContract()

describe('.validate', () => {
  describe('when search term length is greater than zero', () => {
    it('should return true', () => {
      expect(giphyClientContract.validate(defaultSearchTerm)).toBeTruthy()
    })
  })

  describe('when search term length is equal to zero', () => {
    it('should return false', () => {
      expect(giphyClientContract.validate(emptySearchTerm)).toBeFalsy()
    })
  })
})
