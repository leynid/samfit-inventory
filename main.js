// Declarar variables, constantes y arrays
let inventario = []; // Array para almacenar los productos en el inventario
const IVA = 0.21; // Constante para establecer Alicuota IVA 

// Actualizar la lista de productos en el datalist
function actualizarListaProductos() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = ""; // Limpiar la lista existente
    console.log("Actualizando lista de productos..."); // Debugging

    // Agregar cada producto del inventario con cantidad mayor a cero como opción en el datalist
    inventario.forEach(producto => {
        if (producto.cantidad > 0) {
            let option = document.createElement("option");
            option.value = producto.nombre;
            lista.appendChild(option);
        }
    });

    console.log("Lista actualizada:", inventario); // Debugging
}

// Agregar un producto al inventario.
function agregarProducto() {
    let nombre = document.getElementById("nombreProducto").value; // Obtener el nombre del producto
    let precio = parseFloat(document.getElementById("precioProducto").value); // Obtener el precio del producto
    let cantidad = parseInt(document.getElementById("cantidadProducto").value); // Obtener la cantidad del producto

    // Validaciones básicas
    if (!nombre || isNaN(precio) || isNaN(cantidad) || precio <= 0 || cantidad <= 0) {
        alert("Por favor, ingrese un nombre, precio y cantidad válidos.");
        console.log("Error en agregar producto:", { nombre, precio, cantidad }); // Debugging
        return;
    }

    // Crear un objeto producto y agregarlo al inventario
    let producto = { nombre, precio, cantidad };
    inventario.push(producto);

    alert(`Producto agregado: ${nombre} - Precio: $${precio.toFixed(2)} ARS - Cantidad: ${cantidad}`);

    // Actualizar la lista de productos en el datalist
    actualizarListaProductos();

    // Limpiar los campos de entrada
    document.getElementById("nombreProducto").value = '';
    document.getElementById("precioProducto").value = '';
    document.getElementById("cantidadProducto").value = '';

    console.log("Producto agregado:", producto); // Debugging
}

// Ajustar el inventario (disminuir cantidad).
function ajustarInventario() {
    let nombre = document.getElementById("nombreAjuste").value; // Obtener el nombre del producto a ajustar
    let cantidad = parseInt(document.getElementById("cantidadAjuste").value); // Obtener la cantidad a ajustar
    let motivo = document.getElementById("motivoAjuste").value; // Obtener el motivo del ajuste

    // Validaciones básicas
    if (!nombre || isNaN(cantidad) || cantidad <= 0 || !motivo) {
        alert("Por favor, ingrese un nombre, cantidad y motivo válidos.");
        console.log("Error en ajustar inventario:", { nombre, cantidad, motivo }); // Debugging
        return;
    }

    // Buscar el producto en el inventario
    let producto = inventario.find(prod => prod.nombre.toLowerCase() === nombre.toLowerCase());

    // Verificar si el producto está en el inventario
    if (!producto) {
        alert("El producto no está en el inventario.");
        console.log("Producto no encontrado:", nombre); // Debugging
        return;
    }

    // Verificar si hay suficiente cantidad para ajustar
    if (producto.cantidad < cantidad) {
        alert("No hay suficiente cantidad en el inventario para ajustar.");
        console.log("Cantidad insuficiente para ajustar:", producto.cantidad, cantidad); // Debugging
        return;
    }

    // Confirmar el ajuste
    let confirmar = confirm(`¿Desea ajustar ${cantidad} unidad(es) de ${nombre} por motivo de: ${motivo}?`);
    if (!confirmar) {
        alert("Ajuste cancelado.");
        console.log("Ajuste cancelado para:", nombre); // Debugging
        return;
    }

    // Realizar el ajuste
    producto.cantidad -= cantidad;

    alert(`Inventario ajustado: ${nombre} - Cantidad ajustada: ${cantidad} - Motivo: ${motivo}`);

    // Actualizar la lista de productos en el datalist después del ajuste
    actualizarListaProductos();

    // Limpiar los campos de entrada
    document.getElementById("nombreAjuste").value = '';
    document.getElementById("cantidadAjuste").value = '';
    document.getElementById("motivoAjuste").value = '';

    console.log("Inventario ajustado:", producto); // Debugging
}

// Mostrar el inventario en el HTML.
function mostrarInventario() {
    let output = document.getElementById("output"); // Obtener el contenedor para mostrar el inventario
    output.innerHTML = ""; // Limpiar el contenido existente
    console.log("Mostrando inventario..."); // Debugging

    // Verificar si el inventario está vacío
    if (inventario.length === 0) {
        output.innerHTML = "El inventario está vacío.";
        console.log("Inventario vacío"); // Debugging
        return;
    }

    // Mostrar cada producto en el inventario
    inventario.forEach(producto => {
        output.innerHTML += `<p>${producto.nombre} - Precio: $${producto.precio.toFixed(2)} ARS - Cantidad: ${producto.cantidad}</p>`;
    });

    console.log("Inventario mostrado:", inventario); // Debugging
}
