var errorMessagePanel;
var resetflag = 0;
var channel = 0;
var scheduleEntriesFrom = "";
var scheduleEntriesTo = "";
var changesMadeFrom = "";
var changesMadeTo = "";
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

    $("#ScheduleEntriesFrom").datepicker({ dateFormat: "dd-M-yy",
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", "");
    $("#ScheduleEntriesTo").datepicker({ dateFormat: "dd-M-yy",
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", "");
    $("#ChangesMadeFrom").datepicker({ dateFormat: "dd-M-yy",
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", "");
    $("#ChangesMadeTo").datepicker({ dateFormat: "dd-M-yy",
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", "");




    $("#ScheduleEntriesFromIcon").click(function () {
        $("#ScheduleEntriesFrom").datepicker("show");
    });

    $("#ScheduleEntriesToIcon").click(function () {
        $("#ScheduleEntriesTo").datepicker("show");
    });


    $("#ChangesMadeFromIcon").click(function () {
        $("#ChangesMadeFrom").datepicker("show");
    });

    $("#ChangesMadeToIcon").click(function () {
        $("#ChangesMadeTo").datepicker("show");
    });

    $('#btnReset').click(function () {
        $.noty.closeAll();
        $('#Channel option').first().prop('selected', true);
        //channel = $("#Channel").val();
        $("#ScheduleEntriesFrom").datepicker("setDate", "");
        //scheduleEntriesFrom = $("#ScheduleEntriesFrom").val();
        $("#ScheduleEntriesTo").datepicker("setDate", "");
        //scheduleEntriesTo = $("#ScheduleEntriesTo").val();

        $("#ChangesMadeFrom").datepicker("setDate", "");
        //changesMadeFrom = $("#ChangesMadeFrom").val();

        $("#ChangesMadeTo").datepicker("setDate", "");
        //changesMadeTo = $("#ChangesMadeTo").val();
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
    var id = element.id;
    var fromDate = GetDateWithMonthInNumber(value);
    if ($.browser.msie) {
        fromDate = GetDateWithMonthInNumber(value);
    }
    else {
        fromDate = value.replace(/\//g, '-');
    }
    var toDate = "";
    if (id == "ScheduleEntriesFrom") {
        if ($.browser.msie) {
            toDate = GetDateWithMonthInNumber($("#ScheduleEntriesTo").val());
        }
        else {
            toDate = $("#ScheduleEntriesTo").val().replace(/\//g, '-');
        }
    }
    else {
        if ($.browser.msie) {
            toDate = GetDateWithMonthInNumber($("#ChangesMadeTo").val());
        }
        else {
            toDate = $("#ChangesMadeTo").val().replace(/\//g, '-');
        }
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
        channel = $("#Channel").val();
        $('#Channel option').first().prop('selected', true);
        scheduleEntriesFrom = $("#ScheduleEntriesFrom").val();
        $("#ScheduleEntriesFrom").datepicker("setDate", "");
        scheduleEntriesTo = $("#ScheduleEntriesTo").val();
        $("#ScheduleEntriesTo").datepicker("setDate", "");
        changesMadeFrom = $("#ChangesMadeFrom").val();
        $("#ChangesMadeFrom").datepicker("setDate", "");
        changesMadeTo = $("#ChangesMadeTo").val();
        $("#ChangesMadeTo").datepicker("setDate", "");
        resetflag = 1;
    }
    else if (resetflag == 1) {
        $("#Channel").val(channel);
        $("#ScheduleEntriesFrom").datepicker("setDate", scheduleEntriesFrom);
        $("#ScheduleEntriesTo").datepicker("setDate", scheduleEntriesTo);
        $("#ChangesMadeFrom").datepicker("setDate", changesMadeFrom);
        $("#ChangesMadeTo").datepicker("setDate", changesMadeTo);
        resetflag = 0;
    }
} 