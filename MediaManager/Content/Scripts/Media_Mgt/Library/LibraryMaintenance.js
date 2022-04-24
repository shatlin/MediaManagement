var isValidRow = -1;
var previousRow = 0;
var LocationComboInstance = 0;
var columnstylealreadyset = 0;
var UpData = [];
//var CurComboVal;
//var CurComboText;
var selectedCol;
var SelectedUrl = "";
var selectedVal = "";
var ColumnName = "";
var LibraryID = "";
var LibraryName = "";
var CountryVal; var LibraryTypeVal; var StorageVal;
//Global Variable Declaration
var grid;
var gridLibrary;
var gridLibrarycolumns = [];
var gridLibraryviewableColumns = [];
var gridLibraryoptions = [];
var gridLibraryactionParameters;
var gridLibraryidfield;
var gridLibraryWidth;
var gridLibraryHeight;
var dataView;
var changedrow = -1;
var newLibDtlList = [];
var emptyrow = [];
var LibDtlList = [];
var newrowids = -1;
var columnFilters = {};
var gridViewUserData = [];
var gridLibrarySearchData = [];
var gridLibraryviewableColumnsNonEdit = [];
//grid librarystoragedetail
var gridViewStorageDtl;
var gridViewStorageDtlcolumns = [];
var gridViewStorageDtlviewableColumns = [];
var gridViewStorageDtloptions = [];
var gridViewStorageDtlactionParameters;
var gridViewStorageDtlidfield;
var gridViewStorageDtlWidth;
var gridViewStorageDtlHeight;
var dataViewStorageDtl;
var gridViewStorageSearchData = [];
var selrowgridStorage;
var gitemsgridStorage;
var gridStoragechangedrow = -1;
var gridStoragePreviousRow = 0;
var gridStorageselectedCol;
var StorageTypeID;
var maxBoxTypeStorage = null;
var maxSelfTypeStorage = null;
var UpDataStorageDtl = [];
var isDataUpdated = false;
var gitems;
var selrow;
var curRow;
var valid_result = true;
var locationListForValidation = [];
var gridStorageDtl;
var toDate = new Date();
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
toDate = toDate.getDate() + '-' + month[toDate.getMonth()] + '-' + toDate.getFullYear();
//Load Event
//var ComboList;
var LocationList;
//var userName = "";
//var password = "";
var errorMessagePanel;

function performsearch() {
    ////// //debugger;;
    LibraryID = $.trim($("#LibraryID").val());
    LibraryName = $.trim($("#LibraryName").val());


    if (LibraryID.length == 0 && LibraryName.length == 0 && $("#Location").val() == "") {

        $.noty.closeAll();
        noty({
            text: 'No search criteria has been selected. Do you want to see all the records from the system ?',
            modal: true,
            type: 'alert',
            buttons: [
    { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
        $noty.close();
        SearchResults();
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
        SearchResults();
    }

    UpData = [];
}
$(function () {


    //BindLocationList();
    SetgridLibrary();
    DisplayLibraryDetail("");
    $("#btnSearch").click(function (event) {

        clearAllMessages();
        DisplayLibraryDetail("");
        performsearch();

    });

    $("#btnViewStorageDtl").click(function (event) {
        clearAllMessages();
        if (grid.getActiveCell() != null) {
            LibraryID = dataView.getItem(grid.getActiveCell().row).LibraryID;
            LibraryName = dataView.getItem(grid.getActiveCell().row).LibraryName;
        }
        if (LibraryID.length == 0) {
            
            showMessage('Please select Library', 'warning');

            return;
        }

        UpDataStorageDtl = [];
        ShowStorageLookup();
    });

    $("#btnSaveLibraryDetail").click(function (event) {
        clearAllMessages();
        if (IsValidLibraryData()) {
            SaveResults();
        }
    });

    var isValidLibDetail = true;
    function IsValidLibraryData() {

        if (UpData.length > 0) {
            for (var index = 0; index < UpData.length; index++) {
                if (UpData[index].LibraryName.trim() == "Click here to add a new row") {
                    isValidLibDetail = false;
                    showMessage('Library Name is invalid.', 'error');
                    return isValidLibDetail;
                }
                if (UpData[index].LibraryName.trim() == "") {
                    isValidLibDetail = false;
                    showMessage('Library Name is required.', 'error');
                    return isValidLibDetail;
                }
                if (UpData[index].Location.trim() == "") {
                    isValidLibDetail = false;
                    showMessage('Location is required.', 'error');
                    return isValidLibDetail;
                }
            }
        }
        return isValidLibDetail;
    };

    $("#btnManageLibUserDetail").click(function (event) {
        clearAllMessages();
        if (grid.getActiveCell() != null) {
            LibraryID = dataView.getItem(grid.getActiveCell().row).LibraryID;
        }
        if (LibraryID.length == 0) {
            showMessage('Please select Library', 'warning');
            return;
        }

        UpDataUserDtl = [];
           
        ShowUsersLookup();
    });


    $("#btnReset").click(function (event) {
    if (grid.getEditorLock().isActive())
                    grid.getEditorLock().deactivate(grid.getEditController());

        clearAllMessages();
        $("#LibraryID").val("");
        $("#LibraryName").val("");
        $('#Location option').first().prop('selected', true);
        DisplayLibraryDetail("");
        UpData = [];
    });

    shortcut.add("F7", function () {
        clearAllMessages();
        ResetControls();

    });

    shortcut.add("F10", function () {
        clearAllMessages();
        if (IsValidLibraryData()) {
            SaveResults();
        }

    });

    shortcut.add("F8", function () {
        clearAllMessages();
        performsearch();

    });

    SelectedUrl = actionUrlLocationList;
    LocationList = GetLocationList(SelectedUrl);

});


var resetflag = 0;
var libraryidsearchvalue;
var librarynamesearchvalue;
var locationsearchvalue;

function ResetControls() {
    if (resetflag == 0) {
        libraryidsearchvalue = $("#LibraryID").val();
        $("#LibraryID").val("");
        librarynamesearchvalue = $("#LibraryName").val();
        $("#LibraryName").val("");
        locationsearchvalue = $("#Location").val();
        $("#Location").val("");
        DisplayLibraryDetail("");
        resetflag = 1;
    }
    else if (resetflag == 1) {


        $("#LibraryID").val(libraryidsearchvalue);
        $("#LibraryName").val(librarynamesearchvalue);
        $("#Location").val(locationsearchvalue);
        resetflag = 0;
    }
};


function GetLocationList(SelectedUrl) {
    var LocList;

    $.ajax({
        type: "GET",
        url: SelectedUrl,
        data: "{}",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            LocList = data;

        }
    });

    return LocList;
}


var LocId = "";
//Region : Validators
function LocationValidator(value) {

    //// ////debugger;;
    var no;
    var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select location." };
    }

    if (locationListForValidation.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            url: actionUrlLocationListforValidation,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    locationListForValidation = data.lookupList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                //  $.noty.closeAll();
                //noty({ text: 'error fetching Location for validation', layout: 'bottom' });
                showMessage('error fetching Location for validation.', 'error');


            }
        });
    }

    if ((locationListForValidation == null))
        locationListForValidation = [];
    if ((locationListForValidation != null) && locationListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < locationListForValidation.length; i++) {
            if (value.toUpperCase() == locationListForValidation[i].Val.toUpperCase()) {
                LocId = locationListForValidation[i].ID;
                isValidValue = true;
                return { valid: true, msg: null };
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Location Name." };
        }




    }
}




var StorageTypeListForValidation = [];
var StorageTypeID = "";
function StorageTypeValidator(value) {

    //
    var no;
    var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select Storage Type." };
    }

    if (StorageTypeListForValidation.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            url: actionUrlStorageTypeListforValidation,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    StorageTypeListForValidation = data.lookupList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                //   $.noty.closeAll();
                //noty({ text: 'error fetching Storage Type for validation', layout: 'bottom' });
                showMessage('error fetching Storage Type for validation.', 'error');

            }
        });
    }

    if ((StorageTypeListForValidation == null))
        StorageTypeListForValidation = [];
    if ((StorageTypeListForValidation != null) && StorageTypeListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < StorageTypeListForValidation.length; i++) {
            if (value.toUpperCase() == StorageTypeListForValidation[i].Val.toUpperCase()) {
                StorageTypeID = StorageTypeListForValidation[i].ID;
                isValidValue = true;
                return { valid: true, msg: null };
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Storage Type ." };
        }




    }
}

var libraryListForValidation = [];


function LibraryNameValidator(value) {
    var no;
    var enteredLang = value = $.trim(value.toUpperCase());
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select Library." };
    }

    if (libraryListForValidation.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            url: urlLibraryNameListforValidation,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    libraryListForValidation = data.lookupList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                // alert("error fetching Library");
                // noty({ text: 'error fetching Library for validation', layout: 'bottom' });
                showMessage('error fetching Library for validation.', 'error');
            }
        });
    }

    if ((libraryListForValidation == null))
        libraryListForValidation = [];
    if ((libraryListForValidation != null) && libraryListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = true;
        for (var i = 0; i < libraryListForValidation.length; i++) {
            if (value.toUpperCase() == libraryListForValidation[i].ID.toUpperCase()) {
                isValidValue = false;
                //  alert("Library Name Already Exists");
                return { valid: false, msg: "Library Name Already Exists" };

            }
        }

        var griddata = grid.getData().getItems();

        for (var i = 0; i < griddata.length; i++) {
            if (value.toUpperCase() == griddata[i].LibraryName.toUpperCase()) {
                isValidValue = false;
                //  alert("Library Name Already Exists");
                return { valid: false, msg: "Library Name Already Exists" };

            }
        }



        if (isValidValue) {
            return { valid: true, msg: null };
        }




    }
}






function storageValidator(value) {


    var no;
    var enteredLang = value.toUpperCase()
    isValidValue = true;

    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select Storage." };
    }



    var griddata = gridStorageDtl.getData().getItems();

    for (var i = 0; i < griddata.length; i++) {
        if (value.toUpperCase() == griddata[i].Storage.toUpperCase()) {
            isValidValue = false;
            //  alert("Storage Already Exists");
            return { valid: false, msg: "Storage Already Exists" };

        }
    }



    if (isValidValue) {
        return { valid: true, msg: null };
    }

}


function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "This is a required field" };
    }
    else {
        return { valid: true, msg: null };
    }
}

//end of Region : validators
//region Library Search Grid
function SetgridLibrary() {
    gridLibrary = "#gridLibrary";

    gridLibrarycolumns = [
                             { id: "LibraryID", name: "Library ID", field: "LibraryID" },
                             { id: "LibraryName", name: "Library Name", field: "LibraryName", editor: Slick.Editors.Text, validator: requiredFieldValidator },
                                { id: "Location", name: "Location", field: "Location", editor: Slick.Editors.Text },
                                { id: "LocationID", name: "LocationID", field: "LocationID" },
                                 { id: "CreatedDate", name: "Date", field: "CreatedDate" }
                          ];

    gridLibraryviewableColumns = [
                            { id: "LibraryID", name: "Library ID", field: "LibraryID", cssClass: "NonEditable" },
                             { id: "LibraryName", name: "Library Name", field: "LibraryName", editor: Slick.Editors.Text, validator: LibraryNameValidator },
                                { id: "Location", name: "Location", field: "Location", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: LocationValidator },
                                 { id: "CreatedDate", name: "Date", field: "CreatedDate", cssClass: "NonEditable" }
                          ];

    gridLibraryviewableColumnsNonEdit = [
                            { id: "LibraryID", name: "Library ID", field: "LibraryID", cssClass: "NonEditable" },
                             { id: "LibraryName", name: "Library Name", field: "LibraryName", editor: Slick.Editors.Text, validator: LibraryNameValidator },
                                { id: "Location", name: "Location", field: "Location", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: LocationValidator },
                                 { id: "CreatedDate", name: "Date", field: "CreatedDate", cssClass: "NonEditable" }
                          ];

    gridLibraryoptions =
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





    gridLibraryactionParameters = {
        //ProgrammeSearchTitle: $("#ProgrammeSearchTitle").val()
    };

    gridLibraryidfield = 'LibraryID';
    gridLibraryWidth = 600;
    gridLibraryHeight = 400;

    //    var emptyLibraryDetails = [];
    //    emptyLibraryDetails[0] = { LibraryID: "Click to Add new row.",
    //        LibraryName: "",
    //        Location: "",
    //        LocationID: "",
    //CreatedDate: ""
    //    };
    //    DisplayLibraryDetail(emptyLibraryDetails);
    //selected dmNumber from the grid will be available in the global variable 'selectedvalue'  
};

