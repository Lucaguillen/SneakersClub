function Item (modelo,marca,precio,stock){
    this.modelo = modelo
    this.marca = marca
    this.precio = precio
    this.stock = stock
    this.chequeoStock = function (){
        alert(`Quedan ${this.stock} unidades disponibles de este producto`)
    }
}
const dunk = new Item ("dunk","nike",7300,10)
const airforce = new Item ("AirForce","nike",7800,10)
const mr530 = new Item ("mr530","NewBalance",5700,10)
const n550 = new Item ("550","NewBalance",8000,10)
const carrito = []


function registrarse (){
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
}
function seleccionMarca(){
    let marca = prompt("Seleccione que marca busca \n Nike \n New Blance")
    if ((marca === "nike") || (marca === "Nike")){
        marcaNike()
    }else if ((marca=== "New Balance")|| (marca==="new balance")){
        marcaNewBalance ()
    }else{
        alert("Seleccione una marca correcta")
        seleccionMarca()
    }
}
function ingreseCodigo (){
    let codigo = prompt("Ingrese codigo de descuento si conoce uno, de lo contrario ingrese 0")
    if (codigo === codigoDescuento){
       DescuentoAplicado = precio * descuento / 100
       alert("Se aplicó codigo del %50 de descuento")
    }else if (codigo == "0"){
       DescuentoAplicado = 0
    }else{
        alert(" Codigo de descuento incorrecto")
        ingreseCodigo ()
    }
}
function marcaNike(){
    let item = prompt("Seleccione el modelo de calzado: \n AirForce \n Dunk")
    if ((item === "Airforce") || (item === "airforce")){
        ingreseCodigo (precio = airforce.precio * 1.22)
        let PrecioFinal = precio - DescuentoAplicado
        alert("Seleccionaste AirForce por un precio de:" + " " + "$UY" + " " + PrecioFinal)
        if (airforce.stock > 0){
            airforce.stock -= 1;
        }
        
        airforce.precio = PrecioFinal
        carrito.push(airforce)
        pregunta = prompt("Desea seguir comprando? \n Si \n No")
    }else if ((item === "Dunk") || (item === "dunk")){ 
        ingreseCodigo (precio = dunk.precio *1.22)
        let PrecioFinal = precio - DescuentoAplicado
        alert("Seleccionaste Dunk por un precio de:" + " " + "$UY" + " " + PrecioFinal)
        dunk.stock -= 1;
        pregunta = prompt("Desea seguir comprando? \n Si \n No")
    }else {
        alert ("Modelo incorrecto")
        marcaNike ()
    }
}
function marcaNewBalance(){
    let item = prompt("Seleccione el modelo de calzado: \n 550 \n MR530")
    if (item === "550"){
        ingreseCodigo (precio = n550.precio * 1.22)
        let PrecioFinal = precio - DescuentoAplicado
        alert("Seleccionaste 550 por un precio de:" + " " + "$UY" + " " + PrecioFinal)
        n550.stock -= 1;
        pregunta = prompt("Desea seguir comprando? \n Si \n No")
    }else if ((item === "MR530") || (item === "mr530")){ 
        ingreseCodigo (precio = mr530.precio *1.22)
        let PrecioFinal = precio - DescuentoAplicado
        alert("Seleccionaste MR530 por un precio de:" + " " + "$UY" + " " + PrecioFinal)
        mr530.stock -= 1;
        pregunta = prompt("Desea seguir comprando? \n Si \n No")
    }else {
        alert ("Modelo incorrecto")
        marcaNewBalance ()
    }
}
let codigoDescuento = "LucaGuillenMiAlumnoFavorito"
let DescuentoAplicado = 0
let descuento = 50 
let pregunta
registrarse()
while ((pregunta != "no") || (pregunta === "No")) {
    if((pregunta === "si") || (pregunta === "Si")){
        seleccionMarca ()
    }
}
alert("Muchas Gracias por su compra!")