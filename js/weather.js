function getWeather()
{

  $.ajax({
  url : "http://api.wunderground.com/api/b65cbef757095e07/forecast/q/CO/Denver.json",
  dataType : "jsonp",
  success : function(result) {
			
			var weather_text="";
			var weather = result.forecast.txt_forecast.forecastday;
			//alert(weather);
			
			weather_text='<table>';
			for(var i=0;i<weather.length;i++)
			{
			weather_text+='<tr>';
			weather_text+='<td><img src="'+weather[i].icon_url+'" /></td>';
			weather_text+='<td><h3>'+weather[i].title+'</h3>';
			weather_text+=weather[i].fcttext;
			//+weather[i].fcttext_metric;
			weather_text+='</td>';
			weather_text+='<tr>';
			}
			weather_text+='</table>';	
			
			document.getElementById("weather_data").innerHTML=weather_text;
			            
       },
        error: function (error) {
            console.log("Failure" + JSON.stringify(error));
        }
    });

}