function SearchResults() {
    var libraryID = $.trim($("#LibraryID").val());
    var location = $.trim($("#Location").val());
    var libraryname = $.trim($("#LibraryName").val());
    var gridLibraryActionPara = {
        LibraryID: libraryID,
        LibraryName: libraryname,
        Location: location
    };
    ShowProgressBar();
    $.ajax({
        url: urlSearchLibraryDetail,
        type: "GET",
        async: false,
        cache: false,
        data: gridLibraryActionPara,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //            if (data.result.length > 0) {
            //                DisplayLibraryDetail(data.result);
            //            }
            //            else if (data.AppMessages.length > 0) {
            //                // DisplayAppMessages(data.AppMessages);
            //            }
            //            else {
            //                showMessage("No matching records found.", 'information');
            //            }
            if (data.result.length == 0 && data.AppMessages.length == 0) {
                showMessage('No matching records found.', 'information');
            }
            if (data != null) {
                DisplayLibraryDetail(data.result);
                DisplayAppMessages(data.AppMessages);
                if (data.result != "")
                    showMessage('Search result completed.', 'information');
            }
            RemoveProgressBar();
        },
        error: function (x, e) {
            if (x.status == 0) {
                //noty({ text: 'You are offline!!\n Please Check Your Network.', layout: 'bottom' });
                showMessage('You are offline!!\n Please Check Your Network.', 'error');

            } else if (x.status == 404) {
                //noty({ text: 'Requested URL not found.', layout: 'bottom' });
                showMessage('Requested URL not found.', 'error');

            } else if (x.status == 500) {
                //noty({ text: 'Internel Server Error.', layout: 'bottom' });
                showMessage('Internel Server Error.', 'error');

            } else if (e == 'parsererror') {
                //noty({ text: 'Error.\nParsing JSON Request failed.', layout: 'bottom' });
                showMessage('Error.\nParsing JSON Request failed.', 'error');

            } else if (e == 'timeout') {
                //noty({ text: 'Request Time out.', layout: 'bottom' });
                showMessage('Request Time out.', 'error');

            } else {
                //noty({ text: 'Unknow Error.\n' + x.responseText, layout: 'bottom' });
                showMessage('Unknow Error.\n' + x.responseText, 'error');

            }
            RemoveProgressBar();
        }
    });
}

function DisplayLibraryDetail(data) {

    var isEnterKeyPress = false;
    gridLibraryWidth = $(gridLibrary).width();
    $(gridLibrary).css({ "width": gridLibraryWidth + "px", "height": gridLibraryHeight });
    dataView = new Slick.Data.DataView();
    grid = new Slick.Grid(gridLibrary, dataView, gridLibrarycolumns, gridLibraryoptions);
    grid.setSelectionModel(new Slick.RowSelectionModel());
    grid.registerPlugin(new Slick.AutoTooltips());
    grid.setColumns(gridLibraryviewableColumns);

    if (data.length == 0) {
        data = [];
        //setfooter(gridLibrary, 0, 0);
        //DisableToggleButton(ToggleButton, true);
    }
    else {
        showMessage("Search result completed.", 'information');
        LibraryID = data[0].LibraryID;
        LibraryName = data[0].LibraryName;
        //setfooter(gridLibrary, 1, data.length - 1);
        //DisableToggleButton(ToggleButton, false);
    }
    //hold grid data
    gridLibrarySearchData = data;



    //    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
    //        if (args.cell == 2) {

    //        }




    //    });


    //     grid.onBeforeEditCell.subscribe(function (e, args) {
    //        if (args.cell == 2) {
    //            ComboList = LocationComboList;
    //            CurComboVal=data[grid.getActiveCell().row].LocationID;
    //            CurComboText=data[grid.getActiveCell().row].Location;
    //          //  alert(CurComboVal);
    //            //CurComboVal=args.item.LocationID;
    //        }




    //    });


    grid.onActiveCellChanged.subscribe(function (e, args) {
        if (grid.getActiveCell() != null) {
            var cell = grid.getActiveCell().cell;
            var row = grid.getActiveCell().row;
            selectedCol = grid.getColumns()[cell].id;
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
            if (grid.getActiveCell() != null && dataView.getItem(grid.getActiveCell().row).LibraryID != "") {
                AddToBasket(dataView.getItem(grid.getActiveCell().row), "Modified");
                isDataUpdated = false;
            }
        }
        beforeeditorvalue = "";
        currenteditorvalue = "";

        changedrow = args.row;
    });

    grid.onSort.subscribe(function (e, args) {
        //alert("In On Sort");
        Remove_Addrow();
        SortGrid(args, dataView);
        Create_Addrow();
        grid.setActiveCell(0, 1);
        grid.editActiveCell();
    });
    FilterGridWithRowCount(grid, dataView, gridLibrary);
    //FilterGrid(grid, dataView);

    grid.onClick.subscribe(function (e, args) {

        clearAllMessages();
        var cell = grid.getCellFromEvent(e);
        var row = cell.row;
        changedrow = args.row;
         setfooter(gridLibrary, row, dataView.getLength());
        //LibraryID = data[cell.row].LibraryID;
        //LibraryName = data[cell.row].LibraryName;
        //        if (row == 0) {
        //            if (data[0].LibraryName == "Click here to add a new row") {
        //                data[0].LibraryID = "";
        //                data[0].LibraryName = "";
        //                // grid.focus();

        //                dataView.refresh();
        //                grid.gotoCell(row, 0, true);
        //                grid.editActiveCell();
        //            }
        //        }

    });

    grid.onKeyDown.subscribe(function (e, args) {
        if (e.keyCode == 120) {
            if (grid.getColumns()[args.cell].id == "Location") {
                if (grid.getEditorLock().isActive())
                    grid.getEditorLock().deactivate(grid.getEditController());
                var lookupcolumns = [
                                { id: "ID", width: 900, name: "Location ID", field: "ID" },
                                { id: "Val", width: 900, name: "Location Name", field: "Val" }
                         ];
                selrow = args.row;
                gitems = dataView.getItem(selrow);
                //ShowLookupForGridLibrary(actionUrlLocationList, "{}", lookupcolumns, "Location", "ID", 600, 200, "Location", null);
                ShowCommonLookup(actionUrlLocationList, "{}", lookupcolumns, "Location", "ID", "Location", null);
            }
        }


        if (e.keyCode == 13) {

            if ((grid.getActiveCell() != null) && (changedrow > -1)) {

                if (changedrow == 0) {

                    PrepareGridtoSave(grid);

                    if (LocId.length > 0) {
                        data[changedrow].LocationID = LocId;
                    }
                    //  var x=validateRow(grid, grid.getActiveCell().row);
                    //     alert(x);
                    if (valid_result) {
                        //                        isValidRow = -1;
                        //                        alert("Passed Validate Row check" + isValidRow);
                        //
                        dataView.refresh();
                        data[changedrow].Id = newrowids;
                        data[changedrow].CreatedDate = toDate;

                        if (grid.getCellEditor() != null) {
                            var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
                            data[changedrow][fieldName] = grid.getCellEditor().getValue();
                        }

                        //                    if(data[changedrow].LocationID.length==0 ||data[changedrow].Location.length==0)
                        //                    {
                        //                         grid.setActiveCell(0, 2);
                        //                         return { valid: false, msg: "Please select location." };
                        //                    }

                        if (data[changedrow].LibraryName == "Click here to add a new row") {
                            showMessage('Library Name is invalid.', 'error');
                            return;
                        }

                        if (data[changedrow].Location == "") {
                            showMessage('Location is required.', 'error');
                            return;
                        }

                        data.splice(1, 0, data[changedrow]);
                        //data.push(data[changedrow]);
                        //debugger;
                        if (data[changedrow].LibraryID == "") {
                            AddToBasket(data[changedrow], "Added");
                            newrowids = newrowids - 1;
                        }

                        var item = {
                            "LibraryID": "",
                            "LibraryName": "Click here to add a new row",
                            "Location": "",
                            "LocationID": "",
                            "CreatedDate": toDate
                        };



                        data[0] = item;
                        dataView.refresh();

                        isEnterKeyPress = true;

                        grid.setActiveCell(0, 1);
                        grid.editActiveCell();
                        grid.invalidate();
                        changedrow = -1;





                    } //if valid
                } // end of if (changedrow == 0) 

                if (grid.getActiveCell() != null)
                    setfooter(gridLibrary, grid.getActiveCell().row, dataView.getLength());

            } // end of if ((grid.getActiveCell() != null) && (changedrow > -1)) 
        }
    });

    grid.onValidationError.subscribe(function (e, args) {

        var validationResult = args.validationResults;
        var activeCellNode = args.cellNode;
        var editor = args.editor;
        var errorMessage = validationResult.msg;
        //alert("Hello "+ errorMessage);
        valid_result = validationResult.valid;
        if (!valid_result) {
            $(activeCellNode).attr("title", errorMessage);
        }
        else {
            $(activeCellNode).attr("title", "");
        }

    });

    var columnoptionsset = 0;
    grid.onSelectedRowsChanged.subscribe(function (e, args) {

        clearAllMessages();
        // //debugger;;
        var selectedRole;
        if ((grid.getSelectedRows() != null) && dataView.getItem(grid.getSelectedRows()) != null)
            selectedRole = dataView.getItem(grid.getSelectedRows()[0]);

        if (grid.getActiveCell() != null) {

            if (LocId.length > 0 && changedrow >= 0) {
                data[changedrow].LocationID = LocId;
            }

            if (grid.getActiveCell() != null) {
                LibraryID = selectedRole.LibraryID;
                LibraryName = selectedRole.LibraryName;
                // LibraryID = data[grid.getActiveCell().row].LibraryID;
                //  LibraryName = data[grid.getActiveCell().row].LibraryName;
            }

            //execute change row code only when row really changes ( Limitation of Slickgrid)
            if (grid.getActiveCell().row == previousRow) {
                return;
            }
            else {
                previousRow = grid.getActiveCell().row;
            }

            setfooter(gridLibrary, grid.getActiveCell().row, dataView.getLength());

            var cell = grid.getActiveCell().cell;
            var row = grid.getActiveCell().row;
            //changedrow = cell.row;
            //LibraryID = data[cell.row].LibraryID;
            //LibraryName = data[cell.row].LibraryName;
            if ((grid.getActiveCell() != null) && (row > -1)) {
                if (row == 0) {
                    if (data[0].LibraryName == "Click here to add a new row") {
                        //data[0].LibraryID = "";
                        //data[0].LibraryName = "";                       
                        //dataView.refresh();
                        //grid.gotoCell(row, 0, true);
                        //grid.editActiveCell();
                    }
                }

                else {

                    PrepareGridtoSave(grid);

                    if (changedrow > -1) {
                        LibraryID = data[changedrow].LibraryID;
                        if (changedrow == 0) {
                            if (data[changedrow].LibraryID == "") {
                                AddToBasket(data[changedrow], "Added");
                            }
                            else if (isDataUpdated == true) {
                                AddToBasket(data[changedrow], "Modified");
                                isDataUpdated = false;
                            }
                        }
                        else if (changedrow > 0 && isDataUpdated == true) {
                            AddToBasket(data[changedrow], "Modified");
                            isDataUpdated = false;
                        }
                        changedrow = -1;

                        var item = {
                            "LibraryID": "",
                            "LibraryName": "Click here to add a new row",
                            "Location": "",
                            "LocationID": "",
                            "CreatedDate": toDate
                        };

                        data[0] = item;

                    }
                }
            }
        }
        if (grid.getActiveCell() != null)
            setfooter(gridLibrary, grid.getActiveCell().row, dataView.getLength());

    });


    //    grid.onCellChange.subscribe(function (e, args)
    //    {
    //        changedrow = args.row;
    //    });

    grid.init();

    var item = {
        "LibraryID": "",
        "LibraryName": "Click here to add a new row",
        "Location": "",
        "LocationID": "",
        "CreatedDate": toDate
    };

    data.splice(0, 0, item);
    dataView.beginUpdate();
    dataView.setItems(data, 'LibraryID');
    dataView.setFilter(filter);
    dataView.endUpdate();
    setfooter(gridLibrary, 0, data.length - 1);

    var rows = [];
    rows.push(0);
    grid.setSelectedRows(rows);
    grid.setActiveCell(0, 1);
    //grid.editActiveCell();
}

function Remove_Addrow() {
    dataView.deleteItem("");
}

function Create_Addrow() {
    var item = {
        "LibraryID": "",
        "LibraryName": "Click here to add a new row",
        "Location": "",
        "LocationID": "",
        "CreatedDate": toDate
    };
    dataView.insertItem(0, item);
}

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
//end of region Library Search Grid

// AddToBasket method 
//This function will add item (Row) in new data array
function AddToBasket(item, status) {
    // If data array [UpData] is empy then add item directly otherwise check for existing item to avoid duplicate
    //// //debugger;;
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
        else {
        }
    }
    else {
        for (var i = 0; i < UpData.length; i++) {
            if (UpData[i]["Id"] < 0) {
                if (UpData[i]["Id"] == item["Id"]) {
                    UpData.splice(i, 1);
                }
            }
            else {
                if (UpData[i]["LibraryID"] == item["LibraryID"]) {
                    UpData.splice(i, 1);
                }
            }
        }
        item1 = { "PersistFlag": status };
        $.extend(item, item1);
        UpData.push(item);
    }
    //Just to check record in alert
}

