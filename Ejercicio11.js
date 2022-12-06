"use strict";
class GeoLocalizacion{
    constructor(){
        this.mensaje="";
        this.imagenMapa="";
        this.latitud=0;
        this.longitud=0;
        navigator.geolocation.getCurrentPosition(this.getPosition.bind(this),this.mostrarErrores.bind(this));
    }

    getPosition(posicion){
        var datos='';
        datos+='<section><h2>Datos</h2>';  
        datos+='<p>Longitud: '+posicion.coords.longitude +' grados</p>'; 
        datos+='<p>Latitud: '+posicion.coords.latitude +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ posicion.coords.accuracy +' metros</p>';
        datos+='<p>Altitud: '+ posicion.coords.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ posicion.coords.altitudeAccuracy +' metros</p>'; 
        datos+='<p>Rumbo: '+ posicion.coords.heading +' grados</p>'; 
        datos+='<p>Velocidad: '+ posicion.coords.speed +' metros/segundo</p></section>';
        $("section").after(datos);
        this.longitud=posicion.coords.longitude;
        this.latitud=posicion.coords.latitude;
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWV0ZTE3IiwiYSI6ImNrd2J5c2JyeTFndDMydXFtYjMweXFpcWEifQ.0SKmdulKoTv4TGHbrJWvAg';  
        var map = new mapboxgl.Map({ 
            container: 'map', 
            style: 'mapbox://styles/mapbox/streets-v10',  
            center: [this.longitud, this.latitud],
            zoom: 13
            }); 
        //var marker = new mapboxgl.Marker().setLngLat([this.longitud, this.latitud]).addTo(map);
        //var mapaa=$("section");
       //$("h1").after(mapaa);
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

}
var localizacion=new GeoLocalizacion();
