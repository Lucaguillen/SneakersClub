function Item (modelo,marca,precio,stock){
    this.modelo = modelo
    this.marca = marca
    this.precio = precio
    this.stock = stock
    this.chequeoStock = function (){
        alert(`Quedan ${this.stock} unidades disponibles de este producto`)
    }
}
const catalogo = [
    dunk = new Item ("dunk","nike",7300,3),
    airforce = new Item ("AirForce","nike",7800,5),
    mr530 = new Item ("mr530","NewBalance",5700,10),
    n550 = new Item ("550","NewBalance",8000,10), 
]
const carrito = []
/* function registrarse (){
    alert("Para continuar se debe registrar")
    let usuarioRegistro = prompt("Defina su nombre de usuario")
    let contrasenaRegistro = prompt("Defina su contraseña")
    if ((usuarioRegistro !== "") && (contrasenaRegistro !== "")){
        ingresar ()
    }else{
        alert("Los espacios no pueden estar vacios")
        registrarse()
    }
    function ingresar (){
        alert("Ingrese su usuario y contraseña")
        let usuarioIngreso = prompt("Ingrese su nombre de usuario")
        let contrasenaIngreso = prompt("Ingrese su contraseña")
        if ((usuarioRegistro === usuarioIngreso) && (contrasenaRegistro === contrasenaIngreso)){
            alert ("Sesión iniciada con exito, puede continuar al sitio")
            seleccionMarca()
        }else {
            alert("No se pudo iniciar la sesión, la contraseña o el usuario son incorrectos")
            ingresar()
        }
    }
} */
function seleccionMarca(){
    let marca = prompt("Seleccione que marca busca \n Nike \n New Blance")
    if (marca.toLowerCase() === "nike"){
        marcaNike()
    }else if (marca.toLowerCase() === "new balance"){
        marcaNewBalance ()
    }else{
        alert("Seleccione una marca correcta")
        seleccionMarca()
    }
}
function marcaNike(){
    let item = prompt("Seleccione el modelo de calzado: \n AirForce \n Dunk")
    if (item.toLowerCase() ==="airforce"){
        if (airforce.stock >0){
            alert("Seleccionaste AirForce por un precio de:" + " " + "$UY" + " " + airforce.precio)
            airforce.stock -= 1;
            airforce.chequeoStock()          
            carrito.push(airforce)
            pregunta = prompt("Desea seguir comprando? \n Si \n No")
        }else{
            alert("No queda stock de este producto, lo sentimos")
            pregunta = prompt("Desea seguir comprando? \n Si \n No")
        }
    }else if (item.toLowerCase() === "dunk"){ 
        if (dunk.stock >0){
            alert("Seleccionaste AirForce por un precio de:" + " " + "$UY" + " " + dunk.precio)
            dunk.stock -= 1;
            dunk.chequeoStock()          
            carrito.push(dunk)
            pregunta = prompt("Desea seguir comprando? \n Si \n No")
        }else{
            alert("No queda stock de este producto, lo sentimos")
            pregunta = prompt("Desea seguir comprando? \n Si \n No")
        }
    }else {
        alert ("Modelo incorrecto")
        marcaNike ()
    }
}
function marcaNewBalance(){
    let item = prompt("Seleccione el modelo de calzado: \n n550 \n mr530")
    if (item.toLowerCase() === "n550"){
        if (n550.stock >0){
            alert("Seleccionaste AirForce por un precio de:" + " " + "$UY" + " " + n550.precio)
            n550.stock -= 1;
            n550.chequeoStock()          
            carrito.push(n550)
            pregunta = prompt("Desea seguir comprando? \n Si \n No")
        }else{
            alert("No queda stock de este producto, lo sentimos")
            pregunta = prompt("Desea seguir comprando? \n Si \n No")
        }
    }else if (item.toLowerCase() === "mr530"){ 
        if (mr530.stock >0){
            alert("Seleccionaste AirForce por un precio de:" + " " + "$UY" + " " + mr530.precio)
            mr530.stock -= 1;
            mr530.chequeoStock()          
            carrito.push(mr530)
            pregunta = prompt("Desea seguir comprando? \n Si \n No")
        }else{
            alert("No queda stock de este producto, lo sentimos")
            pregunta = prompt("Desea seguir comprando? \n Si \n No")
        }
    }else {
        alert ("Modelo incorrecto")
        marcaNewBalance ()
    }
}
function mostrarCarrito() {
    let parrafo = "Carrito de compras:\n"  
    carrito.forEach((item) => {
      parrafo += (`Modelo: ${item.modelo} - Precio: $UY ${item.precio}\n`)
    })  
    alert(parrafo)
}
function mostrarUltimas(){
    const ultimasUnidades = catalogo.filter((item)=> item.stock <= 5)
    let parrafo = "¡Ultimas oportunidades! \n"
    for (const ultimas of ultimasUnidades){
        parrafo += (`Quedan solamente ${ultimas.stock} unidades del modelo ${ultimas.modelo} \n`)   
    }
    alert(parrafo)
    pregunta = prompt("Desea seguir comprando? \n Si \n No")
}



let pregunta
/* registrarse() */
seleccionMarca()
while (pregunta.toLowerCase() != "no"){
    if(pregunta.toLowerCase() === "si"){
        seleccionMarca ()
    }else{
        alert("Respuesta inválida. Por favor, ingrese 'si' o 'no'.")
        pregunta = prompt("Desea seguir comprando? \n Si \n No")
    }
}
mostrarCarrito()
mostrarUltimas()
alert("Muchas Gracias por su compra!") 