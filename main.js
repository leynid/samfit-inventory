// Declarar variables, constantes y arrays
let inventario = []; // Array para almacenar los productos en el inventario
const IVA = 0.21; // Constante para establecer Alicuota IVA 

// Función para formatear texto: Primera letra en mayúscula y el resto en minúscula
function capitalizarTexto(texto) {
    return texto
        .toLowerCase() // Convertir todo el texto a minúsculas
        .split(' ') // Dividir el texto en palabras
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)) // Capitalizar la primera letra de cada palabra
        .join(' '); // Unir las palabras de nuevo
}

// Función para obtener la fecha y hora actual en formato legible
function obtenerFechaHora() {
    let fecha = new Date();
    return fecha.toLocaleString(); // Formato "dd/mm/yyyy, hh:mm:ss"
}

// Cargar el inventario desde localStorage
function cargarInventario() {
    let datos = localStorage.getItem('inventario');
    if (datos) {
        inventario = JSON.parse(datos);
        console.log("Inventario cargado desde localStorage:", inventario); // Debugging
    }
    actualizarListaProductos();
    mostrarInventario(); // Mostrar inventario cargado al iniciar
}

// Guardar el inventario en localStorage
function guardarInventario() {
    try {
        localStorage.setItem('inventario', JSON.stringify(inventario));
        console.log("Inventario guardado en localStorage:", inventario); // Debugging
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
    }
}

// Actualizar la lista de productos en el datalist
function actualizarListaProductos() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = ""; // Limpiar la lista existente

    // Crear un conjunto para evitar duplicados en la lista
    let nombresProductos = new Set();

    // Agregar cada producto del inventario como opción en el datalist
    inventario.forEach(producto => {
        let nombreCapitalizado = capitalizarTexto(producto.nombre);
        if (!nombresProductos.has(nombreCapitalizado)) {
            let option = document.createElement("option");
            option.value = nombreCapitalizado; // Aplicar formateo
            lista.appendChild(option);
            nombresProductos.add(nombreCapitalizado);
        }
    });

    // Agregar la opción "Crear nuevo" al final del datalist
    let crearNuevoOption = document.createElement("option");
    crearNuevoOption.value = capitalizarTexto("Crear nuevo"); // Aplicar formateo
    lista.appendChild(crearNuevoOption);

    console.log("Lista actualizada con opción 'Crear nuevo':", inventario); // Debugging
}

// Manejar la selección de la opción "Crear nuevo"
function manejarSeleccionProducto() {
    let nombreProductoInput = document.getElementById("nombreProducto");
    let seleccion = nombreProductoInput.value;

    if (capitalizarTexto(seleccion) === capitalizarTexto("Crear nuevo")) {
        // Lógica para manejar la creación de un nuevo producto
        alert("Seleccione 'Crear nuevo' para agregar un nuevo producto.");
        nombreProductoInput.value = ''; // Limpiar el campo para que el usuario ingrese el nombre del nuevo producto
    }
}

// Agregar un nuevo producto al inventario
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

    // Convertir nombre a minúsculas para la comparación
    let nombreEnMinusculas = nombre.toLowerCase();

    // Verificar si el producto ya existe en el inventario con el mismo precio
    let productoExistente = inventario.find(prod => prod.nombre === nombreEnMinusculas && prod.precio === precio);

    if (productoExistente) {
        alert("El producto con el mismo nombre y precio ya existe en el inventario.");
        console.log("Producto duplicado:", nombre); // Debugging
        return;
    }

    // Crear un objeto producto y agregarlo al inventario
    let producto = { nombre: nombreEnMinusculas, precio, cantidad, fechaHora: obtenerFechaHora() }; // Convertir el nombre a minúsculas para mantener consistencia
    inventario.push(producto);

    // Guardar el inventario en localStorage
    guardarInventario();

    alert(`Producto agregado: ${capitalizarTexto(nombre)} - Precio: $${precio.toFixed(2)} ARS - Cantidad: ${cantidad} - Fecha y Hora: ${producto.fechaHora}`);

    // Actualizar la lista de productos en el datalist
    actualizarListaProductos();

    // Limpiar los campos de entrada
    document.getElementById("nombreProducto").value = '';
    document.getElementById("precioProducto").value = '';
    document.getElementById("cantidadProducto").value = '';

    console.log("Producto agregado:", producto); // Debugging
}

