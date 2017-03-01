
$(document).ready(function(){
		
		
		$(document).on('click', '#places_to_stay',function(e,data)
		{
				findPlaces("lodging");
				$.mobile.navigate( "#content-hotels", { transition : "slide", info: "info about the #bar hash",reload: true });
				
		});
			
		$(document).on('click', '#contact',function(e,data)
		{
				$.mobile.navigate( "#contact-page", { transition : "slide", info: "info about the #bar hash",reload: true });
				
		});
		
		$(document).on('click', '#credits',function(e,data)
		{
				$.mobile.navigate( "#credits-page", { transition : "slide", info: "info about the #bar hash",reload: true });
				
		});
		
		$(document).on('click', '#places_to_eat',function(e,data)
		{
				findPlaces("restaurant");
				$.mobile.navigate( "#content-restaurants", { transition : "slide", info: "info about the #bar hash",reload: true });
		});
		
		$(document).on('click', '#night_club',function(e,data)
		{
				findPlaces("night_club");
				$.mobile.navigate( "#content-nightclubs", { transition : "slide", info: "info about the #bar hash",reload: true });
		});
		
		
		$(document).on('click', '#art_gallery',function(e,data)
		{
				findPlaces("art_gallery");
				$.mobile.navigate( "#content-attractions", { transition : "slide", info: "info about the #bar hash",reload: true });
		});

		$(document).on('click', '#weather',function(e,data)
		{
				$.mobile.navigate( "#content-weather", { transition : "slide", info: "info about the #bar hash",reload: true });
				getWeather();
			
		});		
		
		$(document).on('click', '#news_articles',function(e,data)
		{
				$.mobile.navigate( "#content-local-news", { transition : "slide", info: "info about the #bar hash" });
				loadFeeds();
			
		});
		
	$(document).on('click', '#home_menu', function(){        
	//location.hash
		//alert(1);
        $.mobile.navigate( "#homepage", { transition : "slide", info: "info about the #bar hash" });
	}); 
});//$(document).ready(function(){