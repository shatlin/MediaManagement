var selectedvalue;
var lookupInvokerControl;
var Lookuptitle;
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
var progressbar_x;
var progressbar_y;
var dataView;
var UpData = [];
var emptyrow = [];
var visiblecolumns = [];
var gitems;
var itemtoupdate = [];
var selrow;
var cellvalue;

var members = [];
var gridData = [];
var lovGridContainerDiv=""
var columnFilters = {};
var changedrow = -1;
var newrowids = -1;
var userList = [];
var licenseeList = [];
var companyNameList = [];
var lookupgridvalue;
var listName;
var previousRow=0;
var resetflag = 0;
var UserName;
var CompanyName;
var LicenseeName;
var UserNumber=-1;

$(function () {

    shortcut.add("F9", function () {
        if ($("#mindpackUsername").is(":focus")) {
            OpenActiveUserLookup();
        }
        if ($("#repCompanyname").is(":focus")) {
            OpenCompNameLookup();
        }
        if ($("#repLicense").is(":focus")) {
            OpenLicenseeDetailsLookup();
        }
    });

    $("#AmortMethodLookupIcon1").click(function () {
        OpenActiveUserLookup();
    });
    $("#AmortMethodLookupIcon2").click(function () {
        OpenCompNameLookup();
    });
    $("#AmortMethodLookupIcon3").click(function () {
        OpenLicenseeDetailsLookup();
    });
    shortcut.add("F10", function () {
        find_click();
    });

    shortcut.add("F7", function () {
        resetonF7key();
    });
    
    showemptygrid();
    ShowManageRolesGrid();

});

function showemptygrid() {
    var emptyrow = [];
    emptyrow [0] = {
        UserName: "",
        RepCompanyName: "",
        RepLicensee: "",
        SignQA: "",
        DefaultUser: "",
        EditDM: "",
        SignDM: "",
        Buyer: "",
        SuperUser: ""
    };
    setGridParameters();
    gridwidth = $(gridContainerDiv).width();
    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });
    var emptygridoptions = {
            forceFitColumns: true
    };
    grid = new Slick.Grid(gridContainerDiv, emptyrow, visiblecolumns, emptygridoptions);
    emptyrow = "";
}
function setGridParameters() {
    gridContainerDiv = "#teamGrid";
    ToggleButton = "#";
    columns = [
                        { id: "UserNumber", name: "UserNumber", field: "UserNumber" }
                     ];
    visiblecolumns = [
                        { id: "UserName", name: "Media UserName", field: "UserName", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: UserNameValidator },
                        { id: "RepCompanyName", name: "Representing Company", field: "RepCompanyName", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: CompanyNameValidator },
                        { id: "RepLicensee", name: "Representing Licensee", field: "RepLicensee", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: LicenseeValidator },
                        { id: "SignQA", name: "Sign QA", field: "SignQA", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "cell-text-align" },
                        { id: "DefaultUser", name: "Default User", field: "DefaultUser", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "cell-text-align" },
                        { id: "EditDM", name: "Edit DMs", field: "EditDM", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "cell-text-align" },
                        { id: "SignDM", name: "Sign DMs", field: "SignDM", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "cell-text-align" },
                        { id: "Buyer", name: "Buyer", field: "Buyer", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "cell-text-align" },
                        { id: "SuperUser", name: "Super User", field: "SuperUser", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "cell-text-align" }
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

    actionParameters = {
        mindpackUsername: $("#mindpackUsername").val(),
        repCompanyname: $("#repCompanyname").val(),
        repLicense: $("#repLicense").val()
    };
    idfield = "UserNumber";
    gridwidth = 600;
    gridheight = 410;
}
function ShowManageRolesGrid() {
    clearAllMessages();
    setGridParameters();
    gridwidth = $(gridContainerDiv).width();
    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });
    ShowProgressBar();

    $.ajax({
        url: SearchAllDetails,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,
        cache:false,
        success: function (data) {
            if (data.length == 0) {
                noty({ text: 'No data found !', type: 'information', dismissQueue: false,
                    layout: 'bottom', theme: 'defaultTheme'
                });
            }
            displayGrid(data);
        },
        error: function () {
            RemoveProgressBar();
            noty({ text: 'error fetching data.Please try again !', type: 'information', dismissQueue: false,
                layout: 'bottom', theme: 'defaultTheme'
            });
        }
    });
    RemoveProgressBar();                 //end of ajax call
    return selectedvalue;
}

