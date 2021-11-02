import app from './config/server.js'
import deliveryRoutes from './src/routes/delivery.routes.js'


app.use('/delivery/api/v1', deliveryRoutes)

