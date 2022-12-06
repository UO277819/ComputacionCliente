"use strict";
class Petroleo {
    constructor(){
        this.API_KEY = "ay1315deik2w17tk89dpk4i5imbq1yifkjt3mnw5r94ap942k8xi32q1qdsp";
        this.base = "USD"
        this.symbols = "EUR,JPY,GBP";
        this.start_date = "2022-11-21";
        this.end_date = "2022-11-26";
        this.url = "https://commodities-api.com/api/fluctuation?access_key=" + this.API_KEY + "&base=" + this.base + "&symbols=" + this.symbols + 
                    "&start_date=" + this.start_date + "&end_date=" + this.end_date;
    }
    obtenerDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                $("pre").text(JSON.stringify(datos, null, 2));

                    if(datos.data.success) // success = true implica que la solicitud de api se ha realizado correctamente
                        $("h2").text("La solicitud se ha realizado con éxito")
                    $("h2").after("<p>Los datos procesados van desde el "+datos.data.start_date+" al "+datos.data.end_date+"</p>");
                    var stringDatos = "<table><caption>Precios por barril de petróleo</caption>";
                        stringDatos += "<tr><th>Campo</th><th>EUR</th><th>JPY</th><th>GBP</th></tr>";
                        stringDatos += "<tr><td>Tarifa inicial</td><td>" + datos.data.rates.EUR.start_rate 
                            + "</td><td>" + datos.data.rates.JPY.start_rate + "</td><td>" 
                            + datos.data.rates.GBP.start_rate + "</td></tr>";
                        stringDatos += "<tr><td>Tarifa final</td><td>" + datos.data.rates.EUR.end_rate 
                            + "</td><td>" + datos.data.rates.JPY.end_rate + "</td><td>" 
                            + datos.data.rates.GBP.end_rate + "</td></tr>";
                        stringDatos += "<tr><td>Variación de la tarifa</td><td>" + datos.data.rates.EUR.change 
                            + "</td><td>" + datos.data.rates.JPY.change + "</td><td>" 
                            + datos.data.rates.GBP.change + "</td></tr>";
                        stringDatos += "<tr><td>Variación %</td><td>" + datos.data.rates.EUR.change_pct 
                            + "</td><td>" + datos.data.rates.JPY.change_pct + "</td><td>" 
                            + datos.data.rates.GBP.change_pct + "</td></tr></table>";
                    
                    $("section").html(stringDatos);

                },
            error:function(){
                $("h3").html("¡Tenemos problemas! Para cargar los datos"); 
                $("h4").remove();
                $("h5").remove();
                $("section").remove();
                }
        });
    }

    verJSON(){
        $("form").after(document.createElement("section"))
        $("form").after(document.createElement("pre"))
        $("form").after($("<h3></h3>").text("Datos a procesar"))
        $("form").after(document.createElement("h2"))
        this.obtenerDatos();
        $("input[type=button]").attr("disabled", "disabled")

    }

    reiniciarUrl(){
        this.url="https://commodities-api.com/api/";
    }
}
var petroleo = new Petroleo();
