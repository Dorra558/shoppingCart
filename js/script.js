let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: 'Shoes',
        tag: 'nike',
        price: 70,
        inCart: 0
    },
    {
        name: 'Bag',
        tag: 'gucci',
        price: 90,
        inCart: 0
    },
    {
        name: 'T-shirt',
        tag: 't-shirt',
        price: 80,
        inCart: 0
    }
]
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
    if (productNumbers) {
        document.querySelector('.panier span').textContent = productNumbers
    }
}

function cartNumbers(product) {

    let productNumbers = localStorage.getItem('cartNumbers')

    // console.log(typeof productNumbers)
    productNumbers = parseInt(productNumbers) // convert string to number 
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1); // s'il existe un produit ajoute le dans localStorage
        document.querySelector('.panier span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1); // s'il n'existe aucun produit je défini localStorage pour définir le numéro de panier de product sur 1
        document.querySelector('.panier span').textContent = 1
    }
    setItems(product)
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems) //pass from JSON into javascript object
    console.log('My CartItems are', cartItems)

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }

    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
    let cart = localStorage.getItem("totalCost")
    console.log(`my total cost are`, totalCost)
    console.log(typeof cartCost)
    if (cart != null) {
        cart = parseInt(cart);
        localStorage.setItem('totalCost', cart + product.price)
    } else {
        localStorage.setItem('totalCost', product.price)
    }
}



function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('.products')
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems)
    if (cartItems && productContainer) {
        productContainer.innerHTML = ''

        // initialement quand j'actualise pour qu'il devient vide
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
           
              <div class="product py-3 d-flex justify-content-around">
                <img class="imgCart" src='./imgs/${item.tag}.jpg'>
                <span>${item.name}</span> 
                <div class="quantity"> 
                <i class="increase far fa-arrow-alt-circle-up"></i>
                <span>${item.inCart}</span>  
                <i class="decrease far fa-arrow-alt-circle-down"></i>
                </div>
                <span> ${item.price},00 DT</span> 
                <span> ${item.inCart * item.price},00 DT 
              </div>
            `
                // <i class="fas fa-trash-alt"></i>
        })
        productContainer.innerHTML += `
        <div class="container totalStock">
             <div class="row py-3">
             <div class="col-md-3 offset-5">
             <a href="#" class="btn btn-brand butonBlack empty">Empty basket</a>     
             </div>
                <div class="col-md-2"
                <h4 id="totlaProduct"> Total </h4>
                </div>
                <div class="col-md-2"
                <h4 id="totlaProduct"> ${cartCost},00 DT </h4>
                </div>
             </div> 
        </div>
        `


        var clearCart = document.querySelector(".empty")
        clearCart.addEventListener("click", () => {
            localStorage.clear()
            productContainer.innerHTML = ''
            document.querySelector('.panier span').textContent = 0;

        })

    }

}




onLoadCartNumbers() // quand j'actualise la page le nombre de produit dans la panier reste stocké
displayCart()