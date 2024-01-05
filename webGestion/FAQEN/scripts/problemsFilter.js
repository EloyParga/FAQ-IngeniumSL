document.addEventListener('DOMContentLoaded', () => {
  const toggleMenu = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.top-nav ul');

  toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('menu-visible');
  });
});

const inputFilter = document.getElementById('inputFilter');
const problemsList = document.getElementById('problemsList');
const modelButtons = document.querySelectorAll('.modelButton');
let problems = [];
let selectedModel = null;

fetch('problems.json')
  .then(response => response.json())
  .then(data => {
    problems = data;
    updateSelectedModel();
    filterAndShowProblems();
  })
  .catch(error => console.error('Error loading JSON file:', error));

function updateSelectedModel() {
  const urlParams = new URLSearchParams(window.location.search);
  selectedModel = urlParams.get('model');
}

modelButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedModel = selectedModel === button.value ? null : button.value;
    modelButtons.forEach(btn => {
      btn.classList.toggle('selected', btn === button && selectedModel !== null);
    });
    updateURL(selectedModel); // Update the URL with the selected category
    filterAndShowProblems();
  });
});

inputFilter.addEventListener('input', filterAndShowProblems);

function filterAndShowProblems() {
  const filterText = inputFilter.value.toLowerCase();
  let filteredProblems = problems;

  if (selectedModel) {
    filteredProblems = filteredProblems.filter(problem =>
      problem.model.toLowerCase() === selectedModel.toLowerCase()
    );
  }

  filteredProblems = filteredProblems.filter(problem =>
    problem.issue.toLowerCase().includes(filterText)
  );

  showProblems(filteredProblems, filterText);
}

const urlParams = new URLSearchParams(window.location.search);
const modelParameter = urlParams.get('model');

// Find the button that matches 'modelParameter' and activate it
if (modelParameter) {
  const selectedButton = Array.from(modelButtons).find(
    btn => btn.getAttribute('value') === modelParameter
  );
  if (selectedButton) {
    selectedButton.click(); // Simulate a click on the found button
  }
}else{
  filterAndShowProblems();
}

function updateURL(model) {
  const url = new URL(window.location.href);
  if (model) {
    url.searchParams.set('model', model);
  } else {
    url.searchParams.delete('model');
  }
  history.pushState({}, '', url);
}

function showProblems(lista, filterText) {
  problemsList.innerHTML = '';

  const problemasPorModelo = lista.reduce((acumulador, problema) => {
    if (!acumulador[problema.model]) {
      acumulador[problema.model] = [];
    }
    acumulador[problema.model].push(problema);
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

      const problemaConResaltado = problema.issue.replace(
        new RegExp(filterText, 'gi'),
        match => `<span class="resaltado">${match}</span>`
      );

      problemaParrafo.innerHTML = `<strong class="problemaTitulo">Problema:</strong> ${problemaConResaltado}`;
      solucionParrafo.innerHTML = `<strong class="solucion">Solution:</strong> ${problema.solution}`;
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