function displayGrid(data) {
    
    gridData = data;
    var isEnterKeyPress = false;
    var typevalue = "";
    dataView = new Slick.Data.DataView();
    grid = new Slick.Grid(gridContainerDiv, dataView, visiblecolumns, options);
    grid.setSelectionModel(new Slick.RowSelectionModel());
    if (visiblecolumns != null) {
        grid.setColumns(visiblecolumns);
    }

    if (data.length == 0) {
        data = [];
        //setfooter(gridContainerDiv, row , 0);
    }
    else {

        selectedRole = data[0];
        if (grid.getActiveCell() != null)
            setfooter(gridContainerDiv, grid.getActiveCell().row, data.length - 1);
        
    }
//    else {
//        selectedRole = data[0];
//        if(grid.getActiveCell()!=null)
//        setfooter(gridContainerDiv, grid.getActiveCell().row, data.length-1);
    //    }
//    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
//        typevalue = args.editor.getValue();
//        var cell = grid.getCellFromEvent(e);
//        if (cell != null) {
//            var row = cell.row;
//            var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
//            data[row][fieldName] = typevalue;
//        }

//    });
    grid.onClick.subscribe(function (e, args) {
        clearAllMessages();
        var cell = grid.getCellFromEvent(e);
        var row = cell.row;
        selectedRole = data[cell.row];
        setfooter(gridContainerDiv, row, dataView.getLength());
        if (row == 0 && cell.cell == 0) {
            data[0].UserName = "";
            data[0].RepCompanyName = "";
            //data[0].RepLicensee = "";
            //            grid.setActiveCell(1, 0);
            //            grid.editActiveCell();
            //            grid.setActiveCell(1, 0);
            //            grid.editActiveCell();
        }
    });

    grid.onSort.subscribe(function (e, args) {
        Remove_Addrow();
        SortGrid(args, dataView);
        Create_Addrow();
        grid.setActiveCell(1, 0);
        grid.editActiveCell();
    });

    //FilterGrid(grid, dataView);
    FilterGridWithRowCount(grid, dataView, gridContainerDiv);
    grid.onKeyDown.subscribe(function (e, args) {
        
        if (e.keyCode == 120) {
            if (grid.getColumns()[args.cell].id == "UserName" || grid.getColumns()[args.cell].id == "UserID") {
                if (grid.getEditorLock().isActive())
                    grid.getEditorLock().deactivate(grid.getEditController());
                selrow = args.row;
                gitems = data[args.row];
                selectedrow = data[selrow];
                cellvalue = data[args.row].UserName;
                lovGridContainerDiv = "UserNameLOV";
                OpenUsersLookup();
            }
            if (grid.getColumns()[args.cell].id == "RepCompanyName") {
                if (grid.getEditorLock().isActive())
                    grid.getEditorLock().deactivate(grid.getEditController());
                selrow = args.row;
                gitems = data[args.row];
                selectedrow = data[selrow];
                cellvalue = data[args.row].RepCompanyName;
                lovGridContainerDiv = "CompanyLOV";
                OpenCompanyLookup();
            }
            if (grid.getColumns()[args.cell].id == "RepLicensee") {
                if (grid.getEditorLock().isActive())
                    grid.getEditorLock().deactivate(grid.getEditController());
                selrow = args.row;
                gitems = data[args.row];
                selectedrow = data[selrow];
                cellvalue = data[args.row].RepLicensee;
                lovGridContainerDiv = "LicenseeLOV";
                OpenLicenseeLookup();

            }
        }
        if (e.keyCode == 13) {
            
            if ((grid.getActiveCell() != null) && (changedrow > -1)) {
                if (changedrow == 0) {
                    data[changedrow].UserNumber = newrowids;
                    if (grid.getCellEditor() != null) {
                        var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
                        data[changedrow][fieldName] = grid.getCellEditor().getValue();
                    }
                    // data[changedrow].UserNumber = newrowids;
                    data.splice(1, 0, data[changedrow]);
                    //data.push(data[args.row]);
                    AddToBasket(data[changedrow], "Added");
                    newrowids = newrowids - 1;
                    var item = {
                        "UserNumber": "new row",
                        "UserName": "    Click here to add a",
                        "RepCompanyName": "new row",
                        "RepLicensee": "",
                        "SignQA": false,
                        "SuperUser": false,
                        "DefaultUser": false,
                        "EditDM": false,
                        "Buyer": false
                    };
                    data[0] = item;
                    dataView.refresh();
                    grid.render();
                    isEnterKeyPress = true;
                    //grid.setActiveCell(0, 0);
                    // grid.editActiveCell();
                    grid.setActiveCell(1, 0);
                    grid.editActiveCell();
                    grid.render();
                }
                changedrow = -1;
                setfooter(gridContainerDiv, row, data.length - 1);

            }
        }
    });

    grid.onSelectedRowsChanged.subscribe(function (e, args) {
        
        if (grid.getActiveCell() != null) {
            if (grid.getActiveCell().row == previousRow) {
                return;
            }
            previousRow = grid.getActiveCell().row;
        }
        if (isEnterKeyPress && (grid.getActiveCell() != null) && (grid.getActiveCell().row == 1 && grid.getActiveCell().cell == 0)) {
            isEnterKeyPress = false;
            grid.setActiveCell(0, 0);
            grid.editActiveCell();
            grid.render();
        }
        if ((grid.getActiveCell() != null) && (changedrow > -1) && (changedrow != grid.getActiveCell().row)) {
            
            if (changedrow == 0) {
                var status = "";
                data[changedrow].UserNumber = newrowids;
                data.splice(1, 0, data[changedrow]);
                newrowids = newrowids - 1;
                if (data[changedrow].UserNumber < 0)
                    status = "Added";
                else
                    status = "Modified";
                AddToBasket(data[changedrow], status);
                grid.setActiveCell(1, 0);
                grid.editActiveCell();
                grid.focus();
            }
            else if (changedrow > 0) {
                var status = "";
                if (data[changedrow].UserNumber < 0)
                    status = "Added";
                else
                    status = "Modified";
                AddToBasket(data[changedrow], status);
                grid.focus();
            }
            changedrow = -1;
        }
        if (grid.getActiveCell() != null)
            setfooter(gridContainerDiv, grid.getActiveCell().row, dataView.getLength());
            //FilterGridWithRowCount(grid, dataView, gridContainerDiv);
    });


    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
    });


    grid.onCellChange.subscribe(function (e, args) {
        changedrow = args.row;
       
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
    if (data.length == 0) {
        data = [];
       // setfooter(gridContainerDiv, row, 0);
    }
    grid.init();
    var item = {
        "UserNumber": "new row",
        "UserName": "    Click here to add a",
        "RepCompanyName": "new row",
        "RepLicensee": "",
        "SignQA": false,
        "SuperUser": false,
        "DefaultUser": false,
        "EditDM": false,
        "Buyer": false
    };
    
    data.splice(0, 0, item);
    dataView.beginUpdate();
    dataView.setItems(data, 'UserNumber');
    dataView.setFilter(filter);
    grid.setActiveCell(1, 0);
    dataView.endUpdate();
    dataView.refresh();
    var rows = [];
    rows.push(0);
    grid.setSelectedRows(rows);
    grid.focus();
    grid.setActiveCell(1, 0);
    if (data.length > 1) {
        setfooter(gridContainerDiv, grid.getActiveCell().row, data.length - 1);
    }
    else {
        setfooter(gridContainerDiv, 0, data.length - 1);
    }
    if (!grid.getEditorLock().isActive()) {
        grid.editActiveCell();
    }
}


// Show Grid Method.
function Remove_Addrow() {
    dataView.deleteItem("new row");
}
// Add Blank row for new record.
function Create_Addrow() {
  var item = {
               "UserNumber":"new row",
               "UserName" :"    Click here to add a",
               "RepCompanyName" :"new row",
               "RepLicensee" :"",
               "SignQA" :false,
               "SuperUser" :false,
               "DefaultUser" :false,
               "EditDM" : false,
               "Buyer" : false
            };
   //var item = { "UserNumber": "new row", "UserName": "    Click here to add a", "RepCompanyName": "new row" };
    dataView.insertItem(0, item);
}

// Slick Grid User Cell Look ups Methods.
function OpenUsersLookup() {
    
    if (grid.getActiveCell().row == 0) {
        var typeValue = grid.getCellEditor().getValue();
    }
        idfield='UserID';
        listName = "ActiveUserLookupList";
        var activeParameter = { filterValue: typeValue };
        lookupInvokerControl="UserName";
       columns = [
                       { id: "UserID", width: 900, name: "User ID", field: "UserID" },
                       { id: "UserName", width: 900, name: "User Name", field: "UserName" }
       ];
         Lookuptitle = "User Details";
         ShowCommonLookup(ActiveUserDetailsUrl, activeParameter, columns, lookupInvokerControl, idfield, Lookuptitle, listName)
}
function setUsers(selectedvalue) {
    
    if (selectedvalue != null) {
        var cdata = grid.getData();
        var item;
        item = {
            "UserName": selectedvalue.UserID
        };
        $.extend(gitems, item);
        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());
        grid.focus();
        grid.editActiveCell();
        grid.render();
    }
}; 
// Slickgrid Company Name Slick grid Cell Look up method.
function OpenCompanyLookup() {
    
    if (grid.getActiveCell().row == 0) {
        var typeValue = grid.getCellEditor().getValue();
    }
        idfield='ComShortName';
        listName = "UserCompLookupList";
        lookupInvokerControl="ComShortName";
        var activeParameter = { filterValue: typeValue };
        columns =   [
                           { id: "ComShortName", width: 900, name: "Company Code", field: "ComShortName" },
                           { id: "ComName", width: 900, name: "Company Name", field: "ComName" }
                    ];
    Lookuptitle = "Company Name Details";
    ShowCommonLookup(CompanyNameDetailsUrl, activeParameter, columns, lookupInvokerControl, idfield, Lookuptitle, listName)
}
function setCompany(selectedvalue) {
    if (selectedvalue != null) {
        var cdata = grid.getData();
        var item;
        item = {
            "RepCompanyName": selectedvalue.ComShortName
        };
        $.extend(gitems, item);
        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());
        grid.focus();
        grid.editActiveCell();
        grid.render();
    }
}; 

