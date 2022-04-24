var resetflag = 0;
var changedrow = -1;
var previousRow = -1;
var materialTyepListForValidation = [];
var SupplierListForValidation = [];
var SupplierCopyListForValidation = [];
var LibraryNameListForValidation = [];
var StatusListForValidation = [];
var StorageListForValidation = [];
var isValidRow;
var newrowids = 0;
var currenteditorvalue;
//shatlin code
var columnFilters = {};
var BookIngrid = "#BookIngrid";
var MaterialID;
var BookIngridcolumns = [];
var options;
var BookIngridviewableColumns = [];
var BookIngrididfield;
var BookIngridWidth;
var BookIngridHeight;
var BookIngridActionParameters;
var dataView;
var UpData = [];
var CurComboVal;
var selectedCol;
var SelectedUrl = "";
var selectedVal = "";
var ColumnName = "";
var actionParameters;
var actionParaBookiIn;
var BookinData = [];
var AddProgrammeData = [];
var AddProgrammeData = [];
var RemoveProgrammeData = [];
var gridContainerDiv;
var typeValue;
var LibraryID;
var GenRefno;
var ModifiedMaterialProgramsRows = [];
var gridMaterialProgData;
var grid;
var currentDate;
var isDataUpdated = false;

var LibraryNameList = [];
var SupplierList = [];
var MaterialTypeList = [];
var SupplierTypeList = [];
var StorageList = [];
var LibraryIDvalue;
var columnFilters = {};
var colFilters = {};
$(document).ready(function () {

    currentDate = GetTodayDate();

    DisableToggleButton("#btnPrint", true);
    DisableToggleButton("#btnViewDetails", true);

    shortcut.add("F9", function () {
        if ($("#txtSupplier").is(":focus")) {
            loadSupplierLookupTextBox();
        }

        if ($("#txtMaterialID").is(":focus")) {
            loadMaterialLookupTextBox();
        }
    });

    $("#btnSearch").click(function (event) {
        clearAllMessages();
        SearchBookIn();
    });

    function CompareDate(fromDate, toDate) {
        if (fromDate != "" && toDate != "") {
            if ($.browser.msie) {
                fromDate = GetDateWithMonthInNumber(fromDate);
                toDate = GetDateWithMonthInNumber(toDate);
            }
            if ((new Date(fromDate).getTime() > new Date(toDate).getTime())) {
                return false;
            }
        }
        return true;
    };

    $("#txtReceiptno").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });

    function ReceiptNoValidation(receiptNo) {
        if ($.trim(receiptNo) != "") {
            var isValidReceiptNo = /^[0-9]+$/.test(receiptNo);
            return isValidReceiptNo;
        }
        return true;
    }

    function SearchBookIn() {

        var MaterialID = $.trim($("#txtMaterialID").val());
        var MaterialName = $.trim($("#txtMaterialName").val());
        var FromDate = $.trim($("#txtDateFrom").val());
        var ToDate = $.trim($("#txtDateTo").val());
        var ReceiptNo = $.trim($("#txtReceiptno").val());
        var Supplier = $("#Distributor").val();
        var currentDate = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var currMonth = monthNames[currentDate.getMonth()];
        var currDay = "";
        if (currentDate.getDate().toString().length == 1)
            currDay = "0" + currentDate.getDate();

        currentDate = currDay + "-" + currMonth + "-" + currentDate.getFullYear();
        //currentDate=GetDateWithMonthInNumber(currentDate);
        actionParaBookiIn = {
            MaterialID: MaterialID,
            MaterialName: MaterialName,
            FromDate: (FromDate == "" ? "01 / 01 / 9999" : FromDate),
            ToDate: ToDate,
            ReceiptNo: ReceiptNo,
            Supplier: Supplier
        };
        if (!ReceiptNoValidation(ReceiptNo)) {
            showMessage('Receipt No. must be numeric.', 'error');
            return;
        }
        if (!CompareDate(FromDate, ToDate)) {
            showMessage('Date From must be Less than or Equal to Date To.', 'error');
        }
        else {
            if ((MaterialID == "" || MaterialID == null) && (MaterialName == "" || MaterialName == null) && (FromDate == "" || FromDate == null)
                && (ReceiptNo == "" || ReceiptNo == null) && (Supplier == "" || Supplier == null) && (currentDate == ToDate)) {
                noty({
                    text: 'No search criteria has been selected. Do you want to see all the records from the system ?',
                    modal: false,
                    type: 'alert',
                    buttons: [
                                    { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                                        $noty.close();
                                        LoadBookIngrid();
                                    }
                                    },
                                    { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
                                        $noty.close();
                                    }
                                    }
                            ]
                });
            }
            else {
                LoadBookIngrid();
            }
        }
    }

    shortcut.add("F7", function () {

        ResetControls();

    });


    shortcut.add("F8", function () {
        clearAllMessages();
        SearchBookIn();

    });


    shortcut.add("F10", function () {
        ValidateAndSave();
    });

    $("#btnSearchReset").click(function (event) {
        Reset();
    });

    //    function AddSelectedRowToBasket() {
    //        if (grid.getActiveCell() != null) {
    //            if (dataView.getItem(grid.getActiveCell().row).Supplier == "") {
    //                showMessage("No record(s) to save.", "error");
    //                return;
    //            }
    //        }
    //    }

    $("#btnSave").click(function (event) {
        ValidateAndSave();
    });
    function AddSelectedRowToBasket() {
        dataView.refresh();
        grid.render();
        if (grid.getActiveCell() != null) {
            if (grid.getActiveCell().row >= 0) {
                var rowData = grid.getData()[grid.getActiveCell().row];
                if (grid.getData().length != null)
                    rowData = grid.getData()[grid.getActiveCell().row];
                else
                    rowData = grid.getData().getItem(grid.getActiveCell().row);
                var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
                if (grid.getCellEditor() != null) {
                    //                    if (grid.getActiveCell().cell == 3 && grid.getCellEditor().getValue() != null) {
                    //                        grid.setActiveCell(grid.getActiveCell().row, 4);
                    //                        grid.editActiveCell();
                    //                        grid.setActiveCell(grid.getActiveCell().row, 3);
                    //                        grid.editActiveCell();
                    //                    }
                    rowData[fieldName] = grid.getCellEditor().getValue();
                }
                if ((rowData != null)) {   //&& rowData.CommId != "new row"
                    var CommId = 0;
                    //var status = "";
                    if (rowData.BookinID < 0 || rowData.BookinID == "new row" || rowData.BookinID == "") {
                        if (rowData.Supplier != "" || rowData.MaterialName != "" || rowData.MaterialType != "Click here to" || rowData.SupplierType != "add a new row"
                        || rowData.LibraryName != "" || rowData.GivenBy != "" || rowData.Storage != "" || rowData.Comments != "") {
                            AddToBasket(rowData, "Added");
                        }
                    }
                    else {
                        if (isDataUpdated == true)
                            AddToBasket(rowData, "Modified");
                    }
                }
            }
        }
    };

    function ValidateAndSave() {
        //PrepareGridtoSave(grid);
        AddSelectedRowToBasket();
        if (UpData.length > 0) {
            //            if (grid.getActiveCell() != null) {

            for (var index = 0; index < UpData.length; index++) {
                if (UpData[index].Supplier.trim() == "") {
                    showMessage("Supplier is required.", "error");
                    return;
                }
                else if (!IsValidSupplier(UpData[index].Supplier)) {
                    showMessage("Invalid supplier.", "error");
                    return;
                }

                if (UpData[index].MaterialName.trim() == "") {
                    errorMessage = "Material name is required.";
                    showMessage(errorMessage, "error");
                    //grid.gotoCell(grid.getActiveCell().row, index, true);
                    //grid.getEditorLock().commitCurrentEdit();
                    return;
                }

                if (UpData[index].MaterialType.trim() == "Click here to" || UpData[index].MaterialType.trim() == "") {
                    errorMessage = "Material type is invalid.";
                    showMessage(errorMessage, "error");
                    return;
                }
                else if (!IsValidMaterialType(UpData[index].MaterialType)) {
                    showMessage("Invalid material type.", "error");
                    return;
                }

                if (UpData[index].SupplierType.trim() == "add a new row" || UpData[index].SupplierType.trim() == "add a new row") {
                    errorMessage = "Invalid supplier copy type.";
                    showMessage(errorMessage, "error");
                    return;
                }
                else if (!IsValidSupplierType(UpData[index].SupplierType)) {
                    showMessage("Invalid supplier copy type.", "error");
                    return;
                }

                if (UpData[index].LibraryName.trim() == "") {
                    errorMessage = "Library name is required.";
                    showMessage(errorMessage, "error");
                    return;
                }
                else if (!IsValidLibraryName(UpData[index].LibraryName)) {
                    showMessage("Invalid library name.", "error");
                    return;
                }

                if (!IsValidStorage(UpData[index].Storage) && UpData[index].Storage.trim() != "") {
                    showMessage("Invalid storage.", "error");
                    return;
                }

                if (UpData[index].GivenBy.trim() == "") {
                    errorMessage = "Given By is required.";
                    showMessage(errorMessage, "error");
                    return;
                }

                //                showMessage("No record(s) to save.", "error");
                //                return;
            }
        }
        //        }
        //        else {
        Save();
        // }
    }


    function IsValidSupplier(value) {
        var valid_result = false;
        if (SupplierList != null && SupplierList.length == 0) {
            SupplierList = GetLookupListobj(urlSupplierList, "");
        }
        if (SupplierList.length > 0) {
            for (var i = 0; i < SupplierList.length; i++) {
                if (value.toUpperCase() == SupplierList[i].ComShortName) {
                    valid_result = true;
                    break;
                }
            }
        }
        return valid_result;
    };
    function IsValidMaterialType(value) {
        var valid_result = false;
        if (MaterialTypeList != null && MaterialTypeList.length == 0) {
            MaterialTypeList = GetLookupListobj(urlMaterialTypeList, "");
        }
        if (MaterialTypeList.length > 0) {
            for (var i = 0; i < MaterialTypeList.length; i++) {
                if ($.trim(value.toUpperCase()) == MaterialTypeList[i].Val.toUpperCase() || value.toUpperCase() == MaterialTypeList[i].ID.toUpperCase()) {
                    valid_result = true;
                    break;
                }
            }
        }
        return valid_result;
    };
    function IsValidSupplierType(value) {
        var valid_result = false;
        if (SupplierTypeList != null && SupplierTypeList.length == 0) {
            SupplierTypeList = GetLookupListobj(urlSupplierCopyTypeList, "");
        }
        if (SupplierTypeList.length > 0) {

            for (var i = 0; i < SupplierTypeList.length; i++) {
                if ($.trim(value.toUpperCase()) == SupplierTypeList[i].Val.toUpperCase() || value.toUpperCase() == SupplierTypeList[i].ID.toUpperCase()) {
                    valid_result = true;
                    break;
                }
            }
        }
        return valid_result;
    };
    function IsValidLibraryName(value) {
        var valid_result = false;
        if (LibraryNameList != null && LibraryNameList.length == 0) {
            LibraryNameList = GetLookupListobj(urlLibraryNameList, "");
        }
        if (LibraryNameList.length > 0) {
            for (var i = 0; i < LibraryNameList.length; i++) {
                if ($.trim(value.toUpperCase()) == LibraryNameList[i].LibraryName.toUpperCase()) {
                    valid_result = true;
                    break;
                }
            }
        }
        return valid_result;
    };
    function IsValidStorage(value) {
        var valid_result = false;
        var StorageList = GetLookupListobj(urlStorageList, { LibraryID: LibraryID });
        if (StorageList.length > 0) {

            for (var i = 0; i < StorageList.length; i++) {
                if ($.trim(value.toUpperCase()) == StorageList[i].Storage.toUpperCase()) {
                    valid_result = true;
                    break;
                }
            }
        }
        return valid_result;
    };



    /////////////////////////////////////////////////////////////////////// end of validation //////////////////////////////////////////


    $("#btnPrint").click(function (event) {
        if (grid.getActiveCell() != null) {
            MaterialID = dataView.getItem(grid.getActiveCell().row).MaterialID;
        }
        if (MaterialID != null && MaterialID.length > 0) {
            getPrint(MaterialID);
        }
        else {
            showMessage("Plase select a valid book in Record", "error");
        }

    });


    $("#btnViewDetails").click(function (event) {
        clearAllMessages();
        if (grid.getActiveCell() != null) {
            MaterialID = dataView.getItem(grid.getActiveCell().row).MaterialID;
        }
        if (MaterialID != null && MaterialID.length > 0) {
            SetDialogProgrammeSearch();
            $("#dialogProgrammeSearch").dialog("open");
            LoadProgramData();
        }
        else {
            showMessage("Plase select a valid book in Record", "error");
        }
    });

    $("#txtDateFrom").blur(function () {
        var dateValue = $("#txtDateFrom").val();
        if (!IsValidDate(dateValue) && dateValue != "")
            $("#txtDateFrom").val("");
    });

    $("#txtDateTo").blur(function () {
        var dateValue = $("#txtDateTo").val();
        if (!IsValidDate(dateValue))
            $("#txtDateTo").datepicker("setDate", new Date());
    });

    $("#txtDateFrom").datepicker({ dateFormat: 'dd-M-yy',
        changeMonth: true,
        changeYear: true
        //        minDate: 0
    }).datepicker("setDate", "");


    $("#txtDateTo").datepicker({ dateFormat: 'dd-M-yy',
        changeMonth: true,
        changeYear: true
    }).datepicker("setDate", new Date());


    $("#imgMemoFromDate").click(function () {
        $("#txtDateFrom").datepicker("show");
    });

    $("#imgMemoToDate").click(function () {
        $("#txtDateTo").datepicker("show");
    });


    //    //Date validation on textChanged Event of txtCumdate    
    //    $("#txtDateFrom").change(function () {
    //        var EntryDate = $("#txtDateFrom").val();
    //        var ExitDate = $("#txtDateTo").val();        
    //        if (EntryDate != "" && ExitDate != "") {
    //            var spltEntryDate = EntryDate.split('-');
    //            var spltExitDate = ExitDate.split('-');
    //            if (spltEntryDate[2] == spltExitDate[2]) {
    //                if (spltEntryDate[1] == spltExitDate[1]) {
    //                    if (spltEntryDate[0] < spltExitDate[0]) {

    //                    }
    //                    else if (spltEntryDate[0] >= spltExitDate[0]) {
    //                        $("#lblerrorHolidayDate").text('From date should be less than To date.');
    //                        $("#dialogCheckHolidayDate").dialog("open");
    //                        $("#txtDateFrom").val("");
    //                        $("#hdnFromHolidayDate").val("");
    //                    }
    //                }
    //                else if (spltEntryDate[1] < spltExitDate[1]) {

    //                }
    //                else if (spltEntryDate[1] >= spltExitDate[1]) {
    //                    $("#lblerrorHolidayDate").text('From date should be less than To date.');
    //                    $("#dialogCheckHolidayDate").dialog("open");
    //                    $("#txtDateFrom").val("");
    //                    $("#hdnFromHolidayDate").val("");
    //                }
    //            }
    //            else if (spltEntryDate[2] < spltExitDate[2]) {

    //            }
    //            else if (spltEntryDate[2] >= spltExitDate[2]) {
    //                $("#lblerrorHolidayDate").text('From date should be less than To date.');
    //                $("#dialogCheckHolidayDate").dialog("open");
    //                $("#txtDateFrom").val("");
    //                $("#hdnFromHolidayDate").val("");
    //            }
    //        }
    //    });

    //    //Date validation on textChanged Event of txtCumdate    
    //    $("#txtDateTo").change(function () {
    //        var EntryDate = $("#hdnFromHolidayDate").val();
    //        var ExitDate = $("#hdnToHolidayDate").val();
    //        if (EntryDate != "" && ExitDate != "") {
    //            var spltEntryDate = EntryDate.split('/');
    //            var spltExitDate = ExitDate.split('/');
    //            if (spltExitDate[2] == spltEntryDate[2]) {
    //                if (spltExitDate[1] == spltEntryDate[1]) {
    //                    if (spltExitDate[0] >= spltEntryDate[0]) {

    //                    }
    //                    else if (spltExitDate[0] < spltEntryDate[0]) {
    //                        $("#lblerrorHolidayDate").text('To date should be greater than From date.');
    //                        $("#dialogCheckHolidayDate").dialog("open");
    //                        $("#txtToHolidayDate").val("");
    //                        $("#hdnToHolidayDate").val();
    //                    }
    //                }
    //                else if (spltExitDate[1] >= spltEntryDate[1]) {

    //                }
    //                else if (spltExitDate[1] < spltEntryDate[1]) {
    //                    $("#lblerrorHolidayDate").text('To date should be greater than From date.');
    //                    $("#dialogCheckHolidayDate").dialog("open");
    //                    $("#txtToHolidayDate").val("");
    //                    $("#hdnToHolidayDate").val();
    //                }
    //            }
    //            else if (spltExitDate[2] >= spltEntryDate[2]) {

    //            }
    //            else if (spltExitDate[2] < spltExitDate[2]) {
    //                $("#lblerrorHolidayDate").text('To date should be greater than From date.');
    //                $("#dialogCheckHolidayDate").dialog("open");
    //                $("#txtToHolidayDate").val("");
    //                $("#hdnToHolidayDate").val();
    //            }
    //        }
    //    });

    //    // Dialog View Storage Detail 
    //    $("#dialogAddRemovePrograms").dialog({
    //        width: 700,
    //        buttons: {
    //            Save: function () {
    //                //                $.ajax({
    //                //                    type: "POST",
    //                //                    url: "/Event/DeleteEntitlementEvent/",
    //                //                    data: "{EventID:'" + _EntitlementEventID + "'}",
    //                //                    contentType: "application/json; charset=utf-8",
    //                //                    dataType: "json",
    //                //                    success: function (data) {
    //                //                        displayMessage("Event deleted successfully.");
    //                //                        message = "Entitlement event deleted for stock \'" + $.trim(data.StockName) + "\'";
    //                //                        SaveActionLog("Event", "Entitlement", message);
    //                //                        GetCompletedEntitlement();
    //                //                        EmptyEntitlementControls();
    //                //                        $("#dialogDeleteEntitleEvent").dialog("close");
    //                //                    }
    //                //                });
    //            },
    //            Cancel: function () {
    //                $(this).dialog("close");
    //            }
    //        },
    //        autoOpen: false,
    //        modal: true
    //    });

    SetBookInGridParameters();
    DisplayGrid("");
});


