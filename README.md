Simulador de Inventario - SAMFIT
Este proyecto es una aplicación web interactiva que simula el manejo de inventario para SAMFIT, una tienda de productos deportivos. Está desarrollado como parte de una tarea final para un curso de desarrollo web. La aplicación permite agregar productos, ajustar su inventario, y visualizar el inventario actual en una tabla dinámica.

Características
Agregar productos al inventario: Los usuarios pueden agregar productos con su nombre, cantidad, precio, e imagen.
Ajuste de inventario: Se pueden ajustar las cantidades de los productos existentes.
Visualización del inventario: El inventario se presenta en una tabla con detalles como ID, nombre, precio, cantidad, e imagen de cada producto.
Resposive Design: La interfaz está diseñada para ser responsive, adaptándose a diferentes tamaños de pantalla.
Carga dinámica: Los productos iniciales se cargan dinámicamente desde un archivo JSON.

Tecnologías Utilizadas
HTML5: Estructura básica del proyecto.
CSS3: Diseño y estilo personalizados, sin utilizar frameworks CSS como Bootstrap.
JavaScript (ES6): Lógica principal de la aplicación, manipulación del DOM, manejo de arrays, y funcionalidad de la simulación de inventario.
JSON: Archivo products.json para almacenar y cargar productos iniciales.
Git: Control de versiones con ramas específicas para características (feature).
GitHub: Almacenamiento del proyecto.

Estructura del Proyecto
/ (root)
│
├── index.html
├── /img
│   └── [imágenes de productos]
├── /js
│   ├── main.js
│   └── storage.js
│   └── products.json
├── /css
│   └── styles.css
└── README.md

index.html: Página principal de la aplicación.
img/: Carpeta que contiene las imágenes de los productos.
js/main.js: Lógica principal de la aplicación.
js/storage.js: Lógica principal de la aplicación. Se encarga de gestionar el almacenamiento de los productos, la actualización de los inventarios y las interacciones clave entre el simulador y los datos almacenados. Es el núcleo que procesa los cambios en el inventario y se asegura de que los datos se mantengan sincronizados y actualizados.
js/products.json: Archivo JSON que contiene los productos iniciales.
css/styles.css: Estilos personalizados de la aplicación.

Instrucciones de Uso

Clonar el repositorio:
Copiar código
git clone https://github.com/leynid/simulador-inventario-samfit.git

Abrir el proyecto: Navega a la carpeta del proyecto y abre el archivo index.html en tu navegador. Se recomienda utilizar una extensión como Live Server en VS Code para evitar problemas de rutas al cargar imágenes y archivos locales.

Agregar productos: En la interfaz, ingresa los detalles del nuevo producto y agrégalo al inventario.

Ajustar inventario: Utiliza la sección de ajuste para modificar las cantidades de productos existentes.

Visualizar inventario: El inventario actualizado se mostrará automáticamente en la tabla.

Próximos pasos
Refinamiento de diseño: Implementar mejoras visuales para que la aplicación se vea más profesional, como el uso opcional de frameworks CSS.
Implementación de herramientas de terceros: Considerar la integración de bibliotecas o APIs adicionales para mejorar la funcionalidad.
Optimización de carga de imágenes: Mejorar la gestión de recursos estáticos para evitar problemas de ruta en diferentes entornos.

Contribuciones
Las contribuciones son bienvenidas. Si deseas agregar nuevas funcionalidades o mejorar el código existente, por favor abre una Pull Request en GitHub.

Contacto
Para consultas, puedes contactarme a través de mi perfil de GitHub o por correo electrónico: leynid@gmail.com.