// Slickgrid Lincesee Name Slick grid Cell Look up method.
function OpenLicenseeLookup() {
    
    if (grid.getActiveCell().row == 0) {
        var typeValue = grid.getCellEditor().getValue();
    } 
        idfield='LicenseeShortName';
        listName = "LicenseeLookupItemList";
        var activeParameter = { filterValue: typeValue };
        var columns =       [
                                { id: "LicenseeShortName", width: 900, name: "Licensee Code", field: "LicenseeShortName", sortable: true },
                                { id: "LicenseeName", width: 900, name: "Licensee Name", field: "LicenseeName", sortable: true }
                            ];
        Lookuptitle = "Licensee Details";
        ShowCommonLookup(LicenseeDetailsUrl, activeParameter, columns, "LicenseeShortName", idfield, Lookuptitle, listName);
}
function setLicensee(selectedvalue) {
    if (selectedvalue != null) {
        var cdata = grid.getData();
        var item;
        item = {
            "RepLicensee": selectedvalue.LicenseeShortName
        };
        $.extend(gitems, item);
        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());
        grid.focus();
        grid.editActiveCell();
        grid.render();
    }
};

function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
    if (lookupInvokerControl == "UserName") {
        setUsers(SelectedRowData);
    }
    else if (lookupInvokerControl == "ComShortName") {
        setCompany(SelectedRowData);
    }
    else if (lookupInvokerControl == "LicenseeShortName") {
        setLicensee(SelectedRowData);
    }
    else {
        if (SelectedRowData != null) {
            $(lookupInvokerControl).val(SelectedRowData[idfield]);
        }
        $(lookupInvokerControl).focus();
    }
}

