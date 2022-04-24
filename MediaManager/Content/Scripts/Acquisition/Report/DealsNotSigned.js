var errorMessagePanel;
var resetflag = 0;
var channelCompany = 0;
var budgetCode = "";
var forDate = "";
$(document).ready(function () {

    ShowServerSideError();



    $('#CompanyName').focus();
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

    
    $("#ForDate").datepicker({ dateFormat: "dd-M-yy",
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", new Date());

    $("#ForDateIcon").click(function () {
        $("#ForDate").datepicker("show");
    });
    $('#CompanyName option').first().prop('selected', true);
    $('#BudgetCode option').first().prop('selected', true);

//    $('#ChannelCompany').attr('disabled', 'disabled');
//    $('#BudgetCodeDescription').attr('disabled', 'disabled');
//    $("#ChannelCompany").val("");
//    $("#BudgetCodeDescription").val("");


    var selectedCompanyName = $("#CompanyName option:selected").val().split(":"); ;
    $('#ChannelCompany').val(selectedCompanyName[1]);

    var selectedBudgetCode = $("#BudgetCode option:selected").val().split(":"); ;
    $('#BudgetCodeDescription').val(selectedBudgetCode[1]);


    $('#btnReset').click(function () {
        $.noty.closeAll();
        $('#CompanyName option').first().prop('selected', true);
        //channelCompany = 0;

        //var selectedCompanyNameReset = $("#CompanyName option:selected").val().split(":"); ;
        $('#ChannelCompany').val("All");

        $('#BudgetCode option').first().prop('selected', true);
        //budgetCode = $("#BudgetCode option:selected").val();
        //var selectedBudgetCodeReset = $("#BudgetCode option:selected").val().split(":"); ;
        $('#BudgetCodeDescription').val("All");

        //forDate = new Date();
        $("#ForDate").datepicker("setDate", new Date());
        resetflag = 0;
    });



    $('#CompanyName').change(function () {
        var selectedValue = $("#CompanyName option:selected").val().split(":"); ;
        $('#ChannelCompany').val(selectedValue[1]);
        return true;
    });

    $('#BudgetCode').change(function () {
        var selectedValue = $("#BudgetCode option:selected").val().split(":"); ;
        $('#BudgetCodeDescription').val(selectedValue[1]);
        return true;
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

function Reset() {
    $.noty.closeAll();
    if (resetflag == 0) {
        channelCompany = $("#CompanyName").val();
        $('#CompanyName option').first().prop('selected', true);
        var selectedCompanyNameReset = $("#CompanyName option:selected").val().split(":"); ;
        $('#ChannelCompany').val(selectedCompanyNameReset[1]);

        budgetCode = $("#BudgetCode option:selected").val();
        $('#BudgetCode option').first().prop('selected', true);
        var selectedBudgetCodeReset = $("#BudgetCode option:selected").val().split(":"); ;
        $('#BudgetCodeDescription').val(selectedBudgetCodeReset[1]);

        forDate = $("#ForDate").val();
        $("#ForDate").datepicker("setDate", new Date());
        resetflag = 1;
    }
    else if (resetflag == 1) {
        $("#CompanyName").val(channelCompany);
        var selectedCompanyNameReset = $("#CompanyName option:selected").val().split(":"); ;
        $('#ChannelCompany').val(selectedCompanyNameReset[1]);

        $("#BudgetCode").val(budgetCode);
        var selectedBudgetCodeReset = $("#BudgetCode option:selected").val().split(":"); ;
        $('#BudgetCodeDescription').val(selectedBudgetCodeReset[1]);

        $("#ForDate").datepicker("setDate", forDate);
        resetflag = 0;
    }
}


function ShowServerSideError() {
    var errorMessage = "";
    var $step = $(".PlaceHolder:visible"); // get current step

    var validator = $("#mainForm").validate(); // obtain validator
    if (errorMessagePanel != null && errorMessagePanel != undefined)
        errorMessagePanel.close();
    $step.find("input").each(function () {
        if (!validator.element(this)) { // validate every input element inside this step
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
        errorMessagePanel = noty({ text: errorMessage, type: 'error', dismissQueue: true,
            layout: 'bottom', theme: 'defaultTheme'
        });
    }
} 