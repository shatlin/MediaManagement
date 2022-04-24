var resetflag = 0;
var changedrow = -1;
var previousRow = -1;
var materialTyepListForValidation = [];
var SupplierListForValidation = [];
var SupplierCopyListForValidation = [];
var LibraryNameListForValidation = [];
var StatusListForValidation = [];
var StorageListForValidation = [];
var materialListForValidation = [];
var isValidRow;
var newrowids = 0;
var currenteditorvalue;
//shatlin code
var columnFilters = {};
//var BookIngrid = "#gridBookOut";
var btnSaveToggle = "#btnSave";
var MaterialID;
var columnsgridBookOut = [];
var options;
var viewableColumnsgridBookOut = [];
var BookIngrididfield;
var BookIngridWidth;
var BookIngridHeight;
var BookIngridActionParameters;
var dataview;
var dataView;
var UpData = [];
var CurComboVal;
var selectedCol;
var SelectedUrl = "";
var selectedVal = "";
var ColumnName = "";
var actionParameters;
var AddProgrammeData = [];
var RemoveProgrammeData = [];
var gridContainerDiv;
var typeValue;
var gridBookingHistoryContainer; var gridBookingHistory;
var gridBookingHistoryviewableColumns = []; var gridBookingHistorycolumns = [];
var gridBookingHistoryoptions; var gridBookingHistoryidfield; var gridBookingHistoryWidth; var gridBookingHistoryHeight;
//var gridAddPrograms; var gridAddProgramscolumns = []; var gridAddProgramsviewableColumns = [];
//var gridAddProgramsoptions; var gridAddProgramsidfield; var gridAddProgramsWidth; var gridAddProgramsHeight;
var grid;
var currentDate;
var errorMessagePanel;
var errorMessage;
var infoMessage;
var activeCellNode;
var isDataUpdated = false;

function suppressNonNumericInput(event) {

    if (!(event.keyCode == 8                                // backspace
        || event.keyCode == 46                              // delete
        || (event.keyCode >= 35 && event.keyCode <= 40)     // arrow keys/home/end
        || (event.keyCode >= 48 && event.keyCode <= 57)     // numbers on keyboard
        || (event.keyCode >= 96 && event.keyCode <= 105))   // number on keypad
        ) {
        event.preventDefault();     // Prevent character input
    }
}

$(document).ready(function () {

    $("#ReceiptNo").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });
    $("#DispatchNo").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });
    currentDate = GetTodayDate();
    $("#btnSave").attr("class", "inputButtonDisable");
    $("#btnViewBookingHistory").attr("class", "inputButtonDisable");
    $("#btnPrint").attr("class", "inputButtonDisable");
    shortcut.add("F9", function () {
        if ($("#txtMaterialID").is(":focus")) {
            loadMaterialLookupTextBox();
        }
    });

    $("#btnSearch").click(function (event) {
        clearAllMessages();
        SerachBookOut();
    });

    shortcut.add("F7", function () {
        clearAllMessages();
        ResetControls();
    });

    $("#btnViewBookingHistory").click(function (event) {
        clearAllMessages();
        if (grid.getActiveCell() != null) {
            MaterialID = dataView.getItem(grid.getActiveCell().row).MaterialID;
        }
        if (MaterialID == null) {
            showMessage("Plase select row.", "error");
        }
        else {
            ShowBookingHistoryLookup();
            //SetgridBookingHistory();
            //LoadBookingHistoryData();
        }
    });

    function ShowBookingHistoryLookup() {
        //// //debugger;;
        var lookUpDataBookingHistory = [];
        SetgridBookingHistory();
        clearAllMessages();

        var actionParameters = {
            MaterialID: MaterialID
        }
        $.ajax({
            url: urlLoadBookingHistory,
            type: "GET",
            dataType: 'Json',
            cache: false,
            async: false,
            data: actionParameters,
            success: function (data) {
                lookUpDataStorage = DisplayGridBookingHistory(data);
                RemoveProgressBar();
                //DisplayGridBookingHistory(data);
            },
            error: function () {
                RemoveProgressBar();
                alert("error fetching data.Please try again");
            }
        });
        return lookUpDataBookingHistory;
    };

    shortcut.add("F8", function () {
        clearAllMessages();
        SerachBookOut();
    });

    shortcut.add("F10", function () {
        clearAllMessages();
        SaveBookOutDetail();

    });

    $("#btnSearchReset").click(function (event) {
        Reset();
    });

    $("#btnSave").click(function (event) {
        clearAllMessages();
        SaveBookOutDetail();
    });
    shortcut.add("Esc", function () {
        $(activeCellNode).attr("title", "");
    });

    SetBookOutGridParameters();
    DisplaygridBookOut("");

});

function Reset() {
    clearAllMessages();
    $("#txtMaterialID").val("");
    $("#MaterialName").val("");
    $("#ReceiptNo").val("");
    $("#DispatchNo").val("");
    $('#Supplier option').first().prop('selected', true);

    DisplaygridBookOut("");
    MaterialID = null;

    $('#btnSave').prop("disabled", true);
    $('#btnViewBookingHistory').prop("disabled", true);
    $('#btnPrint').prop("disabled", true);

    $("#btnSave").attr("class", "inputButtonDisable");
    $("#btnViewBookingHistory").attr("class", "inputButtonDisable");
    $("#btnPrint").attr("class", "inputButtonDisable");
}

