import baseClient from '@clients/Giphy/baseClient'

describe('.defaults.baseUrl', () => {
  it('should equals to https://api.giphy.com/v1/gifs/search', () => {
    expect(baseClient.defaults.baseURL).toEqual('https://api.giphy.com/v1/gifs/search')
  })
})

describe('.defaults.params.api_key', () => {
  it('should equals to 5r7a049VRAfIfeBMds8A2ydnoZinkAtr', () => {
    expect(baseClient.defaults.params.api_key).toEqual('5r7a049VRAfIfeBMds8A2ydnoZinkAtr')
  })

  it('should not to be falsey', () => {
    expect(baseClient.defaults.params.api_key).not.toBe('')
    expect(baseClient.defaults.params.api_key).not.toBeNull()
    expect(baseClient.defaults.params.api_key).not.toBeUndefined()
  })
})
