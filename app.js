const express = require("express");
const https = require("https");

const app = express();

app.get("/",function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=3a1bb6311ca7e468bdd48f60f74e621e&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);


        response.on("data",function(data){
           const weatherData =  JSON.parse(data);
           const temp = weatherData.main.temp;
           const description = weatherData.weather[0].description;
           const icon = weatherData.weather[0].icon
           const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
           res.write("<p>The weather is currently " +description+"</p>");
           res.write("<h1>The temperature in Nairobi is " + temp + "degrees celcius</p>");
            res.write("<img src="+ imageURL+ ">");
           res.send();
        })
    })


})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})