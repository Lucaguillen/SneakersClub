// CAPTURA DE ELEMENTOS PARA NAV
const cartBtn = document.querySelector(".cartBtn")
const productsBtn = document.getElementById("productsBtn")
const searchInput = document.getElementById("inputSearchNav")
const productsSection = document.querySelector(".sectionProducts")
productsBtn.addEventListener("click", () => {
    productsSection.scrollIntoView({ behavior: "smooth" })
})
searchInput.addEventListener("click", () => {
    productsSection.scrollIntoView({ behavior: "smooth" })
})
searchInput.addEventListener("input", () => {
    searchProducts()
})
// show cards
let currentPage = 1
let totalPages = 0
let data = []
let cart = []
const fetchData = async () => {
  const resp = await fetch("../json/data.json")
  data = await resp.json()
  showCards()
}
const showCards = (filteredData = data) => {
    const cardsPerPage = 8
    totalPages = Math.ceil(filteredData.length / cardsPerPage)
    const products1Capture = document.getElementById("products1")
    const startIndex = (currentPage - 1) * cardsPerPage
    const endIndex = startIndex + cardsPerPage
    const searchQuery = searchInput.value.toLowerCase().trim()
    products1Capture.innerHTML = ""
    filteredData.forEach((p, i) => {
        const marca = p.marca.toLowerCase()
        const modelo = p.modelo.toLowerCase()
        if (i >= startIndex && i < endIndex && (searchQuery === "" || marca.includes(searchQuery) || modelo.includes(searchQuery))) {
        let card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
            <div class="imagenCard">
                <img src=${p.imagen} alt="Producto">
            </div>
            <div class="detallesCard">
                <h2 class="tituloCard">${p.modelo}</h2>
                <p class="infoCard">Marca: ${p.marca}</p>
                <p class="infoCard" id="stock">Stock: ${p.stock}</p>
                <p class="precioCard">$ ${p.precio}</p>
                <button class="addCarrito" onClick="cartAdd(${i})">Agregar al carrito</button>
            </div>
            `
        products1Capture.appendChild(card)
        }
    })
}
// search filter
const searchProducts = () => {
    const searchQuery = searchInput.value.toLowerCase().trim()
    const filteredData = data.filter((p) => {
        const marca = p.marca.toLowerCase()
        const modelo = p.modelo.toLowerCase()
        return (searchQuery === "" || marca.includes(searchQuery) ||modelo.includes(searchQuery))
    })
    showCards(filteredData)
}
// refresh 
productsBtn.addEventListener("click", () => {
    searchInput.value = ""
    showCards(data)
})
// page nav
const pageSelectorL = document.querySelector(".pageSelectorL")
const pageSelectorR = document.querySelector(".pageSelectorR")
const nextPage = () => {
    if (currentPage < totalPages) {
        currentPage++
    }
    showCards()
}
const previousPage = () => {
    if (currentPage > 1) {
        currentPage--
    }
    showCards()
}
pageSelectorL.addEventListener("click", previousPage)
pageSelectorR.addEventListener("click", nextPage)
// NAV SCROLL INDEX
const containerNav = document.querySelector(".containerNav")
const sectionProductsOffset = productsSection.offsetTop
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY
    if (scrollY >= sectionProductsOffset) {
        containerNav.classList.add("scrollNav")
        cartBtn.classList.add("open")
    }else {
    containerNav.classList.remove("scrollNav")
    cartBtn.classList.remove("open")
    if(cartCapture.classList.contains("open")){
      cartCapture.classList.remove("open")
    }}
})
// show cart
const cartCapture = document.querySelector(".cart")
cartBtn.addEventListener("click", ()=>{
cartCapture.classList.toggle("open")})
// CART ADD
const cartAdd = (i)=>{
    const addProduct = data[i]
    cartCapture.classList.add("open")
    const productSelect = cart.findIndex((e)=>{
        return e.id === addProduct.id
    })
    if (productSelect === -1){
        addProduct.amount = 1
        addProduct.stock -= 1
        cart.push(addProduct)
        cartToStorage(cart)
        calculateTotal()
        refreshStock(addProduct.id)
        cardToCart()
    }else if(addProduct.stock !=0){
        cart[productSelect].amount += 1
        data[i].stock -=1
        cartToStorage(cart)
        refreshStock(addProduct.id)
        calculateTotal()
        cardToCart()
    }else{
        Swal.fire({
            title: '<strong> Product out of stock</strong>',
            icon: 'error',
            iconColor:'rgb(255, 0, 0)' ,
            confirmButtonText:
            'Ok',
            confirmButtonColor: '#898989' ,
        })
    } 
}
// data footer cart
let totalMoney = 0
let TotalProducts = 0
const captureTotalCart = document.querySelector("#importTotal")
const captureTotalProducts = document.querySelector("productsTotal")
const calculateTotal = ()=>{
    totalMoney = 0
    cart.forEach((p)=>{
        const priceTotal = p.precio * p.amount
        totalMoney += priceTotal
    })
    captureTotalCart.innerHTML=`
    <p class="infoCartText" id="importTotal">Importe total:$ ${totalMoney}</p>`
}

// show card on cart
const cardToCart = ()=>{
    cartCapture.innerHTML=`<div class="infoCart">
    <p class="infoCartText" id="importTotal">Importe total:$ ${totalMoney}</p>
    <button class="infoCartBtn" onClick="btnComprar()">Comprar</button>
    </div>`
    cart.forEach((p,i)=>{
        let card = document.createElement("div")
        card.className= "cardCart"
        card.innerHTML=  
        `
        <div class="imagenCard">
            <img src=${p.imagen} alt="Producto">
        </div>
        <div class="detallesCard">
            <h2 class="tituloCard">${p.modelo}</h2>
            <p class="precioCard">$ ${p.precio}</p>
            <p class="infoCard" id="cantidades">Cantidad: ${p.amount}</p>
        </div>
        <div class="btnProductCart">
            <button class="removeCarrito" onClick="removeCarrito(${p.id})" >Delete</button> 
            <div class="btnProductCart2">
                <button class="removeCarrito2" id="btnRemoveAmount" onClick="btnRemoveAmount(${p.id})" >-</button>
                <button class="removeCarrito2" id="btnAddAmount" onClick="btnAddAmount(${p.id})" >+</button>
            </div>
        </div>    
        `
        cartCapture.appendChild(card) 
    })
}
// refresh stock on products section cards
const refreshStock = (productId) => {
    const productIndex = data.findIndex((p) => p.id === productId)
    if (productIndex !== -1) {
        const stockCapture = document.querySelectorAll('#stock')
        const stockCard = stockCapture[productIndex]
        if (stockCard) {
            stockCard.textContent = `Stock: ${data[productIndex].stock}`
        }
    }
}
// products btn on cards
const removeCarrito = (productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId)
    if (productIndex !== -1) {
        const removedProduct = cart[productIndex]
        removedProduct.stock += removedProduct.amount
        cart.splice(productIndex, 1)
        cartToStorage(cart)
        refreshStock(productId)
        calculateTotal()
        cardToCart()
    }
}
const btnRemoveAmount = (productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId)
    if (productIndex !== -1) {
        const decreasedProduct = cart[productIndex]
        if (decreasedProduct.amount > 1) {
            decreasedProduct.amount--
            decreasedProduct.stock++
            refreshStock(productId)
            cartToStorage(cart)
            calculateTotal()
            cardToCart()
        }
    }
}
const btnAddAmount = (productId) => {
    const productIndex = cart.findIndex((p) => p.id === productId)
    if (productIndex !== -1) {
        const increasedProduct = cart[productIndex]
        if (increasedProduct.stock > 0) {
            increasedProduct.amount++
            increasedProduct.stock--
            refreshStock(productId)
            cartToStorage(cart)
            calculateTotal()
            cardToCart()
        }else{
            Swal.fire({
                title: '<strong> Product out of stock</strong>',
                icon: 'error',
                iconColor:'rgb(255, 0, 0)' ,
                confirmButtonText:
                'Ok',
                confirmButtonColor: '#898989' ,
            })
        }
    }
}
const btnComprar = () => {
    Swal.fire({
        title: 'Ingresa tus datos',
        html: `
            <input id="nombre" class="swal2-input" placeholder="Nombre completo">
            <input id="correo" class="swal2-input" placeholder="Correo electrónico">
            <input id="direccion" class="swal2-input" placeholder="Dirección de entrega">
        `,
        confirmButtonText: 'Comprar',
        confirmButtonColor: '#898989' ,
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value
            const direccion = Swal.getPopup().querySelector('#direccion').value
            if (!nombre || !direccion) {
                Swal.showValidationMessage('Por favor, completa todos los campos')
            }
            return { nombre, direccion }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { nombre, direccion } = result.value
            Swal.fire({
                title: `¡Gracias por tu compra, ${nombre}!`,
                html: `
                    <p>Hemos recibido tu pedido por un importe de <strong>$ ${totalMoney}</strong> y será entregado en la siguiente dirección:</p>
                    <p><strong>${direccion}</strong></p>
                `,
                icon: 'success',
                iconColor:'rgb(255, 0, 0)' ,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#898989' ,
            }).then(() => {
                cart = []
                calculateTotal()
                cardToCart()
                cartCapture.classList.toggle("open")
            });
        }
    })

}
/* GUARDA CARRT EN STORAGE */
const cartToStorage = (cart)=>{
    if (cart.length > 0){
        localStorage.setItem("cart", JSON.stringify(cart))
    }else{
        localStorage.setItem("cart", JSON.stringify([]))
    }  
}
if (localStorage.getItem("cart")){
    cart = JSON.parse(localStorage.getItem("cart"))
    calculateTotal()
    cardToCart()
}

  



fetchData()