//Look ups Code for textboxs.
function OpenActiveUserLookup() {
    
    var lookupDataViewUser = "";
    listName = "ActiveUserLookupList";
    lookupInvokerControl = "#mindpackUsername";
    actionParameters = { mindpackUsername: $("#mindpackUsername").val() };
    columns = [
                       { id: "UserID", width: 900, name: "User ID", field: "UserID" },
                       { id: "UserName", width: 900, name: "User Name", field: "UserName" }
               ];
    var options = {
        enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true
    };
    idfield = "UserID";
    gridwidth = 1000;
    gridheight = 400;
    Lookuptitle = "User Details";
    ShowCommonLookup(ActiveUserDetailsUrl, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle, listName)
};

function OpenCompNameLookup() {
    listName = "UserCompLookupList";
    lookupInvokerControl = "#repCompanyname";
    actionParameters = { mindpackUsername: $("#repCompanyname").val() };
    columns = [
                                    { id: "ComShortName", width: 900, name: "Company Code", field: "ComShortName" },
                                    { id: "ComName", width: 900, name: "Company Name", field: "ComName" }

                               ];
    var options = {
        enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true

    };
    idfield = "ComShortName";
    gridwidth = 1000;
    gridheight = 400;
    Lookuptitle = "Company Name Details";
    ShowCommonLookup(CompanyNameDetailsUrl, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle, listName)
};