function Reset() {
    DisableToggleButton("#btnPrint", true);
    DisableToggleButton("#btnViewDetails", true);
    MaterialID = "";
    $("#txtMaterialID").val("");
    $("#txtMaterialName").val("");
    $("#txtSupplier").val("");
    $("#txtDateFrom").val("");
    $("#txtDateTo").val(currentDate);
    $("#txtReceiptno").val("");
    $('#Distributor option').first().prop('selected', true);
    //$("#Distributor").val(-1);
    DisplayGrid("");
}


var txtMaterialIDValue;
var txtMaterialNameValue;
var txtSupplierValue;
var txtDateFromValue;
var txtDateToValue;
var txtReceiptno;
var Supplier;

function ResetControls() {
    if (resetflag == 0) {

        txtMaterialIDValue = $("#txtMaterialID").val();
        txtMaterialNameValue = $("#txtMaterialName").val();
        txtSupplierValue = $("#txtSupplier").val();
        txtDateFromValue = $("#txtDateFrom").val();
        txtDateToValue = $("#txtDateTo").val();
        txtReceiptno = $("#txtReceiptno").val();
        Supplier = $("#Distributor").val();
        //$("#Distributor option:selected").text()   
        Reset();
        resetflag = 1;
    }


    else if (resetflag == 1) {

        $("#txtMaterialID").val(txtMaterialIDValue);
        $("#txtMaterialName").val(txtMaterialNameValue);
        $("#txtSupplier").val(txtSupplierValue);
        $("#txtDateFrom").val(txtDateFromValue);
        $("#txtDateTo").val(txtDateToValue);
        $("#txtReceiptno").val(txtReceiptno);
        $("#Distributor").val(Supplier);
        resetflag = 0;
    }
};

