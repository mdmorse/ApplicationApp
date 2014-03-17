$(function(){

	$(window).load(function(){
		var logo = document.getElementById("logo-slide");
		TweenLite.to(logo,4, {left:"73%"});
	});
	
	$(document).on('click','.location-text',function (){				
			$(this).closest('.single-trail-container').find('.description').slideToggle('fast');				
	});
	$(document).on('change', '#start', calcRoute);

	$('#view-directions').click(function(){
		$('.directions-container').slideToggle('fast');
	});

	// $('.location-text').click(function(){
	// 	$('.description').slideToggle('fast');
	// });

	// var moreDetails = function(){
	// 	$('location-text').click(function(){
	// 		$.ajax('/trails',{
	// 			data:{location:location},
	// 			success:function(data){
	// 				var logo = document.getElementById("description");
	// 				TweenLite.to(logo,4, {left:"73%"});
	// 			}
	// 		})
	// 	});
	// }


// moreDetails();

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
