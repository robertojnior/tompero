import HttpError from '@utils/errors/HttpError'

const genericError = new Error('An unexpected error occurred while trying to fetch the results. Contact support.')
const genericHttpError = new HttpError('The server is not available and cannot respond to your request. Please try again later.')

export {
  genericError,
  genericHttpError
}
