import { Router } from 'express'

import recipesRoutes from './RecipesRoutes'

const routes = Router()

routes.use('/recipes', recipesRoutes)

export default routes
