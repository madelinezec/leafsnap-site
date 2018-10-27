// JavaScript Document

// todo: clean up, delete them
var cookieDataset		= "leafweb_navigation_image_index";
var datasetName1		= "central_park/";
var datasetName2		= "rock_creek_park/";
var datasetName3		= "north_east/";

var baseUrl				= "http://leafsnap.com/";
var datasetsUrl			= baseUrl + "datasets/";
var speciesUrl			= baseUrl + "species/";
var usersUrl			= baseUrl + "users/";
var basicAction			= "?fmt=json&callback=?";

var placeholderImage	= "./images/loading.gif";

$(document).ready(function(){
	EliminateLinkBox();
});

function GetDatasetName(dataset) {
	switch (dataset) {
		case "dataset1":
			return datasetName1;
			
		case "dataset2":
			return datasetName2;
			
		case "dataset3":
			return datasetName3;
			
		default:
			return datasetName1;
	}
}

// eliminate the box of link when clicking
function EliminateLinkBox() {
	$("a").focus(function() {
		this.blur();
	});
}

function isEmpty(object) {
	return object == undefined || object == null || object == "";
}

