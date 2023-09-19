const flechaDesplegable = document.getElementById("right-arrow");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll(".barra-lateral span"); // Selecciona los elementos span dentro de la barra lateral
const menu = document.querySelector(".menu");
const main = document.querySelector("main");

// Agrega esta línea para ocultar la barra lateral por defecto
barraLateral.classList.add("mini-barra-lateral");

menu.addEventListener("click", () => {
  barraLateral.classList.toggle("max-barra-lateral");
  if (barraLateral.classList.contains("max-barra-lateral")) {
    menu.children[0].style.display = "none";
    menu.children[1].style.display = "block";
  } else {
    menu.children[0].style.display = "block";
    menu.children[1].style.display = "none";
  }
  if (window.innerWidth <= 720) {
    barraLateral.classList.add("mini-barra-lateral");
    main.classList.add("min-main");
    spans.forEach((span) => {
      span.style.width = "0"; // Ajusta el ancho de los spans cuando la barra está minimizada
      span.style.opacity = "0"; // Oculta los spans cuando la barra está minimizada
    });
  }
});

flechaDesplegable.addEventListener("click", () => {
  flechaDesplegable.classList.toggle("reverse");
  if (flechaDesplegable.classList.contains("reverse")) {
    // Si flechaDesplegable contiene la clase "reverse", desactiva el scroll
    document.body.style.overflow = "hidden";
  } else {
    // Si no contiene la clase "reverse", permite el scroll
    document.body.style.overflow = "auto";
  }
  barraLateral.classList.toggle("mini-barra-lateral");
  main.classList.toggle("min-main");
  spans.forEach((span) => {
    span.style.width = "100%"; // Restaura el ancho de los spans cuando la barra está desplegada
    span.style.opacity = "1"; // Muestra los spans cuando la barra está desplegada
  });
  barraLateral.width ="100%"
});


/* 

Lógica para cambiar el fondo sólo en pantalla pequeña

flechaDesplegable.addEventListener("click", () => {
  flechaDesplegable.classList.toggle("reverse");
  barraLateral.classList.toggle("mini-barra-lateral");
  main.classList.toggle("min-main");
  spans.forEach((span) => {
    span.style.width = "100%"; // Restaura el ancho de los spans cuando la barra está desplegada
    span.style.opacity = "1"; // Muestra los spans cuando la barra está desplegada
  });

  if (window.innerWidth <= 768) {
    // Comprueba si flechaDesplegable tiene la clase "reverse"
    if (flechaDesplegable.classList.contains("reverse")) {
      // Si tiene la clase "reverse", establece un fondo rojo en barraLateral
      barraLateral.style.backgroundColor = "red";
    } else {
      // Si no tiene la clase "reverse", establece un fondo transparente en barraLateral
      barraLateral.style.backgroundColor = "transparent";
    }
  }
}); 

*/