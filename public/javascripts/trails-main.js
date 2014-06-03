$(function(){
	//****************slide show*******************
	

    $('.carousel.slide').carousel({
    	interval:3000,
    	wrap: true
    });
    
	$('#intro-header').fadeIn(2000);

	$('#intro-description').fadeIn(4000);
	
	
	$('#logo-slide').fadeIn(1000);
	var logo = document.getElementById("logo-slide");
	TweenLite.to(logo,4, {left:"73%",ease:Power2.easeOut});

	$('#info-slide').fadeIn(2000);
	var info = document.getElementById("info-slide");
	TweenLite.to(info,4, {left:"35%",ease:Power2.easeOut});
	
	$('#show-js').fadeIn('slow');

	//******************animated arrows on trails page***********************
	$(document).on('click','.toggle-arrow',function (){
		// $('.toggle-arrow').animate({rotation:90deg})
		$(this).closest('.single-trail-container').find('.description').slideToggle('slow').toggleClass('showing');
		if(!$(this).closest('.single-trail-container').find('.description').hasClass('showing')){
		TweenLite.to($(this), .75, {rotation:0});
		}else{
		TweenLite.to($(this), .40, {rotation:90});	
		}
	});
	






//****************************View Map only, or dirctions button on "Details Page"************************

	$(document).on('change', '#start', calcRoute);

	$('#view-directions').click(function(){
		$('#directions-panel').toggle('fast');
		$('#view-directions').text(function(i, text){
			return text === "View Directions" ? "Map Only" : "View Directions";
		});
	});
	


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


	// window.fbAsyncInit = function() {
	//         FB.init({
	//           appId      : '{445421345603958}',
	//           status     : true,
	//           xfbml      : true
	//         });
	//       };

	//       (function(d, s, id){
	//          var js, fjs = d.getElementsByTagName(s)[0];
	//          if (d.getElementById(id)) {return;}
	//          js = d.createElement(s); js.id = id;
	//          js.src = "//connect.facebook.net/en_US/all.js";
	//          fjs.parentNode.insertBefore(js, fjs);
	//        }(document, 'script', 'facebook-jssdk'));


});
