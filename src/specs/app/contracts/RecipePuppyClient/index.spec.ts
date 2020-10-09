import RecipePuppyContract from '@contracts/RecipePuppyClient'
import { MAX_INGREDIENTS_QUANTITY } from '@utils/constants/RecipePuppy'

describe('.validate', () => {
  describe(`when ingredients quantity is greater than ${MAX_INGREDIENTS_QUANTITY}`, () => {
    it('should return false', () => {
      const ingredients = ['onion', 'tomato', 'pineapple', 'garlic']

      const recipePuppyContract = new RecipePuppyContract()

      expect(recipePuppyContract.validate(ingredients)).toBeFalsy()
    })
  })

  describe(`when ingredients separated by comma are more than ${MAX_INGREDIENTS_QUANTITY}`, () => {
    it('should return false', () => {
      const ingredients = ['onion, tomato', 'pineapple, garlic']

      const recipePuppyContract = new RecipePuppyContract()

      expect(recipePuppyContract.validate(ingredients)).toBeFalsy()
    })
  })

  describe(`when ingredients is not greater than ${MAX_INGREDIENTS_QUANTITY}`, () => {
    it('should return true', () => {
      const ingredients = ['onion', 'tomato', 'garlic']

      const recipePuppyContract = new RecipePuppyContract()

      expect(recipePuppyContract.validate(ingredients)).toBeTruthy()
    })
  })
})
