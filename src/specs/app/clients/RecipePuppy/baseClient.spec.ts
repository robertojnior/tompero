import baseClient from '@clients/RecipePuppy/baseClient'

describe('.defaults.baseUrl', () => {
  it('should equals to http://www.recipepuppy.com/api', () => {
    expect(baseClient.defaults.baseURL).toEqual('http://www.recipepuppy.com/api')
  })
})
