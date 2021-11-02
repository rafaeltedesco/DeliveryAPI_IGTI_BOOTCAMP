import deliveryRepository from '../repository/delivery.repository.js'
import deliveryServices from '../services/delivery.services.js'
import deliveryService from '../services/delivery.services.js'

const createPurchase = async(req, res)=> {
    const purchaseData = req.body

    const newPurchase = await deliveryService.createPurchase(purchaseData)
    
    res.status(200).send(newPurchase)
}

const updatePurchase = async(req, res)=> {
  let {id} = req.params
  let {entregue} = req.body
  if (!entregue) throw new Error("Campo entregue deve ser informado!")
  try {
    const purchase = await deliveryService.updatePurchase(id, entregue)
    res.status(200).send(purchase)
  }
  catch(err) {
    res.status(404).send(`Erro: ${err.message}`)
  } 
}


const deletePurchase = async(req, res)=> {
  let {id} = req.params
  try {
    await deliveryServices.deletePurchase(id)
    res.status(204).send()
  }
  catch(err) {
    res.status(404).send(err.message)
  }
}

const getPurchaseById = async(req, res)=> {
  let {id} = req.params
  try {
    const purchase = await deliveryServices.getPurchaseById(id)
    console.log(purchase)
    res.status(200).send(purchase)
  }
  catch(err){
    res.status(404).send(err.message)
  }
}


const getTotalByClient = async(req, res)=> {
  let {cliente} = req.body
  if (!cliente) return res.status(404).send(`Informe os dados do cliente!`)
  try {
    const total = await deliveryService.getTotalByClient(cliente)
    res.status(200).send(total)
  }
  catch(err) {
    res.status(404).send(err.message)
  }
}

const getTotalByProduct = async(req, res)=> {
  const {produto} = req.body
  if (!produto) return res.status(404).send('Produto deve ser informado!')
  try {
    const total = await deliveryServices.getTotalByProduct(produto)
    res.status(200).send(total)
  }
  catch(err) {
    res.status(404).send(err.message)
  }
}


const getMostSold = async(req, res)=> {
  try {
    const mostSold = await deliveryServices.getMostSoldProducts()
    res.status(200).send(mostSold)
  }
  catch(err) {
    res.status(404).send(err.message)
  }
}

export default {
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurchaseById,
  getTotalByClient,
  getTotalByProduct,
  getMostSold
}