import express from 'express'
import dotenv from 'dotenv'
import deliveryService from '../src/services/delivery.services.js'

global.filename = './src/data/pedidos.json'

dotenv.config({path: './config/.env'})

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=> {
  try {
    const purchases = await deliveryService.getPurchases()
  }
  catch(err) {
    console.log('Arquivo "pedidos.json" não encontrado!')
  }

  console.log(`Server up and running on port ${PORT}`)
})


export default app