function AddToBasketStorage(item, status) {
    // If data array [UpData] is empy then add item directly otherwise check for existing item to avoid duplicate

    if (UpDataStorageDtl.length == 0) {
        if (status == "Modified") {
            item1 = { "PersistFlag": status };
            $.extend(item, item1);
            UpDataStorageDtl.push(item);
        }
        else if (status == "Added") {
            item1 = { "PersistFlag": status };
            $.extend(item, item1);
            UpDataStorageDtl.push(item);
        }
        else {
        }
    }
    else {
        for (var i = 0; i < UpDataStorageDtl.length; i++) {
            if (UpDataStorageDtl[i]["StorageTypeID"] == item["StorageTypeID"]) {
                UpDataStorageDtl.splice(i, 1);
            }
        }
        item1 = { "PersistFlag": status };
        $.extend(item, item1);
        UpDataStorageDtl.push(item);
    }
    //Just to check record in alert
}


 var validResult = true;
function AddSelectedRowToBasket() {   
    //if (grid.getActiveCell() != null) {
        //if (grid.getActiveCell().row == 0 && grid.getActiveCell() != null) {
            validResult = true;
            var libraryName = dataView.getItem(0).LibraryName = $.trim(dataView.getItem(0).LibraryName);
            var libLocation = dataView.getItem(0).Location = $.trim(dataView.getItem(0).Location);
            var libraryID = dataView.getItem(0).LibraryID = $.trim(dataView.getItem(0).LibraryID);
            if (libraryName == "Click here to add a new row" && libLocation == "") {
            }
            else if(libraryID == ""){
                if (libraryName == "") {
                    showMessage('Library Name is required.', 'error');
                    validResult = false;
                    return validResult;
                }

                if (libraryName == "Click here to add a new row") {
                    showMessage('Library Name is invalid.', 'error');
                    validResult = false;
                    return validResult;
                }

                if (libLocation == "") {
                    showMessage('Location is required.', 'error');
                    validResult = false;
                    return validResult;
                }

                if (validResult == true) {
                    dataView.getItem(0).Id = newrowids;
                    AddToBasket(dataView.getItem(0), "Added");
                    newrowids = newrowids - 1;
                }
                return validResult; 
            }
    //}
}

function SaveResults() {

    valid_result = true;
    PrepareGridtoSave(grid);
    if (!valid_result) return;

    var result = AddSelectedRowToBasket();
    if (result == false) {
        return;
    }

    if (UpData.length == 0) {

        if (grid.getActiveCell() != null) {
            if (grid.getActiveCell().row > 0) {
                showMessage('No data to Save.', 'error');
            }
        }
        return;
    }

    var libraryData = {
        listLibraryVO: UpData
    };

    var dataToSend = JSON.stringify(libraryData);

    $.ajax({
        url: urlSaveLibraryDetail,
        type: "POST",
        async: false,
        cache: false,
        data: dataToSend,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            //debugger;
            if (data != null) {
                if (data.LibraryList != null) {
                    for (var index = 0; index < data.LibraryList.length; index++) {
                        $.extend(UpData[index], data.LibraryList[index]);
                    }
                    //remove default row from array which will be again pushed on calling 'DisplayLibraryDetail' function 

                    if (grid.getActiveCell() != null) {
                        if (grid.getActiveCell().row == 0 && dataView.getItem(grid.getActiveCell().row).LibraryID != "") {
                            var item = {
                                "LibraryID": "",
                                "LibraryName": "Click here to add a new row",
                                "Location": "",
                                "LocationID": "",
                                "CreatedDate": toDate
                            };
                            gridLibrarySearchData.splice(0, 0, item);
                            dataView.refresh();
                            grid.render();
                            grid.setActiveCell(0, 1);
                            grid.editActiveCell();
                            grid.invalidate();
                        }
                    }
                    //                    var item = {
                    //                        "LibraryID": "",
                    //                        "LibraryName": "Click here to add a new row",
                    //                        "Location": "",
                    //                        "LocationID": "",
                    //                        "CreatedDate": toDate
                    //                    };
                    //                    gridLibrarySearchData.splice(0, 0, item);
                    //                    dataView.refresh();
                    //                    grid.render();
                    //                    grid.setActiveCell(0, 1);
                    //                    grid.editActiveCell();
                    //                    grid.invalidate();
                    //                    dataView.refresh();
                    //                    grid.invalidate();
                    //                    grid.focus();
                    //                    grid.setActiveCell(0, 1);
                    //                    grid.editActiveCell();
                    //                    grid.render();
                    UpData = [];
                    isValidLibDetail = true;
                }
                // noty({ text: "Data saved successfully.", type: 'information', dismissQueue: false,
                //    layout: 'bottom', theme: 'defaultTheme'
                //  });
                grid.invalidate();
                dataView.refresh();
                showMessage('Data saved successfully.', 'information');

            }
        },
        error: function () {
            //noty({ text: "Error occured.", type: 'information', dismissQueue: false,
            //  layout: 'bottom', theme: 'defaultTheme'
            //});

            showMessage('Error occured.', 'error');
        }
    });
    //  console.log(libraryData);    
}

//End Region : Library Detail

//Region : Library Storage Detail

function Remove_gridStorageAddrow() {
    dataViewStorageDtl.deleteItem("");
}

function Create_gridStorageAddrow() {
    var item = {
        "LibraryID": LibraryID,
        "LibraryName": LibraryName,
        "StorageType": "Click here to add a new row",
        "Storage": "",
        "CreatedDate": toDate
    };
    dataViewStorageDtl.insertItem(0, item);
}

var gridViewUserDtl;
var gridViewUserDtlcolumns;
var gridViewUserDtlviewableColumns;
var gridViewUserDtloptions;
var gridViewUserDtlactionParameters;
var gridViewUserDtlidfield;
var gridViewUserDtlWidth;
var gridViewUserDtlHeight;
var gridUserDtl;

var LibUseractionUrl;
var gridUserchangedrow = -1;
var userID = "";
var gridUserPreviousRow = 0;
var dataViewUserDtl;

function SetGridLibUsersParameters() {

    //start : set grid section
    gridViewUserDtl = "#gridViewUserDtl";

    gridViewUserDtlcolumns = [
                             { id: "LibUserLinkId", name: "LibUsr Link ID", field: "LibUserLinkId" },
                             { id: "LibraryID", name: "Library ID", field: "LibraryID" },
                             { id: "UserID", name: "User ID", field: "UserID" },
                             { id: "UserName", name: "User Name", field: "UserName" },
                             { id: "Status", name: "Status", field: "Status", editor: Slick.Editors.Text }

                          ];

    gridViewUserDtlviewableColumns = [
                             { id: "UserName", name: "User Name", field: "UserName", editor: Slick.Editors.Text, validator: UserValidator, headerCssClass: "HeaderLovImage" },
                             { id: "Status", name: "Active", field: "Status", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "slick-cell-AlignCenter" }

                          ];


    gridViewUserDtloptions =
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


    gridViewUserDtlactionParameters = {
        libraryID: LibraryID
    };

    gridViewUserDtlidfield = 'UserID';
    gridViewUserDtlWidth = $(gridViewUserDtl).width();
    gridViewUserDtlHeight = $(gridViewUserDtl).height();
    //end : set grid section

    //    ShowProgressBar();
    //    $.ajax({
    //        url: urlSearchLibraryUserDetail,
    //        type: "GET",
    //        dataType: 'Json',
    //        data: gridViewUserDtlactionParameters,
    //        success: function (data)
    //        {
    //            RemoveProgressBar();
    //            DisplayGridUserDtl(data);
    //        },
    //        error: function ()
    //        {
    //            alert("error fetching data.Please try again");
    //            RemoveProgressBar();
    //        }
    //    });
}

function ShowUsersLookup() {
    //// //debugger;;
    var lookUpData = [];
    gridUserchangedrow = -1;
    SetGridLibUsersParameters();
    clearAllMessages();
    $.ajax({
        url: urlSearchLibraryUserDetail,
        type: "GET",
        dataType: 'Json',
        cache: false,
        async: false,
        data: gridViewUserDtlactionParameters,
        success: function (myData) {
            
            lookUpData = DisplayGridSLibUsers(myData);
            //lookUpData=myData;
            RemoveProgressBar();
        }, //end of success
        error: function () {
            RemoveProgressBar();
            alert("error");
        }
    });

    return lookUpData;
};


function SetGridViewStorageDtl() {
    //start : set grid section
    gridViewStorageDtl = "#gridViewStorageDtl";

    gridViewStorageDtlcolumns = [
                             { id: "StorageDetailID", name: "Storage Detail ID", field: "StorageDetailID" },
                             { id: "LibraryID", name: "Library ID", field: "LibraryID" },
                             { id: "LibraryName", name: "Library Name", field: "LibraryName" },
                             { id: "StorageType", name: "Storage Type", field: "StorageType", editor: Slick.Editors.Text },
                                { id: "StorageTypeID", name: "StorageType", field: "StorageTypeID" },
                                { id: "Storage", name: "Storage Name", field: "Storage", editor: Slick.Editors.Text },
                                { id: "CreatedDate", name: "Date", field: "CreatedDate" }
                          ];

    gridViewStorageDtlviewableColumns = [
                         { id: "LibraryID", name: "Library ID", field: "LibraryID", cssClass: "NonEditable", sortable: false },
                             { id: "LibraryName", name: "Library Name", field: "LibraryName", cssClass: "NonEditable", sortable: false },
                             { id: "StorageType", name: "Storage Type", field: "StorageType", editor: Slick.Editors.Text, validator: StorageTypeValidator, headerCssClass: "HeaderLovImage", sortable: false },
                                { id: "Storage", name: "Storage Name", field: "Storage", editor: Slick.Editors.Text, validator: storageValidator, sortable: false },
                                { id: "CreatedDate", name: "Date", field: "CreatedDate", cssClass: "NonEditable", sortable: false }
                          ];



    gridViewStorageDtlNonEditableColumns = [
                         { id: "LibraryID", name: "Library ID", field: "LibraryID", cssClass: "NonEditable", sortable: false },
                             { id: "LibraryName", name: "Library Name", field: "LibraryName", cssClass: "NonEditable", sortable: false },
                             { id: "StorageType", name: "Storage Type", field: "StorageType", cssClass: "NonEditable", headerCssClass: "HeaderLovImage", sortable: false },
                                { id: "Storage", name: "Storage Name", field: "Storage", cssClass: "NonEditable", sortable: false },
                                { id: "CreatedDate", name: "Date", field: "CreatedDate", cssClass: "NonEditable", sortable: false }
                          ];



    gridViewStorageDtloptions =
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

    gridViewStorageDtlactionParameters = {
        libraryID: LibraryID
    };

    gridViewStorageDtlidfield = 'StorageDetailID';
    gridViewStorageDtlWidth = $(gridViewStorageDtl).width();
    gridViewStorageDtlHeight = $(gridViewStorageDtl).height();
}


function ShowStorageLookup() {
    //// //debugger;;
    var lookUpDataStorage = [];
    SetGridViewStorageDtl();
    clearAllMessages();

    $.ajax({
        url: urlSearchLibraryStorageDetail,
        type: "GET",
        dataType: 'Json',
        cache: false,
        async: false,
        data: gridViewStorageDtlactionParameters,
        success: function (data) {
            lookUpDataStorage = DisplayGridStorageDetail(data);
            RemoveProgressBar();
            //DisplayGridStorageDtl(data);
        },
        error: function () {
            RemoveProgressBar();
            alert("error fetching data.Please try again");
        }
    });
    return lookUpDataStorage;
};


