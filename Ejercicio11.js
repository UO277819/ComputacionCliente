"use strict";
class GeoLocalizacion{
    constructor(){
        this.apikey="47b790fd0fc41878c80c57c9846132cb";
        this.url="https://api.openweathermap.org/data/2.5/weather?q=";
        this.idioma="&lang=es";
        this.unidades="&units=metric";
        this.error="<h2>¡problemas! No puedo obtener información de"
         +"OpenWeatherMap</h2>";
        this.ciudad="";
        this.latitud=0;
        this.longitud=0;
        this.latitud0=0;
        this.longitud0=0;
        navigator.geolocation.getCurrentPosition(this.iniciarMapa.bind(this),this.mostrarErrores.bind(this));
        this.map;
    }

    añadirRuta(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                var longitud = datos.coord.lon;
                var latitud = datos.coord.lat;
                this.longitud=longitud;
                $("form").after("<input type='button' value='CalcularRuta' onclick='localizacion.calcular("+longitud+","+latitud+")'/>");
            },
            error:function(){
                $("h1").html("Ha sucedido un error");
            }
            
        });
    }
    
    iniciarMapa(posicion){
        this.longitud0=posicion.coords.longitude;
        this.latitud0=posicion.coords.latitude;
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWV0ZTE3IiwiYSI6ImNrd2J5c2JyeTFndDMydXFtYjMweXFpcWEifQ.0SKmdulKoTv4TGHbrJWvAg';  
        var map = new mapboxgl.Map({ 
            container: 'map', 
            style: 'mapbox://styles/mapbox/streets-v10',  
            center: [this.longitud0, this.latitud0],
            zoom: 13
            }); 
        
        var marker = new mapboxgl.Marker().setLngLat([this.longitud0, this.latitud0]).addTo(map);
    }

    calcular(longitud,latitud){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                $("input[value=CalcularRuta]").remove();
                mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWV0ZTE3IiwiYSI6ImNrd2J5c2JyeTFndDMydXFtYjMweXFpcWEifQ.0SKmdulKoTv4TGHbrJWvAg';  
                $("section").remove();
                $("form").before("<section id='map'><h2>Mapa</h2></section>");
                var map = L.map('map', {
                    center: [latitude, longitude],
                    zoom: 12
                });
                  //  var marker = new mapboxgl.Marker().setLngLat([latitude, longitude]).addTo(map);
                //var marker2 = new mapboxgl.Marker().setLngLat([longitud,latitud]).addTo(map);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 25,
                    id: 'mapbox/streets-v11'
                }).addTo(map);
                var r=L.Routing.control({
                    waypoints: [
                        L.latLng(latitude, longitude),
                        L.latLng(latitud,longitud)
                    ],
                    language: 'es'
                
                }).addTo(map);
    });
    }
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

    calcularRuta(){
        this.url="https://api.openweathermap.org/data/2.5/weather?q=";
        this.ciudad=$('input[type=text]').val();
        this.url+=this.ciudad+this.unidades+this.idioma
            + "&APPID=" +this.apikey
        this.añadirRuta();
    }

}
var localizacion=new GeoLocalizacion();
