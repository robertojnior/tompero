import baseClient from '@clients/RecipePuppy/baseClient'

describe('.defaults.baseUrl', () => {
  it('should equals to process.env.RECIPE_PUPPY_BASE_URL', () => {
    expect(baseClient.defaults.baseURL).toEqual(process.env.RECIPE_PUPPY_BASE_URL)
  })

  it('should not to be falsey', () => {
    expect(baseClient.defaults.baseURL).not.toBe('')
    expect(baseClient.defaults.baseURL).not.toBeNull()
    expect(baseClient.defaults.baseURL).not.toBeUndefined()
  })
})