function DisplayGridStorageDetail(data) {
    
    var colFilters = {};

    gridViewStorageDtlWidth = $(gridViewStorageDtl).width();

    $(gridViewStorageDtl).dialog(
    {
        autoOpen: false,
        modal: true,
        resizable: false,
        closeOnEscape: false,
        height: gridViewStorageDtlHeight + 50,
        width: gridViewStorageDtlWidth + 15,
        title: "Manage Library Storage",
        open: function (event, ui) {


            SetNonStandardDialogStyles();

            //            if ((listName != null) && listName != "") {
            //                lookUpData = myData[listName];
            //            }
            //            else
            //                lookUpData = myData;
            var isEnterKeyPress = false;
            $(gridViewStorageDtl).css({ "width": gridViewStorageDtlWidth + "px", "height": gridViewStorageDtlHeight });
            dataViewStorageDtl = new Slick.Data.DataView();

            gridStorageDtl = new Slick.Grid(gridViewStorageDtl, dataViewStorageDtl, gridViewStorageDtlcolumns, gridViewStorageDtloptions);
            gridStorageDtl.setSelectionModel(new Slick.RowSelectionModel());
            gridStorageDtl.setColumns(gridViewStorageDtlviewableColumns);

            if (data.length == 0) {
                data = [];
                setfooter(gridViewStorageDtl, 0, 0);

            }
            else {

                setfooter(gridViewStorageDtl, 1, data.length - 1);

            }

            //hold grid data
            gridViewStorageSearchData = data;

            gridStorageDtl.onSort.subscribe(function (e, args) {
                Remove_gridStorageAddrow();
                SortGrid(args, dataViewStorageDtl);
                Create_gridStorageAddrow();
                gridStorageDtl.setActiveCell(0, 2);
                gridStorageDtl.editActiveCell();
            });

            FilterGridWithRowCount(gridStorageDtl, dataViewStorageDtl, gridViewStorageDtl);

            dataViewStorageDtl.onRowCountChanged.subscribe(function (e, args) {
                gridStorageDtl.updateRowCount();
                gridStorageDtl.render();
            });

            dataViewStorageDtl.onRowsChanged.subscribe(function (e, args) {
                gridStorageDtl.invalidateRows(args.rows);
                gridStorageDtl.render();
            });

            $(gridStorageDtl.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                var columnId = $(this).data("columnId");
                if (columnId != null) {
                    colFilters[columnId] = $.trim($(this).val());
                    dataViewStorageDtl.refresh();
                }
            });


            gridStorageDtl.onHeaderRowCellRendered.subscribe(function (e, args) {
                $(args.node).empty();
                $("<input type='text'>")
                           .data("columnId", args.column.id)
                           .val(colFilters[args.column.id])
                           .appendTo(args.node);
            });


            gridStorageDtl.onClick.subscribe(function (e, args) {
                clearAllMessages();
                var cell = gridStorageDtl.getCellFromEvent(e);
                var row = cell.row;
                gridStoragechangedrow = cell.row;
//                 if (gridStorageDtl.getEditorLock().isActive())
//                    gridStorageDtl.getEditorLock().deactivate(gridStorageDtl.getEditController());
                //                if (row == 0) {
                //                    if (data[0].StorageType == "Click here to add a new row") {
                //                        data[0].StorageType = "";
                //                        data[0].Storage = "";
                //                        dataViewStorageDtl.refresh();
                //                    }
                //                }
            });


            gridStorageDtl.onKeyDown.subscribe(function (e, args) {

//             if (grid.getEditorLock().isActive())
//                    grid.getEditorLock().deactivate(grid.getEditController());
                    
//             if (gridStorageDtl.getEditorLock().isActive())
//                    gridStorageDtl.getEditorLock().deactivate(gridStorageDtl.getEditController());

                var StorageActionParameters = {
                    StorageTypeID: StorageTypeID
                };
                //F9 
                if (e.keyCode == 120) {
                    //StorageType
                    if (gridStorageDtl.getColumns()[args.cell].id == "StorageType") {
                        if (gridStorageDtl.getEditorLock().isActive())
                            gridStorageDtl.getEditorLock().deactivate(gridStorageDtl.getEditController());

                        var lookupcolumns = [
                                { id: "ID", width: 900, name: "Storage Type ID", field: "ID" },
                                { id: "Val", width: 900, name: "Storage Type", field: "Val" }
                         ];
                        idfield = "ID";
                        lookupTitle = "Storage Type";
                        selrowgridStorage = args.row;
                        gitemsgridStorage = data[args.row];
                        //ShowLookupForGridStorage(gridStorageDtl, urlGetStorageType, null, lookupcolumns, "StorageType", "ID", 600, 200, "StorageType", null);
                        ShowCommonLookup(urlGetStorageType, StorageActionParameters, lookupcolumns, "StorageLookUp", idfield, lookupTitle, "");
                    }
                }

                //Enter
                if (e.keyCode == 13) {
                    if ((gridStorageDtl.getActiveCell() != null) && (gridStoragechangedrow > -1)) {
                        if (gridStoragechangedrow == 0) {



                            valid_result = true;
                            //to save data if user changed a cell and clicked directly on save button
                            var row = gridStorageDtl.getActiveCell().row;
                            var cell = gridStorageDtl.getActiveCell().cell;


                            gridStorageDtl.focus();
                            for (var i = 0; i < gridStorageDtl.getColumns().length; i++) {
                                gridStorageDtl.gotoCell(row, i, true);
                                if (!valid_result)
                                    break;
                            }




                            //PrepareGridtoSave(gridStorageDtl);
                            if (valid_result) {
                                dataViewStorageDtl.getItem(gridStoragechangedrow).StorageDetailID = newrowids;
                                dataViewStorageDtl.getItem(gridStoragechangedrow).CreatedDate = toDate;


                                if (StorageTypeID.length > 0) {
                                    dataViewStorageDtl.getItem(gridStoragechangedrow).StorageTypeID = StorageTypeID;
                                }

                                if (gridStorageDtl.getCellEditor() != null) {
                                    var fieldName = gridStorageDtl.getColumns()[gridStorageDtl.getActiveCell().cell].field;
                                    dataViewStorageDtl.getItem(gridStoragechangedrow)[fieldName] = gridStorageDtl.getCellEditor().getValue();
                                }

                                //                    if(data[gridStoragechangedrow].LocationID.length==0 ||data[gridStoragechangedrow].Location.length==0)
                                //                    {
                                //                         gridStorageDtl.setActiveCell(0, 2);
                                //                         return { valid: false, msg: "Please select location." };
                                //                    }

                                if (dataViewStorageDtl.getItem(gridStoragechangedrow).StorageType == "Click here to add a new row") {
                                    showMessage('Storage Type is invalid.', 'error');
                                    return;
                                }

                                if (dataViewStorageDtl.getItem(gridStoragechangedrow).Storage == "") {
                                    showMessage('Storage is required.', 'error');
                                    return;
                                }

                                data.splice(1, 0, data[gridStoragechangedrow]);
                                //data.push(data[gridStoragechangedrow]);
                                AddToBasketStorage(dataViewStorageDtl.getItem(gridStoragechangedrow), "Added");
                                newrowids = newrowids - 1;

                                var item = {
                                    "StorageDetailID": "",
                                    "LibraryID": LibraryID,
                                    "LibraryName": LibraryName,
                                    "StorageType": "Click here to add a new row",
                                    "Storage": "",
                                    "CreatedDate": toDate
                                };

                                data[0] = item;
                                dataViewStorageDtl.refresh();

                                isEnterKeyPress = true;

                                //  gridStorageDtl.setActiveCell(0, 2);
                                gridStorageDtl.setActiveCell(0, 0);
                                gridStorageDtl.editActiveCell();
                                gridStorageDtl.invalidate();
                                gridStoragechangedrow = -1;





                            } //if valid

                        } // end of if (changedrow == 0) 

                        setfooter(gridViewStorageDtl, 0, dataViewStorageDtl.getLength());

                    } // end of if ((gridStorageDtl.getActiveCell() != null) && (gridStoragechangedrow > -1)) 

                }

//                if (!gridStorageDtl.getEditorLock().isActive())
//                    gridStorageDtl.getEditorLock().activate(gridStorageDtl.getEditController());
            });

            gridStorageDtl.onValidationError.subscribe(function (e, args) {
                var validationResult = args.validationResults;
                var activeCellNode = args.cellNode;
                var editor = args.editor;
                var errorMessage = validationResult.msg;
                valid_result = validationResult.valid;
                if (!valid_result) {
                    $(activeCellNode).attr("title", errorMessage);
                }
                else {
                    $(activeCellNode).attr("title", "");
                }

            });


            gridStorageDtl.onSelectedRowsChanged.subscribe(function (e, args) {
                clearAllMessages();

                //debugger;
                if (gridStorageDtl.getActiveCell() != null) {
                    // execute change row code only when row really changes ( Limitation of Slickgrid)
                    if (gridStorageDtl.getActiveCell().row == gridStoragePreviousRow) {
                        return;
                    }
                    else {
                        gridStoragePreviousRow = gridStorageDtl.getActiveCell().row;
                    }
                }


                if (isEnterKeyPress && (gridStorageDtl.getActiveCell() != null) && (gridStorageDtl.getActiveCell().row == 1 && gridStorageDtl.getActiveCell().cell == 0)) {
                    isEnterKeyPress = false;
                    gridStorageDtl.setActiveCell(0, 0);
                    gridStorageDtl.editActiveCell();
                    gridStorageDtl.render();
                }

                // comment : Ravi joshi
                //if ((gridStorageDtl.getActiveCell() != null) && (gridStoragechangedrow > -1) && (gridStoragechangedrow != gridStorageDtl.getActiveCell().row)) {
                if ((gridStorageDtl.getActiveCell() != null) && (gridStoragechangedrow > -1)) {

                    //debugger;
                    if (gridStoragechangedrow == 0) {
                        //                        data[gridStoragechangedrow].StorageDetailID = newrowids;
                        //                        data.splice(1, 0, data[gridStoragechangedrow]);
                        //                        AddToBasketStorage(data[gridStoragechangedrow], "Added");
                        //                        newrowids = newrowids - 1;
                        if (data[0].StorageType == "Click here to add a new row") {
                            //                            data[0].StorageType = "";
                            //                            data[0].Storage = "";
                            //                            // gridStorageDtl.focus();
                            //                            //  gridStorageDtl.gotoCell(row, cell, true);
                            //                            dataViewStorageDtl.refresh();
                        }
                        else {
                            //if (AddStorageSelectedRowToBasket()) {
                            dataViewStorageDtl.getItem(gridStoragechangedrow).id = newrowids;
                            AddToBasketStorage(dataViewStorageDtl.getItem(gridStoragechangedrow), "Added");
                            newrowids = newrowids - 1;
                            var item = {
                                "StorageDetailID": "",
                                "LibraryID": LibraryID,
                                "LibraryName": LibraryName,
                                "StorageType": "Click here to add a new row",
                                "Storage": "",
                                "CreatedDate": toDate
                            };
                            data.splice(0, 0, dataViewStorageDtl.getItem(gridStoragechangedrow));
                            data[0] = item;
                            gridStorageDtl.invalidate();
                            dataViewStorageDtl.refresh();
                            gridStorageDtl.render();
                            gridStorageDtl.setActiveCell(0, 1);
                            gridStorageDtl.editActiveCell();
                            dataViewStorageDtl.refresh();
                            // }
                        }
                    }
                    else if (gridStoragechangedrow > 0) {


                        if (StorageTypeID.length > 0) {
                            dataViewStorageDtl.getItem(gridStoragechangedrow).StorageTypeID = StorageTypeID;
                        }

                        var status = "";
                        if (dataViewStorageDtl.getItem(gridStoragechangedrow).StorageDetailID < 0)
                            status = "Added";
                        else
                            //status = "Modified";

                        AddToBasketStorage(dataViewStorageDtl.getItem(gridStoragechangedrow), status);
                        gridStorageDtl.focus();
                    }

                    gridStoragechangedrow = -1;

                }


                if (gridStorageDtl.getActiveCell() != null) {
                    setfooter(gridViewStorageDtl, gridStorageDtl.getSelectedRows()[0], dataViewStorageDtl.getLength());
                }

                //enable first row for edit
                
                if (gridStorageDtl.getActiveCell() != null) {
                    if ((dataViewStorageDtl.getItem(gridStorageDtl.getActiveCell().row).StorageDetailID == "" || 
                            dataViewStorageDtl.getItem(gridStorageDtl.getActiveCell().row).StorageDetailID<0 || dataViewStorageDtl.getItem(gridStorageDtl.getActiveCell().row).StorageDetailID == null)) {
                        gridStorageDtl.setColumns(gridViewStorageDtlviewableColumns);
                        gridStorageDtl.editActiveCell();
                        columnstylealreadyset = 0;
                    }
                    //disable others rows from edit
                    else if ((gridStorageDtl.getSelectedRows()[0] > 0) && (columnstylealreadyset == 0)) {

                        gridStorageDtl.setColumns(gridViewStorageDtlNonEditableColumns);
                        gridStorageDtl.focus();
                        columnstylealreadyset = 1;
                    }
                }

            });


            gridStorageDtl.onCellChange.subscribe(function (e, args) {
                gridStoragechangedrow = args.row;
            });

            //    function filter(item)
            //    {
            // 
            //        for (var columnId in colFilters)
            //        {
            //            if (columnId !== undefined && colFilters[columnId] !== "")
            //            {
            //                var c = gridStorageDtl.getColumns()[gridStorageDtl.getColumnIndex(columnId)];

            //                //if not type casted to string, number filtering will throw error
            //                if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0)
            //                {
            //                   // if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) 
            //                   //  {
            //                    return false;
            //                    //  }
            //                }

            //            }
            //        }
            //        return true;
            //    }
            
                        dataViewStorageDtl.onRowCountChanged.subscribe(function (e, args) {
                            gridStorageDtl.updateRowCount();
                            gridStorageDtl.render();
                             var row = 0;
                            if (gridStorageDtl.getSelectedRows() != null) {
                                row = gridStorageDtl.getSelectedRows()[0];
                            }
                            if ((row == null))
                                row = 0;
                            if (row > dataViewStorageDtl.getLength()) 
                            {
                                row = 1;
                                gridStorageDtl.setActiveCell(1, 0);
                                gridStorageDtl.editActiveCell();
                                gridStorageDtl.render();
                            }

                             setfooter(gridViewStorageDtl, row, dataViewStorageDtl.getLength());
                        });

                        function filter(item) {

                            for (var columnId in colFilters) {

                                if (columnId !== undefined && colFilters[columnId] !== "") {
                                    var c = gridStorageDtl.getColumns()[gridStorageDtl.getColumnIndex(columnId)];
                                    if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) {
                                        if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) {
                                            return false;
                                        }
                                    }

                                }
                            }
                            return true;
                        }
            
            gridStorageDtl.init();

            var item = {
                "StorageDetailID": "",
                "LibraryID": LibraryID,
                "LibraryName": LibraryName,
                "StorageType": "Click here to add a new row",
                "Storage": "",
                "CreatedDate": toDate
            };

            data.splice(0, 0, item);
            dataViewStorageDtl.beginUpdate();
            dataViewStorageDtl.setItems(data, 'StorageDetailID');
            dataViewStorageDtl.setFilter(filter);
            dataViewStorageDtl.endUpdate();
            setfooter(gridViewStorageDtl, 0, 0);

            var rows = [];
            rows.push(0);
            gridStorageDtl.setSelectedRows(rows);
            gridStorageDtl.setActiveCell(0, 0);
            //gridStorageDtl.editActiveCell();   

            setfooter(gridViewStorageDtl, 0, data.length - 1);

            gridStorageDtl.focus();
            RemoveProgressBar();
        },

        buttons: {
            "Save": function () {
                if (IsValidStorageData())
                    SaveStorageDetail();
                // $(gridViewUserDtl).dialog("close");
            },
            "Cancel": function () {
                $(gridViewStorageDtl).dialog("close");
                clearAllMessages();

//                if (gridStorageDtl.getEditorLock().isActive())
//                    gridStorageDtl.getEditorLock().deactivate(gridStorageDtl.getEditController());
            }
        },
        close: function () {
            //    $(gridViewUserDtl).dialog("close");

        }
    });

    $(gridViewStorageDtl).dialog("open");
}

