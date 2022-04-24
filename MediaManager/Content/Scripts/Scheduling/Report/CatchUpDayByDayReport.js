var errorMessagePanel;
var selectedvalue;
var lookupInvokerControl;
var lookupTitle;
var resetflag = 0;
var actionParameters;
var grid;
var idfield;
var gridwidth;
var gridheight;
var ToggleButton;
var columns;
var visiblecolumns;
var options;
var actionParameters;
var gridContainerDiv;
var selectedseriestitle;
var selectedseriesno;
var baseaddress;
var lookupDescriptionControl;

var resetflag = 0;
var dateFrom = "";
var dateTo = "";
var mediaPlateForm = "%";
var region = "%";
var mediaPlateFormDesc = "%";
var regionDesc = "%";
var isSynopsis = true;
var isGenre = true;
var isFirstTime = true;
$(document).ready(function () {
    $("#ReportInput").fadeIn(1000);
    $('#ReportInput').focus();

    shortcut.add("F8", function () {
        $("#mainForm").attr("target", "_blank");
        eval($('#btnGenerate').trigger('click'));
    });

    shortcut.add("F7", function () {
        Reset();
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
    $('.ui-datepicker-trigger').attr('style', 'position:relative; top:5px; left:0px; background-color:transparent;');

    $('[name=Synopsis][value="True"]').prop('checked', true);
    $('[name=GenreInput][value="True"]').prop('checked', true);

    $('#btnReset').click(function () {
        $.noty.closeAll();
        //dateFrom = "";
        $("#DateFrom").datepicker("setDate", "");
        //dateTo = "";
        $("#DateTo").datepicker("setDate", "");
        //mediaPlateForm = '%';
        $('#MediaPlateform').val('%');
       // region = '%';
        $('#Region').val('%');
        //isSynopsis = true;
        $('[name=Synopsis][value="True"]').prop('checked', true);
        //isGenre = true;
        $('[name=GenreInput][value="True"]').prop('checked', true);
        //mediaPlateFormDesc = "";
        $("#txtMediaPlateformDesc").val("");
        //regionDesc = "";
        $("#txtRegionDesc").val("");
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
    $('#txtMediaPlateformDesc').attr('disabled', 'disabled');
    $('#txtRegionDesc').attr('disabled', 'disabled');

    shortcut.add("F9", function () {

        if ($("#MediaPlateform").is(":focus")) {
            OpenMediaPlateFormsLookup();
        }

        if ($("#Region").is(":focus")) {
            OpenRegionsLookup();
        }
    });


    $("#imgMediaPlateform").click(function () {
        OpenMediaPlateFormsLookup();
    });

    $("#imgMediaPlateform").click(function () {
        OpenRegionsLookup();
    });
//    $("#DateFrom").blur(function () {
//        $('#DateFrom').datepicker("hide");
//    });


    $('#MediaPlateform').bind('blur', function () {
        if ($.trim($('#MediaPlateform').val()) == "" || $.trim($('#MediaPlateform').val()) == "%") {
            $('#txtMediaPlateformDesc').val("");
        }
    });
    $('#Region').bind('blur', function () {
        if ($.trim($('#Region').val()) == "" || $.trim($('#Region').val()) == "%") {
            $('#txtRegionDesc').val("");
        }
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
    var dateFrom = "";
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



jQuery.validator.addMethod("isvalidfield", function (value, element, param) {
    if ($.trim(value) == "%")
        value = "";
    var actionParameters = { codeToValidate: value };
    var id = element.id;
    var response = true;
    var actionUrl = "";
    if (id == "MediaPlateform") {
        actionUrl = ValidateMediaPlateFormAtionUrl;
    }
    else {
        actionUrl = ValidateRegionAtionUrl;
    }
    $.ajax({
        async: false,
        url: actionUrl,
        type: "GET",
        dataType: 'Json',
        cache: false,
        data: actionParameters,
        success: function (data) {
            //            debugger;
            if (data != null) {
                if (id == "MediaPlateform") {
                    $('#MediaPlateform').val(data.MediaPlatformCode);
                    $('#txtMediaPlateformDesc').val(data.MediaPlatformDesc);
                }
                else {
                    $('#Region').val(data.RegionCode);
                    $('#txtRegionDesc').val(data.RegionDescription);
                }
                response = true;
            }
            else if (value != "") {
                if (id == "MediaPlateform") {
                    //$('#MediaPlateform').val("");
                    $('#txtMediaPlateformDesc').val("");
                }
                else {
                    //$('#Region').val("");
                    $('#txtRegionDesc').val("");
                }
                response = false;
            }
        }, //end of success
        error: function () {
            alert("error");
        } //end of error
    });  //end of ajax call
    //        if ((response == null ) && value != "")  //&& isResponceCome
    //            return false;
    return response;
});
jQuery.validator.unobtrusive.adapters.addBool("isvalidfield");

////////////////////////////////// end of client side validation /////////////////////////////////////////


function Reset() {
    $.noty.closeAll();
    if (resetflag == 0) {
        dateFrom = $("#DateFrom").val();
        $("#DateFrom").datepicker("setDate", "");
        dateTo = $("#DateTo").val();
        $("#DateTo").datepicker("setDate", "");
        mediaPlateForm = $("#MediaPlateform").val();
        $('#MediaPlateform').val('%');
        region = $("#Region").val();
        $('#Region').val('%');
        isSynopsis = $('[name=Synopsis][value="True"]').is(':checked');
        $('[name=Synopsis][value="True"]').prop('checked', true);
        isGenre = $('[name=GenreInput][value="True"]').is(':checked');
        $('[name=GenreInput][value="True"]').prop('checked', true);
        mediaPlateFormDesc = $("#txtMediaPlateformDesc").val();
        $("#txtMediaPlateformDesc").val("");
        regionDesc = $("#txtRegionDesc").val();
        $("#txtRegionDesc").val("");
        resetflag = 1;
    }
    else if (resetflag == 1) {
        $("#DateFrom").datepicker("setDate", dateFrom);
        $("#DateTo").datepicker("setDate", dateTo);
        $("#MediaPlateform").val(mediaPlateForm);
        $("#Region").val(region);
        $('[name=Synopsis][value="True"]').prop('checked', isSynopsis);
        $('[name=Synopsis][value="False"]').prop('checked', !isSynopsis);
        $('[name=GenreInput][value="True"]').prop('checked', isGenre);
        $('[name=GenreInput][value="False"]').prop('checked', !isGenre);
        $("#txtMediaPlateformDesc").val(mediaPlateFormDesc);
        $("#txtRegionDesc").val(regionDesc);
        resetflag = 0;
    }
}


function OpenMediaPlateFormsLookup() {
    lookupInvokerControl = "#MediaPlateform";
    lookupDescriptionControl = "#txtMediaPlateformDesc";
    actionParameters = { strFilter: $("#MediaPlateform").val() };

    columns = [

                                   { id: "MediaPlatformCode", width: 900, name: "MediaPlatform Code", field: "MediaPlatformCode" },
                                   { id: "MediaPlatformDesc", width: 900, name: "MediaPlatform Name", field: "MediaPlatformDesc" }
                               ];
    options = {
        enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true
    };
    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    idfield = "MediaPlatformCode";
    idFieldDesc = "MediaPlatformDesc";
    gridwidth = 1000;
    gridheight = 400;
    lookupTitle = "Media Plat Form";
    ShowLookupDesc(lookupInvokerControl, lookupDescriptionControl, MediaPlateFormAtionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, lookupTitle);
};


function OpenRegionsLookup() {
    lookupInvokerControl = "#Region";
    lookupDescriptionControl = "#txtRegionDesc";
    actionParameters = { strFilter: $("#Region").val() };

    columns = [

                                   { id: "RegionCode", width: 900, name: "REG CODE", field: "RegionCode" },
                                   { id: "RegionDescription", width: 900, name: "REG NAME", field: "RegionDescription" }
                               ];
    options = {
        enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true
    };
    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    idfield = "RegionCode";
    idFieldDesc = "RegionDescription";
    gridwidth = 1000;
    gridheight = 400;
    lookupTitle = "Media Plat Form";
    ShowLookupDesc(lookupInvokerControl, lookupDescriptionControl, RegionAtionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, lookupTitle);
};