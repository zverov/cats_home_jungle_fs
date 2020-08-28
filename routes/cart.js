const {Router} = require('express')
const Cart = require('../models/cart')
const Product = require('../models/product')
const router = Router()

router.get('/', async (req, res) => {
    const cart = await Cart.getAllProductInCart()
    res.render('cart', {
        title: 'Корзина',
        isCart: true,
        products: cart.products,
        price: cart.totalPrice
    })
})

router.post('/add', async (req, res) => {
    const product = await Product.getByIdProduct(req.body.id)
    await Cart.addProductToCart(product)
    res.redirect('/cart')
})

router.post('/delete/:id', async (req, res) => {
    const cart = await Cart.deleteProductInCart(req.params.id)

    //res.status(200).json(cart)
    
    res.redirect('/cart')
})

module.exports = router