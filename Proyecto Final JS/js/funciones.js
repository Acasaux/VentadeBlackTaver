//creacion del producto
function productosUI(productos, id) {
        let productosRender = document.getElementById(id);
        productosRender.innerHTML = "";
        for (const producto of productos) {
                let divProducto = document.createElement("div");
                divProducto.classList.add('col');
                divProducto.innerHTML = `
        <div class="card mb_temp" style="width: 18rem;">
        <div class="card-body">
        <h2 class="card-title titulo tragos" >${producto.nombre}</h2>
    </div>
      <img src="${producto.img}" class="card-img-top" alt="martini">
      <div class="card-body">
        
        <p class="card-text">
          <h3>Precio: $${producto.precio}</h3>
        </p>
        <button type="button" class="btn btn-info agregar btnCompra" id="${producto.id}" >Comprar</button>
      </div>
      </div>`
                productosRender.append(divProducto);
        }
        seleccionarProducto();
}

function seleccionarProducto() {
        let botones = document.getElementsByClassName('btnCompra');
        for (const boton of botones) {
                boton.addEventListener('click', function () {
                        let seleccion = carrito.find(producto => producto.id == this.id);
                        if (seleccion) {
                                seleccion.agregarCantidad(1);
                        } else {
                                seleccion = productos.find(producto => producto.id == this.id);
                                carrito.push(seleccion);
                        }
                        localStorage.setItem('Carrito', JSON.stringify(carrito));
                        carritoHTML(carrito);
                        totalCarrito();
//TOASTIFY PARA LAS ALERTAS DE COMPRA
                        Toastify({
                                text: `Se ha agregado el producto: ${seleccion.nombre}`,
                                duration: 3000,
                                style: {
                                        background: "linear-gradient(to right, black, grey)",
                                },
                                gravity: "bottom"
                        }).showToast();
                })
        }

}

//INTERFAZ DE MODAL
function carritoHTML(lista) {
        cantidadCarrito.innerHTML = lista.length;
        productosCarrito.innerHTML = "";
        for (const producto of lista) {
                let prod = document.createElement('div');
                prod.innerHTML = `${producto.nombre} 
                <span class="badge bg-warning text-dark">Precio: $ ${producto.precio}</span>
                <span class="badge bg-primary">Cantidad: ${producto.cantidad}</span>
                <span class="badge bg-dark">Subtotal: $${producto.subTotal()}</span>
                <a id="${producto.id}" class="btn btn-info btn-add">+</a>
                <a id="${producto.id}" class="btn btn-info btn-sub">-</a>
                <a id="${producto.id}" class="btn btn-info btn-delete">x</a>`;
                productosCarrito.append(prod);
        }
        document.querySelectorAll('.btn-delete').forEach(boton => boton.onclick = eliminarCarrito);
        document.querySelectorAll('.btn-add').forEach(boton => boton.onclick = addCarrito);
        document.querySelectorAll('.btn-sub').forEach(boton => boton.onclick = subCarrito);
        
        totalCarrito();
}
//FUNCION PARA ELIMINAR DEL CARRITO
function eliminarCarrito(e) {
        let posicion = carrito.findIndex(producto => producto.id == e.target.id);
        carrito.splice(posicion, 1);
        carritoHTML(carrito);
        localStorage.setItem('Carrito', JSON.stringify(carrito));
}

//FUNCION PARA AGREGAR DEL CARRITO
function addCarrito() {
        let producto = carrito.find(p => p.id == this.id);
        producto.agregarCantidad(1);
        this.parentNode.children[1].innerHTML = "Cantidad: " + producto.cantidad;
        this.parentNode.children[2].innerHTML = "Subtotal: " + producto.subTotal();
        totalCarrito();
        localStorage.setItem('Carrito', JSON.stringify(carrito));
}

//FUNCION PARA QUITAR ELEMENTOS AGREGADOS DEL CARRITO
function subCarrito() {
        let producto = carrito.find(p => p.id == this.id);
        if (producto.cantidad > 1) {
                producto.agregarCantidad(-1);
                this.parentNode.children[1].innerHTML = "Cantidad: " + producto.cantidad;
                this.parentNode.children[2].innerHTML = "Subtotal: " + producto.subTotal();
                totalCarrito();
                localStorage.setItem('Carrito', JSON.stringify(carrito));
        }
}

//PROMESAS
function promesaCompra(saldo) {
        return new Promise(function (aceptado, rechazado) {
                if (saldo > 0) {
                        aceptado('Compra realizada');

                } else {
                        rechazado('Compra rechazada');
                }
        })
}
//TOTAL DEL CARRITO
function totalCarrito() {
        let total = carrito.reduce((totalCompra, actual) => totalCompra += actual.subTotal(), 0);
        totalCarritoInterfaz.innerHTML = "Total: $" + total;
        return total;
}
//MODIFICACION DEL LOCAL STORAGE SEGUN CARRITO
function vaciarCarrito() {
        localStorage.clear();
        carrito.splice(0, carrito.length);
        carritoHTML(carrito);
        totalCarritoInterfaz.innerHTML = "Total: $" + 0;
}
//ALERTAS PARA CATCH
function alertaEstado(mensaje, tipo) {
        Swal.fire(
                'Estado de compra',
                mensaje,
                tipo
        )

}

//BUSCADOR
const filtrar = ()=>{

        
        resultado.innerHTML="";
        const texto = formulario.value.toLowerCase();

        for (const producto of productos) {
                
                let nombre = producto.nombre.toLowerCase();
                if(nombre.indexOf(texto) !== -1){
                resultado.innerHTML += `
                <div class="card mb_temp" style="width: 18rem;">
                <div class="card-body">
                <h2 class="card-title titulo tragos" >${producto.nombre}</h2>
                </div>
                <img src="${producto.img}" class="card-img-top" alt="martini">
                <div class="card-body">
                
                <p class="card-text">
                <h3>Precio: $${producto.precio}</h3>
                </p>
                <button type="button" class="btn btn-info agregar btnCompra" id="${producto.id}" >Comprar</button>
                </div>
                </div>
                ` 
                }
        
        }seleccionarProducto();
        
        
}
//LIMPIADOR DEL BUSCADOR
function limpiar(){
        resultado.innerHTML="";  
}