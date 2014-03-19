$(function(){

	$(window).load(function(){
		$('#logo-slide').fadeIn(1000);
		var logo = document.getElementById("logo-slide");
		TweenLite.to(logo,4, {left:"73%",ease:Power2.easeOut});
		$('#login').fadeIn(3000);
		
		$('#image-slide').fadeIn(3000);
		var logo = document.getElementById("image-slide");
		TweenLite.to(logo,4, {left:"82%",ease:Quint.easeInOut});
		
	});
	
	$(document).on('click','.toggle-arrow',function (){
		// $('.toggle-arrow').animate({rotation:90deg})
		$(this).closest('.single-trail-container').find('.description').slideToggle('slow').toggleClass('showing');
		

		if(!$(this).closest('.single-trail-container').find('.description').hasClass('showing')){
		TweenLite.to($(this), .40, {rotation:0});
		}else{
		TweenLite.to($(this), .40, {rotation:90});	
		}
		// TweenLite.killTweensOf($('.toggle-arrow'));
	});
	
	

   //      $('.toggle-arrow').click(function(){
			// $(this).closest('.single-trail-container').find('.description').slideToggle('slow');

            // var elem = $('.single-trail-container'+$(this).attr()),
            //     arrow = $(this).children('.toggle-arrow')
            
            // if (!elem.is(':visible'))  {
            //     $(this).rotate({animateTo:180});
            // } else {
            //     $(this).rotate({animateTo:360});
            // }
    
     
    //     return false;
    // });

	$(document).on('change', '#start', calcRoute);

	$('#view-directions').click(function(){
		$('#directions-panel').toggle('fast');
		$('#view-directions').text(function(i, text){
			return text === "View Directions" ? "Map Only" : "View Directions";
		});
	});
	
	// $.backstretch('http://cdn01.wallconvert.com/_media/wallpapers_1366x768/1/2/black-hills-and-white-mountains-11641.jpg');

	// $('.location-text').click(function(){
	// 	$('.description').slideToggle('fast');
	// });


//****************Displays Map********************


	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService();

	function initialize() {
	  directionsDisplay = new google.maps.DirectionsRenderer();
	  var mapOptions = {
	    zoom: 7,
	    center: new google.maps.LatLng(41.850033, -87.6500523)
	  };
	  var map = new google.maps.Map(document.getElementById('map-canvas'),
	      mapOptions);
	  directionsDisplay.setMap(map);
	  directionsDisplay.setPanel(document.getElementById('directions-panel'));
	  calcRoute();

	  var control = document.getElementById('panel');
	  control.style.display = 'block';
	  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
	}

	function calcRoute() {
	  var start = document.getElementById('start').value;
	  var end = document.getElementById('end').value;
	  var request = {
	    origin: start,
	    destination: end,
	    travelMode: google.maps.TravelMode.DRIVING
	  };
	  directionsService.route(request, function(response, status) {
	  	console.log(response,status);
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	    }
	  });
	}

	google.maps.event.addDomListener(window, 'load', initialize);

// calcRoute();
// initialize();
	window.fbAsyncInit = function() {
	        FB.init({
	          appId      : '{445421345603958}',
	          status     : true,
	          xfbml      : true
	        });
	      };

	      (function(d, s, id){
	         var js, fjs = d.getElementsByTagName(s)[0];
	         if (d.getElementById(id)) {return;}
	         js = d.createElement(s); js.id = id;
	         js.src = "//connect.facebook.net/en_US/all.js";
	         fjs.parentNode.insertBefore(js, fjs);
	       }(document, 'script', 'facebook-jssdk'));


});
