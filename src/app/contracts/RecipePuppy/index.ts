import { MAX_INGREDIENTS_QUANTITY } from '@constants/RecipePuppy'

import Contract from './IContract'

class RecipePuppyContract implements Contract {
  validate(ingredients: string[]): boolean {
    if (ingredients.length > MAX_INGREDIENTS_QUANTITY) {
      return false
    }

    if (ingredients.join(',').split(',').length > MAX_INGREDIENTS_QUANTITY) {
      return false
    }

    return true
  }
}

export default RecipePuppyContract
