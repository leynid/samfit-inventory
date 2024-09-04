// Declarar variables, constantes y arrays
let inventario = []; 

// Función para cargar productos desde el archivo JSON
function cargarProductos() {
    return fetch('products.json')
        .then(response => response.json())
        .then(data => {
            inventario = data; 
            return data;
        })
        .catch(error => console.error('Error al cargar los datos del inventario:', error));
}

// Función para mostrar el inventario en la tabla
function mostrarInventario() {
    const tableBody = document.querySelector('#inventory-table tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla 

    inventario.forEach(product => {
        const row = document.createElement('tr');

        // Crear y agregar celdas a la fila
        const idCell = document.createElement('td');
        idCell.textContent = product.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;
        row.appendChild(quantityCell);

        // Agregar la fila a la tabla
        tableBody.appendChild(row);
    });
}

// Función para llenar la lista de productos en el input datalist
function llenarDatalist() {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = ''; // Limpiar la lista 

    inventario.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        listaProductos.appendChild(option);
    });

    // Agregar la opción de crear un nuevo producto
    const optionNuevo = document.createElement('option');
    optionNuevo.value = 'Crear nuevo';
    listaProductos.appendChild(optionNuevo);
}

// Función para agregar un nuevo producto al inventario
function agregarProducto() {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const precioProducto = parseFloat(document.getElementById('precioProducto').value);
    const cantidadProducto = parseInt(document.getElementById('cantidadProducto').value);

    if (!nombreProducto || isNaN(precioProducto) || isNaN(cantidadProducto)) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const nuevoProducto = {
        id: inventario.length + 1,
        name: nombreProducto,
        price: precioProducto,
        quantity: cantidadProducto
    };

    inventario.push(nuevoProducto);
    mostrarInventario();
    llenarDatalist(); // Actualizar la lista 

    // Mostrar alerta
    alert(`Nuevo producto creado ${nombreProducto} en ${cantidadProducto} unidades.`);

    // Limpiar los campos del formulario
    document.getElementById('nombreProducto').value = '';
    document.getElementById('precioProducto').value = '';
    document.getElementById('cantidadProducto').value = '';
}

// Función para ajustar el inventario
function ajustarInventario() {
    const nombreAjuste = document.getElementById('nombreAjuste').value.trim().toUpperCase();
    const cantidadAjuste = document.getElementById('cantidadAjuste').value.trim();
    const tipoAjuste = document.querySelector('input[name="tipoAjuste"]:checked').value;
    const motivoAjuste = document.getElementById('motivoAjuste').value.trim();

    if (!nombreAjuste || !cantidadAjuste || !tipoAjuste || !motivoAjuste) {
        console.error('Faltan datos en el formulario de ajuste de inventario.');
        return;
    }

    const productoExistente = inventario.find(producto => producto.name.trim().toUpperCase() === nombreAjuste);

    if (productoExistente) {
        if (tipoAjuste === 'aumentar') {
            productoExistente.quantity = parseInt(productoExistente.quantity) + parseInt(cantidadAjuste);
        } else if (tipoAjuste === 'disminuir') {
            productoExistente.quantity = parseInt(productoExistente.quantity) - parseInt(cantidadAjuste);
            if (productoExistente.quantity < 0) {
                productoExistente.quantity = 0;
            }
        }

        guardarInventario();
        mostrarInventario();

        // Mostrar alerta
        alert(`Inventario ajustado: ${nombreAjuste} ${tipoAjuste} en ${cantidadAjuste} unidades. Motivo: ${motivoAjuste}`);

        // Reiniciar el formulario
        document.getElementById('nombreAjuste').value = '';
        document.getElementById('cantidadAjuste').value = '';
        document.querySelector('input[name="tipoAjuste"][value="aumentar"]').checked = true; // Restablecer el valor predeterminado
        document.getElementById('motivoAjuste').value = '';
    } else {
        console.error('El producto no existe en el inventario.');
    }
}

// Llamar a mostrarInventario() al cargar la página para mostrar la tabla inicial
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos().then(() => {
        mostrarInventario();
        llenarDatalist();
    });
});

// Función para guardar el inventario
function guardarInventario() {
    fetch('save-products.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventario)
    })
    .then(response => response.json())
    .then(data => console.log('Inventario guardado:', data))
    .catch(error => console.error('Error al guardar el inventario:', error));
}

// Asignar eventos a los botones
document.addEventListener('DOMContentLoaded', () => {
    // Cargar los productos y mostrar el inventario
    cargarProductos().then(() => {
        mostrarInventario();
        llenarDatalist();
    });

    // Referencia a los botones y asignar eventos
    const botonAgregar = document.getElementById('botonAgregar');
    const botonAjustar = document.getElementById('botonAjustar');

    if (botonAgregar) {
        botonAgregar.addEventListener('click', agregarProducto);
    } else {
        console.error('No se encontró el botón con el id "botonAgregar".');
    }

    if (botonAjustar) {
        botonAjustar.addEventListener('click', ajustarInventario);
    } else {
        console.error('No se encontró el botón con el id "botonAjustar".');
    }
});
