var errorMessagePanel;
var resetflag = 0;
var dateFrom = "";
var dateTo = "";
var currency = "";
var isFirstTime = true;
$(document).ready(function () {
    ////////////////////  validation on button
    //    $("#next-step").click(function () {
    //        debugger;
    //        var errorMessage = "";
    //        var $step = $(".wizard-step:visible"); // get current step
    //        ValidateForm($step);

    //    });


    $('#reportInput').focus();
    //$('#FromDate').focus();
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

    $("#FromDate").datepicker({ dateFormat: "dd-M-yy",
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", new Date());

    $("#ToDate").datepicker({ dateFormat: "dd-M-yy",
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", new Date());


    $("#FromDateIcon").click(function () {
        if (!isFirstTime)
            $("#FromDate").datepicker("show");
        isFirstTime = false;
    });

    $("#ToDateIcon").click(function () {
        $("#ToDate").datepicker("show");
    });

    $('#btnReset').click(function () {
        $.noty.closeAll();
        //dateFrom = new Date();
        $("#FromDate").datepicker("setDate", new Date());
       // dateTo = new Date();
        $("#ToDate").datepicker("setDate", new Date());
        $('#CurrCode option').first().prop('selected', true);
        //currency = $("#CurrCode").val();
        resetflag = 0;
    });
    $('#btnGenerate').click(function () {
        // $.noty.closeAll();
        $("#mainForm").attr("target", "_blank");
    });
    $('#btnExportToExcel').click(function () {
        // $.noty.closeAll();
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
    var fromDate = "";
    var toDate = "";
    if ($.browser.msie) {
        fromDate = GetDateWithMonthInNumber($("#FromDate").val());
        toDate = GetDateWithMonthInNumber($("#ToDate").val());
    }
    else {
        fromDate = $("#FromDate").val().replace(/\//g, '-');
        toDate = $("#ToDate").val().replace(/\//g, '-');    
    }
    if ((new Date(fromDate).getTime() > new Date(toDate).getTime())) {
        return false;
    }
    return true;
});
jQuery.validator.unobtrusive.adapters.addBool("comparetwodatevalidation");
////////////////////////////////// end of client side validation /////////////////////////////////////////

function Reset() {
    $.noty.closeAll();
    if (resetflag == 0) {
        dateFrom = $("#FromDate").val();
        $("#FromDate").datepicker("setDate", new Date());
        dateTo = $("#ToDate").val();
        $("#ToDate").datepicker("setDate", new Date());
        currency = $("#CurrCode").val();
        $('#CurrCode option').first().prop('selected', true);
        resetflag = 1;
    }
    else if (resetflag == 1) {
        $("#FromDate").datepicker("setDate", dateFrom);
        $("#ToDate").datepicker("setDate", dateTo);
        $("#CurrCode").val(currency);        
        resetflag = 0;
    }
}

function ValidateForm($step) {
    var validator = $("#mainForm").validate(); // obtain validator
    var anyError = false;
    if (errorMessagePanel != null && errorMessagePanel != undefined)
        errorMessagePanel.close();

    $step.find("input").each(function () {
        if (!validator.element(this)) { // validate every input element inside this step
            anyError = true;
            for (var i = 0; validator.errorList[i]; i++) {
                var error = validator.errorList[i];
                if (errorMessage == "") {
                    errorMessage = error.message;
                }
                else {
                    errorMessage = errorMessage + "<br /> " + error.message;
                }
            }
        }

    });

    if (errorMessage != "") {
        errorMessagePanel=noty({ text: errorMessage, type: 'error', dismissQueue: true,
            layout: 'bottom', theme: 'defaultTheme'
        });
    }

    if (anyError)
        return false; // exit if any error found
    else {

        //$("#mainForm").submit(); 
    }
}