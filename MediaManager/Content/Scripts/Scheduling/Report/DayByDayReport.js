var errorMessagePanel;
var resetflag = 0;
var channel = 0;
var dateFrom = "";
var dateTo = "";
var ratingType = "";
var isSynopsis = true;
var isGenre = true;
$(document).ready(function () {


    $("#ReportInput").fadeIn(1000);
    $('#Channel').focus();
    shortcut.add("F8", function () {
        $("#mainForm").attr("target", "_blank");
        eval($('#btnGenerate').trigger('click'));
    });

    shortcut.add("F7", function () {
        Reset();
    });

    shortcut.add("F9", function () {
        if ($("#DateFrom").is(":focus")) {
            var dd = $("#DateFrom").datepicker("widget").is(":visible");
            $("#DateFrom").show();
        }
        if ($("#DateTo").is(":focus")) {

        }
    });

    $('#mainForm').bind('invalid-form.validate', function () {
        var val = $('#mainForm').validate();
        var errorMessage = "";
        if (errorMessagePanel != null && errorMessagePanel != undefined)
            errorMessagePanel.close();
        for (var i = 0; val.errorList[i]; i++) {
            var error = val.errorList[i];
            if (errorMessage == "") {
                errorMessage = error.message;
            }
            else {
                errorMessage = errorMessage + "<br /> " + error.message;
            }
        }
        if (errorMessage != "") {
            showMessage(errorMessage, 'error');
        }
    });




    $("#DateFrom").datepicker({ dateFormat: 'dd-M-yy',
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", "");


    $("#DateTo").datepicker({ dateFormat: 'dd-M-yy',
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", "");


    $("#DateFromIcon").click(function () {
        $("#DateFrom").datepicker("show");
    });

    $("#DateToIcon").click(function () {
        $("#DateTo").datepicker("show");
    });



    $('[name=Synopsis][value="True"]').prop('checked', true);
    $('[name=GenreInput][value="True"]').prop('checked', true);

    $('#btnReset').click(function () {
        $.noty.closeAll();
        //dateFrom = "";
        $("#DateFrom").datepicker("setDate", "");
        //dateTo = "";
        $("#DateTo").datepicker("setDate", "");
        $('#Channel option').first().prop('selected', true);
        //channel = $("#Channel option:selected").val();

        $('#RatingType option').first().prop('selected', true);
        //ratingType = $("#RatingType option:selected").val();

        $('[name=Synopsis][value="True"]').prop('checked', true);
        //isSynopsis = $('[name=Synopsis][value="True"]').is(':checked');

        $('[name=GenreInput][value="True"]').prop('checked', true);
        //isGenre = $('[name=GenreInput][value="True"]').is(':checked');
        resetflag = 0;
    });
    $('#btnGenerate').click(function () {
        $.noty.closeAll();
        $("#mainForm").attr("target", "_blank");
    });
    $('#btnExportToExcel').click(function () {
        $.noty.closeAll();
        $("#mainForm").attr("target", "");
    });
});


///////////////////////////////////// Client side validation ///////////////////////////////////
$.validator.addMethod("date", function (value, element) {
    var dateValue = value.replace(/\-/g, '/');
    if (!IsValidDate(value.toLowerCase())) {
        return false;
    }
    return true;
},
            ""
        );
jQuery.validator.unobtrusive.adapters.addBool("date");

jQuery.validator.addMethod("comparetwodatevalidation", function (value, element, param) {
    var dateFrom ="";
    var dateTo = "";
    if ($.browser.msie) {
        dateFrom = GetDateWithMonthInNumber($("#DateFrom").val());
        dateTo = GetDateWithMonthInNumber($("#DateTo").val());
    }
    else {
        dateFrom = $("#DateFrom").val().replace(/\//g, '-');
        dateTo = $("#DateTo").val().replace(/\//g, '-');
    }
    if ((new Date(dateFrom).getTime() > new Date(dateTo).getTime())) {
        return false;
    }
    return true;
});
jQuery.validator.unobtrusive.adapters.addBool("comparetwodatevalidation");
////////////////////////////////// end of client side validation /////////////////////////////////////////


function Reset() {
    $.noty.closeAll();
    if (resetflag == 0) {
        dateFrom = $("#DateFrom").val();
        $("#DateFrom").datepicker("setDate", "");
        dateTo = $("#DateTo").val();
        $("#DateTo").datepicker("setDate", "");
        channel = $("#Channel option:selected").val();
        $('#Channel option').first().prop('selected', true);
        ratingType = $("#RatingType option:selected").val();
        $('#RatingType option').first().prop('selected', true);
        isSynopsis = $('[name=Synopsis][value="True"]').is(':checked');
        $('[name=Synopsis][value="True"]').prop('checked', true);
        isGenre = $('[name=GenreInput][value="True"]').is(':checked');
        $('[name=GenreInput][value="True"]').prop('checked', true);
        resetflag = 1;
    }
    else if (resetflag == 1) {
        $("#DateFrom").datepicker("setDate", dateFrom);
        $("#DateTo").datepicker("setDate", dateTo);
        $("#Channel").val(channel);
        $("#RatingType").val(ratingType);
        $('[name=Synopsis][value="True"]').prop('checked', isSynopsis);
        $('[name=Synopsis][value="False"]').prop('checked', !isSynopsis);
        $('[name=GenreInput][value="True"]').prop('checked', isGenre);
        $('[name=GenreInput][value="False"]').prop('checked', !isGenre);
        resetflag = 0;
    }
} 