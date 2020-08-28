const {Router} = require('express')
const Product = require('../models/product')
const router = Router()

router.get('/', async (req, res) => {
    const products = await Product.getAllProducts()
    res.render('products', {
        title: 'Каталог товаров',
        isProducts: true,
        products
    })
})

router.get('/:id', async (req, res) => {
    const product = await Product.getByIdProduct(req.params.id)
    res.render('product', {
        title: `Cats Home Jungle ${product.title}`,
        product
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }
    const product = await Product.getByIdProduct(req.params.id)
    res.render('edit', {
        title: `Редактировать ${product.title}`,
        product
    })
})

router.post('/edit', async (req, res) => {
    await Product.updateProduct(req.body)
    res.redirect('/products')
})

module.exports = router