var lookupInvokerControl;
var listName;
var actionParameters;
var columns = [];
var Lookuptitle;
var idfield;
var grid;
var listName;
var errorMessagePanel;
var resetflag = 0;
var progtitle;
var refno;
var materialid;
var materialname;
var supplier;
var supplierid;
var receiptno;
var dispatchno;

$(document).ready(function () {
//    debugger;
    $("#MaterialId").keydown(function (e) {
//        debugger;
        if (e.keyCode == 120) {
            MartriealLookup();
        }
    });
    $("#SupplierId").keydown(function (e) {
//        debugger;
        if (e.keyCode == 120) {
            SupplierLookup();
        }
    });

    shortcut.add("F8", function () {
        $("#mainForm").attr("target", "_blank");
        eval($('#btnGenerate').trigger('click'));
    });

    shortcut.add("F7", function () {
//        debugger
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

    $('#btnReset').click(function () {
//        SetValues();
//        resetflag = 1;
        ResetValues();
    });
    $('#btnGenerate').click(function () {
        $.noty.closeAll();
        $("#mainForm").attr("target", "_blank");
        SetValues();
    });
    $('#btnExportToExcel').click(function () {
        $.noty.closeAll();
        $("#mainForm").attr("target", "");
    });

});
function ResetValues() {
//debugger
//    progtitle = "%";
//    refno = "%";
//    materialid = "%";
//    materialname = "%";
//    supplier = "%";
//    supplierid = "";
//    receiptno = "%";
//    dispatchno = "%";
$("#ProgTitle").val("%");
$("#RefNo").val("%");
$("#MaterialId").val("%");
$("#MaterialName").val("%");
$("#SupplierId").val("%");
$("#SupplierIDForGen").val("%");
$("#DispatchNo").val("%");
$("#ReceiptNo").val("%");
}
function SetValues() {
    progtitle = $("#ProgTitle").val();
    refno = $("#RefNo").val();
    materialid = $("#MaterialId").val();
    materialname = $("#MaterialName").val();
    supplier = $("#SupplierId").val();
    supplierid = $("#SupplierIDForGen").val();
    dispatchno = $("#DispatchNo").val();
    receiptno = $("#ReceiptNo").val();
}

function Reset() {
//debugger
    $.noty.closeAll();
    if (resetflag == 0) {

       
//        currency = $("#CurrCode").val();
        //        $('#CurrCode option').first().prop('selected', true);
        SetValues();
        ResetValues()
        resetflag = 1;
    }
    else if (resetflag == 1) {

        $("#ProgTitle").val(progtitle); 
        $("#RefNo").val(refno); 
        $("#MaterialId").val(materialid);
        $("#MaterialName").val(materialname);
        $("#SupplierId").val(supplier);
        $("#SupplierIDForGen").val(supplierid);
        $("#DispatchNo").val(dispatchno);
        $("#ReceiptNo").val(receiptno);
        resetflag = 0;
    }
}

function MartriealLookup() {
//    debugger;
    lookupInvokerControl = "#MaterialID";
    listName = "MaterialList";
    actionParameters = { MaterialId: $("#MaterialId").val() };
    columns = [
						 { id: "MaterialId", name: "Material ID", field: "MaterialId" },
                         { id: "MaterialName", name: "Material Name", field: "MaterialName" }
				];

    Lookuptitle = "Material List";
    idfield = "MaterialId"
    ShowCommonLookup(urlMaterialLookup, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle, listName);
}
function SupplierLookup() {   
    lookupInvokerControl = "#SupplierId";
    listName = "";
    actionParameters = { SupplierId: $("#SupplierId").val() };
    columns = [
						 { id: "ComNumber", name: "Supplier ID", field: "ComNumber" },
                         { id: "ComShortName", name: "Supplier Name", field: "ComShortName" }
				];

    Lookuptitle = "Supplier List";
    idfield = "ComNumber"
    ShowCommonLookup(urlSupplierLookup, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle, listName);
    var test;
}
var setUsers;
function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
//    debugger;
    if (SelectedRowData != null) {
        if (lookupInvokerControl == "#MaterialID") {
            $("#MaterialId").val(SelectedRowData.MaterialId);
            $("#MaterialId").focus();
            return;

        }
        if (lookupInvokerControl == "#SupplierId") {
            $("#SupplierIDForGen").val(SelectedRowData.ComNumber);
            $("#SupplierId").val(SelectedRowData.ComShortName);

            $("#SupplierId").focus();
            return;

        }
    }
}

jQuery.validator.addMethod("isvalidfield", function (value, element, param) {
    if ($.trim(value) == "%")
        value = "";
    var actionParameters = { strFilter: value };
    var id = element.id;
    var response = false;
    var actionUrl = "";
    if (id == "SupplierId") {
        actionUrl = urlSupplierLookup;
    }
    else {
        actionUrl = urlMaterialLookup;
    }
    var isValid = false;
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
                if (id == "SupplierId") {
                    if (value != "") {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].ComShortName.toLowerCase() == value.toLowerCase()) {
                                isValid = true;
                                response = true;
                                $('#SupplierId').val(data[i].ComShortName);
                                $('#SupplierIDForGen').val(data[i].ComNumber);
                                break;
                            }
                        }
                    }
                    else
                        response = true;
                }
                else {
                    if (value != "" && data.MaterialList!=null) {
                        for (var i = 0; i < data.MaterialList.length; i++) {
                            if (data.MaterialList[i].MaterialId.toLowerCase() == value.toLowerCase()) {
                                isValid = true;
                                response = true;
                                $('#MaterialId').val(data.MaterialList[i].MaterialId);
                                break;
                            }
                        }
                    }
                    else
                        response = true;
                }
                //response = true;
            }
            else if (value != "") {
                if (id == "SupplierId") {
                    //$('#MediaPlateform').val("");
                    //$('#txtMediaPlateformDesc').val("");
                    $('#SupplierIDForGen').val("");
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



