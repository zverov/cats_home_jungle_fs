const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'О нас',
        isHome: true
    })
})

module.exports = router