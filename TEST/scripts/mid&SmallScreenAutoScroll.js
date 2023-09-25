document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".modeloBoton");
  const problemsList = document.getElementById("problemsList");
  let activeButton = null; // Almacenar el botón activo actual
  let pageLoadedWithButton = false; // Flag para verificar si la página se cargó con un botón pulsado

  function scrollToProblemsList() {
    if (window.innerWidth < 1300) {
      // Verificar si problemsList está oculto y mostrarlo
      if (window.getComputedStyle(problemsList).display === "none") {
        return new Promise((resolve) => {
          problemsList.style.display = "block";
          // Esperar un breve tiempo para asegurarse de que problemsList se haya mostrado
          setTimeout(resolve, 100);
        }).then(() => {
          // Calcular la posición de desplazamiento
          const headerHeight = document.getElementsByTagName("header")[0].clientHeight;
          const problemsListTop = problemsList.getBoundingClientRect().top + window.scrollY;
          const scrollToY = problemsListTop - headerHeight;
          // Realizar el desplazamiento suave
          window.scrollTo({
            top: scrollToY,
            behavior: "smooth"
          });
        });
      } else {
        // Si problemsList ya está visible, calcular y realizar el desplazamiento suave directamente
        const headerHeight = document.getElementsByTagName("header")[0].clientHeight;
        const problemsListTop = problemsList.getBoundingClientRect().top + window.scrollY;
        const scrollToY = problemsListTop - headerHeight;
        // Realizar el desplazamiento suave
        window.scrollTo({
          top: scrollToY,
          behavior: "smooth"
        });
      }
    }
  }

  // Función para verificar si "modelo" está en la URL
  function checkModeloInURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("modelo") !== null;
  }

  // Verificar si la página se cargó con un botón pulsado
  if (checkModeloInURL()) {
    pageLoadedWithButton = true;
    buttons.forEach(function (button) {
      if (button.getAttribute("data-modelo") === checkModeloInURL()) {
        activeButton = button;
      }
    });
  }

  // Verifica después de que la página se haya cargado completamente
  window.addEventListener("load", function () {
    if (pageLoadedWithButton) {
      problemsList.style.display = "block";
    }
  });

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (button !== activeButton) {
        if (checkModeloInURL()) {
          scrollToProblemsList();
          activeButton = button; // Actualizar el botón activo
        }
      }
    });
  });
});