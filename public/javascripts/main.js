$(function(){

	$(window).load(function(){
		var logo = document.getElementById("logo-slide");
		TweenLite.to(logo,4, {left:"73%"});
	});
	
	$('.location-text').click(function(){
		$('.description').slideToggle('fast');
	});
	






});