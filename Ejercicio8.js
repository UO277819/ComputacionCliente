class Tiempo{
    constructor(){
        this.apikey="47b790fd0fc41878c80c57c9846132cb";
        this.url="https://api.openweathermap.org/data/2.5/weather?q=";
        this.idioma="&lang=es";
        this.unidades="&units=metric";
        this.error="<h2>¡problemas! No puedo obtener información de"
         +"<a href='https://openweathermap.org'>OpenWeatherMap</a></h2>";
        this.ciudad="";
    }
    mostrarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(data){
                $("pre").text(JSON.stringify(datos,null,2));
                var datos="";
                datos+="<h3>Datos</h3>";
                datos+="<p>Ciudad: " + data.name + "</p>";
                datos+="<p>País: " + data.sys.country + "</p>";
                datos+="<p>Latitud: " +data.coord.lon + " grados</p>";
                datos+="<p>Longitud: " + data.coord.lat + " grados</p>";
                datos+="<p>Temperatura: " + data.main.temp + " grados Celsius</p>";
                datos+="<p>Temperatura máxima: " + data.main.temp_max + " grados Celsius</p>";
                datos+="<p>Temperatura mínima: " + data.main.temp_min + " grados Celsius</p>";
                datos+="<p>Presión: " + data.main.pressure + " milímetros</p>";
                datos+="<p>Humedad: " + data.main.humidity + "%</p>"; 
                datos+="<p>Amanece a las: " + new Date(data.sys.sunrise *1000).toLocaleTimeString() + "</p>"; 
                datos+="<p>Oscurece a las: " + new Date(data.sys.sunset *1000).toLocaleTimeString() + "</p>"; 
                datos+="<p>Dirección del viento: " + data.wind.deg + "  grados</p>";
                datos+="<p>Velocidad del viento: " + data.wind.speed + " metros/segundo</p>";
                datos+="<p>Hora de la medida: " + new Date(data.dt *1000).toLocaleTimeString() + "</p>";
                datos+="<p>Fecha de la medida: " + new Date(data.dt *1000).toLocaleDateString() + "</p>";
                datos+="<p>Descripción: " + data.weather[0].description + "</p>";
                datos+="<p>Visibilidad: " + data.visibility + " metros</p>";
                datos+="<p>Nubosidad: " + data.clouds.all + " %</p>";
                datos+="<p>Tiempo Actual: "+ data.weather[0].main +"</p>";
                datos+="<img src='https://openweathermap.org/img/w/"+data.weather[0].icon+".png'/>";
                $("section").html(datos);
            },
            error:function(){
                $("h1").html("Ha sucedido un error");
                $("h2").remove();
                $("h3").remove();
                $("p").remove();  
            }
        });
    }

    cargarDatos(ciudad){
        
        this.reiniciarUrl();
        $("section").remove();
        $("h2").remove();
        this.ciudad=""+ciudad;
        this.url+=this.ciudad+this.unidades+this.idioma
            + "&APPID=" +this.apikey
        $("form").before("<h2>Datos en JSON desde <a href='https://openweathermap.org'>OpenWeatherMap</a></h2>");
        $("form").after("<section></section>");
        this.mostrarDatos();
    }

    reiniciarUrl(){
        this.url="https://api.openweathermap.org/data/2.5/weather?q=";
    }
}

var tiempo =new Tiempo();
