// JavaScript Document

$(document).ready(function() {
	// select the dataset
	$("div#navigationImage td").click(function() {
		location.href = $("a", this).attr("href");
	//	return $("a", this).click();
	});
	
	//$("div#navigationImage td a").click(function() {
	//	if (!$(this).parent().hasClass("here"))
	//		location.href = $(this).attr("href");
	//	return false;
	//	return true;
	//});
	
	// select the page
	$("div#navigation td").click(function() {
		location.href = $("a", this).attr("href");
	//	return $("a", this).click();
	});
	
	//$("div#navigation td a").click(function() {
	//	if (!$(this).parent().hasClass("here"))
	//		location.href = $(this).attr("href");
	//	return false;
	//	return true;
	//});
});

