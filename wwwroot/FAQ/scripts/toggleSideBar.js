document.addEventListener("DOMContentLoaded", function () {
    const toggleSidebarButton = document.getElementById("toggleSidebarButton");
    const toggleSidebarCloseButton = document.getElementById("toggleSidebarCloseButton");
    const sidebar = document.querySelector(".sidebar");

    toggleSidebarButton.addEventListener("click", function () {
        sidebar.classList.toggle("sidebar-visible");
        sidebar.classList.toggle("sidebar-hidden");
        toggleSidebarButton.style.display = "none";
        toggleSidebarCloseButton.style.display = "block";
        
    });
    toggleSidebarCloseButton.addEventListener("click", function () {
        sidebar.classList.toggle("sidebar-hidden");
        sidebar.classList.toggle("sidebar-visible");
        toggleSidebarButton.style.display = "block";
        toggleSidebarCloseButton.style.display = "none";
    });
});

//Buscar lógica alternativa al location.reload()

window.addEventListener("resize", function(){
    if (window.innerWidth > 1300) {
        location.reload();
    }
});