var isValidStorage = true;
function IsValidStorageData() {

    if (UpDataStorageDtl.length > 0) {
        for (var index = 0; index < UpDataStorageDtl.length; index++) {
            if (UpDataStorageDtl[index].StorageType.trim() == "Click here to add a new row" || UpDataStorageDtl[index].StorageType.trim() == "") {
                isValidStorage = false;
                showMessage('Storage Type is invalid.', 'error');
                return isValidStorage;
            }
            if (UpDataStorageDtl[index].Storage.trim() == "") {
                isValidStorage = false;
                showMessage('Storage is required.', 'error');
                return isValidStorage;
            }
        }
    }
    return isValidStorage;
};

function SaveStorageDetail() {

    if (AddCurrentStorageSelectedRowToBasket()) {
        return;
    }

    var libraryData = {
        listLibraryVO: UpDataStorageDtl
    };
    
    //alert(JSON.stringify(libraryData));

    if (UpDataStorageDtl.length == 0) {
        showMessage('no changes to save.', 'information');
        return;
    }

    $.ajax({
        url: urlSaveLibraryStorageDetail,
        type: "POST",
        async: false,
        cache: false,
        data: JSON.stringify(libraryData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null) {

                for (var index = 0; index < data.LibraryList.length; index++) {
                    $.extend(UpDataStorageDtl[index], data.LibraryList[index]);
                }

                var item = {
                    "StorageDetailID": "",
                    "LibraryID": LibraryID,
                    "LibraryName": LibraryName,
                    "StorageType": "Click here to add a new row",
                    "Storage": "",
                    "CreatedDate": toDate
                };

                if (gridStorageDtl.getActiveCell() != null) {
                    if (gridStorageDtl.getActiveCell().row == 0 && dataViewStorageDtl.getItem(gridStorageDtl.getActiveCell().row).StorageDetailID != "") {
                        gridViewStorageSearchData.splice(0, 0, item);
                    }
                }

                dataViewStorageDtl.refresh();
                gridStorageDtl.setActiveCell(0, 0);
                gridStorageDtl.editActiveCell();
                gridStorageDtl.invalidate();
                UpDataStorageDtl = [];
                isStorageRowInValid = false;
                showMessage('Data saved successfully.', 'information');
            }
            gridStorageDtl.invalidate();
            dataViewStorageDtl.refresh();
        },
        error: function () {
            //  $.noty.closeAll();
            //  noty({ text: "Error occured.", type: 'information', dismissQueue: true,
            //    layout: 'bottom', theme: 'defaultTheme'
            //});
            showMessage('Error occured.', 'information');

            return;
        }
    });

    //set storage var to null
    //maxBoxTypeStorage = null;
    //maxSelfTypeStorage = null;
}

var isStorageRowInValid = false;
function AddCurrentStorageSelectedRowToBasket() {
    var currentrow = gridStorageDtl.getActiveCell().row;
    gridStorageDtl.gotoCell(currentrow, 4, true);
    gridStorageDtl.gotoCell(currentrow, 3, true);

    //if (gridStorageDtl.getActiveCell() != null) {
        //if (gridStorageDtl.getActiveCell().row == 0 && gridStorageDtl.getActiveCell() != null) {
    if (dataViewStorageDtl.getItem(0).StorageType == "Click here to add a new row" && dataViewStorageDtl.getItem(0).Storage == "") {

    }
    else if (dataViewStorageDtl.getItem(0).StorageDetailID == "")
            {
            if (dataViewStorageDtl.getItem(0).StorageType == "") {
                    showMessage('Storage Type is required.', 'error');
                    isStorageRowInValid = true;
                    return isStorageRowInValid;
                }

                if (dataViewStorageDtl.getItem(0).Storage == "") {
                    showMessage('Storage is required.', 'error');
                    isStorageRowInValid = true;
                    return isStorageRowInValid;
                }

                if ((dataViewStorageDtl.getItem(0).StorageType != "") &&
            (dataViewStorageDtl.getItem(0).Storage != "")
         ) {
                    isStorageRowInValid = false;
                    dataViewStorageDtl.getItem(0).StorageTypeID = newrowids;
                    AddToBasketStorage(dataViewStorageDtl.getItem(0), "Added");
                    newrowids = newrowids - 1;
                }
                return isStorageRowInValid
            }
        //}
   // }
}

function AddStorageSelectedRowToBasket() {
    var validResult = false;
    if (gridStorageDtl.getActiveCell() != null) {
        if (gridStorageDtl.getActiveCell().row == 0 && gridStorageDtl.getActiveCell() != null) {
            if (
         (dataViewStorageDtl.getItem(gridStorageDtl.getActiveCell().row).StorageType != "") &&
         (dataViewStorageDtl.getItem(gridStorageDtl.getActiveCell().row).Storage != "")
         ) {
                validResult = true;
            }
        }
    }
    return validResult;
}

//var DialogcommonVars = {
//    autoOpen: false,
//    modal: true,
//    resizable: false,
//    closeOnEscape: false,
//    dialogClass: "PlaceHolderPopup"//,
//    //    show: {
//    //        effect: 'fade',
//    //        duration: 350
//    //    },
//    //    hide: {
//    //        effect: 'fade',
//    //        duration: 350
//    //    }
//};