var txtMaterialIDValue;
var txtMaterialNameValue;
var supplierValue;
var txtDateFromValue;
var txtDateToValue;

function ResetControls() {
    if (resetflag == 0) {
        txtMaterialIDValue = $("#txtMaterialID").val();
        txtMaterialNameValue = $("#MaterialName").val();
        txtReceiptValue = $("#ReceiptNo").val();
        txtDispatchValue = $("#DispatchNo").val();
        supplierValue = $("#Supplier").val();
        Reset();
        resetflag = 1;
    }
    else if (resetflag == 1) {
        $("#txtMaterialID").val(txtMaterialIDValue);
        $("#MaterialName").val(txtMaterialNameValue);
        $("#ReceiptNo").val(txtReceiptValue);
        $("#DispatchNo").val(txtDispatchValue);
        $("#Supplier").val(supplierValue);
        resetflag = 0;
    }
};


function SetBookOutGridParameters() {

    gridContainerDiv = "#gridBookOut";

    columnsgridBookOut = [
                            { id: "BookoutId", name: "BookoutId", field: "BookoutId", width: 70 },
                            { id: "SuppplierID", name: "Supplier ID", field: "SuppplierID", width: 70, editor: Slick.Editors.Text, sortable: true },
                            { id: "MaterialID", name: "Material ID", field: "MaterialID", width: 120, sortable: true, editor: Slick.Editors.Text },
                            { id: "MaterialName", name: "Material Name", field: "MaterialName", width: 95, editor: Slick.Editors.Text, sortable: true },
                            { id: "MaterialType", name: "Material Type", field: "MaterialType", width: 90, editor: Slick.Editors.Text, sortable: true },
                            { id: "MaterialTypeID", name: "MaterialTypeID", field: "MaterialTypeID", sortable: true },
                            { id: "ReceiptNo", name: "Receipt No", field: "ReceiptNo", width: 68, editor: Slick.Editors.Text, sortable: true },
                            { id: "LibraryID", name: "LibraryID", field: "LibraryID", sortable: true },
                            { id: "LibraryName", name: "Library Name", field: "LibraryName", editor: Slick.Editors.Text, sortable: true },
                            { id: "StatusID", name: "Status", field: "StatusID", sortable: true },
                            { id: "Status", name: "Status", field: "Status", editor: Slick.Editors.Text, sortable: true },
                            { id: "DispatchNo", name: "Dispatch No", field: "DispatchNo", editor: Slick.Editors.Text, sortable: true },
                            { id: "GivenTo", name: "Given To", field: "GivenTo", editor: Slick.Editors.Text, sortable: true, validator: requiredFieldValidator },
                            { id: "CourierDetails", name: "Courier Details", field: "CourierDetails", width: 120, editor: Slick.Editors.Text, sortable: true },
                            { id: "RecInRSABy", name: "Received in RSA By", field: "RecInRSABy", width: 120, editor: Slick.Editors.Text, sortable: true },
                            { id: "Date", name: "Date", field: "Date", formatter: Slick.Formatters.Date, sortable: true },
                            { id: "Comments", name: "Comments", field: "Comments", editor: Slick.Editors.LongText, sortable: true }
                         ];

    viewableColumnsgridBookOut = [
                                   { id: "SuppplierID", name: "Supplier ID", field: "SuppplierID", width: 70, sortable: true, cssClass: "NonEditable" },
                                    { id: "MaterialID", name: "Material ID", field: "MaterialID", width: 120, sortable: true, cssClass: "NonEditable" },
                                    { id: "MaterialName", name: "Material Name", field: "MaterialName", width: 95, sortable: true, cssClass: "NonEditable" },
                                    { id: "ReceiptNo", name: "Receipt No", field: "ReceiptNo", width: 65, sortable: true, cssClass: "NonEditable" },
                                    { id: "LibraryName", name: "Library Name", field: "LibraryName", sortable: true, cssClass: "NonEditable" },
                                    { id: "Status", name: "Status", field: "Status", editor: Slick.Editors.Text, sortable: true, validator: StatusValidator, headerCssClass: " HeaderLovImage " },
                                    { id: "GivenTo", name: "Given To", field: "GivenTo", editor: Slick.Editors.Text, sortable: true, validator: requiredFieldValidator },
                                    { id: "CourierDetails", name: "Courier Details", field: "CourierDetails", width: 120, editor: Slick.Editors.Text, sortable: true },
                                    { id: "RecInRSABy", name: "Received in RSA By", field: "RecInRSABy", width: 120, editor: Slick.Editors.Text, sortable: true },
                                    { id: "Date", name: "Date", field: "Date", sortable: true, cssClass: "NonEditable" },
                                    { id: "Comments", name: "Comments", field: "Comments", editor: Slick.Editors.LongText, sortable: true },
                                    { id: "DispatchNo", name: "Dispatch No", field: "DispatchNo" }
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
    BookIngrididfield = 'MaterialID';
    BookIngridWidth = $(gridContainerDiv).width();
    BookIngridHeight = 400;

}

function SerachBookOut() {
    var Rec = isNaN($("#ReceiptNo").val());
    var Dis = isNaN($("#DispatchNo").val());
    if (Rec == true) {
        $("#ReceiptNo").val('');
    }
    if (Dis == true) {
        $("#DispatchNo").val('');
    }
    if ($("#txtMaterialID").val() == "" && $("#MaterialName").val() == "" && $("#Supplier").val() == "" && $("#ReceiptNo").val() == "" && $("#DispatchNo").val() == "") {
        noty({
            text: 'No search criteria has been selected. Do you want to see all the records from the system ?',
            modal: false,
            type: 'alert',
            buttons: [
                                        { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                                            $noty.close();
                                            LoadgridBookOut();
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
        LoadgridBookOut();
    }
}

function LoadgridBookOut() {
    var MaterialID = $.trim($("#txtMaterialID").val());
    var MaterialName = $.trim($("#MaterialName").val());
    var ReceiptNo = $.trim($("#ReceiptNo").val());
    var Supplier = $("#Supplier").val();
    var DispatchNo = $.trim($("#DispatchNo").val());
    gridBookOutActionParameters = {
        MaterialID: MaterialID,
        MaterialName: MaterialName,
        ReceiptNo: ReceiptNo,
        DispatchNo: DispatchNo,
        Supplier: Supplier
    };
    ShowProgressBar();
    $.ajax({
        url: urlBookOutDetail,
        type: "GET",
        dataType: 'Json',
        cache: false,
        data: gridBookOutActionParameters,
        success: function (data) {
            if (data != null) {
                if (data.length == 0) {
                    showMessage("No matching records found.", "information");
                    DisplaygridBookOut("");
                    $("#btnSave").attr("class", "inputButtonDisable");
                    $("#btnViewBookingHistory").attr("class", "inputButtonDisable");
                    $("#btnPrint").attr("class", "inputButtonDisable");
                }
                else {
                    DisplaygridBookOut(data);
                    showMessage("Search Result Completed.", "information");
                    $("#btnSave").attr("class", "inputButton");
                    $("#btnViewBookingHistory").attr("class", "inputButton");
                    $("#btnPrint").attr("class", "inputButton");
                }
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

//load lookup for materialId on textbox

var MaterialLookupData = "";
function loadMaterialLookupTextBox() {
    var columns = [
                          { id: "ID", name: "Material ID", field: "MaterialId" },
                                { id: "Val", name: "Material Name", field: "MaterialName" }
                         ];
    var actionParameters = "";
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

//load lookup for status on grid. 

var StatuslookupData = "";
function LoadStatusLookup(grid) {

    if (grid.getEditorLock().isActive())
        grid.getEditorLock().deactivate(grid.getEditController());

    var columns = [
                               { id: "ID", name: "Status", field: "ID" },
                                { id: "Val", name: "Status Description", field: "Val" }
                         ];
    var actionParameters = "";
    var title = "Status";
    var idfield = "ID"
    if (StatuslookupData != null && StatuslookupData.length == 0) {
        StatuslookupData = ShowCommonLookup(urlStatusList, actionParameters, columns, "Status", idfield, title, null);
    }
    else {
        DisplayLookupWithExistingData(columns, "Status", idfield, title, null, StatuslookupData)
    }
}
var cell
var row;
var seldata;
var idfield = "BookoutId";
var selectedvalue;

function FilterGridRowCount(grid, dataView, gridContainerDiv) {
    dataView.onRowCountChanged.subscribe(function (e, args) {
        clearAllMessages();
        grid.updateRowCount();
        grid.render();
        var row = 0;
        if (grid.getSelectedRows() != null) {
            row = grid.getSelectedRows()[0];
        }
        if ((row == null))
            row = 0;
        if (row > dataView.getLength()) {
            row = 0;
            grid.setActiveCell(0, 0);
            grid.editActiveCell();
            grid.render();
        }
        if (dataView.getLength() > 0) {
            setfooter(gridContainerDiv, (row + 1), dataView.getLength());
            $('#btnSave').prop("disabled", false);
            $('#btnViewBookingHistory').prop("disabled", false);
            $('#btnPrint').prop("disabled", false);
            $("#btnSave").attr("class", "inputButton");
            $("#btnViewBookingHistory").attr("class", "inputButton");
            $("#btnPrint").attr("class", "inputButton");
        }
        else {
            setfooter(gridContainerDiv, 0, dataView.getLength());
            $('#btnSave').prop("disabled", true);
            $('#btnViewBookingHistory').prop("disabled", true);
            $('#btnPrint').prop("disabled", true);
            $("#btnSave").attr("class", "inputButtonDisable");
            $("#btnViewBookingHistory").attr("class", "inputButtonDisable");
            $("#btnPrint").attr("class", "inputButtonDisable");
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

function Gridfilter(item) {
    for (var columnId in columnFilters) {
        if (columnId !== undefined && columnFilters[columnId] !== "") {
            var c = grid.getColumns()[grid.getColumnIndex(columnId)];
            if (typeof item[c.field] == "string") {
                item[c.field] = item[c.field].toUpperCase();
            }
            if (typeof columnFilters[columnId] == "string") {
                columnFilters[columnId] = columnFilters[columnId].toUpperCase();

            }
            //if not type casted to string, number filtering will throw error
            if (String(item[c.field]).indexOf(columnFilters[columnId]) != 0) {
                return false;
            }
        }
    }
    return true;
}

function DisplaygridBookOut(data) {

    var isEnterKeyPress = false;
    BookIngridWidth = $(gridContainerDiv).width();
    $(gridContainerDiv).css({ "width": BookIngridWidth + "px", "height": BookIngridHeight });
    dataView = new Slick.Data.DataView();
    grid = new Slick.Grid(gridContainerDiv, dataView, columnsgridBookOut, options);
    if (viewableColumnsgridBookOut != null) {
        grid.setColumns(viewableColumnsgridBookOut);
    }
    grid.setSelectionModel(new Slick.RowSelectionModel());
    if (data.length == 0) {
        data = [];
        setfooter(gridContainerDiv, 0, 0);
    }
    else {
        selectedvalue = data[0.0][idfield];
        if (selectedvalue != null) {
            var rows = [];
            rows.push(0);
            grid.setSelectedRows(rows);
            setfooter(gridContainerDiv, 1, data.length - 1);
        }
    }

    grid.onClick.subscribe(function (e, args) {
        clearAllMessages();
        cell = grid.getCellFromEvent(e);
        row = cell.row;
        seldata = dataView.getItem(row);
        selectedCol = grid.getColumns()[cell.cell].id;
        changedrow = args.row;
        MaterialID = dataView.getItem(row).MaterialID;
        setfooter(gridContainerDiv, (row + 1), grid.getData().getLength());
    });

    grid.onSort.subscribe(function (e, args) {
        clearAllMessages();
        Remove_Addrow();
        SortGrid(args, dataView);
        Create_Addrow();

        grid.setActiveCell(0, 2);
        grid.editActiveCell();
    });


    FilterGridRowCount(grid, dataView, gridContainerDiv)
    //FilterGrid(grid, dataView);

    grid.onKeyDown.subscribe(function (e, args) {
        if (e.keyCode == 120) {
            selrow = args.row;
            gitems = dataView.getItem(selrow);
            if (grid.getColumns()[args.cell].id == "Status")
                LoadStatusLookup(grid);
        }

    });



    var beforeeditorvalue;

    grid.onBeforeEditCell.subscribe(function (e, args) {

        beforeeditorvalue = args.item[args.column.field];

    });


    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
        currenteditorvalue = args.editor.getValue().toUpperCase();
    });

    grid.onCellChange.subscribe(function (e, args) {

        if (beforeeditorvalue != currenteditorvalue) {
            isDataUpdated = true;
        }
        beforeeditorvalue = "";
        currenteditorvalue = "";

        //                if (changedrow > 0) {
        //                   AddToBasket(data[changedrow], "Modified");
        //                }
    });


    grid.onSelectedRowsChanged.subscribe(function (e, args) {


        // execute change row code only when row really changes ( Limitation of Slickgrid)
        //commented by ravi : on cell change if value is updated and move to next cell then value should move to 
        //Add to basket because of this code Add to basket calls only when row chagnes.
        //        if (grid.getSelectedRows()[0] == previousRow) {
        //            return;
        //        }
        //        else {
        //            previousRow = grid.getSelectedRows()[0];
        //        }
        // setfooter(gridContainerDiv, previousRow, data.length - 1);

        if (grid.getActiveCell() != null) {
            if (changedrow > -1) {
                MaterialID = dataView.getItem(grid.getActiveCell().row).MaterialID;
                //MaterialID = data[grid.getActiveCell().row].MaterialID;
                seldata = dataView.getItem(grid.getActiveCell().row);
            }

            if ((changedrow > -1) && (isDataUpdated == true)) {
                // data[changedrow].Date = currentDate;
                // AddToBasket(data[changedrow], "Modified");
                seldata.Date = currentDate;
                AddToBasket(seldata, "Modified");
                changedrow = -1;
                isDataUpdated = false;
            }
        }

        //setfooter(gridContainerDiv, 1, data.length - 1);
        //        if((grid.getActiveCell().row>0 ) && (changedrow != grid.getActiveCell().row))
        //        {
        //        isEnterKeyPress = false;
        //        setfooter(gridContainerDiv,grid.getActiveCell().row, data.length - 1);
        //        changedrow=-1;
        //          AddToBasket(data[changedrow], "Modified");
        //        }

        /*
        if (isEnterKeyPress && (grid.getActiveCell() != null) && (grid.getActiveCell().row == 1 && grid.getActiveCell().cell == 0)) {
        isEnterKeyPress = false;
        grid.setActiveCell(0, 0);
        grid.editActiveCell();
        grid.render();
        }


        if ((grid.getActiveCell() != null) && (changedrow > -1) && (changedrow != grid.getActiveCell().row)) {
        if (changedrow == 0) {
        data[changedrow].SupplierCommunicationID = newrowids;
        data.splice(1, 0, data[changedrow]);
        AddToBasket(data[changedrow], "Added");
        newrowids = newrowids - 1;

        //	var item = { SuppplierID: "",
        //        MaterialID: "",
        //        MaterialName: "Add new row.",
        //        MaterialType: "",
        //        MaterialTypeID: "",
        //        SupplierCopyType: "",
        //        SupplierCopyTypeID: "",
        //        ReceiptNo: "",
        //        LibraryID: "",
        //        LibraryName: "",
        //        StatusID: "",
        //        Status: "",
        //        GivenBy: "",
        //Storage: "BOX 1",
        //        AcceptRejectStatusID: "",
        //        AcceptRejectStatus: "",
        //        Date: currentDate,
        //        Comments: ""
        //    };


        //for dev
        var item = { SuppplierID: "SUP 1",
        MaterialID: "",
        MaterialName: "Add new row.",
        MaterialType: "HDD",
        MaterialTypeID: "",
        SupplierCopyType: "SUPP",
        SupplierCopyTypeID: "",
        ReceiptNo: "",
        LibraryID: "",
        LibraryName: "KENLIB",
        StatusID: "",
        Status: "RSA",
        GivenBy: "",
        Storage: "BOX 1",
        AcceptRejectStatusID: "",
        AcceptRejectStatus: "",
        Date: currentDate,
        Comments: ""
        };


        data[0] = item;
        dataView.refresh();
        grid.setActiveCell(0, 1);
        grid.editActiveCell();
        grid.setActiveCell(0, 0);
        grid.editActiveCell();
        grid.render();

        }
        else if (changedrow > 0) {
        var status = "";
        if (data[changedrow].SupplierCommunicationID < 0)
        status = "Added";
        else
        status = "Modified";
        AddToBasket(data[changedrow], status);
        grid.focus();

        }
        changedrow = -1;
        setfooter(gridContainerDiv, data.length - 1);
        }
        */
    });

    grid.onValidationError.subscribe(function (e, args) {

        var validationResult = args.validationResults;
        activeCellNode = args.cellNode;
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
    // //debugger;
    grid.init();
    dataView.beginUpdate();
    dataView.setItems(data, 'MaterialID');
    //   dataView.setFilter(filter);
    dataView.setFilter(Gridfilter);
    dataView.endUpdate();
    var rows = [];
    rows.push(0);
    grid.setSelectedRows(rows);
    grid.setActiveCell(0, 1);
    if (dataView.getLength() > 0) {
        setfooter(gridContainerDiv, 1, dataView.getLength());
        $('#btnSave').prop("disabled", false);
        $('#btnViewBookingHistory').prop("disabled", false);
        $('#btnPrint').prop("disabled", false);
        $("#btnSave").attr("class", "inputButton");
        $("#btnViewBookingHistory").attr("class", "inputButton");
        $("#btnPrint").attr("class", "inputButton");
    }
    else {
        setfooter(gridContainerDiv, 0, dataView.getLength());
        $('#btnSave').prop("disabled", true);
        $('#btnViewBookingHistory').prop("disabled", true);
        $('#btnPrint').prop("disabled", true);
        $("#btnSave").attr("class", "inputButtonDisable");
        $("#btnViewBookingHistory").attr("class", "inputButtonDisable");
        $("#btnPrint").attr("class", "inputButtonDisable");

    }

    if (data.length > 0) {
        MaterialID = data[0].MaterialID;
        seldata = data[0];
    }
}

function Remove_Addrow() {
    dataView.deleteItem("new row");
}

function Create_Addrow() {
    //var item = { "SupplierCommunicationID": "new row", "MaterialID": "Click here to add a new row", "MaterialName": "", "MaterialTypeCodeVal": "", "PersistFlag": "" };

    var item = { SuppplierID: "",
        MaterialID: "",
        MaterialName: "",
        MaterialType: "",
        MaterialTypeID: "",
        SupplierCopyType: "",
        SupplierCopyTypeID: "",
        ReceiptNo: "",
        LibraryID: "",
        LibraryName: "",
        StatusID: "",
        Status: "",
        GivenBy: "",
        Storage: "",
        AcceptRejectStatusID: "",
        AcceptRejectStatus: "",
        Date: currentDate,
        Comments: ""
    };


    dataView.insertItem(0, item);
};


function GetNextMaterialID(item) {
    return newrowids = newrowids - 1;
}

function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
    ////debugger;
    if (SelectedRowData != null) {
        if (lookupInvokerControl == "txtMaterialID") {
            $("#txtMaterialID").val(SelectedRowData.MaterialId);
            $("#txtMaterialID").focus();
            return;
        }

        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());

        if (lookupInvokerControl == "Status") {
            gitems.Status = SelectedRowData.ID;
            if (seldata != null) {
                AddToBasket(seldata, "Modified");
            }
        }
        grid.invalidate();
        grid.focus();
    }
};

function SaveBookOutDetail() {
    // //debugger; 

    if (grid.getActiveCell() != null) {
        if (grid.getDataLength() > 0) {
            var ActiveRow = grid.getActiveCell().row;
            var Activecell = grid.getActiveCell().cell;
            if (Activecell == 7) {
                grid.gotoCell(ActiveRow, 8, true);
            }
            else {
                grid.gotoCell(ActiveRow, 7, true);
            }
        }
    }

    var libraryBookOutData = {
        BookOutVO: UpData
    };
    if (libraryBookOutData.BookOutVO.length == 0) {
        showMessage("No data for updation.", "information");
    }
    else {
        $.ajax({
            url: urlSaveBookOutDetail,
            type: "POST",
            data: JSON.stringify(libraryBookOutData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    //debugger;
                    //LoadgridBookOut();
                    var updatedData = [];
                    updatedData = data.LibraryList;
                    if (updatedData.length > 0) {
                        showMessage("Data modified successfully.", "information");
                        loadUPdatedBookout();
                        UpData = [];
                    }
                    //                    var Message = "<br/>" + data.Message.Message;
                    //                    if (data.Message.Type == 0) {
                    //                        noty({ text: Message, type: 'Information', dismissQueue: true,
                    //                            layout: 'bottom', theme: 'defaultTheme'
                    //                        });
                    //                    }
                    //                    else if (data.Message.Type == 1) {
                    //                        noty({ text: Message, type: 'warning', dismissQueue: true,
                    //                            layout: 'bottom', theme: 'defaultTheme'
                    //                        });
                    //                    }
                    //                    else if (data.Message.Type == 2) {
                    //                        noty({ text: Message, type: 'error', dismissQueue: true,
                    //                            layout: 'bottom', theme: 'defaultTheme'
                    //                        });
                    //                    }
                }
            },
            error: function (x, e) {
                if (x.status == 0) {
                    noty({ text: 'You are offline!!\n Please Check Your Network.', type: 'error', dismissQueue: true,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                } else if (x.status == 404) {
                    noty({ text: 'Requested URL not found.', type: 'error', dismissQueue: true,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                } else if (x.status == 500) {
                    noty({ text: 'Internel Server Error.', type: 'error', dismissQueue: true,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                } else if (e == 'parsererror') {
                    noty({ text: 'Error.\nParsing JSON Request failed.', type: 'error', dismissQueue: true,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                } else if (e == 'timeout') {
                    noty({ text: 'Request Time out.', type: 'error', dismissQueue: true,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                } else {
                    noty({ text: 'Unknow Error.\n' + x.responseText, type: 'error', dismissQueue: true,
                        layout: 'bottom', theme: 'defaultTheme'
                    });
                }
            }
        });
    }
}


function AddToBasket(item, status, index) {
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


            if (UpData[i]["MaterialID"] == item["MaterialID"]) {
                //                if (UpData[i]["PersistFlag"] == "Added") {
                //                    isNewItem = 1;
                //                }
                UpData.splice(i, 1);
            }
        }
        //        if (isNewItem) {
        //            item1 = { "PersistFlag": "Added" };
        //        }
        //        else {
        item1 = { "PersistFlag": status };
        //       }
        $.extend(item, item1);
        UpData.push(item);
    }
    //   console.log(JSON.stringify(UpData));
    // Just to check record in alert
}

/* validators*/

function MaterialValidator(value) {
    var no;
    var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select Material Code." };
    }

    if (materialListForValidation.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            cache: false,
            url: GetMaterialListActionURL,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    materialListForValidation = data.MaterialList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                alert("error fetching Material list.");
            }
        });
    }

    if ((materialListForValidation == null))
        materialListForValidation = [];
    if ((materialListForValidation != null) && materialListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < materialListForValidation.length; i++) {
            if (value == materialListForValidation[i].MaterialId) {
                isValidValue = true;
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Material Code." };
        }
    }
};


function SupplierValidator(value) {

    var no;
    var enteredVal = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select Supplier." };
    }

    if (SupplierListForValidation.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            cache: false,
            url: urlSupplierListforValidation,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    SupplierListForValidation = data.lookupList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                alert("error fetching Supplier list.");
            }
        });
    }
    if ((SupplierListForValidation == null))
        SupplierListForValidation = [];
    if ((SupplierListForValidation != null) && SupplierListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < SupplierListForValidation.length; i++) {
            if (enteredVal == SupplierListForValidation[i].ComShortName) {
                isValidValue = true;
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Supplier." };
        }
        else {
            return { valid: true, msg: null };
        }
    }
};


function StatusValidator(value) {
    var no;
    var enteredVal = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select Status" };
    }

    if (StatusListForValidation.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            url: urlStatusListforValidation,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    StatusListForValidation = data;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                alert("error fetching status.");
            }
        });
    }

    if ((StatusListForValidation == null))
        StatusListForValidation = [];
    if ((StatusListForValidation != null) && StatusListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < StatusListForValidation.length; i++) {
            if (enteredVal == StatusListForValidation[i].ID) {
                isValidValue = true;
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Status" };
        }
        else {
            return { valid: true, msg: null };
        }
    }
};

function NumberValidationMethod(value) {
    if (value == null || value == undefined || isNaN(value)) {
        return { valid: false, msg: "Please enter a valid integer" };
    }
    else {
        return { valid: true, msg: null };
    }
}
function validateRow(grid, rowIdx) {
    $.each(grid.getColumns(), function (colIdx, column) {
        // iterate through editable cells
        //////debugger;
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
function loadUPdatedBookout() {

    var MaterialID = $.trim($("#txtMaterialID").val());
    var MaterialName = $.trim($("#MaterialName").val());
    var ReceiptNo = $.trim($("#ReceiptNo").val());
    var Supplier = $("#Supplier").val();
    var DispatchNo = $.trim($("#DispatchNo").val());
    gridBookOutActionParameters = {
        MaterialID: MaterialID,
        MaterialName: MaterialName,
        ReceiptNo: ReceiptNo,
        DispatchNo: DispatchNo,
        Supplier: Supplier
    };
    ShowProgressBar();
    $.ajax({
        url: urlBookOutDetail,
        type: "GET",
        dataType: 'Json',
        async: false,
        cache: false,
        data: gridBookOutActionParameters,
        success: function (data) {

            DisplaygridBookOut(data);
            $("#btnSave").attr("class", "inputButton");
            $("#btnViewBookingHistory").attr("class", "inputButton");
            $("#btnPrint").attr("class", "inputButton");

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


/* Extras*/


//Region : View Booking History
function SetgridBookingHistory() {
    //debugger;
    gridBookingHistoryContainer = "#gridBookingHistoryContainer";

    gridBookingHistorycolumns = [
                             { id: "MaterialID", name: "Material ID", field: "MaterialID" },
                             { id: "MaterialName", name: "Material Name", field: "MaterialName", editor: Slick.Editors.Text },
                                { id: "MaterialType", name: "Material Type", field: "MaterialType", editor: Slick.Editors.Text },
                                 { id: "LibId", name: "Library Name", field: "LibId", editor: Slick.Editors.Text },
                                { id: "LibraryName", name: "Library Name", field: "LibraryName", editor: Slick.Editors.Text },
                                { id: "Status", name: "Status", field: "Status", editor: Slick.Editors.Text },
                                { id: "ByUser", name: "Given By", field: "ByUser", editor: Slick.Editors.Text },
                                { id: "ToUser", name: "Given To", field: "ToUser", editor: Slick.Editors.Text },
                                 { id: "CreatedDate", name: "Created Date", field: "CreatedDate" }
                          ];

    gridBookingHistoryviewableColumns = [
                             { id: "MaterialID", name: "Material ID", field: "MaterialID" },
                             { id: "MaterialName", name: "Material Name", field: "MaterialName" },
                                { id: "MaterialType", name: "Material Type", field: "MaterialType" },
                                { id: "LibraryName", name: "Library Name", field: "LibraryName" },
                                { id: "Status", name: "Status", field: "Status" },
                                { id: "ByUser", name: "Given By", field: "ByUser" },
                                { id: "ToUser", name: "Given To", field: "ToUser" },
                                 { id: "CreatedDate", name: "Created Date", field: "CreatedDate" }
                          ];

    gridBookingHistoryoptions =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: false,
            editable: false,
            asyncEditorLoading: false,
            autoEdit: false,
            showHeaderRow: true,
            explicitInitialization: true
        };

    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    gridBookingHistoryidfield = 'MaterialID';
    gridBookingHistoryWidth = $(gridBookingHistoryContainer).width();
    gridBookingHistoryHeight = 500;
}

//Method to get history details of selected material.

//function LoadBookingHistoryData() {

//    var actionParameters = {
//        MaterialID: MaterialID
//    }
//    $.ajax({
//        url: urlLoadBookingHistory,
//        type: "GET",
//        dataType: 'Json',
//        cache: false,
//        async: false,
//        data: actionParameters,
//        success: function (data) {
//            DisplayGridBookingHistory(data);
//        },
//        error: function () {
//            alert("error fetching data.Please try again");
//            RemoveProgressBar();
//        }
//    });
//}

//Method to bind history data with grid.

function DisplayGridBookingHistory(data) {

    var colFilters = {};

    gridBookingHistoryWidth = $(gridBookingHistoryContainer).width();

    $(gridBookingHistoryContainer).dialog(
    {
        autoOpen: false,
        modal: true,
        resizable: false,
        closeOnEscape: false,
        height: gridBookingHistoryHeight + 50,
        width: gridBookingHistoryWidth + 15,
        title: "Booking History",
        open: function (event, ui) {

            SetNonStandardDialogStyles();

            //                if (data.length == 0) {
            //                    data = [];
            //                    setfooter(gridBookingHistoryContainer, 0, data.length);
            //                }
            //                else {
            //                    setfooter(gridBookingHistoryContainer, 1, data.length);
            //                }
            //                RemoveProgressBar();
            //                var grid;
            //                var myData = [];
            //                $(gridBookingHistoryContainer).css({ "width": gridBookingHistoryWidth + "px", "height": gridBookingHistoryHeight });
            //                myData = data;
            //                var totalrecord;
            //                grid = new Slick.Grid(gridBookingHistoryContainer, data, gridBookingHistorycolumns, gridBookingHistoryoptions);
            //                dataview = new Slick.Data.DataView();
            //                grid.setSelectionModel(new Slick.RowSelectionModel());
            //                var rows = [];
            //                rows.push(0);
            //                grid.setSelectedRows(rows);
            //                grid.setColumns(gridBookingHistoryviewableColumns);
            //                grid.onClick.subscribe(function (e, args) {
            //                    var cell = grid.getCellFromEvent(e);
            //                    var row = cell.row;
            //                    setfooter(gridBookingHistory, (row + 1), data.length);
            //                });

            $(gridBookingHistoryContainer).css({ "width": gridBookingHistoryWidth + "px", "height": gridBookingHistoryHeight });
            dataview = new Slick.Data.DataView();
            gridBookingHistory = new Slick.Grid(gridBookingHistoryContainer, dataview, gridBookingHistorycolumns, gridBookingHistoryoptions);
            gridBookingHistory.setSelectionModel(new Slick.RowSelectionModel());
            gridBookingHistory.setColumns(gridBookingHistoryviewableColumns);

            if (data.length == 0) {
                data = [];
                setfooter(gridBookingHistoryContainer, 0, 0);
            }
            else {
                setfooter(gridBookingHistoryContainer, 1, data.length - 1);
            }

            gridBookingHistory.onSort.subscribe(function (e, args) {
                //                Remove_gridStorageAddrow();
                //                SortGrid(args, dataview);
                //                Create_gridStorageAddrow();
                //                gridBookingHistory.setActiveCell(0, 2);
                //                gridBookingHistory.editActiveCell();
            });

            FilterGridWithRowCount(gridBookingHistory, dataview, gridBookingHistoryContainer);

//            dataview.onRowCountChanged.subscribe(function (e, args) {
//                gridBookingHistory.updateRowCount();
//                gridBookingHistory.render();
//            });

//            dataview.onRowsChanged.subscribe(function (e, args) {
//                gridBookingHistory.invalidateRows(args.rows);
//                gridBookingHistory.render();
//            });

//            $(gridBookingHistory.getHeaderRow()).delegate(":input", "change keyup", function (e) {
//                var columnId = $(this).data("columnId");
//                if (columnId != null) {
//                    colFilters[columnId] = $.trim($(this).val());
//                    dataview.refresh();
//                }
//            });


//            gridBookingHistory.onHeaderRowCellRendered.subscribe(function (e, args) {
//                $(args.node).empty();
//                $("<input type='text'>")
//                           .data("columnId", args.column.id)
//                           .val(colFilters[args.column.id])
//                           .appendTo(args.node);
//            });

            gridBookingHistory.onClick.subscribe(function (e, args) {
                clearAllMessages();
                var cell = gridBookingHistory.getCellFromEvent(e);
                var row = cell.row;
                //gridStoragechangedrow = cell.row;
            });

            gridBookingHistory.init();

            dataview.beginUpdate();
            dataview.setItems(data, 'MaterialID');
            dataview.setFilter(GridOBHfilter);
            dataview.endUpdate();
            setfooter(gridBookingHistoryContainer, 0, 0);

            var rows = [];
            rows.push(0);
            gridBookingHistory.setSelectedRows(rows);

            setfooter(gridBookingHistoryContainer, 0, data.length - 1);

            gridBookingHistory.focus();
            RemoveProgressBar();
        },


        close: function () {
            //$(this).dialog("close");
        }
    });

    $(gridBookingHistoryContainer).dialog("open");
}

function GridOBHfilter(item) {
    for (var columnId in columnFilters) {
        if (columnId !== undefined && columnFilters[columnId] !== "") {
            var c = gridBookingHistory.getColumns()[gridBookingHistory.getColumnIndex(columnId)];
            if (typeof item[c.field] == "string") {
                item[c.field] = item[c.field].toUpperCase();
            }
            if (typeof columnFilters[columnId] == "string") {
                columnFilters[columnId] = columnFilters[columnId].toUpperCase();

            }
            //if not type casted to string, number filtering will throw error
            if (String(item[c.field]).indexOf(columnFilters[columnId]) != 0) {
                return false;
            }
        }
    }
    return true;
}

//function DisplayGridBookingHistory(data) {
//    if (data.length == 0) {
//        data = [];
//        setfooter(gridBookingHistory, 0, data.length);
//    }
//    else {
//        setfooter(gridBookingHistory, 1, data.length);
//    }
//    RemoveProgressBar();
//    var gridBookingHistory;
//    var myData = [];
//    $(gridBookingHistory).css({ "width": gridBookingHistoryWidth + "px", "height": gridBookingHistoryHeight });
//    myData = data;
//    var totalrecord;
//    grid = new Slick.Grid(gridBookingHistory, data, gridBookingHistorycolumns, gridBookingHistoryoptions);
//    dataview = new Slick.Data.DataView();
//    grid.setSelectionModel(new Slick.RowSelectionModel());
//    var rows = [];
//    rows.push(0);
//    grid.setSelectedRows(rows);
//    grid.setColumns(gridBookingHistoryviewableColumns);
//    grid.onClick.subscribe(function (e, args) {
//        var cell = grid.getCellFromEvent(e);
//        var row = cell.row;
//        setfooter(gridBookingHistory, (row + 1), data.length);
//    });
//}

//Start Region:Print Acceptance by Suplier.
//Method to get programme details of selected material.

var displaydata;
function loadMaterialdata(MaterialID) {
    var actionParameters = {
        MaterialID: MaterialID
    }
    $.ajax({
        url: urlmaterialDetail,
        type: "GET",
        dataType: 'Json',
        cache: false,
        async: false,
        data: actionParameters,
        success: function (data) {
            titledata = data;
        },
        error: function () {
            alert("error fetching data.Please try again");
            RemoveProgressBar();
        }
    });
}

//Method for print acceptance by suuplier.

var titledata = [];
var programmetitledata = [];
function btnPrint_click() {
    if (grid.getActiveCell() != null) {
        MaterialID = dataView.getItem(grid.getActiveCell().row).MaterialID;
    }
    if (MaterialID == null) {
        clearAllMessages();
        showMessage("Plase select row.", "error");
    }
    else {
        ////debugger;
        displaydata = seldata;
        loadMaterialdata(MaterialID);
        programmetitledata = titledata;
        $('#PrintAcceptancePopup').load(urlprintAcc);
        $("#PrintAcceptancePopup").dialog({
            autoOpen: false,
            height: 500,
            width: 800,
            modal: true,
            title: "Return For Material Received",
            open: function (event, ui) {
                $('#PrintAcceptancePopup').css({ "width": "900px", "height": "400px" });
                //dialoghandler = $(this);
            },
            close: function () {
            }
        });
        $("#PrintAcceptancePopup").dialog("open");
    }
}

// Method to call print action.

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