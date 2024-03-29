import { MAX_INGREDIENTS_QUANTITY } from '@utils/constants/RecipePuppy'

import Contract from './IContract'

function everyIngredientIsBlank(ingredients: string[]) {
  return ingredients.every(ingredient => ingredient.trim() === '')
}

class RecipePuppyContract implements Contract {
  validate(ingredients: string[]): boolean {
    if (everyIngredientIsBlank(ingredients)) {
      return false
    }

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