function DisplayGridSLibUsers(data) {
   
    UpDataUserDtl = [];

    var colFilters = {};

    gridViewUserDtlWidth = $(gridViewUserDtl).width();

    $(gridViewUserDtl).dialog(
    {
        autoOpen: false,
        modal: true,
        resizable: false,
        closeOnEscape: false,
        height: gridViewUserDtlHeight + 50,
        width: gridViewUserDtlWidth + 15,
        title: "Manage Library Users",
        open: function (event, ui) {
        
            SetNonStandardDialogStyles();

            //            if ((listName != null) && listName != "") {
            //                lookUpData = myData[listName];
            //            }
            //            else
            //                lookUpData = myData;
            
            $(gridViewUserDtl).css({ "width": gridViewUserDtlWidth + "px", "height": gridViewUserDtlHeight });
            dataViewUserDtl = new Slick.Data.DataView();

            gridUserDtl = new Slick.Grid(gridViewUserDtl, dataViewUserDtl, gridViewUserDtlcolumns, gridViewUserDtloptions);
            gridUserDtl.setSelectionModel(new Slick.RowSelectionModel());
            gridUserDtl.setColumns(gridViewUserDtlviewableColumns);

            if (data.length == 0) {
                data = [];
                setfooter(gridViewUserDtl, 0, 0);

            }
            else {

                setfooter(gridViewUserDtl, 1, data.length - 1);

            }

            //hold grid data
            gridViewUserData = data;

            if (gridUserDtl.getEditorLock().isActive())
                            gridUserDtl.getEditorLock().deactivate(gridUserDtl.getEditController());
                            else
                            gridUserDtl.getEditorLock().activate(gridUserDtl.getEditController());

            
            gridUserDtl.onSort.subscribe(function (e, args) {
                Remove_gridUserAddrow();
                SortGrid(args, dataViewUserDtl);
                Create_gridUserAddrow();
                gridUserDtl.setActiveCell(0, 2);
                gridUserDtl.editActiveCell();
            });

            dataViewUserDtl.onRowCountChanged.subscribe(function (e, args) {
                gridUserDtl.updateRowCount();
                gridUserDtl.render();
            });

            dataViewUserDtl.onRowsChanged.subscribe(function (e, args) {
                gridUserDtl.invalidateRows(args.rows);
                gridUserDtl.render();
            });


            $(gridUserDtl.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                var columnId = $(this).data("columnId");
                if (columnId != null) {
                    colFilters[columnId] = $.trim($(this).val());
                    dataViewUserDtl.refresh();
                }
            });


            gridUserDtl.onHeaderRowCellRendered.subscribe(function (e, args) {
                $(args.node).empty();
                $("<input type='text'>")
                           .data("columnId", args.column.id)
                           .val(colFilters[args.column.id])
                           .appendTo(args.node);
            });



            gridUserDtl.onClick.subscribe(function (e, args) {
                 
                clearAllMessages();
                var cell = gridUserDtl.getCellFromEvent(e);
                var row = cell.row;
                curRow = row;
                if (row == 0) {
                    if (data[0].UserName == "Click here to add a new row") {
                        data[0].UserName = "";
                        data[0].Status = false;
                        dataViewUserDtl.refresh();
                    }
                }
                else {
                    if (data[0].UserName != "Click here to add a new row") {
                        data[0].UserName = "Click here to add a new row";
                        data[0].Status = false;
                        dataViewUserDtl.refresh();
                    }

                }

            });


            gridUserDtl.onKeyDown.subscribe(function (e, args) {
                                                   
                //F9 
                if (e.keyCode == 120) {
                    //StorageType
                    if (gridUserDtl.getColumns()[args.cell].id == "UserName") {
                                                
                        if (gridUserDtl.getCellEditor() != null) {

                            EnteredUsernameChars = gridUserDtl.getCellEditor().getValue();

                        }

                        var lookupcolumns = [
                                { id: "ID", width: 900, name: "StorageType ID", field: "ID" },
                                { id: "Val", width: 900, name: "Storage Type", field: "Val" }
                         ];
//                         if (grid.getEditorLock().isActive())
//                            grid.getEditorLock().deactivate(grid.getEditController());
//                         if (gridUserDtl.getEditorLock().isActive())
//                             gridUserDtl.getEditorLock().deactivate(gridUserDtl.getEditController());
                        // if (userName.length==0 && password.length==0) 
                        // {
                        //    GetUserCredential();
                        //    }
                        //   else
                        //   {
                        ShowADUserList();
                        //   }
                        //                selrowgridStorage = args.row;
                        //                gitemsgridStorage = data[args.row];
                        //                ShowLookupForGridStorage(gridUserDtl, urlGetStorageType, null, lookupcolumns, "StorageType", "ID", 600, 200, "StorageType", null);
                    }


                }

                //Enter

                if (e.keyCode == 13) {
                    // //debugger;;
                    if ((gridUserDtl.getActiveCell() != null) && (gridUserchangedrow > -1)) {
                        if (gridUserchangedrow == 0) {
                            valid_result = true;
                            //to save data if user changed a cell and clicked directly on save button
                            var row = gridUserDtl.getActiveCell().row;
                            var cell = gridUserDtl.getActiveCell().cell;

                            gridUserDtl.focus();
                            for (var i = 0; i < gridUserDtl.getColumns().length; i++) {
                                gridUserDtl.gotoCell(row, i, true);
                                if (!valid_result)
                                    break;
                            }


                            //PrepareGridtoSave(gridUserDtl);
                            if (valid_result) {

                                if (userID.length > 0) {
                                    data[gridUserchangedrow].UserID = userID;
                                }
                                else {
                                    //  alert("User Id not available");
                                }


                                if (gridUserDtl.getCellEditor() != null) {
                                    var fieldName = gridUserDtl.getColumns()[gridUserDtl.getActiveCell().cell].field;
                                    data[gridUserchangedrow][fieldName] = gridUserDtl.getCellEditor().getValue();
                                }

                                //                    if(data[gridUserchangedrow].LocationID.length==0 ||data[gridUserchangedrow].Location.length==0)
                                //                    {
                                //                         gridUserDtl.setActiveCell(0, 2);
                                //                         return { valid: false, msg: "Please select location." };
                                //                    }

                                data[gridUserchangedrow].LibraryID = LibraryID;
                                data.splice(1, 0, data[gridUserchangedrow]);
                                //data.push(data[gridUserchangedrow]);
                                AddToBasketUser(data[gridUserchangedrow], "Added");
                                newrowids = newrowids - 1;

                                var item = {
                                    "LibUserLinkId": "",
                                    "UserID": "new row",
                                    "UserName": "Click here to add a new row",
                                    "Status": ""
                                };

                                data[0] = item;
                                dataViewUserDtl.refresh();

                                isEnterKeyPress = true;

                                gridUserDtl.setActiveCell(0, 0);
                                gridUserDtl.editActiveCell();
                                gridUserDtl.invalidate();
                                gridUserchangedrow = -1;
                            } //if valid

                        } // end of if (changedrow == 0) 

                        setfooter(gridViewUserDtl, 0, data.length - 1);

                    } // end of if ((gridUserDtl.getActiveCell() != null) && (gridUserchangedrow > -1)) 

                }
            });

            gridUserDtl.onValidationError.subscribe(function (e, args) {
                var validationResult = args.validationResults;
                var activeCellNode = args.cellNode;
                var editor = args.editor;
                var errorMessage = validationResult.msg;
                valid_result = validationResult.valid;
                if (!valid_result) {
                    $(activeCellNode).attr("title", errorMessage);
                }
                else {
                    $(activeCellNode).attr("title", "");
                }

            });


            gridUserDtl.onSelectedRowsChanged.subscribe(function (e, args) {
                clearAllMessages();

                if (gridUserDtl.getActiveCell() != null) {
                    // execute change row code only when row really changes ( Limitation of Slickgrid)
                    if (gridUserDtl.getActiveCell().row == gridUserPreviousRow) {
                        return;
                    }
                    else {
                        gridUserPreviousRow = gridUserDtl.getActiveCell().row;
                        // gridUserPreviousRow = dataView.getItem(gridUserDtl.getActiveCell().row)[idfield]
                    }
                }


                // if (isEnterKeyPress && (gridUserDtl.getActiveCell() != null) && (gridUserDtl.getActiveCell().row == 1 && gridUserDtl.getActiveCell().cell == 0))
                //  {
                //       isEnterKeyPress = false;
                //        gridUserDtl.setActiveCell(0, 0);
                //        gridUserDtl.editActiveCell();
                //         gridUserDtl.render();
                //     }

                if ((gridUserDtl.getActiveCell() != null) && (gridUserchangedrow > -1) && (gridUserchangedrow != gridUserDtl.getActiveCell().row)) {

                    // if (gridUserDtl.getActiveCell().row == 0)
                    //  {
                    //                data[gridUserchangedrow].id = newrowids;
                    //                data.splice(1, 0, data[gridUserchangedrow]);
                    //                AddToBasketStorage(data[gridUserchangedrow], "Added");
                    //                newrowids = newrowids - 1;

                    //        if (data[0].StorageType == "Click to Add new row.")
                    //       {
                    //            data[0].StorageType = "";
                    //          data[0].Storage = "";
                    // gridUserDtl.focus();
                    //  gridUserDtl.gotoCell(row, cell, true);
                    //                dataViewUserDtl.refresh();
                    //           }
                    //



                    //           }
                    //          else 

                    if (gridUserchangedrow > 0) {
                        if (userID.length > 0) {
                            data[gridUserchangedrow].UserID = userID;
                        }

                        var status = "";
                        //                if (data[gridUserchangedrow].id < 0)
                        //                    status = "Added";
                        //                else
                        //                    status = "Modified";

                        if (data[gridUserchangedrow].LibraryID == LibraryID) {


                            AddToBasketUser(data[gridUserchangedrow], "Modified");
                        }
                        else {


                            AddToBasketUser(data[gridUserchangedrow], "Added");
                        }
                        gridUserDtl.focus();


                        //               if(data[gridUserchangedrow].id > 0)
                        //               {
                        //                 alert("Added");
                        //                AddToBasketUser(data[gridUserchangedrow], "Added");
                        //               }
                        //               else
                        //               {
                        //               
                        //               alert("Modified");
                        //                AddToBasketUser(data[gridUserchangedrow], "Modified");
                        //               }

                        // data[gridUserchangedrow].LibraryID=LibraryID;
                        //   AddToBasketUser(data[gridUserchangedrow], "Modified");
                        //gridUserDtl.focus();
                    }

                    gridUserchangedrow = -1;

                }
                if (gridUserDtl.getActiveCell() != null) {
                    setfooter(gridViewUserDtl, gridUserDtl.getActiveCell().row, data.length - 1);
                }
            });


            gridUserDtl.onCellChange.subscribe(function (e, args) {
                gridUserchangedrow = args.row;
                data[args.row].LibraryID = LibraryID;



            });

            function filter(item) {
                for (var columnId in colFilters) {
                    if (columnId !== undefined && colFilters[columnId] !== "") {
                        var c = gridUserDtl.getColumns()[gridUserDtl.getColumnIndex(columnId)];

                        //if not type casted to string, number filtering will throw error
                        if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) {
                            //if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) 
                            // {
                            return false;
                            //  }
                        }

                    }
                }
                return true;
            }

            gridUserDtl.init();

            
            var item = {
                "LibUserLinkId": "",
                "UserID": "new row",
                "UserName": "Click here to add a new row",
                "Status": ""
            };


            dataViewUserDtl.onRowCountChanged.subscribe(function (e, args) {
                gridUserDtl.updateRowCount();
                gridUserDtl.render();
                setPopupFooter(gridViewUserDtl, dataViewUserDtl.getLength());
            });


            // Gird,Dataview,DIV                        
            // FilterGridWithRowCount(gridUserDtl, dataViewUserDtl, gridViewUserDtl);
            data.splice(0, 0, item);
            dataViewUserDtl.beginUpdate();
            dataViewUserDtl.setItems(data, 'UserID');
            dataViewUserDtl.setFilter(filter);
            dataViewUserDtl.endUpdate();
            //  setfooter(gridViewUserDtl, 0, 0);

            var rows = [];
            rows.push(0);
            gridUserDtl.setSelectedRows(rows);
            gridUserDtl.setActiveCell(0, 1);
            //gridUserDtl.editActiveCell();
            setfooter(gridViewUserDtl, 0, data.length - 1);
            RemoveProgressBar();            
        },

        buttons: {
            "Save": function () {
                SaveLibUserResults();
                // $(gridViewUserDtl).dialog("close");
            },
            "Cancel": function () {
                if (gridUserDtl.getActiveCell() != null) {
                    gridUserDtl.resetActiveCell();
                }                

                $(gridViewUserDtl).dialog("close");
                clearAllMessages();
            }
        },
        close: function () {
            if (gridUserDtl.getActiveCell() != null) {
                gridUserDtl.resetActiveCell();
            }
            //    $(gridViewUserDtl).dialog("close");

        }
    });

    $(gridViewUserDtl).dialog("open");
}

function Remove_gridUserAddrow() {
    dataViewUserDtl.deleteItem("");
}

function Create_gridUserAddrow() {
    var item = {
        "LibUserLinkId": "",
        "UserID": "new row",
        "UserName": "Click here to add a new row",
        "Status": ""
    };
    dataViewUserDtl.insertItem(0, item);
}


function UserValidator(value) {
    //  ShowProgressBarWithMsg("Validating");
    var userList = [];
    if (value == null || value == undefined || !value.length) {
        valid_result = false;
        return { valid: false, msg: "This is a required field" };
    }
    else {
        valid_result = true;
        //// //debugger;;
        if (userList.length == 0) {
            var activeParameter = { userName: value };
            $.ajax({
                async: false,
                cache: false,
                url: MenUserAtionUrl,

                type: "GET",
                dataType: "json",
                data: activeParameter,
                success: function (data) {
                    if (data != null) {
                        userList = data;
                    }
                },
                error: function () {
                    alert("error for fetching user list.");
                }
            });
        }

        if ((userList == null))
            userList = [];
        if ((userList != null) && userList.length > 0) {
            var stat = 0;
            var isValidValue = false;
            for (var i = 0; i < userList.length; i++) {
                if (value.toUpperCase() == userList[i].UserName.toUpperCase()) {

                    var cdata = dataViewUserDtl.getItems();

                    for (var j = 0; j < cdata.length; j++) {
                    if (userList[i].UserID.toUpperCase() == cdata[j].UserID.toUpperCase()) {
                    isValidValue = false;  
                    return { valid: false, msg: "User  Name Already Exists" };                   
                    }
                    }

                    if (!gridUserDtl.getEditorLock().isActive())
                        gridUserDtl.getEditorLock().activate(gridUserDtl.getEditController());  
                    
                    var item = {
                    "LibUserLinkId": cdata[0].LibUserLinkId,
                        "UserID": userList[i].UserID,
                        "UserName": userList[i].UserName,
                        "Status": cdata[0].Status

                    };

                    $.extend(cdata[0],item);                    
                    gridUserDtl.render();
                    gridUserDtl.focus();
//                    cdata[0] = item;

//                    dataViewUserDtl.beginUpdate();
//                    dataViewUserDtl.setItems(cdata);
//                    dataViewUserDtl.endUpdate();
//                    gridUserDtl.invalidate();
                      isValidValue = true;
                      RemoveProgressBar();
                    return { valid: true, msg: "" };
                }
            }
            if (!isValidValue) {
                //  RemoveProgressBar();
                return { valid: false, msg: "Invalid User Name." };
            }
        }
        //    RemoveProgressBar();
        return { valid: false, msg: "Invalid User Name." };
    }
}



////to be written correctly
// var UserListForValidation = [];
// var UserID="";
// function UserValidator(value)
// {
// var no;
// var enteredLang = value.toUpperCase()
// if (value == null || value == undefined || !value.length)
// {
// return { valid: false, msg: "Please select User." };
// }

// if (UserListForValidation.length == 0)
// {
// var activeParameter = { filterValue: "" };
// $.ajax({
// async: false,
// url: actionUrlUserListforValidation,
// type: "GET",
// dataType: "json",
// data: activeParameter,
// success: function (data)
// {
// if (data != null)
// {
// UserListForValidation = data.lookupList;
// DisplayAppMessages(data.AppMessages);
// }
// },
// error: function ()
// {
// $.noty.closeAll();
// noty({ text: 'error fetching User List for validation', layout: 'bottom' });
// }
// });
// }

// if ((UserListForValidation == null))
// UserListForValidation = [];
// if ((UserListForValidation != null) && UserListForValidation.length > 0)
// {
// var stat = 0;
// var isValidValue = false;
// for (var i = 0; i < UserListForValidation.length; i++)
// {
// if (value.toUpperCase() == UserListForValidation[i].Val.toUpperCase())
// {
// UserID=UserListForValidation[i].ID;
// isValidValue = true;
// return { valid: true, msg: null };
// }
// }
// if (!isValidValue)
// {
// return { valid: false, msg: "Invalid User Name." };
// }


// }
// }

//function AddCurrentUserRowToBasket() {
//    var rowData = grid.getData().getItem(0);

//    if (gridUserDtl.getActiveCell() != null) {
//        if (gridUserDtl.getActiveCell().row == 0 && gridUserDtl.getActiveCell() != null) {
//            if (dataViewStorageDtl.getItem(gridUserDtl.getActiveCell().row).StorageType != "Click here to add a new row" || dataViewStorageDtl.getItem(gridUserDtl.getActiveCell().row).Storage != "") {
//                if (dataViewStorageDtl.getItem(gridUserDtl.getActiveCell().row).StorageType == "") {
//                    showMessage('Storage Type is required.', 'error');
//                    isStorageRowInValid = true;
//                    return;
//                }

//                if (dataViewStorageDtl.getItem(gridUserDtl.getActiveCell().row).Storage == "") {
//                    showMessage('Storage is required.', 'error');
//                    isStorageRowInValid = true;
//                    return;
//                }

//                if ((dataViewStorageDtl.getItem(gridUserDtl.getActiveCell().row).StorageType != "") &&
//            (dataViewStorageDtl.getItem(gridUserDtl.getActiveCell().row).Storage != "")
//         ) {
//                    isStorageRowInValid = false;
//                    dataViewStorageDtl.getItem(gridUserDtl.getActiveCell().row).StorageTypeID = newrowids;
//                    AddToBasketStorage(dataViewStorageDtl.getItem(gridUserDtl.getActiveCell().row), "Added");
//                    newrowids = newrowids - 1;
//                }
//            }
//        }
//    }
//}