function GetLookupListobj(LookUpUrl, value) {
    ShowProgressBar();
    var List = [];
    $.ajax({
        url: LookUpUrl,
        type: "GET",
        async: false,
        cache: false,
        dataType: 'Json',
        data: value,
        success: function (data) {
            List = data;
        },
        error: function () {
            alert("error fetching data.");
        }
    });
    RemoveProgressBar();
    return List;
};

function MaterialNameValidator(value) {
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Material name is required." };
    }
    else {
        return { valid: true, msg: null };
    }
}

function GivenByValidator(value) {
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Given By is required." };
    }
    else {
        return { valid: true, msg: null };
    }
}

function SupplierValidation(value) {
    if (value == null || value == undefined || !value.length) {
        valid_result = false;
        return { valid: false, msg: "Supplier code is required." };
    }
    else {
        var stat = 0;
        if (SupplierList != null && SupplierList.length == 0) {
            SupplierList = GetLookupListobj(urlSupplierList, "");
        }
        if (SupplierList.length > 0) {
            for (var i = 0; i < SupplierList.length; i++) {
                if (value.toUpperCase() == SupplierList[i].ComShortName) {
                    stat = 1;
                    break;
                }
            }
        }
        if (stat == 0) {
            valid_result = false;
            return { valid: false, msg: "Invalid supplier code." };
        }
        else {
            return { valid: true, msg: null };
        }
    }
};
function MaterialTypeValidation(value) {
    if (value == null || value == undefined || !value.length) {
        valid_result = false;
        return { valid: false, msg: "Material type is required." };
    }
    else {
        var stat = 0;
        if (MaterialTypeList != null && MaterialTypeList.length == 0) {
            MaterialTypeList = GetLookupListobj(urlMaterialTypeList, "");
        }
        if (MaterialTypeList.length > 0) {
            for (var i = 0; i < MaterialTypeList.length; i++) {
                if (value.toUpperCase() == MaterialTypeList[i].Val.toUpperCase() || value.toUpperCase() == MaterialTypeList[i].ID.toUpperCase()) {
                    stat = 1;
                    break;
                }
            }
        }
        if (stat == 0) {
            valid_result = false;
            return { valid: false, msg: "Invalid material type." };
        }
        else {
            valid_result = true;
            return { valid: true, msg: null };
        }
    }
};
function SupplierTypeValidation(value) {
    if (value == null || value == undefined || !value.length) {
        valid_result = false;
        return { valid: false, msg: "Supplier copy type is required." };
    }
    else {
        var stat = 0;
        if (SupplierTypeList != null && SupplierTypeList.length == 0) {
            SupplierTypeList = GetLookupListobj(urlSupplierCopyTypeList, "");
        }
        if (SupplierTypeList.length > 0) {

            for (var i = 0; i < SupplierTypeList.length; i++) {
                if (value.toUpperCase() == SupplierTypeList[i].Val.toUpperCase() || value.toUpperCase() == SupplierTypeList[i].ID.toUpperCase()) {
                    stat = 1;
                    break;
                }
            }
        }
        if (stat == 0) {
            valid_result = false;
            return { valid: false, msg: "Invalid supplier copy type." };
        }
        else {
            valid_result = true;
            return { valid: true, msg: null };
        }
    }
};
function LibraryNameValidation(value) {
    if (value == null || value == undefined || !value.length) {
        valid_result = false;
        return { valid: false, msg: "Library name is required." };
    }
    else {
        var stat = 0;
        if (LibraryNameList != null && LibraryNameList.length == 0) {
            LibraryNameList = GetLookupListobj(urlLibraryNameList, "");
        }
        if (LibraryNameList.length > 0) {
            for (var i = 0; i < LibraryNameList.length; i++) {
                if (value.toUpperCase() == LibraryNameList[i].LibraryName.toUpperCase()) {
                    stat = 1;
                    break;
                }
            }
        }
        if (stat == 0) {
            valid_result = false;
            return { valid: false, msg: "Invalid library name." };
        }
        else {
            valid_result = true;
            return { valid: true, msg: null };
        }
    }
};
function StorageValidation(value) {
    if (value == null || value == undefined || !value.length) {
        valid_result = true;
        return { valid: true, msg: null };
    }
    else {
        var stat = 0;
        var StorageList = GetLookupListobj(urlStorageList, { LibraryID: LibraryID });
        if (StorageList.length > 0) {

            for (var i = 0; i < StorageList.length; i++) {
                if (value.toUpperCase() == StorageList[i].Storage.toUpperCase())
                {
                    stat = 1;
                    break;
                }
            }
        }
        if (stat == 0) {
            valid_result = false;
            return { valid: false, msg: "Invalid storage." };
        }
        else {
            valid_result = true;
            return { valid: true, msg: null };
        }
    }
};

