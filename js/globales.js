
//VARIABLES DE ACCESO GLOBAL
const productos = [];
const carrito=[];
//INTERFAZ DEL CARRITO
const cantidadCarrito= document.getElementById('cantidad');
const productosCarrito= document.getElementById('productosCarrito');
const confirmar= document.getElementById('confirmar');
//SALDO FICTICIO
let saldoCliente=10000;

const totalCarritoInterfaz=document.getElementById('totalCarrito');

//CONSTANTES PARA EL BUSCADOR
const formulario = document.querySelector("#formulario");
const boton = document.querySelector("#boton");
const botonl=document.querySelector("#botonL")
const resultado= document.querySelector("#resultado");