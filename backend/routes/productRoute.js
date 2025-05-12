import express from 'express'
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController'

const productRoute = express.Router()

productRoute.post('/add', addProduct)
productRoute.post('/remove', removeProduct )
productRoute.post('/single', singleProduct )
productRoute.get('/list', listProducts )

export default productRoute;