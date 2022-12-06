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
                        var parser=new DOMParser(),
                        kml=parser.parseFromString(this.result,"text/xml");
                        var hijos=kml.getElementsByTagName("Placemark");
                        for(var l=0;l<hijos.length;l++){
                            var placemark=hijos.item(l);
                            for(var k=0;k<placemark.children.length;k++){
                                var elemento=placemark.children.item(k);
                                if(elemento.nodeName=="name"){
                                    name=elemento.textContent;
                                }else if(elemento.nodeName=="Point"){
                                    for(var m=0;m<elemento.children.length;m++){
                                        var point=elemento.children.item(m);
                                        if(point.nodeName=="coordinates"){
                                            coordenadas=point.textContent;
                                        }
                                    }
                                }
                            }
                            //crearMarke
                            var lonLat=coordenadas.split(",");
                            var longitud=parseFloat(lonLat[0]);
                            var latitud=parseFloat(lonLat[1]);
                            let array=[];
                            array[0]=(longitud);
                            array[1]=(latitud);
                            var marker = new mapboxgl.Marker().setLngLat(array).addTo(map);
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