function SaveLibUserResults() {   
    //$noty.closeAll();
    //var currentrow = gridUserDtl.getSelectedRows()[0];
    var currentrow = curRow;
    gridUserDtl.gotoCell(currentrow, 0, true);
    gridUserDtl.gotoCell(currentrow, 1, true);

    //var gridData = gridUserDtl.getData(); //before .each function
    var dataViewUserData = dataViewUserDtl.getItems();
    dataViewUserData[currentrow].LibraryID = LibraryID;
    //debugger;
    if (currentrow == 0) {
        if (dataViewUserData[currentrow].UserID != null) {
            if (dataViewUserData[currentrow].UserID == "new row") {
            }
            else {
                if (dataViewUserData[currentrow].LibUserLinkId == "") {
                    AddToBasketUser(dataViewUserData[0], "Added");
                }
            }
        }
    }
    else {
        if (dataViewUserData[currentrow].PersistFlag == 0) {

            AddToBasketUser(dataViewUserData[currentrow], "Modified");

        }

    }

    var LibUsers = {
        LibUsers: UpDataUserDtl
    };
    //var dataToSend = JSON.stringify(libraryUserData);
    // alert (JSON.stringify(dataToSend));

    if (UpDataUserDtl.length == 0 || (UpDataUserDtl.length == 1 && UpDataUserDtl[0].UserID == "new row")) {

        // noty({ text: 'No data to Save', layout: 'bottom' });
        showMessage('No data to Save.', 'error');

        //  alert(UpDataUserDtl.length.toString());
        //  alert("No data to Save");
        return;
    }


    $.ajax({

        url: urlSaveLibraryUserDetail,
        type: "POST",
        dataType: 'Json',
        async: false,
        cache: false,
        data: JSON.stringify(LibUsers),
        contentType: "application/json; charset=utf-8",

        success: function (data) {
            if (data != null) {
                if (data.data != null) {
                    for (var index = 0; index <= data.data.length - 1; index++) {
                        $.extend(UpDataUserDtl[index], data.data[index]);
                        //gridLibrarySearchData.push(data.LibraryList[index]);
                    }
                    showMessage('Data saved successfully.', 'information');
                    var cdata = dataViewUserDtl.getItems();
                    var item = {
                        "LibUserLinkId": "",
                        "UserID": "new row",
                        "UserName": "Click here to add a new row",
                        "Status": ""
                    };

                    if (cdata[0].LibUserLinkId != "")
                        cdata.splice(0, 0, item);

                    dataViewUserDtl.refresh();
                    gridUserDtl.invalidate();

                    UpDataUserDtl = [];
                }

                if (UpDataUserDtl.length > 0) {
                    //showMessage('Data saved successfully.', 'information');

                    //  noty({ text: "Data saved successfully.", type: 'information', dismissQueue: false,
                    //  layout: 'bottom', theme: 'defaultTheme' });
                }

                if (gridUserDtl.getActiveCell() != null) {
                    gridUserDtl.resetActiveCell();
                }
            }
        },
        error: function () {
            showMessage('Error occured.', 'error');

            // noty({ text: "Error occured.", type: 'information', dismissQueue: false,
            //   layout: 'bottom', theme: 'defaultTheme'
            // });
        }
    });
    //  console.log(libraryData);
}



var UpDataUserDtl = [];
function AddToBasketUser(item, status) {
    var item1;
    // If data array [UpData] is empy then add item directly otherwise check for existing item to avoid duplicate
    //// //debugger;;
    if (UpDataUserDtl.length == 0) {
        if (status == "Modified") {
            item1 = { "PersistFlag": status };
            $.extend(item, item1);
            UpDataUserDtl.push(item);
        }
        else if (status == "Added") {
            item1 = { "PersistFlag": status };
            $.extend(item, item1);
            UpDataUserDtl.push(item);
        }
        else {
        }
    }
    else {
        for (var i = 0; i < UpDataUserDtl.length; i++) {
            if (UpDataUserDtl[i]["UserID"] == item["UserID"]) {
                //                if(UpDataUserDtl[i]["PersistFlag"]=="Added")
                //                {
                //                item1 = { "PersistFlag": "Added" };
                //                }
                //                else
                //                {
                //                item1 = { "PersistFlag": "Added" };
                //                }

                UpDataUserDtl.splice(i, 1);


            }
        }
        item1 = { "PersistFlag": status };
        $.extend(item, item1);
        UpDataUserDtl.push(item);
    }







    //console.log(UpDataUserDtl);
    //Just to check record in alert
}





var EnteredUsernameChars = "";
function ShowADUserList() {
    //// //debugger;;

    //  if (EnteredUsernameChars.length>0) 
    //   {
    if (errorMessagePanel != null && errorMessagePanel != undefined) {
        errorMessagePanel.close();
    }
    OpenUsersLookup("SystemUser");
    //    }
    //    else {
    //        if (errorMessagePanel != null && errorMessagePanel != undefined) {
    //            if (!errorMessagePanel.closed)
    //                errorMessagePanel.setText('Please enter input characters for users search.');
    //            else {
    //                errorMessagePanel = noty({ text: "Please enter input characters for users search.", type: 'warning', dismissQueue: true,
    //                    layout: 'bottom', theme: 'defaultTheme'
    //                });
    //            }
    //        }
    //        else {
    //            errorMessagePanel = noty({ text: "Please enter input characters for users search.", type: 'warning', dismissQueue: true,
    //                layout: 'bottom', theme: 'defaultTheme'
    //            });
    //        }
    //    }
};

var lookupInvokerControl = "";
var lookupDescriptionControl = "";
function OpenUsersLookup(LookupOperation) {
    //// ////debugger;;
    $.noty.closeAll();
    var actionUrl;
    var headerName = "";
    var headerName1 = "";
    if (LookupOperation == "ADUser") {
        lookupInvokerControl = "#txtUserID";
        lookupDescriptionControl = "#txtUserName";
        actionUrl = ADUserAtionUrl;
        lookupTitle = "Active Directory Users";
        actionParameters = { userName: $("#txtUserID").val(), secureUserName: userName, securePassword: password };
        headerName = "Name";
    }
    else if (LookupOperation == "SystemUser") {
        lookupInvokerControl = "UserName";
        //actionUrl = systemUserAtionUrl;
        actionUrl = MenUserAtionUrl;
        lookupTitle = "User Details";
        actionParameters = { userName: EnteredUsernameChars };
        headerName = "User Id";
    }

    columns = [

                                   { id: "UserID", width: 900, name: headerName, field: "UserID", sortable: true },
                                   { id: "UserName", width: 900, name: "User name", field: "UserName", sortable: true ,}
                               ];
    options =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            asyncEditorLoading: false,
            showHeaderRow: true,
            explicitInitialization: true
        };
    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    idfield = "UserID";
    idFieldDesc = "UserName";
    gridwidth = 950;
    gridheight = 550;
    //ShowUsersLookupDesc(lookupInvokerControl, lookupDescriptionControl, actionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, lookupTitle, LookupOperation);
    ShowCommonLookup(actionUrl, actionParameters, columns, "UserLookUp", idfield, lookupTitle, "");
};

function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
    //var cdata = grid.getData();
    if (lookupInvokerControl == "Location") {
        var cdata = grid.getData();
        var item;
        if (SelectedRowData != null)
            item = {
                "LocationID": SelectedRowData.ID,
                "Location": SelectedRowData.Val
            };

        $.extend(gitems, item);

        // Add data to basket if location is modified. 
        if (grid.getActiveCell() != null && dataView.getItem(grid.getActiveCell().row).LibraryID != "")
            isDataUpdated = true;

        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());


        grid.setActiveCell(0, 3);
        grid.editActiveCell();
        grid.setActiveCell(selrow, 0);
        grid.editActiveCell();
        grid.render();

        grid.focus();
    }

    if (lookupInvokerControl == "UserLookUp") {
//     if (!grid.getEditorLock().isActive())
//            grid.getEditorLock().activate(grid.getEditController());
        if (!gridUserDtl.getEditorLock().isActive())
                gridUserDtl.getEditorLock().activate(gridUserDtl.getEditController());

        if (SelectedRowData != null) {
            //debugger;
            var griddata = gridUserDtl.getData().getItems();

            for (var i = 0; i < griddata.length; i++) {
                if (SelectedRowData.UserID.toUpperCase() == griddata[i].UserID.toUpperCase()) {
                    isValidValue = false;

                    //  noty({ text: "User  Name already exists", type: 'information', dismissQueue: false,
                    //    layout: 'bottom', theme: 'defaultTheme'  });
                    showMessage('User  Name already exists.', 'error');

                    //  alert("User  Name already exists");
                    return { valid: false, msg: "User  Name Already Exists" };

                }
            }

            var cdata = dataViewUserDtl.getItems();
            var item = {
                "LibUserLinkId": cdata[0].LibUserLinkId,
                "UserID": SelectedRowData.UserID,
                "UserName": SelectedRowData.UserName,
                "Status": cdata[0].Status
            };
            cdata[0] = item;

           
            dataViewUserDtl.beginUpdate();
            dataViewUserDtl.setItems(cdata);
            dataViewUserDtl.refresh();
            dataViewUserDtl.endUpdate();          
            //gridUserDtl.invalidate();
            gridUserDtl.setActiveCell(0, 0);
                     //gridUserDtl.render();

            // dataViewUserDtl
        }

         if (gridUserDtl.getEditorLock().isActive())
                            gridUserDtl.getEditorLock().deactivate(gridUserDtl.getEditController());
    }

    if (lookupInvokerControl == "StorageLookUp") {

    if (!gridStorageDtl.getEditorLock().isActive())
                gridStorageDtl.getEditorLock().activate(gridStorageDtl.getEditController());


        if (SelectedRowData != null) {
            var cdata = dataViewStorageDtl.getItems();
            var item;
            var nextVal;

            //get next storage to set
            var actionPara = {
                "LibraryID": LibraryID,
                "StorageTypeID": SelectedRowData.ID
            };
            // 

            //    if (maxBoxTypeStorage == null || maxSelfTypeStorage == null) {
            //        
            //    }
            //    else {
            //     
            //    }

            //            if (SelectedRowData.ID == 'BX') {
            //                if (maxBoxTypeStorage == null) {

            //                    $.ajax({
            //                        type: "GET",
            //                        url: urlGetMaxStorage,
            //                        data: actionPara,
            //                        async: false,
            //                        cache: false,
            //                        contentType: "application/json; charset=utf-8",
            //                        dataType: "json",
            //                        success: function (data) {
            //                            maxBoxTypeStorage = data;
            //                        }
            //                    });
            //                }
            //                else {
            //                    var text = maxBoxTypeStorage.substring(0, 3);
            //                    var count = maxBoxTypeStorage.substring(3);
            //                    count++;
            //                    maxBoxTypeStorage = text + count;
            //                }
            //                item = {
            //                    "StorageDetailID": cdata[0].StorageDetailID,
            //                    "LibraryID": cdata[0].LibraryID,
            //                    "LibraryName": cdata[0].LibraryName,
            //                    "StorageTypeID": SelectedRowData.ID,
            //                    "StorageType": SelectedRowData.Val,
            //                    "Storage": maxBoxTypeStorage,
            //                    "CreatedDate": toDate
            //                };
            //                //$.extend(gitemsgridStorage, item);
            //            }
            //            else {
            //                if (maxSelfTypeStorage == null) {
            //                    $.ajax({
            //                        type: "GET",
            //                        url: urlGetMaxStorage,
            //                        data: actionPara,
            //                        async: false,
            //                        cache: false,
            //                        contentType: "application/json; charset=utf-8",
            //                        dataType: "json",
            //                        success: function (data) {
            //                            maxSelfTypeStorage = data;
            //                        }
            //                    });
            //                }
            //                else {
            //                    var text = maxSelfTypeStorage.substring(0, 4);
            //                    var count = maxSelfTypeStorage.substring(4);
            //                    count++;
            //                    maxSelfTypeStorage = text + count;
            //                }
            //                item = {
            //                    "StorageDetailID": cdata[0].StorageDetailID,
            //                    "LibraryID": cdata[0].LibraryID,
            //                    "LibraryName": cdata[0].LibraryName,
            //                    "StorageTypeID": SelectedRowData.ID,
            //                    "StorageType": SelectedRowData.Val,
            //                    "Storage": maxSelfTypeStorage,
            //                    "CreatedDate": toDate
            //                };
            //                //$.extend(gitemsgridStorage, item);
            //            }

            item = {
                "StorageDetailID": cdata[0].StorageDetailID,
                "LibraryID": cdata[0].LibraryID,
                "LibraryName": cdata[0].LibraryName,
                "StorageTypeID": SelectedRowData.ID,
                "StorageType": SelectedRowData.Val,
                "Storage": "",
                "CreatedDate": toDate
            };
            
            cdata[0] = item;
            dataViewStorageDtl.beginUpdate();
            dataViewStorageDtl.setItems(cdata);
            dataViewStorageDtl.endUpdate();
            gridStorageDtl.invalidate();
            gridStorageDtl.setActiveCell(0, 3);
            //gridStorageDtl.editActiveCell();
            //maxBoxTypeStorage = null;
            //maxSelfTypeStorage = null;
            //gridStorageDtl.focus();
            //gridStorageDtl.render();

            //gridStorageDtl.setActiveCell(0, 3);
            //gridStorageDtl.editActiveCell();
            //            dataViewStorageDtl.refresh();
            //            gridStorageDtl.setActiveCell(selrowgridStorage, 0);
            //            gridStorageDtl.editActiveCell();
            //            gridStorageDtl.render();
            //            gridStorageDtl.focus();
        }
    }
};

//var ADUserGrid;
//function ShowUsersLookupDesc(lookupInvokerControl, lookupDescriptionControl, actionUrl, actionParameters, columns, options, idfield, idFieldDesc, gridwidth, gridheight, title, LookupOperation) {
//    //// ////debugger;;
//    var div = document.createElement('div');
//    div.setAttribute('id', 'LookupDesc');

