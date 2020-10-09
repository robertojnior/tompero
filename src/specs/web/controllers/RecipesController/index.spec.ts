import request from 'supertest'

import app from '@infra/server/app'

import giphyBaseClient from '@clients/GiphyClient/baseClient'
import recipePuppyBaseClient from '@clients/RecipePuppyClient/baseClient'

import { OK, BAD_REQUEST, SERVICE_UNAVAILABLE, INTERNAL_SERVER_ERROR } from '@utils/constants/HttpStatuses'

import invalidHttpStatuses from '@mocks/InvalidHttpStatuses'
import { recipes } from '@mocks/RecipePuppyClient/Recipes'
import recipePuppySearch from '@mocks/RecipePuppyClient/SearchResults'

jest.mock('@clients/RecipePuppyClient/baseClient')
jest.mock('@clients/GiphyClient/baseClient')

const mockedRecipePuppyBaseClient = recipePuppyBaseClient as jest.Mocked<typeof recipePuppyBaseClient>
const mockedGiphybaseClientBaseClient = giphyBaseClient as jest.Mocked<typeof recipePuppyBaseClient>

describe('.index', () => {
  describe('with valid query params', () => {
    describe('when recipe puppy api is available', () => {
      describe('and no unexpected error occurs', () => {
        beforeEach(() => {
          const pastaSaladGiphyUrl = 'https://media.giphy.com/media/xBRhcST67lI2c/giphy.gif'
          const pastaSaladGiphySearch = { data: { data: [{ images: { fixed_height: { url: pastaSaladGiphyUrl } } }] } }

          const tomatoAlfredoGiphyUrl = 'https://media.giphy.com/media/I3eVhMpz8hns4/giphy.gif'
          const tomatoAlfredoGiphySearch = { data: { data: [{ images: { fixed_height: { url: tomatoAlfredoGiphyUrl } } }] } }

          mockedRecipePuppyBaseClient.get.mockResolvedValue(recipePuppySearch)

          return mockedGiphybaseClientBaseClient.get
            .mockResolvedValueOnce(pastaSaladGiphySearch)
            .mockResolvedValueOnce(tomatoAlfredoGiphySearch)
        })

        it('should return 200 Ok', done => {
          request(app)
            .get('/recipes?i=onion,tomato,burguer')
            .then(response => {
              expect(response.status).toBe(OK)

              done()
            })
        })

        it('should return a object with searched ingredients and recipes list', done => {
          request(app)
            .get('/recipes?i=onion,tomato,burguer')
            .then(response => {
              expect(response.body).toEqual({
                keywords: ['onion', 'tomato', 'burguer'],
                recipes: recipes
              })

              done()
            })
        })
      })

      describe('and an unexpected error occurs', () => {
        beforeEach(() => {
          return mockedRecipePuppyBaseClient.get.mockRejectedValue({ error: 'Unexpected error' })
        })

        it('should return 500 Internal Server Error', done => {
          request(app)
            .get('/recipes?i=onion,tomato,burguer')
            .then(response => {
              expect(response.status).toBe(INTERNAL_SERVER_ERROR)

              done()
            })
        })

        it('should return error message', done => {
          request(app)
            .get('/recipes?i=onion,tomato,burguer')
            .then(response => {
              expect(response.body).toEqual({
                error: 'An unexpected error occurred while trying to fetch the results. Contact support.'
              })

              done()
            })
        })
      })
    })

    describe('when recipe puppy api is unavailable', () => {
      describe.each(invalidHttpStatuses)('and responds with %i %s', status => {
        beforeEach(() => {
          const rejectedValue = { response: { status: status } }

          return mockedRecipePuppyBaseClient.get.mockRejectedValue(rejectedValue)
        })

        it('should return 503 Service Unavailable', done => {
          request(app)
            .get('/recipes?i=onion,tomato,burguer')
            .then(response => {
              expect(response.status).toBe(SERVICE_UNAVAILABLE)

              done()
            })
        })

        it('should return error message', done => {
          request(app)
            .get('/recipes?i=onion,tomato,burguer')
            .then(response => {
              expect(response.body).toEqual({
                error: 'The server is not available and cannot respond to your request. Please try again later.'
              })

              done()
            })
        })
      })
    })
  })

  describe('with invalid query params', () => {
    describe('when there are no ingredients on the search', () => {
      it('should return 400 Bad Request', done => {
        request(app)
          .get('/recipes?,,,,')
          .then(response => {
            expect(response.status).toBe(BAD_REQUEST)

            done()
          })
      })

      it('should return error message', done => {
        request(app)
          .get('/recipes')
          .then(response => {
            expect(response.body).toEqual({ error: 'You must provide one to three ingredients.' })

            done()
          })
      })
    })

    describe('when there are more than three ingredients on the search', () => {
      it('should return 400 Bad Request', done => {
        request(app)
          .get('/recipes?i=onion,tomato,burguer,butter')
          .then(response => {
            expect(response.status).toBe(BAD_REQUEST)

            done()
          })
      })

      it('should return error message', done => {
        request(app)
          .get('/recipes?i=onion,tomato,burguer,butter')
          .then(response => {
            expect(response.body).toEqual({ error: 'You must provide one to three ingredients.' })

            done()
          })
      })
    })
  })
})
