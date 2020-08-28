document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('ua-UA', {
        currency: 'uah',
        style: 'currency'
    }).format(node.textContent)
})



// const toCurrency = price => {
//     return new Intl.NumberFormat('ua-UA', {
//         currency: 'uah',
//         style: 'currency'
//     }).format(price)
// }

// document.querySelectorAll('.price').forEach(node => {
//     node.textContent = toCurrency(node.textContent)
// })

// const $cart = document.querySelector('#cart')
// if ($cart) {
//     $cart.addEventListener('click', event => {
//         if (event.target.classList.contains('js-remove')) {
//             const id = event.target.dataset.id

//             fetch('/cart/delete/' + id, {
//                 method: 'delete'
//             }).then(res => res.json())
//               .then(cart => {
//                 if (cart.products.length) {
//                     const html = cart.products.map(c => {
//                         return `
//                             <tr>
//                                 <td>${c.title}</td>
//                                 <td>${c.count}</td>
//                                 <td>
//                                     <button class="btn btm-small js-remove" data-id="${c.id}">Удалить</button>
//                                 </td>
//                             </tr>
//                         `
//                     }).join('')
//                     $cart.querySelector('tbody').innerHHTML = html
//                     $cart.querySelector('.price').textContent = toCurrency(cart.totalPrice)
//                 } else {
//                     $cart.innerHTML = '<p>Корзина пуста</p>'
//                 }
//             })
//         }
//     })
// }