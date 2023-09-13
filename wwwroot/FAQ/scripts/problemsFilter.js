document.addEventListener('DOMContentLoaded', () => {
  const toggleMenu = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.top-nav ul');

  toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('menu-visible');
  });
});

const inputFilter = document.getElementById('inputFilter');
const problemsList = document.getElementById('problemsList');
const modeloBotones = document.querySelectorAll('.modeloBoton');
let problemas = [];
let modeloSeleccionado = null;

fetch('problemas.json')
  .then(response => response.json())
  .then(data => {
    problemas = data;
    actualizarModeloSeleccionado();
    filtrarYMostrarProblemas();
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

function actualizarModeloSeleccionado() {
  const urlParams = new URLSearchParams(window.location.search);
  modeloSeleccionado = urlParams.get('modelo');
}

modeloBotones.forEach(boton => {
  boton.addEventListener('click', () => {
    modeloSeleccionado = modeloSeleccionado === boton.value ? null : boton.value;
    modeloBotones.forEach(btn => {
      btn.classList.toggle('selected', btn === boton && modeloSeleccionado !== null);
    });
    actualizarURL(modeloSeleccionado); // Actualiza la URL con la categoría seleccionada
    filtrarYMostrarProblemas();
  });
});

inputFilter.addEventListener('input', filtrarYMostrarProblemas);

function filtrarYMostrarProblemas() {
  const filtroTexto = inputFilter.value.toLowerCase();
  let problemasFiltrados = problemas;

  if (modeloSeleccionado) {
    problemasFiltrados = problemasFiltrados.filter(problema =>
      problema.modelo === modeloSeleccionado
    );
  }

  problemasFiltrados = problemasFiltrados.filter(problema =>
    problema.problema.toLowerCase().includes(filtroTexto)
  );

  mostrarProblemas(problemasFiltrados, filtroTexto);
}

const urlParams = new URLSearchParams(window.location.search);
const modeloParametro = urlParams.get('modelo');

// Busca el botón que coincida con 'modeloParametro' y actívalo
if (modeloParametro) {
  const botonSeleccionado = Array.from(modeloBotones).find(
    boton => boton.getAttribute('value') === modeloParametro
  );
  if (botonSeleccionado) {
    botonSeleccionado.click(); // Simula un clic en el botón encontrado
  }
}

function actualizarURL(modelo) {
  const url = new URL(window.location.href);
  if (modelo) {
    url.searchParams.set('modelo', modelo);
  } else {
    url.searchParams.delete('modelo');
  }
  history.pushState({}, '', url);
}

function mostrarProblemas(lista, filtroTexto) {
  problemsList.innerHTML = '';

  const problemasPorModelo = lista.reduce((acumulador, problema) => {
    if (!acumulador[problema.modelo]) {
      acumulador[problema.modelo] = [];
    }
    acumulador[problema.modelo].push(problema);
    return acumulador;
  }, {});

  for (const modelo in problemasPorModelo) {
    const modeloTitulo = document.createElement('h2');
    modeloTitulo.textContent = modelo;
    problemsList.appendChild(modeloTitulo);

    const problemasDeModelo = problemasPorModelo[modelo];
    problemasDeModelo.forEach(problema => {
      const item = document.createElement('li');
      item.classList.add('li-problema-solucion');
      const problemaDiv = document.createElement('div');
      problemaDiv.classList.add('problema-div');

      const problemaParrafo = document.createElement('p');
      const solucionParrafo = document.createElement('p');
      solucionParrafo.classList.add('p-solucion');
      problemaParrafo.classList.add('p-problema');
      const botonMostrarSolucion = document.createElement('button');

      const problemaConResaltado = problema.problema.replace(
        new RegExp(filtroTexto, 'gi'),
        match => `<span class="resaltado">${match}</span>`
      );

      problemaParrafo.innerHTML = `<strong class="problemaTitulo">Problema:</strong> ${problemaConResaltado}`;
      solucionParrafo.innerHTML = `<strong class="solucion">Solución:</strong> ${problema.solucion}`;
      botonMostrarSolucion.classList.add('solucionBtn');

      problemaDiv.appendChild(problemaParrafo);
      problemaDiv.appendChild(botonMostrarSolucion);

      item.appendChild(problemaDiv);
      item.appendChild(solucionParrafo);
      problemsList.appendChild(item);

      // Agrega el evento de clic a cada problemaDiv
      problemaDiv.addEventListener('click', () => {
        solucionParrafo.classList.toggle('visible');
        botonMostrarSolucion.classList.toggle('active');
      });
    });
  }
}
