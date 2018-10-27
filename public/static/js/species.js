// sortPopname
//  0 -- first last ascending 
//  1 -- first last descending
//  2 -- last, first ascending
//  3 -- last, first descending

$(document).ready(function() {
    $("div#species").tabs({
        select: function() {
                    $("ul.tabs li", this).removeClass("ui-state-focus");
                }
    }).fadeIn();
    
    var speciesTabs = $("div.species-tabs").each(function() {
        // in this case, they don't share a sort order
        var table = $("table.speciesTable", this).dataTable({
            "aoColumns": [
                {"bSortable": false, "bSearchable": false},
                {"bSortable": false, "bSearchable": false},
                {"bSortable": false, "bSearchable": false},
                {"bSortable": true, "sSortDataType": "popname-text"},
                {"bSortable": true}
            ],
            "aaSorting":        [[3, "asc"]],
            "bFilter":          false,
            "bInfo":            false,
            "bPaginate":        false,
            "fnDrawCallback":   function() {
                //  $("img.speciesImg").lazyload({threshold: 200, effect: "fadeIn", placeholder: "../static/images/loading.gif"});
                // $("input#search").focus();
                // todo: change it to when clicking
            }
        });
        // for search tab
        if ($(this).attr("id") == "species-search")
            table.CreateSearchAutocomplete();
    });
    
    $("table.speciesTable tbody tr", speciesTabs).mouseover(function() {
        $(this).addClass("highlightTr");
    }).mouseout(function() {
        $(this).removeClass("highlightTr");
    }).click(function() {
        document.location.href = $("a", this).attr("href");
    });
	
	$("div#species li#search a input").click(function() {
		$(this).select();
	});
});

$.fn.CreateSearchAutocomplete = function() {

    console.log("your message here");
    var searchTable = this;
    // autocomplete in jquery-ui
    var allSpecies = new Array();
    // create allSpecies for autocomplete
    $("tbody tr", searchTable).each(function(index, element) {
        var popname         = $("td.popnameTd", element).text().trim();
        var firstName       = $("td.popnameTd", element).attr("firstName");
        var lastName        = $("td.popnameTd", element).attr("lastName");
        var sciname         = $("td.scinameTd", element).text().trim();
        allSpecies.push({
                            value: popname + " (" + sciname + ")",
                            label: popname + "&nbsp;&nbsp;&nbsp;<i>(" + sciname + ")</i>",
                            popname: popname,
                            sciname: sciname
                        });
    });
    $('div#species li#search').mousedown(function(){
        return true;
    });
    $("div#species li#search input").keyup(function(eventObject) {
        if (eventObject.which == 13)        // when user presses "enter", close the autocomplete
            $(this).autocomplete("close");
        searchTable.fnFilter(this.value);
    }).autocomplete({
        source              : allSpecies,
        delay               : 0,
        appendTo            : "body",
        html                : true,
        select              : function(event, ui) {
                                    searchTable.fnFilter(ui.item.sciname);
                                }
    });
    
    /*
    // old autocomplete 
    var allSpecies = new Array();
    // create allSpecies for autocomplete
    $("tbody tr", searchSpeciesTable).each(function(index, element) {
        allSpecies.push({
                            "popname":      $("td.popnameTd", element).text().trim(),
                            "firstName":    $("td.popnameTd", element).attr("firstName"),
                            "lastName":     $("td.popnameTd", element).attr("lastName"),
                            "sciname":      $("td.scinameTd", element).text().trim()
                        });
    });
    
    $("input#search").autocomplete(allSpecies, {
        "matchContains":    true,
        "max":              25,
        "selectFirst":      false,
        "formatItem":       function(row, i, itemNumber, searchTerm) {
                                var formatPopname = GetPopname(row.firstName, row.lastName, sortPopname);
                                //$("#result").append("<p>" + formatPopname + "</p>");
                                return formatPopname + " <i>(" + row.sciname + ")</i>";
                            },
        "formatMatch":      function(row, i, itemNumber) {
                                //$("body").append(row.popname + " " + row.sciname);
                                return row.popname + " " + row.sciname;
                            },
        "formatResult":     function(row, i, itemNumber) {
                                return row.sciname;
                            }
    });
    */
}

// sort the column of datatable dynamically
$.fn.dataTableExt.afnSortData["popname-text"] = function(oSettings, iColumn) {
    var aData = [];
    var popnameTh = $("th:eq(" + iColumn + ")", oSettings.nTable.tHead);
    var sortPopname = parseInt(popnameTh.attr("sort"));
    
    $("td:eq(" + iColumn + ")", oSettings.oApi._fnGetTrNodes(oSettings)).each(function() {
        var popname = GetPopname($(this).attr("firstName"), $(this).attr("lastName"), sortPopname);
        $(this).text(popname);
        aData.push(popname);
        //aData.push($(this).text());
    });
    popnameTh.attr("sort", (sortPopname + 1) % 4);
    return aData;
}

// get different kinds of popname
function GetPopname(firstName, lastName, sortPopname) {
    var popname;
    if (firstName == null || firstName == "") {
        popname = lastName;
    } else  if (sortPopname == 0 || sortPopname == 1) {
        popname = firstName + " " + lastName;
    } else {
        popname = lastName + ", " + firstName;
    }
    return popname;
}