function SetBookInGridParameters() {

    gridContainerDiv = "#BookIngrid";

    BookIngridcolumns = [
                        { id: "BookinID", name: "Supplier", field: "BookinId", width: 70 },
                       { id: "MaterialID", name: "Material ID", field: "MaterialId", width: 120, cssClass: "NonEditable" },
                        { id: "Supplier", name: "Supplier", field: "Supplier", width: 70 },
                        { id: "MaterialName", name: "Material Name", field: "MaterialName", width: 95, editor: Slick.Editors.Text, validator: requiredFieldValidator },
                        { id: "MaterialType", name: "Material Type", field: "MaterialType", width: 90 },
                        { id: "MaterialTypeID", name: "MaterialTypeID", field: "MaterialTypeID" },
                         { id: "SupplierType", name: "SUP/TX/MNet", field: "SupplierType" },
                        { id: "SupplierTypeID", name: "SupplierTypeID", field: "SupplierTypeID" },
                       { id: "ReceiptNo", name: "Receipt No", field: "ReceiptNo", width: 65, editor: Slick.Editors.Text },
                        { id: "LibraryID", name: "LibraryID", field: "LibraryID" },
                        { id: "LibraryName", name: "Library", field: "LibraryName" },
                        { id: "Status", name: "Status", field: "Status" },
                         { id: "GivenBy", name: "Given By", field: "GivenBy", editor: Slick.Editors.Text },
                         { id: "Storage", name: "Storage", field: "Storage", editor: Slick.Editors.Text, width: 120 },
                         { id: "CreatedDate", name: "Date", field: "CreatedDate", formatter: Slick.Formatters.Date },
                       { id: "Comments", name: "Comments", field: "Comments", editor: Slick.Editors.LongText }
                         ];

    BookIngridviewableColumns = [
                       { id: "MaterialID", name: "Material ID", field: "MaterialID", width: 120, cssClass: "NonEditable" },
                         { id: "Supplier", name: "Supplier", field: "Supplier", width: 70, editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: SupplierValidation },
                        { id: "MaterialName", name: "Material Name", field: "MaterialName", width: 95, editor: Slick.Editors.Text, validator: MaterialNameValidator },
                        { id: "MaterialType", name: "Material Type", field: "MaterialType", width: 90, editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: MaterialTypeValidation },
                         { id: "SupplierType", name: "Supplier Copy Type", field: "SupplierType", width: 120, editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: SupplierTypeValidation },
                         { id: "ReceiptNo", name: "Receipt No", field: "ReceiptNo", width: 65 },
                        { id: "LibraryName", name: "Library", field: "LibraryName", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: LibraryNameValidation },
                        { id: "Status", name: "Status", field: "Status", cssClass: "NonEditable", sortable: true },
                         { id: "GivenBy", name: "Given By", field: "GivenBy", editor: Slick.Editors.Text, validator: GivenByValidator },
                         { id: "Storage", name: "Storage", field: "Storage", editor: Slick.Editors.Text, width: 120, headerCssClass: "HeaderLovImage", validator: StorageValidation },
                         { id: "CreatedDate", name: "Date", field: "CreatedDate",  cssClass: "NonEditable", sortable: true },
                       { id: "Comments", name: "Comments", field: "Comments", editor: Slick.Editors.LongText }
                         ];


    BookIngridviewableColumnsNonEdit = [
                       { id: "MaterialID", name: "Material ID", field: "MaterialID", width: 120, cssClass: "NonEditable" },
                         { id: "Supplier", name: "Supplier", field: "Supplier", width: 70, cssClass: "NonEditable", headerCssClass: "HeaderLovImage", validator: SupplierValidation },
                        { id: "MaterialName", name: "Material Name", field: "MaterialName", width: 95,cssClass: "NonEditable", validator: MaterialNameValidator },
                        { id: "MaterialType", name: "Material Type", field: "MaterialType", width: 90, cssClass: "NonEditable", headerCssClass: "HeaderLovImage", validator: MaterialTypeValidation },
                         { id: "SupplierType", name: "Supplier Copy Type", field: "SupplierType", width: 120, editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: SupplierTypeValidation },
                         { id: "ReceiptNo", name: "Receipt No", field: "ReceiptNo", width: 65 },
                        { id: "LibraryName", name: "Library", field: "LibraryName", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: LibraryNameValidation },
                        { id: "Status", name: "Status", field: "Status", cssClass: "NonEditable", sortable: true },
                         { id: "GivenBy", name: "Given By", field: "GivenBy", editor: Slick.Editors.Text, validator: GivenByValidator },
                         { id: "Storage", name: "Storage", field: "Storage", editor: Slick.Editors.Text, width: 120, headerCssClass: "HeaderLovImage", validator: StorageValidation },
                         { id: "CreatedDate", name: "Date", field: "CreatedDate",  cssClass: "NonEditable", sortable: true },
                       { id: "Comments", name: "Comments", field: "Comments", editor: Slick.Editors.LongText }
                         ];


    options =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            editable: true,
            asyncEditorLoading: false,
            autoEdit: true,
            showHeaderRow: true,
            explicitInitialization: true
        };

    actionParameters = null;
    BookIngrididfield = 'BookinID';
    BookIngridWidth = $(gridContainerDiv).width();
    BookIngridHeight = 400;
}



function LoadBookIngrid() {
    ShowProgressBar();
    $.ajax({
        url: urlSearchLibraryBookInDetail,
        type: "GET",
        dataType: 'Json',
        cache: false,
        async: false,
        data: actionParaBookiIn,
        success: function (data) {
            if (data.bookinList.length > 0)
            {
               // DisplayGrid("");
                DisplayGrid(data.bookinList);
            }
            else {
                DisplayGrid("");
                showMessage("No matching records found.", "information");
            }
            RemoveProgressBar();
        },
        error: function (x, e) {
            if (x.status == 0) {
                alert('You are offline!!\n Please Check Your Network.');
            } else if (x.status == 404) {
                alert('Requested URL not found.');
            } else if (x.status == 500) {
                alert('Internel Server Error.');
            } else if (e == 'parsererror') {
                alert('Error.\nParsing JSON Request failed.');
            } else if (e == 'timeout') {
                alert('Request Time out.');
            } else {
                alert('Unknow Error.\n' + x.responseText);
            }
            RemoveProgressBar();
        }
    });
}



var MaterialLookupData = "";
function loadMaterialLookupTextBox() {



    var columns = [
                               { id: "ID", name: "Material ID", field: "MaterialId" },
                                { id: "Val", name: "Material Name", field: "MaterialName" }
                         ];
    var actionParameters = { strFilter: $('#txtMaterialID').val() };
    var title = "Material List";
    var idfield = "MaterialId"
    var listName = "MaterialList";
    if (MaterialLookupData != null && MaterialLookupData.length == 0) {

        MaterialLookupData = ShowCommonLookup(urlMaterialLookup, actionParameters, columns, "txtMaterialID", idfield, title, listName);

    }
    else {

        DisplayLookupWithExistingData(columns, "txtMaterialID", idfield, title, null, MaterialLookupData)
    }
}



var SupplierlookupData = "";
function loadSupplierLookupTextBox() {

    var columns = [
                                { id: "ComShortName", name: "Supplier Code", field: "ComShortName" },
                                { id: "ComName", name: "Supplier Name", field: "ComName" }

                         ];
    var actionParameters = "";
    var title = "Supplier";
    var idfield = "ComName"

    if (SupplierlookupData != null && SupplierlookupData.length == 0) {
        SupplierlookupData = ShowCommonLookup(urlSupplierList, actionParameters, columns, "txtSupplier", idfield, title, null);

    }
    else {

        DisplayLookupWithExistingData(columns, "txtSupplier", idfield, title, null, SupplierlookupData)
    }
}

function loadSupplierLookup(grid) {

    if (grid.getEditorLock().isActive())
        grid.getEditorLock().deactivate(grid.getEditController());

    var columns = [
                                { id: "ComShortName", name: "Supplier Code", field: "ComShortName" },
                                { id: "ComName", name: "Supplier Name", field: "ComName" }
                         ];
    var actionParameters = "";
    var title = "Supplier";
    var idfield = "ComName"
    if (SupplierlookupData != null && SupplierlookupData.length == 0) {

        SupplierlookupData = ShowCommonLookup(urlSupplierList, actionParameters, columns, "Supplier", idfield, title, null);

    }
    else {

        DisplayLookupWithExistingData(columns, "Supplier", idfield, title, null, SupplierlookupData)
    }
}

var MaterialTypelookupData = "";
function loadMaterialTypeLookup(grid) {


    if (grid.getEditorLock().isActive())
        grid.getEditorLock().deactivate(grid.getEditController());

    var columns = [
                               { id: "ID", name: "Material Type", field: "ID" },
                                { id: "Val", name: "Material Type Name", field: "Val" }
                         ];
    var actionParameters = "";
    var title = "Material Types";
    //var listName = "MaterialTyepList";
    var idfield = "ID"

    if (MaterialTypelookupData != null && MaterialTypelookupData.length == 0) {
        MaterialTypelookupData = ShowCommonLookup(urlMaterialTypeList, actionParameters, columns, "MaterialType", idfield, title, null);

    }
    else {
        DisplayLookupWithExistingData(columns, "MaterialType", idfield, title, null, MaterialTypelookupData)
    }


    //  ShowCommonLookup(GetMaterialTyepListActionURL, actionParameters, columns, "MaterialType", idfield, title, listName);
}

var SupplierCopyTypelookupData = "";
function LoadSupplierCopyTypeLookup(grid) {

    if (grid.getEditorLock().isActive())
        grid.getEditorLock().deactivate(grid.getEditController());

    var columns = [
                               { id: "ID", name: "Supplier Type ID", field: "ID" },
                                { id: "Val", name: "Supplier Type", field: "Val" }
                         ];
    var actionParameters = "";
    var title = "Material Types";
    //var listName = "MaterialTyepList";
    var idfield = "ID"

    if (SupplierCopyTypelookupData != null && SupplierCopyTypelookupData.length == 0) {
        SupplierCopyTypelookupData = ShowCommonLookup(urlSupplierCopyTypeList, actionParameters, columns, "SupplierType", idfield, title, null);

    }
    else {
        DisplayLookupWithExistingData(columns, "SupplierType", idfield, title, null, SupplierCopyTypelookupData)
    }


    //  ShowCommonLookup(urlSupplierCopyTypeList, actionParameters, columns, "SupplierCopyType", idfield, title, null);
}
var LibraryNamelookupData = "";
function LoadLibraryNameLookup(grid) {

    if (grid.getEditorLock().isActive())
        grid.getEditorLock().deactivate(grid.getEditController());

    var columns = [
                               { id: "ID", name: "Library ID", field: "LibraryID" },
                                { id: "Val", name: "Library Name", field: "LibraryName" }
                         ];
    var actionParameters = "";
    var title = "Library";
    var idfield = "LibraryID"

    LibraryNamelookupData = ShowCommonLookup(urlLibraryNameList, actionParameters, columns, "LibraryName", idfield, title, null);
    LibraryNameListForValidation = LibraryNamelookupData;
//    if (LibraryNamelookupData != null && LibraryNamelookupData.length == 0) {
//        LibraryNamelookupData = ShowCommonLookup(urlLibraryNameList, actionParameters, columns, "LibraryName", idfield, title, null);
//        LibraryNameListForValidation = LibraryNamelookupData;
//    }
//    else {
//        DisplayLookupWithExistingData(columns, "LibraryName", idfield, title, null, LibraryNamelookupData)
//    }


    //ShowCommonLookup(urlLibraryNameList, actionParameters, columns, "LibraryName", idfield, title, null);
}

