// Clase Producto
class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

// Inicialización del inventario
let inventario = [];

// Función para cargar productos desde localStorage o products.json
function cargarProductos() {
    const inventarioGuardado = localStorage.getItem('inventario');

    if (inventarioGuardado) {
        // Si hay datos en localStorage, cargarlos
        inventario = JSON.parse(inventarioGuardado).map(producto => new Producto(producto.id, producto.nombre, producto.precio, producto.cantidad));
        mostrarInventario(); // Esta función debe estar en main.js
        llenarDatalist(); // Esta función también debe estar en main.js
    } else {
        // Si no hay datos en localStorage, cargar desde products.json
        fetch('js/products.json')
            .then(response => response.json())
            .then(data => {
                inventario = data.map(producto => new Producto(producto.id, producto.name, producto.price, producto.quantity));
                guardarInventario(); // Guardar los datos iniciales en localStorage
                mostrarInventario(); // Invocar la función de main.js
                llenarDatalist(); // Invocar la función de main.js
            })
            .catch(error => console.error('Error al cargar los datos del inventario:', error));
    }
}

// Función para guardar el inventario en localStorage
function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

