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
        mostrarInventario();
        llenarDatalist();
    } else {
        // Si no hay datos en localStorage, cargar desde products.json
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                inventario = data.map(producto => new Producto(producto.id, producto.name, producto.price, producto.quantity));
                guardarInventario(); // Guardar los datos iniciales en localStorage
                mostrarInventario();
                llenarDatalist();
            })
            .catch(error => console.error('Error al cargar los datos del inventario:', error));
    }
}

// Función para guardar el inventario en localStorage
function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Función para mostrar el inventario en la tabla
function mostrarInventario() {
    const tableBody = document.querySelector('#inventory-table tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla 

    inventario.forEach(producto => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = producto.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = producto.nombre;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = producto.precio;
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = producto.cantidad;
        row.appendChild(quantityCell);

        tableBody.appendChild(row);
    });
}

// Función para llenar el datalist
function llenarDatalist() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = ''; // Limpiar el datalist 

    inventario.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.nombre;
        listaProductos.appendChild(option);
    });

    const optionNuevo = document.createElement('option');
    optionNuevo.value = 'Crear nuevo';
    listaProductos.appendChild(optionNuevo);
}

// Función para agregar un nuevo producto
function agregarProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const precioProducto = parseFloat(document.getElementById('precioProducto').value);
    const cantidadProducto = parseInt(document.getElementById('cantidadProducto').value);

    if (!nombreProducto || isNaN(precioProducto) || isNaN(cantidadProducto)) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Determinar el siguiente ID disponible
    const siguienteId = inventario.length > 0 ? Math.max(...inventario.map(p => p.id)) + 1 : 1;

    // Crear un nuevo producto
    const nuevoProducto = new Producto(siguienteId, nombreProducto, precioProducto, cantidadProducto);

    // Agregar el nuevo producto al inventario
    inventario.push(nuevoProducto);

    // Guardar el inventario actualizado
    guardarInventario();

    // Mostrar el inventario actualizado
    mostrarInventario();

    // Actualizar el datalist
    llenarDatalist();

    alert(`Producto creado: ${nombreProducto}, cantidad: ${cantidadProducto}`);

    // Limpiar los campos del formulario
    document.getElementById('nombreProducto').value = '';
    document.getElementById('precioProducto').value = '';
    document.getElementById('cantidadProducto').value = '';
}

// Función para ajustar el inventario
function ajustarInventario() {
    const nombreAjuste = document.getElementById('nombreAjuste').value.trim();
    const cantidadAjuste = parseInt(document.getElementById('cantidadAjuste').value, 10);
    const tipoAjuste = document.querySelector('input[name="tipoAjuste"]:checked').value;
    const motivoAjuste = document.getElementById('motivoAjuste').value.trim();

    // Validar campos
    if (!nombreAjuste || isNaN(cantidadAjuste) || !motivoAjuste) {
        alert('Por favor, completa todos los campos para ajustar el inventario.');
        return;
    }

    // Buscar el producto en el inventario
    const productoExistente = inventario.find(producto => producto.nombre === nombreAjuste);

    if (productoExistente) {
        console.log('Producto antes del ajuste:', productoExistente);

        // Asegúrate de que la cantidad es un número
        const cantidadActual = Number(productoExistente.cantidad); // Convertir a número
        const ajuste = Number(cantidadAjuste); // Convertir a número

        console.log(`Tipo de ajuste: ${tipoAjuste}`);
        console.log(`Cantidad actual: ${cantidadActual}`);
        console.log(`Cantidad a ajustar: ${ajuste}`);

        // Ajustar la cantidad
        if (tipoAjuste === 'aumentar') {
            productoExistente.cantidad = cantidadActual + ajuste;
            console.log(`Cantidad después de aumentar: ${productoExistente.cantidad}`);
        } else if (tipoAjuste === 'disminuir') {
            productoExistente.cantidad = Math.max(0, cantidadActual - ajuste);
            console.log(`Cantidad después de disminuir: ${productoExistente.cantidad}`);
        }

        // Guardar y mostrar el inventario actualizado
        guardarInventario();
        mostrarInventario();

        alert(`Inventario ajustado: ${nombreAjuste} ${tipoAjuste} en ${ajuste} unidades. Motivo: ${motivoAjuste}`);

        // Limpiar formulario
        document.getElementById('nombreAjuste').value = '';
        document.getElementById('cantidadAjuste').value = '';
        document.querySelector('input[name="tipoAjuste"][value="aumentar"]').checked = true;
        document.getElementById('motivoAjuste').value = '';
    } else {
        alert('El producto no existe en el inventario.');
    }
}

// Asignar eventos a los botones
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();

    const botonAgregar = document.getElementById('botonAgregar');
    const botonAjustar = document.getElementById('botonAjustar');

    botonAgregar.addEventListener('click', agregarProducto);
    botonAjustar.addEventListener('click', ajustarInventario);
});
