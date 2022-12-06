"use strict";
class Analizador {
    constructor(){
    }
    obtenerDatos(){
        $('h3').remove();
        $('p').remove();
        $('textarea').remove();
        $('label').remove();
        var listaArchivos = $('input[type=file]');
        for (var i = 0; i < listaArchivos.length; i++) {
            var nBytes = 0,
            archivos=listaArchivos.get(i).files,
            nArchivos = archivos.length;
                for (var j = 0; j < nArchivos; j++) {
                    var reader = new FileReader();
                    $("form").after("<h3>Nombre de archivo: " + archivos[j].name + "</h3>"
                        + "<p>Tipo de archivo: " + archivos[j].type + "</p>" +
                        "<p>Tamaño de archivo: " + archivos[j].size + "</p>");
                    console.log(archivos[j].type);
                    if (archivos[j].type == 'application/json' || archivos[j].type == 'text/xml' || archivos[j].type == 'text/plain') {
                        reader.onload = function (progressEvent) {
                        $("footer").before(" <label for='area'>Contenido</label>"
                           + "<textarea id='area' name = 'texto' cols = '120' rows = '50' disabled>" + this.result + "</textarea>");
                        };
                    }
                    reader.readAsText(archivos[j]);
                    

                    nBytes += archivos[j].size;
                }
        }
    }
}
var archivo = new Analizador();
