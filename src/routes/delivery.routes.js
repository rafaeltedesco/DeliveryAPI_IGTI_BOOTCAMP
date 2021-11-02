import express from 'express'
import deliveryController from '../controllers/delivery.controller.js'


const router = express.Router()


router.post('/pedidos', deliveryController.createPurchase)
router.put('/pedidos/:id', deliveryController.updatePurchase)
router.delete('/pedidos/:id', deliveryController.deletePurchase)
router.get('/pedidos/:id', deliveryController.getPurchaseById)
router.get('/cliente', deliveryController.getTotalByClient)
router.get('/produto', deliveryController.getTotalByProduct)
router.get('/produto/maisVendidos', deliveryController.getMostSold)

export default router