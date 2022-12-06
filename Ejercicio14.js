"use strict";
class Recorrido{
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
        //navigator.geolocation.getCurrentPosition(this.iniciarMapa.bind(this),this.mostrarErrores.bind(this));
        this.map;
    }


    calcular(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWV0ZTE3IiwiYSI6ImNrd2J5c2JyeTFndDMydXFtYjMweXFpcWEifQ.0SKmdulKoTv4TGHbrJWvAg';  
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
                let array=[];
                var lista=$("ul");
                var result="";
                array[0]=L.latLng(latitude, longitude);
                for(var j=0;j<lista[0].children.length;j++){
                    result=lista[0].children[j].outerText;
                    result=result.split(",");
                    var longitud=parseFloat(result[1]);
                    var latitud=parseFloat(result[2]);
                    array[j+1]=L.latLng(latitud, longitud);
                }
                var r=L.Routing.control({
                    waypoints: array,
                    language: 'es'
                
                }).addTo(map);
    });
    }
    }

    dragOverHandler(ev) {
        console.log('File(s) in drop zone');
    
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
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

    dropHandler(ev) {
        console.log('Fichero(s) arrastrados');
        ev.preventDefault();
        if (ev.dataTransfer.items) {
          for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[i].kind === 'file') {
              var file = ev.dataTransfer.items[i].getAsFile();
              var reader = new FileReader();
              reader.onload = function (progressEvent) {
                var ciudades = this.result.split(',');
                $("section:first-of-type").after("<h2>Trayecto</h2><ul></ul>");
                for (var k = 0; k < ciudades.length; k++) {    
                    var ciudad=ciudades[k];
                    this.url="https://api.openweathermap.org/data/2.5/weather?q=";
                    var idioma="&lang=es";
                    var unidades="&units=metric";
                    var apikey="47b790fd0fc41878c80c57c9846132cb";
                    this.url+=ciudad+unidades+idioma
                        + "&APPID=" +apikey;
                    $.ajax({
                        dataType: "json",
                        url: this.url,
                        method: 'GET',
                        success: function(datos){
                            var longitud = datos.coord.lon;
                            var latitud = datos.coord.lat;
                            var lista=$("ul");
                            var result="";
                            for(var j=0;j<lista[0].children.length;j++){
                                result+=lista[0].children[j].outerHTML;
                            }
                            $("ul").html(result+"<li>"+datos.name+","+longitud+","+latitud+"</li>");
                        },
                        error:function(){
                            $("h1").html("Ha sucedido un error");
                        }
                        
                    });
                }
              };
              reader.readAsText(file);
              console.log('... file[' + i + '].name = ' + file.name);
            }
          } 
        } else {
          for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
          }
        }
        //Empiza el mapa
        this.calcular();
    }
}
var recorrido=new Recorrido();
