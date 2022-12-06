"use strict";
class Analizador {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.iniciarMapa.bind(this));
    }
    obtenerDatos(){
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWV0ZTE3IiwiYSI6ImNrd2J5c2JyeTFndDMydXFtYjMweXFpcWEifQ.0SKmdulKoTv4TGHbrJWvAg';
        var listaArchivos = $('input[type=file]');
                const map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/light-v10',
                    center: [-5.84, 43.36],
                    zoom: 5
                });
        for (var i = 0; i < listaArchivos.length; i++) {
            var archivos=listaArchivos.get(i).files,
            nArchivos = archivos.length;
                for (var j = 0; j < nArchivos; j++) {
                    var reader = new FileReader();
                    reader.onload = function (progressEvent) {
                        var name = "",
                        coordenadas="";
                        var json =JSON.parse(this.result.replaceAll("'", "\""));
                    for(const datos of json.features) {
                        var marker = new mapboxgl.Marker()
                            .setLngLat(datos.geometry.coordinates)
                            .addTo(map);
                    }
                    };
                    reader.readAsText(archivos[j]);
                }
        }
    }
    iniciarMapa(posicion){
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWV0ZTE3IiwiYSI6ImNrd2J5c2JyeTFndDMydXFtYjMweXFpcWEifQ.0SKmdulKoTv4TGHbrJWvAg';  
        var map = new mapboxgl.Map({ 
            container: 'map', 
            style: 'mapbox://styles/mapbox/streets-v10',  
            center: [posicion.coords.longitude, posicion.coords.latitude],
            zoom: 13
            });
    }

}
var archivo = new Analizador();
