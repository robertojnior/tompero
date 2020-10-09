import baseClient from '@clients/Giphy/baseClient'

describe('.defaults.baseUrl', () => {
  it('should equals to process.env.GIPHY_BASE_URL', () => {
    expect(baseClient.defaults.baseURL).toEqual(process.env.GIPHY_BASE_URL)
  })

  it('should not to be falsey', () => {
    expect(baseClient.defaults.params.api_key).not.toBe('')
    expect(baseClient.defaults.params.api_key).not.toBeNull()
    expect(baseClient.defaults.params.api_key).not.toBeUndefined()
  })
})

describe('.defaults.params.api_key', () => {
  it('should equals to process.env.GIPHY_API_KEY', () => {
    expect(baseClient.defaults.params.api_key).toEqual(process.env.GIPHY_API_KEY)
  })

  it('should not to be falsey', () => {
    expect(baseClient.defaults.params.api_key).not.toBe('')
    expect(baseClient.defaults.params.api_key).not.toBeNull()
    expect(baseClient.defaults.params.api_key).not.toBeUndefined()
  })
})
