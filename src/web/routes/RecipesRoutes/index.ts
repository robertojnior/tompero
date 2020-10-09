import { Router } from 'express'

import RecipesController from '@web/controllers/RecipesController'

const recipesRoutes = Router()

const recipesController = new RecipesController()

recipesRoutes.get('/', recipesController.index)

export default recipesRoutes
