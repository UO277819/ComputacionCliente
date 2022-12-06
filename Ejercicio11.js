"use strict";
class GeoLocalizacion{
    constructor(){
    }

    mostrar(){
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this));
    }

    getPosition(posicion){
        var datos=''; 
        datos+='<h2>Datos</h2>';
        datos+='<p>Longitud: '+posicion.coords.longitude +' grados</p>'; 
        datos+='<p>Latitud: '+posicion.coords.latitude +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ posicion.coords.accuracy +' metros</p>';
        datos+='<p>Altitud: '+ posicion.coords.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ posicion.coords.altitudeAccuracy +' metros</p>'; 
        datos+='<p>Rumbo: '+ posicion.coords.heading +' grados</p>'; 
        datos+='<p>Velocidad: '+ posicion.coords.speed +' metros/segundo</p>';
        $("section").html(datos);
    }
}
var localizacion=new GeoLocalizacion();