//    var lookupgridvalue;
//    var lookupgridDesc;
//    var userStatus;
//    var managerName;
//    var isADUser = false;
//    var roleFromUserName = "";
//    var colFilters = {};
//    $(div).dialog(
//    {

//        autoOpen: false,
//        height: gridheight,
//        width: gridwidth,
//        modal: true,

//        open: function (event, ui) {

//            SetNonStandardDialogStyles();
//            var myData = [];

//            ShowProgressBar();
//            $.ajax({
//                url: actionUrl,
//                type: "GET",
//                dataType: 'Json',
//                cache: false,
//                async: false,
//                data: actionParameters,

//                success: function (data) {

//                    var message = null;
//                    if (data != null) {
//                        if (data.length > 0)
//                            message = data[0].Message;
//                    }
//                    if (message == null) {
//                        myData = data;
//                        var gridDiv = document.createElement('div');
//                        gridDiv.setAttribute('id', 'gridDiv');
//                        $(gridDiv).css('height', gridheight - 125);
//                        $(gridDiv).css('width', gridwidth - 15);
//                        $('#LookupDesc').append(gridDiv);

//                        //grid = new Slick.Grid("#gridDiv", myData, columns, options);

//                        dataView = new Slick.Data.DataView();
//                        ADUserGrid = new Slick.Grid("#gridDiv", dataView, columns, options);
//                        ADUserGrid.setSelectionModel(new Slick.RowSelectionModel());


//                        ADUserGrid.onClick.subscribe(function (e, args) {
//                            clearAllMessages();
//                            var cell = ADUserGrid.getCellFromEvent(e);
//                            var row = cell.row;
//                            lookupgridvalue = dataView.getItem(row)[idfield];
//                            lookupgridDesc = dataView.getItem(row)[idFieldDesc];
//                            //    if (data[cell.row].RoleList != null && data[cell.row].RoleList.length > 0)
//                            //        roleFromUserName = data[cell.row].RoleList[0].Name;

//                            if (LookupOperation != "RoleFromUser") {

//                                if (LookupOperation == "ADUser") {
//                                    isADUser = true;
//                                }


//                            }

//                        });



//                        ADUserGrid.onSelectedRowsChanged.subscribe(function (e, args) {
//                            clearAllMessages();

//                            if (ADUserGrid.getActiveCell() != null) {
//                                var ccell = ADUserGrid.getActiveCell().cell;
//                                var crow = ADUserGrid.getActiveCell().row;
//                                lookupgridvalue = dataView.getItem(crow)[idfield];
//                                lookupgridDesc = dataView.getItem(crow)[idFieldDesc];

//                            }


//                        });



//                        ADUserGrid.onSort.subscribe(function (e, args) {
//                            SortGrid(args, dataView);
//                        });
//                        dataView.onRowCountChanged.subscribe(function (e, args) {
//                            ADUserGrid.updateRowCount();
//                            ADUserGrid.render();
//                        });

//                        dataView.onRowsChanged.subscribe(function (e, args) {
//                            ADUserGrid.invalidateRows(args.rows);
//                            ADUserGrid.render();
//                        });


//                        $(ADUserGrid.getHeaderRow()).delegate(":input", "change keyup", function (e) {

//                            var columnId = $(this).data("columnId");

//                            if (columnId != null) {

//                                colFilters[columnId] = $.trim($(this).val());
//                                //alert(colFilters[columnId]);    
//                                dataView.refresh();
//                            }
//                        });

//                        ADUserGrid.onKeyDown.subscribe(function (e, args) {
//                            if (e.keyCode == 13) {
//                                AssignUserLookupValue(lookupgridvalue, lookupgridDesc);
//                            }
//                        });

//                        ADUserGrid.onHeaderRowCellRendered.subscribe(function (e, args) {
//                            $(args.node).empty();
//                            $("<input type='text'>")
//                            .data("columnId", args.column.id)
//                            .val(colFilters[args.column.id])
//                            .appendTo(args.node);
//                        });

//                        function filter(item) {
//                            for (var columnId in colFilters) {
//                                if (columnId !== undefined && colFilters[columnId] !== "") {
//                                    var c = ADUserGrid.getColumns()[ADUserGrid.getColumnIndex(columnId)];

//                                    //if not type casted to string, number filtering will throw error
//                                    if (String(item[c.field].toUpperCase()).indexOf(colFilters[columnId].toUpperCase()) != 0) {
//                                        //if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) 
//                                        // {
//                                        return false;
//                                        //  }
//                                    }

//                                }
//                            }
//                            return true;
//                        }


//                        ADUserGrid.init();
//                        dataView.beginUpdate();
//                        dataView.setItems(data, 'UserId');
//                        dataView.setFilter(filter);
//                        dataView.endUpdate();
//                        ADUserGrid.setActiveCell(0, 0);
//                        ///////////////////////////////////// set first row data /////////////////////////////
//                        if (data.length > 0) {
//                            lookupgridvalue = data[0][idfield];
//                            lookupgridDesc = data[0][idFieldDesc];
//                            if (data[0].RoleList != null && data[0].RoleList.length > 0)
//                                roleFromUserName = data[0].RoleList[0].Name;

//                            if (LookupOperation != "RoleFromUser") {

//                                if (LookupOperation == "ADUser") {
//                                    isADUser = true;
//                                }

//                                $.ajax({
//                                    url: menUserDetailAtionUrl,
//                                    type: "GET",
//                                    dataType: 'Json',
//                                    async: false,
//                                    cache: false,
//                                    data: { userName: lookupgridDesc, isAdUser: isADUser },
//                                    success: function (data) {
//                                        myData = data;
//                                        if (LookupOperation == "ADUser") {
//                                            lookupgridDesc = data.UserNameDesc;
//                                        }
//                                        departmentName = data.DepartmentName;
//                                        managerName = data.ManagerName;
//                                        strSelectedUserActive = data.SelectedUserActive;
//                                        userStatus = data.UserStatus;
//                                    }, //end of success
//                                    error: function () {
//                                        RemoveProgressBar();
//                                        alert("error");
//                                    } //end of error
//                                });  //end of ajax call
//                            }

//                            lookupgridDesc = data[0][idFieldDesc];
//                        }
//                        var rowCount = 0;
//                        if (data != null)
//                            rowCount = data.length;
//                        var totalrecord = $('<br/><label>Total number of rows displayed: ' + rowCount + '</label><br/>');
//                        $('#LookupDesc').append(totalrecord);
//                        ADUserGrid.focus();
//                    }
//                    else {
//                        var errorMessage = "";
//                        for (var index = 0; index < data.length; index++) {
//                            if (errorMessage == "")
//                                errorMessage = data[index].Message;
//                            else
//                                errorMessage = errorMessage + "<br/>" + data[index].Message;
//                        }
//                        if (errorMessage != "") {

//                            // noty({ text: errorMessage, type: 'error', dismissQueue: true,
//                            //       layout: 'bottom', theme: 'defaultTheme'


//                            //});

//                            showMessage(errorMessage, 'error');
//                        }
//                    }
//                    RemoveProgressBar();
//                }, //end of success
//                error: function () {
//                    RemoveProgressBar();
//                    alert("error");
//                } //end of error
//            });  //end of ajax call
//        },

//        buttons: {
//            "OK": function () {

//                AssignUserLookupValue(lookupgridvalue, lookupgridDesc);

//            },
//            "Cancel": function () {
//                //   $(lookupInvokerControl).focus();
//                RemoveProgressBar();
//                $(this).dialog("close");
//                $(div).remove();
//            }
//        },
//        close: function () {
//            //   $(lookupInvokerControl).focus();
//            RemoveProgressBar();
//            $(div).remove();

//        }

//    });

//    $(div).dialog("open");


//};




//function AssignUserLookupValue(lookupgridvalue, lookupgridDesc) {
//    //// //debugger;;

//    //alert(lookupgridvalue+"  "+ lookupgridDesc);
//    $('#LookupDesc').dialog("close");

//    if (!gridUserDtl.getEditorLock().isActive())
//        gridUserDtl.getEditorLock().activate(gridUserDtl.getEditController());

//    var cdata = dataViewUserDtl.getItems();
//    var item = {
//        "UserID": lookupgridvalue,
//        "UserName": lookupgridDesc,
//        "Status": cdata[0].Status

//    };
//    cdata[0] = item;

//    // var row = dataViewUserDtl.getItem(0);
//    //row[gridUserDtl.getColumns()[0].UserID] = lookupgridvalue;
//    //  ADUserGrid.invalidate();
//    //    grid.invalidate();
//    //   gridUserDtl.invalidate();
//    //   gridUserDtl.focus();
//    //  gridUserDtl.setActiveCell(0, 0);
//    // gridUserDtl.editActiveCell();
//    dataViewUserDtl.beginUpdate();
//    dataViewUserDtl.setItems(cdata);
//    dataViewUserDtl.endUpdate();
//    //gridUserDtl.render();
//    gridUserDtl.invalidate();

//    // dataViewUserDtl


//};


//not used
function GetUserCredential() {
    $.noty.closeAll();
    var div = document.createElement('div');
    div.setAttribute('id', 'LookupDesc');

    actionParameters = { userName: "" };

    $(div).dialog(
    {

        autoOpen: false,
        height: 200,
        width: 400,
        modal: true,
        title: "Please enter user Credential.",

        open: function (event, ui) {


            SetNonStandardDialogStyles();
            //$("span.ui-dialog-title").text("Please enter user Credential.");
            $(".ui-dialog-content").css("padding", 0);
            var myData = [];
            var grid;
            var select = document.createElement('select');
            select.setAttribute('id', 'LookupDescd');
            var button = document.createElement('button');
            button.setAttribute('id', 'button1');

            var screenWidth = window.screen.availWidth;


            var table = $('<table></table>');
            var row = $('<tr></tr>');
            var column0 = $('<td id=column0  width=5></td>');
            var column1 = $('<td id=column1  width=100></td>');
            var column2 = $('<td id=toinsert  width=5></td>');
            var column3 = $('<td id=column3 width=100></td>');


            row.append(column0);
            row.append(column1);
            row.append(column2);
            row.append(column3);
            table.append(row);
            $('#LookupDesc').append(table);

            ////////////////////////// Add Buttons////////////////////////////////
            column1.append("<br/>");
            column1.append("<br/>");
            column3.append("<br/>");
            column3.append("<br/>");
            var lblUserName = $("<label id=lblUserName>User Name</label>");
            lblUserName.appendTo("#column1");
            column1.append("<br/>");
            var lblPassword = $("<label>Password</label>");
            lblPassword.appendTo("#column1");
            column1.append("<br/>");

            var txtUserName = $("<input id=txtUserName1 type=text class=inputTextLarge />");
            txtUserName.blur(function () {
                userName = $('#txtUserName1').val();
            });

            txtUserName.appendTo("#column3");
            column3.append("<br/>");

            var txtPassword = $("<input id=txtPassword type=password class=inputTextLarge />");
            txtPassword.blur(function () {
                password = $("#txtPassword").val();
            });
            txtPassword.appendTo("#column3");
            column3.append("<br/>");

            $('#txtUserName').focus();

        },

        buttons: {
            "Save": function () {

                if (userName != "" && password != "") {
                    var isValid = false;
                    var actionParameters = { userName: userName, password: password }
                    $.ajax({
                        url: setUserCredentialAtionUrl,
                        type: "GET",
                        dataType: 'Json',
                        async: false,
                        cache: false,
                        data: actionParameters,
                        contentType: 'application/json; charset=UTF-8',
                        success: function (data) {
                            if (data.Data != null) {
                                userName = data.Data.userName;
                                password = data.Data.password;
                                isValid = true;
                                //ShowADUserList();

                            }
                            else {
                                userName = "";
                                password = "";
                                var message = null;
                                if (data != null) {
                                    if (data.length > 0)
                                        message = data[0].Message;
                                }
                                if (errorMessagePanel != null && errorMessagePanel != undefined) {
                                    if (!errorMessagePanel.closed)
                                        errorMessagePanel.setText(message);
                                    else {
                                        //  errorMessagePanel = noty({ text: message, type: 'warning', dismissQueue: true,
                                        //    layout: 'bottom', theme: 'defaultTheme'
                                        // });

                                        showMessage(message, 'error');
                                    }
                                }
                                else {
                                    //errorMessagePanel = noty({ text: message, type: 'error', dismissQueue: true,
                                    //  layout: 'bottom', theme: 'defaultTheme'
                                    //});
                                    showMessage(message, 'error');


                                }
                            }
                        }, //end of success
                        error: function (error) {
                            alert(error);
                        } //end of error
                    });    //end of ajax call
                    if (isValid)
                        $(this).dialog("close");
                    //   $('#txtUserID').focus();
                }
            },
            "Cancel": function () {
                // RemoveProgressBar();
                $(this).dialog("close");
                $(div).remove();
                //   $('#txtUserID').focus();
            }
        },
        close: function () {
            RemoveProgressBar();
            $(div).remove();
            //   $('#txtUserID').focus();
        }

    });

    $(div).dialog("open");
};
