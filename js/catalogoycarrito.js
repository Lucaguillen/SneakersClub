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
const contenedorCaptura = document.getElementById("contenedor")
const catalogoCaptura = document.getElementById("catalogo")
const mostrarCatalogo = ()=>{
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
            <p class="infoCard" id="stock">Stock: ${p.stock}</p>
            <p class="precioCard">$ ${p.precio}</p>
            <button class="addCarrito" onClick="carritoDom(${i})">Agregar al carrito</button>
        </div>
        `
        catalogoCaptura.appendChild(card)
    });
}
mostrarCatalogo()

/* GENERA EL CARRITO */
const carritoCaptura = document.getElementById("carrito")
const totalesCaptura = document.getElementById("totales")
const mostrarCarrito = ()=>{
    carritoCaptura.className="carrito"
    totalesCaptura.className="totales"
    calcularTotal()
}
const carritoDom = (i)=>{
    if (carrito.length === 0){
        mostrarCarrito()
        addCarrito(i)
        calcularTotal()
    }else{
        addCarrito(i)
        calcularTotal()
    }
}
const calcularTotal = ()=>{
    let total = 0
    carrito.forEach((p)=>{
        const precioTotal = p.precio * p.cantidad
        total += precioTotal
    })
    totalesCaptura.innerHTML=`
        <h2 class="titulo">Total: ${total} </h2>
        <button class="comprarbtn" onClick="comprar()" >Comprar</button>`
}
/* FUNCION QUE AÑADE PRODUCTOS */
const addCarrito = (i)=>{
    const productoSelect = carrito.findIndex((e)=>{
        return e.id === catalogo[i].id
    })
    const addProducto = catalogo[i]
    if ((productoSelect === -1) && (addProducto.stock !=0)){
        addProducto.cantidad = 1
        addProducto.stock -= 1
        carrito.push(addProducto)
        carritoAStorage(carrito)
        cardAlCarrito()    
        actualizarStockHTML(i)
    }else if (addProducto.stock !=0){
        carrito[productoSelect].cantidad += 1
        carrito[productoSelect].stock -= 1   
        carritoAStorage(carrito)
        cardAlCarrito()
        actualizarStockHTML(i)
    }else{
        Swal.fire({
            title: '<strong>Producto sin stock </strong>',
            icon: 'error',
            iconColor:'#898989' ,
            confirmButtonText:
            'Ok!',
            customClass:{
                confirmButton: 'btnFinalizar',
        }
        })
    }   
}
const actualizarStockHTML = (i) => {
    const capturaStocks = document.querySelectorAll('#stock');
    const stockCard = capturaStocks[i];
    stockCard.textContent = `Stock: ${catalogo[i].stock}`;
};
/* FUNCION QUE MANDA LA CARD AL CARRITO */
const limpiarCarritoHTML =()=>{
    carritoCaptura.innerHTML=`<h2 class="titulo">Carrito</h2>`
}
const cardAlCarrito = ()=>{
    carritoCaptura.className="carrito"
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
            <p class="precioCard">$ ${p.precio}</p>
            <p class="infoCard">Cantidad en el carrito: ${p.cantidad}</p>
            <button class="removeCarrito" >Eliminar del carrito</button>
        </div>
        `
        carritoCaptura.appendChild(card) 
    });
}
/* GUARDA CARRITO EN STORAGE */
const carritoAStorage = (carrito)=>{
    localStorage.setItem("carrito", JSON.stringify(carrito))  
}
if (localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
    calcularTotal()
    mostrarCarrito()
    cardAlCarrito()
}
const formulario = document.createElement("div")
const comprar = () => {
    totalesCaptura.className="esconder"
    catalogoCaptura.className="esconder"
    carritoCaptura.className="esconder"
    contenedorCaptura.className="block"
    formulario.className="formulario"
    formulario.innerHTML=`
    <div class="formContainer">
        <form>
            <div class="form">
                <label class="formLabel" for="nombre">Nombre</label>
                <input id="nombreInput" class="formInput" type="text">
            </div>
            <div class="form">
                <label class="formLabel" for="apellido">Apellido</label>
                <input class="formInput" type="text">
            </div>
            <div class="form">
                <label class="formLabel" for="numero">Número de contacto</label>
                <input class="formInput" type="text">
            </div>
                <div class="form">
                <label class="formLabel" for="direccion">Dirección de entrega</label>
                <input id="dirInput" class="formInput" type="text">
            </div>
            <button type="button" class="btnFinalizar" onClick="finalizarCompra()">Finalizar compra</button>
            <button type="button" class="addCarrito" onClick="volver()">Volver</button>
        </form>
    </div>
    `
    contenedorCaptura.appendChild(formulario)
}
const finalizarCompra= ()=>{
    carrito=[]
    carritoAStorage(carrito)
    limpiarCarritoHTML()
    calcularTotal()
    const nombre = document.getElementById("nombreInput").value
    const dir = document.getElementById("dirInput").value
    Swal.fire({
        title: '<strong>Compra realizada con exito </strong>',
        icon: 'success',
        iconColor:'#898989' ,
        html:
            `Muchas gracias por tu compra <b>${nombre}</b> 
            el envio llegara a <b>${dir}</b> en un maximo de 72hs
          `,
        confirmButtonText:
            'Ok!',
        customClass:{
            confirmButton: 'btnFinalizar',
        }
    })
    contenedorCaptura.appendChild(formulario)
    reset()
    console.log(carrito)

}
const reset= ()=>{
    totalesCaptura.className="esconder"
    catalogoCaptura.className="catalogo"
    carritoCaptura.className="esconder"
    contenedorCaptura.className="contenedor"
    formulario.className="esconder"
}
const volver= ()=>{
    totalesCaptura.className="totales"
    catalogoCaptura.className="catalogo"
    carritoCaptura.className="carrito"
    contenedorCaptura.className="contenedor"
    formulario.className="esconder"

}
  

