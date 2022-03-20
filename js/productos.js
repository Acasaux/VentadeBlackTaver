//CLASE PRODUCTOS

class producto{
    constructor (id, nombre,precio,url,cantidad){
        this.id= parseInt(id);
        this.nombre=nombre;
        this.precio=parseFloat(precio);
        this.img=url;
        this.cantidad=cantidad || 1;
    }
    addCantidad(){
        this.cantidad++;                
    }
    subTotal(){
        return this.precio * this.cantidad;                
    }
    agregarCantidad(valor){
        this.cantidad += valor;
    }
}