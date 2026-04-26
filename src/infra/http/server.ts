import express from 'express'
import { routes } from './routes'
import { errorHandler } from './middlewares/errorHandler'
import swaggerUi from 'swagger-ui-express'
const swaggerFile = require('../../docs/swagger.json')

const app = express()

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)
app.use(errorHandler)

app.listen(3333, () => {
  console.log('Server started on http://localhost:3333')
})