function OpenLicenseeDetailsLookup() {
    listName = "LicenseeLookupItemList";
    lookupInvokerControl = "#repLicense";
    actionParameters = { mindpackUsername: $("#repLicense").val() };
    columns = [
                    { id: "LicenseeShortName", width: 900, name: "Licensee Code", field: "LicenseeShortName" },
                    { id: "LicenseeName", width: 900, name: "Licensee Name", field: "LicenseeName" }
              ];

    var options = 
    {
        enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true

    };
    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    idfield = "LicenseeShortName";
    gridwidth = 1000;
    gridheight = 400;
    Lookuptitle = "Licensee Details";
    ShowCommonLookup(LicenseeDetailsUrl, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle, listName)
};



// Reset Button click Event.
function reset_click() {
    clearAllMessages();
    $('#mindpackUsername').val("");
    $('#repCompanyname').val("");
    $('#repLicense').val("");
    displayGrid("");
}

function resetonF7key() {
    clearAllMessages();
    if (resetflag == 0) {
        UserName = $("#mindpackUsername").val();
        $('#mindpackUsername').val("");
        CompanyName = $("#repCompanyname").val();
        $('#repCompanyname').val("");
        LicenseeName = $("#repLicense").val();
        $('#repLicense').val("");
        displayGrid("");
        resetflag = 1;
    }
    else if (resetflag == 1) {
        $('#mindpackUsername').val(UserName);
        $('#repCompanyname').val(CompanyName);
        $('#repLicense').val(LicenseeName);
        //resetflag = 0;
    }
}

// Search Button Method.
function Search_DealMemo() {
    setGridParameters();
    ShowManageRolesGrid();
};

function PrepareGridtoSave() {
//    //to save data if user changed a cell and clicked directly on save button
    var row = grid.getActiveCell().row;
    var cell = grid.getActiveCell().cell;
//    grid.focus();
//    if (row == (grid.getDataLength() - 1)) {
//            grid.gotoCell(row - 1, cell, true);
//    }
//    else {
//          grid.gotoCell(row + 1, cell, true);
//    }
//                grid.gotoCell(row, cell, true);
    var currentrow = grid.getSelectedRows()[0];
    grid.gotoCell(currentrow , cell +1, true);
    grid.gotoCell(currentrow , cell, true);
    var dataViewUserData = dataView.getItems();
    UserNumber = dataViewUserData[currentrow].UserNumber;
    //dataViewUserData[currentrow].UserNumber=UserNumber;
    if (currentrow == 0) {
//        if (dataViewUserData[currentrow].UserNumber != null) {
            dataViewUserData[currentrow].UserNumber = -1;   
            AddToBasket(dataViewUserData[0], "Added");
//        }
    }
    else {
        if (dataViewUserData[currentrow].UserNumber !=-1) {
            AddToBasket(dataViewUserData[currentrow], "Modified");
        }
    }

}

// METHOD USED FOR SAVING BUTTON CLICK
function find_click() {
    
    PrepareGridtoSave();
    AddSelectedRowToBasket();
    $.noty.closeAll();
    if (UpData.length == 0) {
        showMessage("No changes to save !", "information");
    }
    else if (IsValidForm()) {
        PostData();
    }
};

function IsValidForm() {
    var isValid = true;
    if (UpData != null) {
        for (var index = 0; index < UpData.length; index++) {
            if (UpData[index].UserName.replace(/^\s+|\s+$/g,'') == "") {
                isValid = false;
//                noty({ text: "Please enter User name.", type: 'information', dismissQueue: false,
//                    layout: 'bottom', theme: 'defaultTheme'
                //                });
                showMessage("Please enter User name.", "information");
                break;
            }
            if (UpData[index].RepCompanyName.replace(/^\s+|\s+$/g, '') == "") {
                isValid = false;
//                noty({ text: "Please enter Company name.", type: 'information', dismissQueue: false,
//                    layout: 'bottom', theme: 'defaultTheme'
                //                });
                showMessage("Please enter Company name.", "information");
                break;
            }
            if (UpData[index].RepLicensee.replace(/^\s+|\s+$/g, '') == "") {
                isValid = false;
//                noty({ text: "Please enter Licensee name.", type: 'information', dismissQueue: false,
//                    layout: 'bottom', theme: 'defaultTheme'
                //                });
                showMessage("Please enter Licensee name.", "information");
                break;
            }
        }
    }
    return isValid;
};

