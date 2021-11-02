import deliveryRepository from '../repository/delivery.repository.js'

const getPurchaseById = async(id)=> {
  const purchases = await getPurchases()
  const purchaseIndex = await getPurchaseIndexById(id)
  if (!purchaseIndex && purchaseIndex !== 0) throw new Error(`Purchase ID: ${id} não encontrado!`)
  return purchases.pedidos[purchaseIndex]
}


const getPurchases = async() => {
  const purchases = await deliveryRepository.getPurchases()
  return purchases
}

const getPurchaseIndexById = async(id)=> {
  const purchases = await getPurchases()
  const purchaseIndex = purchases.pedidos.findIndex(purchase=> purchase && purchase.id === parseInt(id))
  return purchaseIndex
}

const createPurchase = async(purchaseData)=> {
  try {
    const purchases = await getPurchases()
    if (!(purchaseData.cliente
       && purchaseData.produto 
       && purchaseData.valor)) {
      throw new Error('Necessário informar dados de cliente, produto e valor')
    }
    
    const newPurchase = {
      "id": purchases.nextId++,
       ...purchaseData, 
       "entregue": false,
       "timestamp": new Date()
    }

    purchases.pedidos.push(newPurchase)
    
    await deliveryRepository.savePurchases(purchases)

    return newPurchase

  }
  catch(err) {
    console.log(`Erro na criação de novo pedido ${err.message}`)
  }
  
}


const updatePurchase = async(id, entregue) => {
  const purchases = await getPurchases()
  const purchaseIndex = await getPurchaseIndexById(id)
  if (!purchaseIndex) throw new Error(`Pedido com ID: ${id} não encontrado!`)

  purchases.pedidos[purchaseIndex].entregue = entregue
  await deliveryRepository.savePurchases(purchases)
  return purchases.pedidos[purchaseIndex]
}

const deletePurchase = async(id) => {
  const purchases = await getPurchases()
  const purchaseIndex = await getPurchaseIndexById(id)
  if (!purchaseIndex) throw new Error(`Pedido com ID: ${id} não encontrado!`)

  delete purchases.pedidos[purchaseIndex]
  await deliveryRepository.savePurchases(purchases)
}

const getPurchasesByClientName = async(cliente)=> {
  const purchases = await getPurchases()
  const clientPurchases = purchases.pedidos.filter(purchase=>{
    if (purchase && purchase.hasOwnProperty('cliente')) {
      return purchase.cliente.toLowerCase() === cliente.toLowerCase() && purchase.entregue
    }
    return false
  })
  return clientPurchases  
}

const getTotalByClient = async(cliente)=> {
  const clientPurchases = await getPurchasesByClientName(cliente)
  const total = clientPurchases.reduce((left, right)=>left +right.valor, 0)
  return {total}
}

const getPurchasesByProduct = async(produto)=> {
  const purchases = await getPurchases()
  const productPurchases = purchases.pedidos
  .filter(purchase=>{
    if (purchase && purchase.hasOwnProperty("produto")) {
      return purchase.produto.toLowerCase() === produto.toLowerCase() && purchase.entregue
    }
    return false
  })
  return productPurchases
}

const getTotalByProduct = async(produto) =>{
  const productPurchases = await getPurchasesByProduct(produto)
  const total = productPurchases.reduce((left, right)=> left + right.valor, 0)
  return {total}
}

const countSales = (purchases)=>{
  const sales = {}
  purchases.forEach(purchase=> {
    if (!sales[purchase.produto]){
      sales[purchase.produto] = 1
    }
    else sales[purchase.produto]++
  })

  const listOfSales = []
  for (let key in sales) {
    listOfSales.push({ 
      produto: key, 
      totalVendido: sales[key]
    })
  }
  return listOfSales
}

const sortAscending = (data)=> {
  return data.sort((a, b)=> b.totalVendido - a.totalVendido)
}

const getMostSoldProducts = async()=> {
  const sales = await getPurchases()

  const deliveredSales = sales.pedidos.filter(sale=>sale.entregue)
  const mostSolds = sortAscending(countSales(deliveredSales))
  
  return mostSolds.map(sale=> `${sale.produto} - ${sale.totalVendido}`)
}

export default {
  getPurchases,
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurchaseById,
  getTotalByClient,
  getTotalByProduct,
  getMostSoldProducts
}