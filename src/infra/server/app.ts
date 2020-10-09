import express from 'express'

import routes from '@web/routes'

const app = express()

app.use(routes)

export default app
