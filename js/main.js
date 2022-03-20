

//CREACION DE PRODUCTOS FICTICIOS
fetch("data/ProductosAleatorios.json")
  .then(respuesta=>respuesta.json())
  .then(data=>{
    console.log(data);
    for (const literal of data) {
      productos.push(new producto(literal.id, literal.nombre, literal.precio, literal.img, literal.cantidad));

    }
    console.log(productos);
    //GENERACION DE LA INTERFAZ PARA LOS PRODUCTOS
    productosUI(productos, 'productosContenedor');

  })
  .catch((mensaje) => {
    alertaEstado(mensaje, "error")
  })

//BOTONES Y ENVIO
confirmar.onclick = () => {
  let total = totalCarrito();
  saldoCliente -= total;
  
  promesaCompra(saldoCliente).then((mensaje) => {
    productosCarrito.innerHTML = ` <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`
    fetch('prov/provincias.json')
      .then((respuesta) => {
        
        return respuesta.json()
        
      }).then((datos) => {
        console.log(datos);
        productosCarrito.innerHTML = `<h3>Info del Envio</h3>
                                      <select id="provFiltro" class='color'></select> 
                                      <select id="munFiltro" class='color'></select>
                                      <button id="btnEnvio" class='color'>Enviar</button>`;
        
        const provFiltro = document.getElementById('provFiltro');
      
        for (const provincia of datos.provincias) {
          provFiltro.innerHTML += `<option value="${provincia.id}">${provincia.nombre}</option>`;
        }
        
        provFiltro.onchange = () => {
          let idProvincia = provFiltro.value;
          console.log(idProvincia);
         
          let rutaBusqueda = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProvincia}&campos=id,nombre&max=100`;
          fetch(rutaBusqueda)
            .then(respuesta => respuesta.json())
            .then(datos => {
              console.log(datos);
    
              let munFiltro = document.getElementById('munFiltro');
              for (const municipio of datos.municipios) {
                munFiltro.innerHTML += `<option value="${municipio.id}">${municipio.nombre}</option>`;
              }
              
              document.getElementById('btnEnvio').onclick = () => {
                console.log("ENVIAR A " + munFiltro.value + " EN  PROVINCIA ID " + idProvincia);
                
                fetch('https://jsonplaceholder.typicode.com/posts', {
                  method: 'POST',
                  body: JSON.stringify({
                    carrito: carrito, 
                    idProvincia: idProvincia,
                    idMunicipio: munFiltro.value
                  }),
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
                 
                }).then(respuesta => respuesta.json())
                  .then(data => {
                    Swal.fire(
                      'Compra Confirmada',
                      "PEDIDO N° " + data.id + " EN CAMINO",
                      'success'
                    )
                  })
              }
            })
        }
      })
      .catch((mensaje) => { console.log(mensaje) })
    
  }).catch((mensaje) => {
    alertaEstado(mensaje, "error")
  })


}



//EJECUCION DEL BUSCADOR
boton.addEventListener("click",filtrar);

formulario.addEventListener("keyup",filtrar);
filtrar();

botonl.addEventListener("click",limpiar);
//FIN EJECUCION DEL BUSCADOR



localStorage.setItem("lenguaje","JavaScript");
localStorage.setItem("seccion1","Tienda Tragos Principales");