function AddSelectedRowToBasket() {
//    dataView.refresh();
//    grid.render();
    if (grid.getActiveCell() != null) {
        if (grid.getActiveCell().row >= 0) {
            var data = grid.getData().getItem(grid.getActiveCell().row);
            var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
            if (grid.getCellEditor() != null) {
                data[fieldName] = grid.getCellEditor().getValue();
            }

            if (data != null) {
                var status = "";
                if (data.UserNumber < 0) {
                    status = "Added";
            }
            else {
                    status = "Modified";
            }
           AddToBasket(data, status);
         }
      }
    }
};

// METHOD USED FOR SAVING
function AddToBasket(item, status) {
    // If data array [UpData] is empty then add item directly otherwise check for existing item to avoid duplicate
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
            if (UpData[i]["UserNumber"] == item["UserNumber"]) {
                UpData.splice(i, 1);
            }
        }
        item1 = { "PersistFlag": status };
        $.extend(item, item1);
        UpData.push(item);
    }
}


// METHOD USED FOR SAVING
function PostData() {
    
    var dataToSend = JSON.stringify(UpData);
    $.ajax({
        url: SaveAllDetails,
        type: "POST",
        data: dataToSend,
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                if (data.UserList != null) {
                    for (var index = 0; index <= data.UserList.length - 1; index++) {
                        $.extend(UpData[index], data.UserList[index]);
                        //UpData[index].UserNumber = data.UserList[index].UserNumber;
                    }
                }
                DisplayAppMessages(data.AppMessages);
                UpData = [];
            }

        },
        error: function () {
            //            noty({ text: "error at the time of saving data.Please try again.", type: 'information', dismissQueue: false,
            //                layout: 'bottom', theme: 'defaultTheme'
            //            });
            showMessage("error at the time of saving data.Please try again.", "information");
        }
    });

}

// User Name Validations.
function UserNameValidator(value) {
    
    var no;
    var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "User Name is required" };
    }

    if (userList.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            url: ActiveUserDetailsUrl,
            type: "POST",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    userList = data.ActiveUserLookupList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
//                noty({ text: "error for fetching user list.", type: 'information', dismissQueue: false,
//                    layout: 'bottom', theme: 'defaultTheme'
                //                });
                showMessage("error for fetching user list.", "information");
            }
        });
    }

    if ((userList == null))
        userList = [];
    if ((userList != null) && userList.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < userList.length; i++) {
            if (value.toUpperCase() == userList[i].UserName) {
                
                isValidValue = true;
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "User Name Invalid" };
        }
        else
            return { valid: true, msg: "" };
    }
}

// Company Name Validations
function CompanyNameValidator(value) {
    var no;
    var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Company Name is required" };
    }

    if (companyNameList.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            url: CompanyNameDetailsUrl,
            type: "POST",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    companyNameList = data.UserCompLookupList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
//                noty({ text: "error for fetching company list.", type: 'information', dismissQueue: false,
//                    layout: 'bottom', theme: 'defaultTheme'
                //                });
                showMessage("error for fetching company list.", "information");
            }
        });
    }

    if ((companyNameList == null))
        licenseeList = [];
    if ((companyNameList != null) && companyNameList.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < companyNameList.length; i++) {
            if (value.toUpperCase() == companyNameList[i].ComShortName) {
                isValidValue = true;
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Company Code" };
        }
        else
            return { valid: true, msg: "" };
    }
}
// Lincesee Validations
function LicenseeValidator(value) {
    var no;
    var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Licensee Name is required" };
    }
    if (licenseeList.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            url: LicenseeDetailsUrl,
            type: "POST",
            dataType: "json",
            data: activeParameter,
            success: function (data) {
                if (data != null) {
                    licenseeList = data.LicenseeLookupItemList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
//                noty({ text: "error for fetching Licensee detail list.", type: 'information', dismissQueue: false,
//                    layout: 'bottom', theme: 'defaultTheme'
                //                });
                showMessage("error for fetching Licensee detail list.", "information");
            }
        });
    }

    if ((licenseeList == null))
        licenseeList = [];
    if ((licenseeList != null) && licenseeList.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < licenseeList.length; i++) {
            if (value.toUpperCase() == licenseeList[i].LicenseeShortName) {
                isValidValue = true;
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Licensee Name" };
        }
        else
            return { valid: true, msg: "" };
    }
}



