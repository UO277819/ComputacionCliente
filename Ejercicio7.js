"use srtict"

class Comandos{
    constructor(){

    }

    ocultar(){
        $('p').hide();
    }

    mostrar(){
        $('p').show();
    }

    modificar(){
        $('h1').html($('input[type=text]').val());  
    }

    eliminar(){
        $('h2').remove();
    }

    añadir() {
        $("table").after("<h3>Comandos<h3>");
    }

    recorrer() {
        $("*", document.body).each(function() {
            var padre = $(this).parent().get(0).tagName;
            $(this).prepend(document.createTextNode(
                 "Padre: <"+ padre +"> elemento: <" +
                  $(this).get(0).tagName+"> valor: "));
            });
        }
    
    sumarFC() {
        var filas =$("table tr").length;
        var cols =$("table tr:last td").length;
        var result = filas + cols;
        $("footer").before("\n\rFilas + columnas = "+result);
    }
}

var comando=new Comandos();