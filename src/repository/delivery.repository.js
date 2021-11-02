import { promises } from 'fs'

const { readFile, writeFile } = promises

const getPurchases = async() => {
  try 
  {
    const purchases = JSON.parse(await readFile(global.filename))
    return purchases
  }
  catch(err) 
  {
    console.log(`Arquivo não encontrado: ${err.message}`)
    return {}
  }
  
}

const savePurchases = async(purchases) => {
  try {
    await writeFile(global.filename, JSON.stringify(purchases, null, 2))
  }
  catch(err) {
    console.log(`Erro ao registro novo pedido ${err.message}`)
  }
}


export default {
  getPurchases,
  savePurchases
}