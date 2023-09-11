document.addEventListener('DOMContentLoaded', function() {

 // Datos de camisetas en formato JSON
  var camisetasDisponiblesJSON = `
  [
    { "id": 1, "equipo": "Velez", "talla": "M", "precio": 22000 },
    { "id": 2, "equipo": "Boca", "talla": "L", "precio": 25000 },
    { "id": 3, "equipo": "Racing", "talla": "XL", "precio": 21000 }
  ]
`;

// Parsear los datos JSON en un array
var camisetasDisponibles = JSON.parse(camisetasDisponiblesJSON);

var carrito = [];

// Función para mostrar las camisetas en la página
function mostrarCamisetas() {
  var camisetasDiv = document.getElementById('camisetas');
  camisetasDiv.innerHTML = '';

  for (var i = 0; i < camisetasDisponibles.length; i++) {
    var camiseta = camisetasDisponibles[i];
    var camisetaInfo = `ID: ${camiseta.id}, Equipo: ${camiseta.equipo}, Talla: ${camiseta.talla}, Precio: $${camiseta.precio}`;
    var camisetaElement = document.createElement('p');
    camisetaElement.textContent = camisetaInfo;

    // Botón para agregar al carrito
    var agregarAlCarritoButton = document.createElement('button');
    agregarAlCarritoButton.textContent = 'Agregar al Carrito';
    agregarAlCarritoButton.addEventListener('click', function(camiseta) {
      return function() {
        agregarAlCarrito(camiseta);
      };
    }(camiseta));

    camisetaElement.appendChild(agregarAlCarritoButton);
    camisetasDiv.appendChild(camisetaElement);
  }
}

// Función para agregar una camiseta al carrito
function agregarAlCarrito(camiseta) {
  carrito.push(camiseta);
  actualizarCarrito();
  guardarCarritoEnStorage();
}

// Función para eliminar una camiseta del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
  guardarCarritoEnStorage();
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
  var listaCarrito = document.getElementById('lista-carrito');
  var total = 0;

  listaCarrito.innerHTML = '';

  for (var i = 0; i < carrito.length; i++) {
    var camiseta = carrito[i];
    var listItem = document.createElement('li');
    listItem.textContent = `${camiseta.equipo} - Precio: $${camiseta.precio}`;

    // Botón para eliminar del carrito
    var eliminarDelCarritoButton = document.createElement('button');
    eliminarDelCarritoButton.textContent = 'Eliminar';
    eliminarDelCarritoButton.addEventListener('click', function(index) {
      return function() {
        eliminarDelCarrito(index);
      };
    }(i));

    listItem.appendChild(eliminarDelCarritoButton);
    listaCarrito.appendChild(listItem);
    total += camiseta.precio;
  }

  var totalElement = document.getElementById('total');
  totalElement.textContent = total;
}

// Función para guardar el carrito en el almacenamiento local del navegador
function guardarCarritoEnStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeStorage() {
  var carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

// Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', function() {
  carrito = [];
  localStorage.removeItem('carrito');
  actualizarCarrito();
});

mostrarCamisetas();
cargarCarritoDesdeStorage();
});