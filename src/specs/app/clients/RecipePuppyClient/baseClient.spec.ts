import recipePuppyBaseClient from '@clients/RecipePuppyClient/baseClient'

describe('.defaults.baseUrl', () => {
  it('should equals to process.env.RECIPE_PUPPY_BASE_URL', () => {
    expect(recipePuppyBaseClient.defaults.baseURL).toEqual(process.env.RECIPE_PUPPY_BASE_URL)
  })

  it('should not to be falsey', () => {
    expect(recipePuppyBaseClient.defaults.baseURL).not.toBe('')
    expect(recipePuppyBaseClient.defaults.baseURL).not.toBeNull()
    expect(recipePuppyBaseClient.defaults.baseURL).not.toBeUndefined()
  })
})
