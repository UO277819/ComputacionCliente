"use strict";
class GeoLocalizacion{
    constructor(){
        this.mensaje="";
        this.imagenMapa="";
        this.latitud=0;
        this.longitud=0;
    }

    mostrar(){
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this),this.mostrarErrores.bind(this));
    }

    getPosition(posicion){
        var datos=''; 
        datos+='<p>Longitud: '+posicion.coords.longitude +' grados</p>'; 
        datos+='<p>Latitud: '+posicion.coords.latitude +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ posicion.coords.accuracy +' metros</p>';
        datos+='<p>Altitud: '+ posicion.coords.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ posicion.coords.altitudeAccuracy +' metros</p>'; 
        datos+='<p>Rumbo: '+ posicion.coords.heading +' grados</p>'; 
        datos+='<p>Velocidad: '+ posicion.coords.speed +' metros/segundo</p>';
        $("section").html(datos);
        this.longitud=posicion.coords.longitude;
        this.latitud=posicion.coords.latitude;
        this.getMapaEstaticoGoogle();
    }

    mostrarErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
        }
        $("h1").html(this.mensaje);
    }

    getMapaEstaticoGoogle(){
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        $("section").after("<img src='"+this.imagenMapa+"' alt='mapa estático google' />");
    }

}
var localizacion=new GeoLocalizacion();
