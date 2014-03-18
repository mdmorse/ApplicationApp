$(function(){

	$(window).load(function(){
		$('#logo-slide').fadeIn('slow');
		var logo = document.getElementById("logo-slide");
		TweenLite.to(logo,4, {left:"73%",ease:Quint.easeInOut});
		$('#login').fadeIn(3000);
	});
	
	$(document).on('click','.toggle-arrow',function (){				
			$(this).closest('.single-trail-container').find('.description').slideToggle('fast');
			TweenLite.to('.toggle-arrow', .25, {rotation:90, scaleX:0.8});
	});
	
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


});
