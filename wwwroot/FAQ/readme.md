# Documentación scripts en Javascript

## mid&SmallScreenAutoScroll

Resumen del script:
Este script hace que en pantalla pequeña y mediana, al pulsar un botón de un modelo, se ejecute un autoscroll hacia la "problemList" para facilitar la experiencia al usuario.


Funcionamiento detallado:

La función scrollToProblemsList tiene varias fases:

Primero: va a consultar si el ancho actual de la ventana es mayor de 1300px

La "problemList" está cargada?

Sí: (la primera vez que se carga la página aparecerá con un "display=none" para que no haya un scroll con toda la lista de problemas sin filtrar y facilitar la UX). Si la "problemList" no está cargada le da un "display=block" para mostrarla.



Caso negativo: Si la problemList no está cargada 

##


##