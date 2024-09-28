// Función para mostrar mensaje JQuery
function mostrarMensaje(mensaje, tipo = 'info') {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;

    // Cambiar el estilo según el tipo de mensaje
    if (tipo === 'error') {
        mensajeDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'; 
        mensajeDiv.style.color = 'white'; 
    } else {
        mensajeDiv.style.backgroundColor = 'rgba(0, 128, 0, 0.7)'; 
        mensajeDiv.style.color = 'white'; 
    }

    mensajeDiv.style.display = 'block';
    mensajeDiv.style.opacity = '1'; 

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.style.opacity = '0'; 
        setTimeout(() => {
            mensajeDiv.style.display = 'none'; 
        }, 500); 
    }, 3000); 
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

        const imageCell = document.createElement('td');
        const imgElement = document.createElement('img');
        imgElement.src = `./img/products/${producto.image}`;
        imgElement.style.width = '50px'; 
        imgElement.style.height = 'auto'; 
        imageCell.appendChild(imgElement);
        row.appendChild(imageCell);

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
    try {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const precioProducto = parseFloat(document.getElementById('precioProducto').value);
    const cantidadProducto = parseInt(document.getElementById('cantidadProducto').value);

    if (!nombreProducto || isNaN(precioProducto) || isNaN(cantidadProducto)) {
        mostrarMensaje('Por favor, completa todos los campos.');
        return;
    }

    // Lógica del producto
    const siguienteId = inventario.length > 0 ? Math.max(...inventario.map(p => p.id)) + 1 : 1;
    const nuevoProducto = new Producto(siguienteId, nombreProducto, precioProducto, cantidadProducto);

    inventario.push(nuevoProducto);
    guardarInventario();
    mostrarInventario();
    llenarDatalist();

    mostrarMensaje(`Producto creado: ${nombreProducto}, cantidad: ${cantidadProducto}`);
} catch (error) {
    mostrarMensaje('Ocurrió un error al agregar el producto. Inténtalo nuevamente.');
    console.error(error); // Dejar esto solo en desarrollo, remover en producción
}

    // Limpiar los campos del formulario
    document.getElementById('nombreProducto').value = '';
    document.getElementById('precioProducto').value = '';
    document.getElementById('cantidadProducto').value = '';
}

// Función para ajustar el inventario
function ajustarInventario() {
    try {
        const nombreAjuste = document.getElementById('nombreAjuste').value.trim();
        const cantidadAjuste = parseInt(document.getElementById('cantidadAjuste').value, 10);
        const tipoAjuste = document.querySelector('input[name="tipoAjuste"]:checked').value;
        const motivoAjuste = document.getElementById('motivoAjuste').value.trim();

        // Validar campos
        if (!nombreAjuste || isNaN(cantidadAjuste) || !motivoAjuste) {
            mostrarMensaje('Por favor, completa todos los campos para ajustar el inventario.');
            return;
        }

        // Buscar el producto en el inventario
        const productoExistente = inventario.find(producto => producto.nombre === nombreAjuste);

        if (productoExistente) {
            console.log('Producto antes del ajuste:', productoExistente);
        }
        // Ajustar la cantidad
        const cantidadActual = Number(productoExistente.cantidad); // Convertir a número
        const ajuste = Number(cantidadAjuste); // Convertir a número

        if (tipoAjuste === 'aumentar') {
            productoExistente.cantidad = cantidadActual + ajuste;
        } else if (tipoAjuste === 'disminuir') {
            productoExistente.cantidad = Math.max(0, cantidadActual - ajuste);
        }

        // Guardar y mostrar el inventario actualizado
        guardarInventario();
        mostrarInventario();
        mostrarMensaje(`Inventario ajustado: ${nombreAjuste} ${tipoAjuste} en ${ajuste} unidades. Motivo: ${motivoAjuste}`);

        // Limpiar formulario
        document.getElementById('nombreAjuste').value = '';
        document.getElementById('cantidadAjuste').value = '';
        document.querySelector('input[name="tipoAjuste"][value="aumentar"]').checked = true;
        document.getElementById('motivoAjuste').value = '';
    } catch (error) {
        mostrarMensaje(error.message, 'El producto no existe en el inventario.');
    } finally {
        // Código que siempre debe ejecutarse
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
