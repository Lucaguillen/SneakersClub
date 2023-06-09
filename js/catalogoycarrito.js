let carrito = []
const catalogo = [
    {
        id: 1,
        modelo: "dunk",
        marca: "nike",
        precio: 7300,
        stock: 3,
        imagen: "./img/dunk.png",
        chequeoStock: function (){
            alert(`Quedan ${this.stock} unidades disponibles de este producto`)}
    },
    {
        id: 2,
        modelo: "airForce",
        marca: "nike",
        precio: 7800,
        stock: 5,
        imagen: "./img/airforce.png",
        chequeoStock: function (){
            alert(`Quedan ${this.stock} unidades disponibles de este producto`)}
    },
    {
        id: 3,
        modelo: "mr530",
        marca: "NewBalance",
        precio: 7700,
        stock: 10,
        imagen: "./img/530.png",
        chequeoStock: function (){
            alert(`Quedan ${this.stock} unidades disponibles de este producto`)}
    },
    {
        id: 4,
        modelo: "550",
        marca: "NewBalance",
        precio: 8000,
        stock: 10,
        imagen: "./img/550.png",
        chequeoStock: function (){
            alert(`Quedan ${this.stock} unidades disponibles de este producto`)}
    },
]
/* CREA LAS CARD DE LOS PRODUCTOS EN EL CATALOGO */
const catalogoCaptura = document.getElementById("catalogo")
catalogo.forEach((p,i)=>{
let card = document.createElement("div");
card.className= "card"
card.innerHTML=  
`
<div class="imagenCard">
    <img src=${p.imagen} alt="Producto">
</div>
<div class="detallesCard">
    <h2 class="tituloCard">${p.modelo}</h2>
    <p class="infoCard">Marca: ${p.marca}</p>
    <p class="infoCard">Stock: ${p.stock}</p>
    <p class="precioCard">$ ${p.precio}</p>
    <button class="addCarrito" onClick="carritoDom(${i})">Agregar al carrito</button>
</div>
`
catalogoCaptura.appendChild(card)
});
/* GENERA EL CARRITO */
const carritoCaptura = document.getElementById("carrito")
const h2CarritoCaptura = document.getElementById("h2carrito")
const carritoDom = (i)=>{
    if (carrito.length === 0){
        carritoCaptura.className="carrito"
        addCarrito(i)
    }else{
        addCarrito(i)
    }
}
/* FUNCION QUE AÑADE PRODUCTOS */
function limpiarCarritoHTML(){
    carritoCaptura.innerHTML=`<h2 class="titulo">Carrito</h2>`
}
const addCarrito = (i)=>{
    const productoSelect = carrito.findIndex((e)=>{
        return e.id === catalogo[i].id
    })
    const addProducto = catalogo[i]
    if ((productoSelect === -1) && (addProducto.stock !=0)){
        addProducto.cantidad = 1
        addProducto.stock -= 1
        carrito.push(addProducto)
        cardAlCarrito()    
    }else if (addProducto.stock !=0){
        carrito[productoSelect].cantidad += 1
        carrito[productoSelect].stock -= 1   
    }else{
        alert("producto sin stock")
    }   
}

/* FUNCION QUE MANDA LA CARD AL CARRITO */
const cardAlCarrito = ()=>{
    limpiarCarritoHTML()
    carrito.forEach((p,i)=>{
        let card = document.createElement("div");
        card.className= "card"
        card.innerHTML=  
        `
        <div class="imagenCard">
            <img src=${p.imagen} alt="Producto">
        </div>
        <div class="detallesCard">
            <h2 class="tituloCard">${p.modelo}</h2>
            <p class="infoCard">Marca: ${p.marca}</p>
            <p class="precioCard">$ ${p.precio}</p>
            <button class="removeCarrito" >Eliminar del carrito</button>
        </div>
        `
        carritoCaptura.appendChild(card) 
    });
}


