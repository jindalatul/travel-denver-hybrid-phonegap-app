var geocoder;
var map;
var category;

function reset_place_details()
{
document.getElementById("place_name_about_page").innerHTML="";
document.getElementById("place_address_about_page").innerHTML="";
document.getElementById("place_phone_about_page").innerHTML="";
document.getElementById("place_website_about_page").innerHTML="";
document.getElementById("place_star_rating_about_page").innerHTML="";
document.getElementById("place_useful_links_about_page").innerHTML="";
document.getElementById("place_reviews_about_page").innerHTML="";
document.getElementById("place_main_pic_about_page").innerHTML="";

}

function initialize() {
    // prepare Geocoder
    geocoder = new google.maps.Geocoder();

    var myLatlng = new google.maps.LatLng(39.7391667, -104.9841667);

    var myOptions = { // default map options
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	
    map = new google.maps.Map("", myOptions);
}

function displayDetails(place_id)
{

$.mobile.loading("show");

reset_place_details();

$.mobile.navigate( "#place-details-data", { transition : "slide", info: "info about the #bar hash",reload: true });
var cur_location = new google.maps.LatLng(39.7391667, -104.9841667);
var request = {
    placeId: place_id
};
		var map = new google.maps.Map(locationDetailsMap, {
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: cur_location
		  });

		  var service = new google.maps.places.PlacesService(map);

		  //alert(service);
		  
service.getDetails(request, function(place, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) 
			{ 
				//alert("Jindal");
				document.getElementById("place_name_about_page").innerHTML=place.name;
				document.getElementById("place_address_about_page").innerHTML=place.formatted_address;
				document.getElementById("place_phone_about_page").innerHTML=place.formatted_phone_number;
				document.getElementById("place_website_about_page").innerHTML='<a href="'+place.website+'" target=_blank>Website</a>';
				
				var useful_links="";
				
				useful_links+='<a class="link-option" href="javascript:void();" onclick="shareonfacebook()">Share App on Facebook</a><br>';
				
				document.getElementById("place_useful_links_about_page").innerHTML=useful_links;

var stars_percent = (place.rating/5)*100;
var starRating="";
starRating +='<span style="display: block; width: 65px; height: 13px; background: url(star-rating-sprite.png) 0 0;">';
starRating +='<span style="display: block; width: '+stars_percent+'%; height: 13px; background: url(star-rating-sprite.png) 0 -13px;"></span>';
starRating +='</span>';
	
			document.getElementById("place_star_rating_about_page").innerHTML=starRating;
			
			//alert(place.price_level);
			
			var price=place.price_level;
			if(price==undefined) document.getElementById("place_average_price_about_page").innerHTML= "Free or Not Applicable";
			if(price==0)	document.getElementById("place_average_price_about_page").innerHTML= "Free or Not Applicable";
			if(price==1)	document.getElementById("place_average_price_about_page").innerHTML= "Inexpensive";
			if(price==2)	document.getElementById("place_average_price_about_page").innerHTML= "Moderate";
			if(price==3)	document.getElementById("place_average_price_about_page").innerHTML= "Expensive";
			if(price==4)	document.getElementById("place_average_price_about_page").innerHTML= "Very Expensive";
			
			}
				 				
				 var reviews = place.reviews;
				 var text="";
				 
				 for (i = 0; i < reviews.length; i++) 
				 { 
					text+='<div style="padding:5px;">'+reviews[i].text+'<br><b>'+reviews[i].author_name+'</b></div>';					
				 }
				
				text="<h3>Recent Reviews</h3>"+text;
				document.getElementById("place_reviews_about_page").innerHTML= text;
				
				var pic = place.photos[0].getUrl( {maxWidth:250} );
				//alert(pic);
				document.getElementById("place_main_pic_about_page").innerHTML= '<img src="'+pic+'" />';
				
			});

        $.mobile.loading("hide");
		  
}

function displayGoogleMap(place_id)
{

var locationDetailsMap = document.getElementById("locationDetailsMap");

var cur_location = new google.maps.LatLng(39.7391667, -104.9841667);

var request = {
    placeId: place_id
  };
  
 //alert("Google MAP");

//alert(place_id);

var map = new google.maps.Map(locationDetailsMap, {
    zoom:1,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: cur_location
  });
 
$.mobile.navigate( "#place-map", { transition : "slide", info: "info about the #bar hash",reload: true });


google.maps.event.trigger(map, 'resize');
map.setZoom( map.getZoom() );
map.setCenter(map.getCenter());

 /*
var service = new google.maps.places.PlacesService(map);

service.getDetails(request, function(place, status) 
{
    if (status == google.maps.places.PlacesServiceStatus.OK) 
	{
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
    }
  });

google.maps.event.trigger(map, 'resize');
map.setZoom( map.getZoom() );
*/

}

function findPlaces(type) {

    var cur_location = new google.maps.LatLng(39.7391667, -104.9841667);

    // prepare request to Places
    var request = {
        location: cur_location,
        radius: 2000,
        types: [type]
    };
	category=type;
	
	//alert(category);
    // send request
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, createMarkers);
}

// create markers (from 'findPlaces' function)
function createMarkers(results, status) {
	//alert(2);
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        // and create new markers by search result
		//alert(category);
        for (var i = 0; i < results.length; i++) 
			{
				/*
				if(i==0) alert(results[i].name);
				if(i==1) alert(results[i].name);
				if(i==2) alert(results[i].name);
				*/
				writePlace(results[i],category);
			}
		}
}

function writePlace(place,category)
{

    $.mobile.loading("show");

var hotels = '<li>';
var stars_percent = (place.rating/5)*100;

hotels += '<li style="border-bottom:1px solid; padding-bottom:10px"><h1>'+place.name + '</h1>'+ place.vicinity+'<br>';
if(category!="art_gallery")
	{
		hotels +='<table><tr>';
		hotels +='<td>Avg Rating - '+place.rating+'</td>'
		
		hotels +='<td>';
		
		hotels +='<span style="display: block; width: 65px; height: 13px; background: url(star-rating-sprite.png) 0 0;">';
		hotels +='<span style="display: block; width: '+stars_percent+'%; height: 13px; background: url(star-rating-sprite.png) 0 -13px;"></span>';
		hotels +='</span>';
		
		hotels +='</td></tr></table>';
	}	
	
	hotels += '<table><tr>';
	hotels += ' <td><a href="javaScript:void(0);" onClick="displayDetails(\''+place.place_id+'\')">Get more information</a></td>';
	
	hotels += '</tr></table>';
	
	if(category=="lodging")
	{
		hotelsList = document.getElementById("hotels");
		hotelsList.innerHTML = hotelsList.innerHTML+hotels;
	}
	if(category=="restaurant")
	{
		restaurantList = document.getElementById("restaurants");
		restaurantList.innerHTML = restaurantList.innerHTML+hotels;
	}
	if(category=="art_gallery")
	{
		attractionsList = document.getElementById("attractions");
		attractionsList.innerHTML = attractionsList.innerHTML+hotels;
	}
	if(category=="night_club")
	{
		night_clubList = document.getElementById("nightclubs");
		night_clubList.innerHTML = night_clubList.innerHTML+hotels;
	}
	
	
	//$('#hotels').html(hotels);
	//$('#hotels').trigger('create');

            $.mobile.loading("hide");
}

google.maps.event.addDomListener(window, 'load', initialize);

