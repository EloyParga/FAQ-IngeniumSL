document.addEventListener("DOMContentLoaded", () => {
    setupCarouselAndPagination();
});
const carousel = document.getElementById("carousel");
const carouselInner = document.querySelector(".carousel-inner");
const pagination = document.getElementById("pagination");
const itemsPerPage = 3; // Mostrar siempre 3 elementos
const screenWidthThreshold = 1300; // Umbral de ancho de pantalla para activar el carrusel

// Inicializa el índice de visualización
let currentIndex = 0;

// Calcula la cantidad total de páginas
const totalPages = Math.ceil(carouselInner.children.length / itemsPerPage);
updateCarouselHeight();



// Función para mostrar los siguientes 3 elementos
function showNextItems() {
    currentIndex += 1;
    if (currentIndex >= totalPages) {
        currentIndex = 0; // Vuelve al principio si llegas al final
    }
    updatePagination();
    hideCurrentItemsAndShowNext();
}

// Función para mostrar los 3 elementos anteriores
function showPreviousItems() {
    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = totalPages - 1; // Vuelve al final si llegas al principio
    }
    updatePagination();
    hideCurrentItemsAndShowPrevious();
}

function hideCurrentItemsAndShowNext() {
    const children = Array.from(carouselInner.children);

    children.forEach((element, index) => {
        if (index < currentIndex * itemsPerPage || index >= (currentIndex + 1) * itemsPerPage) {
            element.style.display = "none"; // Oculta los elementos fuera de la página actual
        } else {
            element.style.display = "block"; // Muestra los elementos en la página actual
        }
    });

    updateCarouselHeight();
}

// Oculta los elementos actuales y luego muestra los anteriores
function hideCurrentItemsAndShowPrevious() {
    const children = Array.from(carouselInner.children);

    children.forEach((element, index) => {
        if (index < currentIndex * itemsPerPage || index >= (currentIndex + 1) * itemsPerPage) {
            element.style.display = "none"; // Oculta los elementos fuera de la página actual
        } else {
            element.style.display = "block"; // Muestra los elementos en la página actual
        }
    });

    updateCarouselHeight();
}

// Actualiza la altura del carrusel para acomodar los elementos visibles
function updateCarouselHeight() {
    const startIndex = currentIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleElements = Array.from(carouselInner.children).slice(startIndex, endIndex);
    const totalHeight = visibleElements.reduce((acc, element) => acc + element.clientHeight, 0);
    carousel.style.height = `${totalHeight}px`;
}

// Actualiza la paginación
function updatePagination() {
    pagination.innerHTML = ""; // Limpia la paginación actual

    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === currentIndex) {
            dot.classList.add("active");
        }
        dot.addEventListener("click", () => {
            currentIndex = i;
            updatePagination();
            hideCurrentItemsAndShowNext();
        });
        pagination.appendChild(dot);
    }
}

// Función para verificar el ancho de la pantalla y configurar el carrusel y la paginación
function setupCarouselAndPagination() {
    const screenWidth = window.innerWidth;
    const urlParams = new URLSearchParams(window.location.search);
    const modeloParametro = urlParams.get('modelo');
    
    if (modeloParametro && screenWidth >= screenWidthThreshold) {
        // Si se proporcionó un valor en urlParams y la pantalla es lo suficientemente grande, configura el carrusel y la paginación
        const modeloBotones = document.querySelectorAll('.modeloBoton');
        modeloBotones.forEach((boton, index) => {
            if (boton.getAttribute('value') === modeloParametro) {
                // Si se encuentra el valor, configura currentIndex y muestra la paginación correspondiente
                currentIndex = Math.floor(index / itemsPerPage);
                updatePagination();
                hideCurrentItemsAndShowNext();
            }
        });
        // Restaura la visibilidad de la paginación
        pagination.style.display = "block";
    } else if (screenWidth >= screenWidthThreshold) {
        // Configura el carrusel y la paginación solo en pantallas grandes
        updateCarouselHeight();
        updatePagination();
        // Restaura la visibilidad de la paginación
        pagination.style.display = "block";
    } else {
        // En pantallas pequeñas y medianas, muestra todos los botones sin paginación ni carrusel
        carousel.style.maxHeight = "auto"; // Altura automática
        pagination.style.display = "none"; // Oculta la paginación
        // Puedes agregar más estilos según tus preferencias para los botones individuales aquí
    }
}

// Llama a la función para configurar el carrusel y la paginación al cargar la página
setupCarouselAndPagination();

// Llama a la función para configurar el carrusel y la paginación en redimensionamiento de pantalla
window.addEventListener("load", updateCarouselHeight);
window.addEventListener("resize", setupCarouselAndPagination);
window.addEventListener("resize", updateCarouselHeight);