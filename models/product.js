const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')

class Product {
    constructor(title, price, image) {
        this.title = title,
        this.price = price,
        this.image = image,
        this.id = uuidv4()
    }

    toAdd() {
        return ({
            title: this.title,
            price: this.price,
            image: this.image,
            id: this.id
        })
    }

    async addProduct() {
        const products = await Product.getAllProducts()
        products.push(this.toAdd())
        
        // try {
        //     await fs.writeFile(
        //         path.join(__dirname, '..', 'DB', 'products.json'),
        //         JSON.stringify(products)
        //     )
        // } catch (error) {
        //     console.log(error)
        // }

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'DB', 'products.json'),
                JSON.stringify(products),
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static getAllProducts() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'DB', 'products.json'),
                'utf-8',
                (error, content) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })
    }

    static async getByIdProduct(id) {
        const products = await Product.getAllProducts()
        return products.find(c => c.id === id)
    }

    static async updateProduct(product) {
        const products = await Product.getAllProducts()
        const productIndex = products.findIndex(c => c.id === product.id)
        products[productIndex] = product
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'DB', 'products.json'),
                JSON.stringify(products),
                (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
}

module.exports = Product