/***
* Contains basic SlickGrid formatters.
* @module Formatters
* @namespace Slick
*/

(function ($) {
    // register namespace
    $.extend(true, window, {
        "Slick": {
            "Formatters": {
                "PercentComplete": PercentCompleteFormatter,
                "PercentCompleteBar": PercentCompleteBarFormatter,
                "YesNo": YesNoFormatter,
                "Checkmark": CheckmarkFormatter,
                "Date": DateFormatter
            }
        }
    });

    function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "-";
        } else if (value < 50) {
            return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
        } else {
            return "<span style='color:green'>" + value + "%</span>";
        }
    }

    function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "";
        }

        var color;

        if (value < 30) {
            color = "red";
        } else if (value < 70) {
            color = "silver";
        } else {
            color = "green";
        }

        return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
    }

    function YesNoFormatter(row, cell, value, columnDef, dataContext) {
        return value ? "Yes" : "No";
    }

    function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {

        return value ? "<img src='../../Content/images/tick.png'>" : "";
    }

    function DateFormatter(row, cell, value, columnDef, dataContext) { 
        var formattedDate = "";        
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if(value.length < 12)
        {         
        var value = new Date();
         formattedDate = (value.getDate() + "-" + month[value.getMonth()] + "-" +value.getFullYear()); 
        }
        else
        {   
         var d = new Date(parseInt(value.substr(6), 10));         
         formattedDate = (d.getDate() + "-" + month[d.getMonth()] + "-" + d.getFullYear());
        }
        return formattedDate;    
    }
})(jQuery);