// Ajustar el inventario (aumentar o disminuir cantidad).
function ajustarInventario() {
    let nombre = document.getElementById("nombreAjuste").value; // Obtener el nombre del producto a ajustar
    let cantidad = parseInt(document.getElementById("cantidadAjuste").value); // Obtener la cantidad a ajustar
    let motivo = document.getElementById("motivoAjuste").value; // Obtener el motivo del ajuste
    let tipoAjuste = document.querySelector('input[name="tipoAjuste"]:checked').value; // Obtener el tipo de ajuste (aumentar o disminuir)

    // Validaciones básicas
    if (!nombre || isNaN(cantidad) || cantidad <= 0 || !motivo) {
        alert("Por favor, ingrese un nombre, cantidad y motivo válidos.");
        console.log("Error en ajustar inventario:", { nombre, cantidad, motivo, tipoAjuste }); // Debugging
        return;
    }

    // Convertir nombre a minúsculas para la búsqueda
    let nombreEnMinusculas = nombre.toLowerCase();

    // Buscar el producto en el inventario
    let producto = inventario.find(prod => prod.nombre === nombreEnMinusculas);

    // Verificar si el producto está en el inventario
    if (!producto) {
        alert("El producto no está en el inventario.");
        console.log("Producto no encontrado:", nombre); // Debugging
        return;
    }

    if (tipoAjuste === "disminuir") {
        // Verificar si hay suficiente cantidad para ajustar
        if (producto.cantidad < cantidad) {
            alert("No hay suficiente cantidad en el inventario para ajustar.");
            console.log("Cantidad insuficiente para ajustar:", producto.cantidad, cantidad); // Debugging
            return;
        }

        // Confirmar el ajuste
        let confirmar = confirm(`¿Desea disminuir ${cantidad} unidad(es) de ${capitalizarTexto(producto.nombre)} por motivo de: ${motivo}?`);
        if (!confirmar) {
            alert("Ajuste cancelado.");
            console.log("Ajuste cancelado para:", nombre); // Debugging
            return;
        }

        // Realizar el ajuste
        producto.cantidad -= cantidad;
    } else if (tipoAjuste === "aumentar") {
        // Confirmar el ajuste
        let confirmar = confirm(`¿Desea aumentar ${cantidad} unidad(es) de ${capitalizarTexto(producto.nombre)} por motivo de: ${motivo}?`);
        if (!confirmar) {
            alert("Ajuste cancelado.");
            console.log("Ajuste cancelado para:", nombre); // Debugging
            return;
        }

        // Realizar el ajuste
        producto.cantidad += cantidad;
    }

    alert(`Inventario ajustado: ${capitalizarTexto(producto.nombre)} - Cantidad ajustada: ${cantidad} - Motivo: ${motivo}`);

    // Guardar el inventario en localStorage
    guardarInventario();

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
        console.log("Inventario vacío."); // Debugging
        return;
    }

    // Ordenar el inventario por nombre de producto
    inventario.sort((a, b) => {
        let nombreA = a.nombre.toLowerCase();
        let nombreB = b.nombre.toLowerCase();
        return nombreA.localeCompare(nombreB);
    });

    // Crear una tabla para mostrar el inventario
    let tabla = document.createElement("table");
    tabla.border = "1"; // Añadir borde a la tabla

    // Crear la fila del encabezado
    let encabezado = document.createElement("tr");
    encabezado.innerHTML = "<th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Fecha y Hora</th>";
    tabla.appendChild(encabezado);

    // Añadir filas para cada producto
    inventario.forEach(producto => {
        let fila = document.createElement("tr");
        fila.innerHTML = `<td>${capitalizarTexto(producto.nombre)}</td><td>$${producto.precio.toFixed(2)} ARS</td><td>${producto.cantidad}</td><td>${producto.fechaHora}</td>`;
        tabla.appendChild(fila);
    });

    output.appendChild(tabla);
    console.log("Inventario mostrado."); // Debugging
}

// Inicializar el inventario al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarInventario();

    // Añadir eventos a los botones
    document.getElementById("agregarProductoBtn").addEventListener("click", agregarProducto);
    document.getElementById("ajustarInventarioBtn").addEventListener("click", ajustarInventario);
    document.getElementById("mostrarInventarioBtn").addEventListener("click", mostrarInventario);
    
    // Añadir evento al input para manejar la selección de "Crear nuevo"
    document.getElementById("nombreProducto").addEventListener("input", manejarSeleccionProducto);
});
