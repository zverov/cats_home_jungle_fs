const path = require('path')
const fs = require('fs')

const pathToCart = path.join(
    path.dirname(process.mainModule.filename),
    'DB',
    'cart.json'
)

// const readFile = new Promise((resolve, reject) => {
//     fs.readFile(pathToCart, 'utf-8', (error, content) => {
//         if (error) {
//             reject(error)
//         } else {
//             resolve(JSON.parse(content))
//         }
//     })
// })

// const writeFile = new Promise((resolve, reject) => {
//     fs.writeFile(pathToCart, JSON.stringify(cart), (error) => {
//         if (error) {
//             reject(error)
//         } else {
//             resolve()
//         }
//     })
// })

class Cart {

    static async getAllProductInCart() {
        return new Promise((resolve, reject) => {
            fs.readFile(pathToCart, 'utf-8', (error, content) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }

    static async addProductToCart(product) {
        const cart = await Cart.getAllProductInCart()
        const index = cart.products.findIndex(c => c.id === product.id)
        const checkAvaliable = cart.products[index]
        if (checkAvaliable) {
            checkAvaliable.count++
            checkAvaliable.countPrice = product.price*checkAvaliable.count
            cart.products[index] = checkAvaliable
        } else {
            product.count = 1
            product.countPrice = product.price
            cart.products.push(product)
        }
        cart.totalPrice += +product.price
        

        return new Promise((resolve, reject) => {
            fs.writeFile(pathToCart, JSON.stringify(cart), (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve()
                }
            })
        })
    }

    static async deleteProductInCart(id) {
        const cart = await Cart.getAllProductInCart()
        const index = cart.products.findIndex(c => c.id === id)
        const product = cart.products[index]
        if (product.count === 1) {
            cart.products = cart.products.filter(c => c.id !== id)
        } else {
            cart.products[index].count--
            cart.products[index].countPrice = cart.products[index].price*cart.products[index].count
        }
        cart.totalPrice -= product.price
        
        //return writeFile()

        return new Promise((resolve, reject) => {
            fs.writeFile(pathToCart, JSON.stringify(cart), (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(cart)
                }
            })
        })
    }
}

module.exports = Cart