var StatusNamelookupData = "";
function LoadStatusNameLookup(grid) {

    if (grid.getEditorLock().isActive())
        grid.getEditorLock().deactivate(grid.getEditController());

    var columns = [
                               { id: "ID", name: "Status", field: "ID" },
                                { id: "Val", name: "Status Description", field: "Val" }
                         ];
    var actionParameters = "";
    var title = "Status";
    var idfield = "ID"
    if (StatusNamelookupData != null && StatusNamelookupData.length == 0) {
        StatusNamelookupData = ShowCommonLookup(urlStatusList, actionParameters, columns, "StatusName", idfield, title, null);
    }
    else {
        DisplayLookupWithExistingData(columns, "StatusName", idfield, title, null, StatusNamelookupData)
    }

    //ShowCommonLookup(urlStatusNameList, actionParameters, columns, "StatusName", idfield, title, null);
}


var StoragelookupData = "";
function LoadStorageLookup(grid) {

    if (grid.getEditorLock().isActive())
        grid.getEditorLock().deactivate(grid.getEditController());

    var columns = [
                               { id: "ID", name: "Storage", field: "Storage" }
                         ];
    var actionParameters = { LibraryID: LibraryID };
    var title = "Storage";
    var idfield = "Storage"
    if (StatusNamelookupData != null && StatusNamelookupData.length == 0) {
        StoragelookupData = ShowCommonLookup(urlStorageList, actionParameters, columns, "Storage", idfield, title, null);
    }
    else {
        DisplayLookupWithExistingData(columns, "Storage", idfield, title, null, StoragelookupData)
    }
    //ShowCommonLookup(urlStatusNameList, actionParameters, columns, "StatusName", idfield, title, null);
}

var columnFilters = [];
function FilterGridWithRowCount(grid, dataView, gridContainerDiv) {

    dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
        var row = 0;
        if (grid.getSelectedRows() != null) {
            row = grid.getSelectedRows()[0];
        }
        if ((row == null))
            row = 0;
        if (row > dataView.getLength()) {
            row = 1;
            grid.setActiveCell(1, 0);
            grid.editActiveCell();
            grid.render();
        }
        setfooter(gridContainerDiv, row, dataView.getLength());


        if (grid.getSelectedRows()[0] == 0 && dataView.getItem(grid.getSelectedRows()[0]).MaterialID == "") {
            //alert(grid.getSelectedRows()[0] + dataView.getItem(grid.getSelectedRows()[0]).MaterialID);
            DisableToggleButton("#btnPrint", true);
            DisableToggleButton("#btnViewDetails", true);
        }
        else {
            DisableToggleButton("#btnPrint", false);
            DisableToggleButton("#btnViewDetails", false);

        }
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
    });


    $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {

        var columnId = $(this).data("columnId");

        if (columnId != null) {

            columnFilters[columnId] = $.trim($(this).val());
            //alert(columnFilters[columnId]);    
            dataView.refresh();
        }
    });

    grid.onHeaderRowCellRendered.subscribe(function (e, args) {

        $(args.node).empty();
        $("<input type='text'>")
           .data("columnId", args.column.id)
           .val(columnFilters[args.column.id])
           .appendTo(args.node);
    });

}
var columnset = 0;
function DisplayGrid(data) {

    var isEnterKeyPress = false;
    BookIngridWidth = $(gridContainerDiv).width();
    $(gridContainerDiv).css({ "width": BookIngridWidth + "px", "height": BookIngridHeight });

    dataView = new Slick.Data.DataView();
    grid = new Slick.Grid(gridContainerDiv, dataView, BookIngridcolumns, options);
    //grid.registerPlugin(new Slick.AutoTooltips());
    grid.setSelectionModel(new Slick.RowSelectionModel());

    if (BookIngridviewableColumns != null) {
        grid.setColumns(BookIngridviewableColumns);
    }

    if ((data == null) || data.length == 0) {
        data = [];
        setfooter(gridContainerDiv, 0, 0);
        BookinData = data;
    }
    else {
        setfooter(gridContainerDiv, 1, data.length - 1);
        BookinData = data;
        showMessage("Search Result Completed.", "information");
    }

    grid.onClick.subscribe(function (e, args)
    {
        clearAllMessages();
        changedrow = args.row;
        setfooter(gridContainerDiv, args.row, dataView.getLength());
     //   grid.editActiveCell();

    });

    grid.onSort.subscribe(function (e, args) {

        Remove_Addrow();
        SortGrid(args, dataView);
        Create_Addrow();

       // grid.setActiveCell(0, 1);
      //  grid.editActiveCell();
    });

    FilterGridWithRowCount(grid, dataView, gridContainerDiv);
    //FilterGrid(grid, dataView);

    grid.onKeyDown.subscribe(function (e, args) {

        if (e.keyCode == 120) {
            selrow = args.row;
            gitems = dataView.getItem(selrow);
            if (grid.getColumns()[args.cell].id == "Supplier")
                loadSupplierLookup(grid);
            if (grid.getColumns()[args.cell].id == "MaterialType")
                loadMaterialTypeLookup(grid);
            if (grid.getColumns()[args.cell].id == "SupplierType")
                LoadSupplierCopyTypeLookup(grid);
            if (grid.getColumns()[args.cell].id == "LibraryName")
                LoadLibraryNameLookup(grid);
            //if (grid.getColumns()[args.cell].id == "StatusName")
            //LoadStatusNameLookup(grid);
            if (grid.getColumns()[args.cell].id == "Storage")
                LoadStorageLookup(grid);
        }

        else if (e.keyCode == 13) {
            // alert(grid.getActiveCell().row);
            isEnterKeyPress = true;
            if (grid.getActiveCell() != null) {
                if (grid.getActiveCell().row == 0) {
                    if (grid.getCellEditor().getValue() != null) {
                        data[args.row][grid.getColumns()[args.cell].field] = grid.getCellEditor().getValue().toUpperCase();
                    }
                    for (var i = 0; i < grid.getColumns().length; i++) {
                        var item = grid.getDataItem(grid.getActiveCell().row);
                        if (typeof data[args.row][grid.getColumns()[i].field] == "string") {
                            data[args.row][grid.getColumns()[i].field] = data[args.row][grid.getColumns()[i].field].toUpperCase();
                        }
                        if (grid.getColumns()[i].editor && grid.getColumns()[i].validator) {
                            var validationResults = grid.getColumns()[i].validator(item[grid.getColumns()[i].field]);
                            if (!validationResults.valid) {
                                grid.gotoCell(grid.getActiveCell().row, i, true);
                                grid.getEditorLock().commitCurrentEdit();
                                isValidRow = 0;
                                return false;
                            }
                            else {
                                isValidRow = 1;
                                cellvalue = data[args.row][grid.getColumns()[i].field];
                                columnId = grid.getColumns()[i].id;
                                if (columnId == "LibraryName") {
                                    if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                                        if (LibraryNameList != null && LibraryNameList.length == 0) {
                                            LibraryNameList = GetLookupListobj(urlLibraryNameList, "");
                                        }
                                        if (LibraryNameList.length > 0) {
                                            for (var j = 0; j < LibraryNameList.length; j++) {
                                                if (cellvalue == LibraryNameList[j].LibraryName.toUpperCase()) {
                                                    data[args.row].LibraryName = LibraryNameList[j].LibraryName;
                                                    data[args.row].LibraryID = LibraryNameList[j].LibraryID;
                                                    LibraryID = LibraryNameList[j].LibraryID;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (columnId == "MaterialType") {
                                    if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                                        if (MaterialTypeList != null && MaterialTypeList.length == 0) {
                                            MaterialTypeList = GetLookupListobj(urlMaterialTypeList, "");
                                        }
                                        if (MaterialTypeList.length > 0) {
                                            for (var j = 0; j < MaterialTypeList.length; j++) {
                                                if (cellvalue.toUpperCase() == MaterialTypeList[j].Val.toUpperCase() || cellvalue.toUpperCase() == MaterialTypeList[j].ID.toUpperCase()) {
                                                    data[args.row].MaterialType = MaterialTypeList[j].Val;
                                                    data[args.row].MaterialTypeID = MaterialTypeList[j].ID;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (columnId == "SupplierType") {
                                    if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                                        if (SupplierTypeList != null && SupplierTypeList.length == 0) {
                                            SupplierTypeList = GetLookupListobj(urlSupplierCopyTypeList, "");
                                        }
                                        if (SupplierTypeList.length > 0) {
                                            for (var j = 0; j < SupplierTypeList.length; j++) {
                                                if (cellvalue.toUpperCase() == SupplierTypeList[j].Val.toUpperCase() || cellvalue.toUpperCase() == SupplierTypeList[j].ID.toUpperCase()) {
                                                    data[args.row].SupplierType = SupplierTypeList[j].Val;
                                                    data[args.row].SupplierTypeID = SupplierTypeList[j].ID;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // if (validateRow(grid, grid.getActiveCell().row)) 
                    if (isValidRow == 1) {


                        // storageEditorValue
                        var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;

                        if (fieldName == "Storage") {
                            grid.setActiveCell(grid.getActiveCell().row, (grid.getActiveCell().cell) + 1);
                            grid.setActiveCell(grid.getActiveCell().row, grid.getActiveCell().cell);
                            // alert(storageEditorValue);
                        }

                        data[changedrow].BookinID = GetNextMaterialID(data[0]);
                        data[changedrow].Storage = currenteditorvalue;
                        data[changedrow].Status = "BOOKIN";
                        data[changedrow].StatusID = "BOOKIN";
                        data[changedrow].Date = currentDate;
                        data.splice(1, 0, data[changedrow]);

                        //   data.push(data[changedrow]);
                        if (data[changedrow].MaterialID == "" || data[changedrow].MaterialID == null) {
                            AddToBasket(data[changedrow], "Added");
                        }

                        var itemx = {
                            BookinID: "",
                            MaterialID: "",
                            Supplier: "",
                            MaterialName: "",
                            MaterialType: "Click here to",
                            MaterialTypeID: "",
                            SupplierType: "add a new row",
                            SupplierTypeID: "",
                            ReceiptNo: "",
                            LibraryID: "",
                            LibraryName: "",
                            Status: "BOOKIN",
                            GivenBy: "",
                            Storage: "",
                            CreatedDate: currentDate,
                            Comments: ""
                        };

                        //data.splice(0, 1, itemx);
                        data[0] = itemx;
                        dataView.refresh();

                        if (grid.getSelectedRows()[0] == 0 && data[grid.getSelectedRows()[0]].MaterialID == "") {
                            //alert(grid.getSelectedRows()[0]+ data[grid.getSelectedRows()[0]].MaterialID);
                            DisableToggleButton("#btnPrint", true);
                            DisableToggleButton("#btnViewDetails", true);
                        }
                        else {
                            DisableToggleButton("#btnPrint", false);
                            DisableToggleButton("#btnViewDetails", false);

                        }

                        grid.render();
                        var isEnterKeyPress = true;
                        //grid.setActiveCell(0, 1);
                        //grid.editActiveCell();
                       // grid.invalidate();
                        changedrow = -1;
                        setfooter(gridContainerDiv, 1, data.length - 1);
                    }
                }
            }
        }

    });

    //    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
    //        if (args.grid.getCellEditor().constructor.name == "TextEditor") {
    //            currenteditorvalue = args.editor.getValue();
    //        }
    //        // alert(currenteditorvalue);
    //    });

    var beforeeditorvalue;
    var currenteditorvalue;
    grid.onBeforeEditCell.subscribe(function (e, args) {
        beforeeditorvalue = args.item[args.column.field];
    });

    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
        currenteditorvalue = args.editor.getValue();
    });


    grid.onCellChange.subscribe(function (e, args) {

        //Code set to check if data on cell has really changed.
        changedrow = args.row;
        if (beforeeditorvalue != currenteditorvalue) {
            isDataUpdated = true;
            if (grid.getColumns()[args.cell].id == "LibraryName") {
                args.item.Storage = "";
            }
        }
        beforeeditorvalue = "";
        currenteditorvalue = "";


        cellvalue = dataView.getItem(args.row)[grid.getColumns()[args.cell].field];
        columnId = grid.getColumns()[args.cell].id;
        if (typeof cellvalue == "string") {
            cellvalue = cellvalue.toUpperCase();
            dataView.getItem(args.row)[grid.getColumns()[args.cell].field] = cellvalue;
        }
        if (grid.getColumns()[args.cell].id == "LibraryName") {
            // data[args.row][grid.getColumns()[args.cell].field] = cellvalue.toLowerCase();
            if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                if (LibraryNameList != null && LibraryNameList.length == 0) {
                    LibraryNameList = GetLookupListobj(urlLibraryNameList, "");
                }
                if (LibraryNameList.length > 0) {
                    for (var i = 0; i < LibraryNameList.length; i++) {
                        if (cellvalue == LibraryNameList[i].LibraryName.toUpperCase()) {
                            dataView.getItem(args.row).LibraryName = LibraryNameList[i].LibraryName;
                            dataView.getItem(args.row).LibraryID = LibraryNameList[i].LibraryID;
                            LibraryID = LibraryNameList[i].LibraryID;
                            dataView.refresh();
                            break;
                        }
                    }
                }
            }
        }
        if (grid.getColumns()[args.cell].id == "MaterialType") {
            if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                if (MaterialTypeList != null && MaterialTypeList.length == 0) {
                    MaterialTypeList = GetLookupListobj(urlMaterialTypeList, "");
                }
                if (MaterialTypeList.length > 0) {
                    for (var i = 0; i < MaterialTypeList.length; i++) {
                        if (cellvalue.toUpperCase() == MaterialTypeList[i].Val.toUpperCase() || cellvalue.toUpperCase() == MaterialTypeList[i].ID.toUpperCase()) {
                            dataView.getItem(args.row).MaterialType = MaterialTypeList[i].Val;
                            dataView.getItem(args.row).MaterialTypeID = MaterialTypeList[i].ID;
                            break;
                        }
                    }
                }
            }
        }
        if (grid.getColumns()[args.cell].id == "SupplierType") {
            if (cellvalue != null && cellvalue != "" && cellvalue != "null") {
                if (SupplierTypeList != null && SupplierTypeList.length == 0) {
                    SupplierTypeList = GetLookupListobj(urlSupplierCopyTypeList, "");
                }
                if (SupplierTypeList.length > 0) {
                    for (var i = 0; i < SupplierTypeList.length; i++) {
                        if (cellvalue.toUpperCase() == SupplierTypeList[i].Val.toUpperCase() || cellvalue.toUpperCase() == SupplierTypeList[i].ID.toUpperCase()) {
                            dataView.getItem(args.row).SupplierType = SupplierTypeList[i].Val;
                            dataView.getItem(args.row).SupplierTypeID = SupplierTypeList[i].ID;
                            break;
                        }
                    }
                }
            }
        }
        //        grid.setData(data);
        dataView.refresh();
        grid.render();
        grid.invalidate();
    });

    grid.onSelectedRowsChanged.subscribe(function (e, args) {


        if (grid.getSelectedRows()[0] == 0) {
            if (grid.getSelectedRows()[0] != previousRow) {
                grid.setColumns(BookIngridviewableColumns);
                columnset = 0;
            }
        }
        else if (columnset == 0) {
            if (grid.getSelectedRows()[0] != previousRow) {
                grid.setColumns(BookIngridviewableColumnsNonEdit);
                columnset = 1;
            }
        }

        previousRow = grid.getSelectedRows()[0];


        if (grid.getActiveCell() != null) {
            seldata = dataView.getItem(grid.getActiveCell().row);
            // execute change row code only when row really changes ( Limitation of Slickgrid)
            //if (grid.getActiveCell().row == previousRow) {
            //   return;
            //}
            //else {
            if (isEnterKeyPress && (grid.getActiveCell().row == 1 && grid.getActiveCell().cell == 0)) {
                isEnterKeyPress = false;
                grid.setActiveCell(0, 0);
                grid.editActiveCell();
                grid.render();
            }

            if (changedrow > -1) {
                if (grid.getActiveCell().row > 0) {
                    MaterialID = dataView.getItem(grid.getActiveCell().row).MaterialID;
                    LibraryID = dataView.getItem(grid.getActiveCell().row).LibraryID;

                    if (MaterialID != null || MaterialID != 'undefined') {
                        DisableToggleButton("#btnPrint", false);
                        DisableToggleButton("#btnViewDetails", false);
                    }

                    dataView.getItem(changedrow).Status = "BOOKIN";
                    dataView.getItem(changedrow).StatusID = "BOOKIN";

                    if (dataView.getItem(changedrow).MaterialID == null || dataView.getItem(changedrow).MaterialID == "") {
                        AddToBasket(dataView.getItem(changedrow), "Added");
                        var itemx = {
                            BookinID: "",
                            MaterialID: "",
                            Supplier: "",
                            MaterialName: "",
                            MaterialType: "Click here to",
                            MaterialTypeID: "",
                            SupplierType: "add a new row",
                            SupplierTypeID: "",
                            ReceiptNo: "",
                            LibraryID: "",
                            LibraryName: "",
                            Status: "BOOKIN",
                            GivenBy: "",
                            Storage: "",
                            CreatedDate: currentDate,
                            Comments: ""
                        };

                        data.splice(0, 0, itemx);
                        data[0] = itemx;
                        dataView.refresh();
                        grid.invalidate();

                        MaterialID = dataView.getItem(grid.getActiveCell().row).MaterialID;
                        LibraryID = dataView.getItem(grid.getActiveCell().row).LibraryID;
                    }
                    else {
                        if (isDataUpdated == true) {
                            AddToBasket(dataView.getItem(changedrow), "Modified");
                            isDataUpdated = false;
                        }
                    }
                }
                else if (changedrow == 0) {

                    //MaterialID = null;
                    //LibraryID = null;
                    DisableToggleButton("#btnPrint", true);
                    DisableToggleButton("#btnViewDetails", true);

                    dataView.getItem(changedrow).Status = "BOOKIN";
                    dataView.getItem(changedrow).StatusID = "BOOKIN";

                    var flagValid = IsRowValid(data[changedrow]);
                    if (flagValid) {
                        AddToBasket(dataView.getItem(changedrow), "Added");
                    }
                    //previousRow = grid.getActiveCell().row;
                    setfooter(gridContainerDiv, previousRow, dataView.getLength());
                }
            }

            function IsRowValid(row) {
                if (
                            (row.Supplier != "") &&
                            (row.LibraryName != "") &&
                            (row.LibraryID != "") &&
                            (row.MaterialType != "") &&
                            (row.MaterialTypeID != "") &&
                            (row.SupplierType != "") &&
                            (row.SupplierTypeID != "") &&
                            (row.MaterialName != "") &&
                            (row.GivenBy != "") && (row.MaterialID == "")) {
                    return true;
                }
                else {
                    return false;
                }
            }

        }       

        if (grid.getSelectedRows()[0] == 0 && dataView.getItem(grid.getSelectedRows()[0]).MaterialID == "") {
            DisableToggleButton("#btnPrint", true);
            DisableToggleButton("#btnViewDetails", true);
        }
        else {
            DisableToggleButton("#btnPrint", false);
            DisableToggleButton("#btnViewDetails", false);

        }
    });

    grid.onValidationError.subscribe(function (e, args) {

        var validationResult = args.validationResults;
        var activeCellNode = args.cellNode;
        var editor = args.editor;
        var errorMessage = validationResult.msg;
        var valid_result = validationResult.valid;
        if (!valid_result) {
            $(activeCellNode).attr("title", errorMessage);
        }
        else {

            $(activeCellNode).attr("title", "");
        }

    });

//    $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {

//        var columnId = $(this).data("columnId");

//        if (columnId != null) {

//            colFilters[columnId] = $.trim($(this).val());
//            //alert(colFilters[columnId]);    
//            dataView.refresh();
//        }
//    });


//    function filter(item) {
//        for (var columnId in colFilters) {
//            if (columnId !== undefined && colFilters[columnId] !== "") {
//                var c = grid.getColumns()[grid.getColumnIndex(columnId)];

//                //if not type casted to string, number filtering will throw error
//                if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) {
//                    //if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) 
//                    // {
//                    return false;
//                    //  }
//                }

//            }
//        }
//        return true;
//    }
    grid.init();

    //for dev
    
    var item = {
        BookinID: "",
        MaterialID: "",
        Supplier: "",
        MaterialName: "",
        MaterialType: "Click here to",
        MaterialTypeID: "",
        SupplierType: "add a new row",
        SupplierTypeID: "",
        ReceiptNo: "",
        LibraryID: "",
        LibraryName: "",
        Status: "BOOKIN",
        GivenBy: "",
        Storage: "",
        CreatedDate: currentDate,
        Comments: ""
    };

    data.splice(0, 0, item);
    

    dataView.beginUpdate();
    dataView.setItems(data, 'BookinID');
    dataView.setFilter(filter);
    dataView.endUpdate();
    //    if (!grid.getEditorLock().isActive()) {
    //        grid.editActiveCell();
    //    }

    
    var rows = [];

//    if (data.length == 1)
 //   {
        rows.push(0);
  //  }
//    else
//    {
//        rows.push(1);
//    }
//    
    
    grid.setSelectedRows(rows);
 //   grid.setActiveCell(grid.getSelectedRows()[0], 1);

    setfooter(gridContainerDiv, 0, data.length - 1);
}



function Remove_Addrow() {
    dataView.deleteItem("");
}

function Create_Addrow() {
    //var item = { "SupplierCommunicationID": "new row", "MaterialID": "Click here to add a new row", "MaterialName": "", "MaterialTypeCodeVal": "", "PersistFlag": "" };

    var item = {
        "BookinID": "",
        "MaterialID": "",
        "Supplier": "",
        "MaterialName": "",
        "MaterialType": "Click here to",
        "MaterialTypeID": "",
        "SupplierType": "add a new row",
        "SupplierTypeID": "",
        "ReceiptNo": "",
        "LibraryID": "",
        "LibraryName": "",
    //    "StatusID": "BOOKIN",
        "Status": "BOOKIN",
        "GivenBy": "",
        "Storage": "",
        "CreatedDate": currentDate,
        "Comments": ""
    };

    dataView.insertItem(0, item);
    dataView.refresh();
    };


function GetNextMaterialID(item) {

    return newrowids = newrowids - 1;
}

function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl)
{    
    if (SelectedRowData != null) {
        if (lookupInvokerControl == "txtSupplier") {
            $("#txtSupplier").val(SelectedRowData.ComShortName);
            $("#txtSupplier").focus();
            return;
        }

        if (lookupInvokerControl == "txtMaterialID") {
            $("#txtMaterialID").val(SelectedRowData.MaterialId);
            $("#txtMaterialID").focus();
            return;
        }

        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());

        if (lookupInvokerControl == "Supplier") {
            gitems.Supplier = SelectedRowData.ComShortName;
            if (seldata != null && seldata.MaterialID != "") {
                AddToBasket(seldata, "Modified");
            }
         //   dataview.refresh();
            grid.gotoCell(grid.getSelectedRows()[0], 1, true);
           grid.editActiveCell();
        }
        else if (lookupInvokerControl == "MaterialType") {
            gitems.MaterialType = SelectedRowData.ID;
            gitems.MaterialTypeID = SelectedRowData.ID;
            if (seldata != null && seldata.MaterialID != "") {
                AddToBasket(seldata, "Modified");
            }
            grid.gotoCell(grid.getSelectedRows()[0], 3, true);
            grid.editActiveCell();
        }
        else if (lookupInvokerControl == "SupplierType") {
            gitems.SupplierType = SelectedRowData.ID;
            gitems.SupplierTypeID = SelectedRowData.ID;
            if (seldata != null && seldata.MaterialID != "") {
                AddToBasket(seldata, "Modified");
            }
            grid.gotoCell(grid.getSelectedRows()[0], 4, true);
            grid.editActiveCell();
        }
        else if (lookupInvokerControl == "LibraryName") {
            if (gitems.LibraryID != SelectedRowData.LibraryID) {
                gitems.LibraryName = SelectedRowData.LibraryName;
                gitems.LibraryID = SelectedRowData.LibraryID;
                LibraryID = SelectedRowData.LibraryID;
                if (seldata != null && seldata.MaterialID != "") {
                    gitems.Storage = "";
                    AddToBasket(seldata, "Modified");
                }
            }
            grid.gotoCell(grid.getSelectedRows()[0], 6, true);
            grid.editActiveCell();
        }
        else if (lookupInvokerControl == "StatusName") {
            gitems.StatusName = SelectedRowData.ID;
            gitems.StatusID = SelectedRowData.ID;
            if (seldata != null && seldata.MaterialID != "") {
                AddToBasket(seldata, "Modified");
            }
            grid.gotoCell(grid.getSelectedRows()[0], 7, true);
            grid.editActiveCell();
        }
        else if (lookupInvokerControl == "Storage") {
            gitems.Storage = SelectedRowData.Storage;
            grid.editActiveCell();
            if (seldata != null && seldata.MaterialID != "") {
                AddToBasket(seldata, "Modified");
            }
            grid.gotoCell(grid.getSelectedRows()[0], 9, true);
            grid.editActiveCell();
        }

        dataView.refresh();
        grid.invalidate();
        //grid.focus();
      //  grid.editActiveCell();
    }
    else {
        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());
        grid.editActiveCell();
    }
    //      grid.setActiveCell(selrow, 2);
    //        grid.editActiveCell();


    //    if (lookupInvokerControl == "MaterialIDColumn") {
    //        gitems.MaterialID = SelectedRowData.ID;
    //        gitems.MaterialName = SelectedRowData.Val;
    //        $.extend(gitems, gitems);
    //        if (!grid.getEditorLock().isActive())
    //            grid.getEditorLock().activate(grid.getEditController());
    //        grid.setActiveCell(0, 3);
    //        grid.editActiveCell();
    //        grid.setActiveCell(selrow, 1);
    //        grid.editActiveCell();
    //        dataView.refresh();
    //        grid.setActiveCell(selrow, 0);
    //        grid.editActiveCell();
    //        dataView.refresh();
    //        grid.render();
    //        grid.focus();
    //    }
    //    if (lookupInvokerControl == "MaterialTypeName") {
    //        gitems.MaterialTypeCodeVal = SelectedRowData.ID;
    //        gitems.MaterialTypeName = SelectedRowData.Val;
    //        if (!grid.getEditorLock().isActive())
    //            grid.getEditorLock().activate(grid.getEditController());
    //        grid.setActiveCell(0, 0);
    //        grid.editActiveCell();
    //        grid.setActiveCell(selrow, 2);
    //        grid.editActiveCell();
    //        grid.render();
    //        grid.focus();
    //    }
    //    if (lookupInvokerControl == "ModeOfComm") {
    //        gitems.ModeOfCommCodeVal = SelectedRowData.ID;
    //        gitems.ModeOfComm = SelectedRowData.Val;
    //        if (!grid.getEditorLock().isActive())
    //            grid.getEditorLock().activate(grid.getEditController());
    //        grid.setActiveCell(0, 0);
    //        grid.editActiveCell();
    //        grid.setActiveCell(selrow, 5);
    //        grid.editActiveCell();
    //        grid.render();
    //        grid.focus();
    //    }
};


function PrepareGridtoSave(gridtoPrepare) {

    valid_result = true;
    //to save data if user changed a cell and clicked directly on save button
    var row = gridtoPrepare.getActiveCell().row;
    var cell = gridtoPrepare.getActiveCell().cell;


    gridtoPrepare.focus();

    for (var i = 0; i < gridtoPrepare.getColumns().length; i++) {
        gridtoPrepare.gotoCell(row, i, true);
        if (!valid_result)
            return valid_result;
    }

    return valid_result;
}

function Save() {

    ShowProgressBar();
    $.noty.closeAll();
    
    if (UpData.length == 0) {
            
        showMessage('No data to Save.', 'error');
         RemoveProgressBar();
        return;
    }


    var dataToSend = JSON.stringify(UpData);
    //console.log(dataToSend);
    $.ajax({
        url: urlSaveLibraryBookInDetail,
        type: "POST",
        data: dataToSend,
        dataType: "json",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data)
        {
            if (data != null)
            {
                for (var index = 0; index < data.data.length; index++)
                {
                    $.extend(UpData[index], data.data[index]);
                }
                
                if ((changedrow == 0) && (grid.getSelectedRows()[0] == changedrow))
                {
                    Create_Addrow();
                }
                var materialID = null;
                if (grid.getActiveCell() != null)
                {
                    materialID = dataView.getItem(grid.getActiveCell().row).MaterialID;
                }
                if (materialID != null)
                {
                    DisableToggleButton("#btnPrint", false);
                    DisableToggleButton("#btnViewDetails", false);
                }

                dataView.refresh();
                grid.invalidate();
                grid.focus();
                grid.render();
                UpData = [];
                isDataUpdated = false;
                showMessage("Data saved successfully.", "information");
            }
            RemoveProgressBar();
        },
        error: function ()
        {
            showMessage("Internal server error.", "error");
            RemoveProgressBar();
        }
    });
};


function AddToBasket(item, status) {
    var isNewItem = 0;

    if (UpData.length == 0) {
        if (status == "Modified") {
            item1 = { "PersistFlag": status };
            $.extend(item, item1);
            UpData.push(item);
        }
        else if (status == "Added") {
            item1 = { "PersistFlag": status };
            $.extend(item, item1);
            UpData.push(item);
        }

    }

    else {
        for (var i = 0; i < UpData.length; i++) {


            if (UpData[i]["BookinID"] == item["BookinID"]) {
                if (UpData[i]["PersistFlag"] == "Added") {
                    isNewItem = 1;
                }
                UpData.splice(i, 1);
            }
        }
        if (isNewItem) {
            item1 = { "PersistFlag": "Added" };
        }
        else {
            item1 = { "PersistFlag": status };
        }
        $.extend(item, item1);
        UpData.push(item);
    }
    //   console.log(JSON.stringify(UpData));
    // Just to check record in alert
}


function validateRow(grid, rowIdx) {

    $.each(grid.getColumns(), function (colIdx, column) {
        // iterate through editable cells        
        var item = grid.getDataItem(rowIdx);

        if (column.editor && column.validator) {
            var validationResults = column.validator(item[column.field]);
            if (!validationResults.valid) {
                // show editor
                grid.gotoCell(rowIdx, colIdx, true);

                // validate (it will fail)
                grid.getEditorLock().commitCurrentEdit();

                isValidRow = 0;
                return false;
            }
            else {
                isValidRow = 1;

            }
        }
    });

    return isValidRow;

}

//Logic to reset date textbox if enter date is wrong
function IsValidDate(str) {
    var m = str.match(/^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\-\d{4}$/);
    return (m) ? new Date(m[3], m[2] - 1, m[1]) : null;
}


function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "This is a required field" };
    }
    else {
        return { valid: true, msg: null };
    }
}


/*end of  validators */

function ShowLookUpMaterialMaster() {

    var lookupInvokerControl = $.trim($("#txtMaterialID").text());

    var gridMaterialMasterContainer = "#gridMaterialMaster";

    var columns = [
    { id: "MaterialID", name: "Material ID", field: "MaterialID", editor: Slick.Editors.Text, sortable: true },
    { id: "MateriaName", name: "Materia Name", field: "MateriaName", editor: Slick.Editors.Text, sortable: true }
     ];

    options =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            editable: false,
            asyncEditorLoading: false,
            showHeaderRow: true,
            explicitInitialization: true
        };

    var actionUrl = urlMaterialList;

    var actionParameters = null

    idfield = "MaterialID";
    gridwidth = 1150;
    gridheight = 200;
    ShowLookup(lookupInvokerControl, actionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, gridMaterialMasterContainer);
}


function SetDialogProgrammeSearch()
{

    clearAllMessages();
    //$('#dialogProgrammeSearch').load('/Media_Mgt/Library/_ProgrammeSearchPartial');
    // Dialog View Storage Detail
    $("#dialogProgrammeSearch").dialog({
        width: 1200,
        height: 750,
        open: function (event, ui) {


            SetNonStandardDialogStyles();
        },
        buttons:
{
    Save: function () {
        ShowProgressBar();
        //ModifiedMaterialProgramsRows = [];

//        if ((gridMaterialPrograms != null) && gridMaterialPrograms.getData() != null) {
//            for (var index = 0; index < gridMaterialPrograms.getData().length; index++) {
//                ModifiedMaterialProgramsRows.push()[index];
//            }
//        }
//        if (ModifiedMaterialProgramsRows.length == 0) {
//            showMessage('No record(s) available for update.', 'information');
//        }
//        else {
            var programmeData = {
                ProgrammeVO: ModifiedMaterialProgramsRows
            };
            $.ajax({
                url: urlSaveProgramDetail,
                type: "POST",
                data: JSON.stringify(programmeData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    ModifiedMaterialProgramsRows = [];
                    if (data != null) {
                        //                    for (var index = 0; index <= data.data.length - 1; index++) {
                        //                        $.extend(gridMaterialProgData[index], data.data[index]);
                        //                    }
                        //DisplayGridMaterialPrograms(gridMaterialProgData);
                        showMessage("Data saved successfully.", "information");
                        RemoveProgressBar();
                    }
                },
                error: function (x, e) {
                    RemoveProgressBar();
                    showMessage("Inernal server error.", "error");
                }
            });
        //}
    },
    Cancel: function () {
        emptyrow = [];
        showemptygrid();
        clearAllMessages();
        $(this).dialog("close");
    }
},
        autoOpen: false,
        modal: true
    });
}

$("#MaterialId").keydown(function (e) {
    if (e.keyCode == 120) {
        MartriealLookup();
    }
});


//Start Region:Print Acceptance by Suplier.
var displaydata;
function loadMaterialdata(MaterialID) {
    var actionParameters = {
        MaterialID: MaterialID
    }
    $.ajax({
        url: urlmaterialDetail,
        type: "GET",
        dataType: 'Json',
        async: false,
        cache: false,
        data: actionParameters,
        success: function (data) {
            titledata = data;
        },
        error: function () {
            showMessage("error fetching data, Please try again.", "error");
            RemoveProgressBar();
        }
    });
}


//Start region: print acceptance

var titledata = [];
var programmetitledata = [];
var seldata;
var SuppplierID;

function getPrint(MaterialID) {
    displaydata = seldata;
    displaydata.SuppplierID = displaydata.Supplier
    loadMaterialdata(MaterialID);
    programmetitledata = titledata
    $('#PrintAcceptancePopup').load(urlprintAcc);
    $("#PrintAcceptancePopup").dialog({
        autoOpen: false,
        height: 400,
        width: 800,
        modal: true,
        title: "Receipt For Material Received",
        open: function (event, ui) {
            $('#PrintAcceptancePopup').css({ "width": "900px", "height": "400px" });
            //dialoghandler = $(this);
        },
        close: function () {
        }
    });
    $("#PrintAcceptancePopup").dialog("open");
}

function printDoc(divName) {
    $("#btnPrintDoc").hide();
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank', 'width=850,height=550');
    popupWin.document.open();
    popupWin.document.write('<html><body onload="window.print()">' + printContents + '</html>');
    popupWin.document.close();
    //popupWin.close();
    setTimeout(function () { popupWin.close(); }, 1000);
    $("#btnPrintDoc").show();
}

//End region: print acceptance 
 

   
