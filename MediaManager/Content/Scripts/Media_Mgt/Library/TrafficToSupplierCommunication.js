var progressbar_x;
var progressbar_y;
var dataView;
var grid;
var roleid;
var selectedvalue;
var x;
var UpData = [];
var emptyrow = [];
var visiblecolumns = [];
var selectedvalue = [];
var gridContainerDiv;
var ToggleButton;
var columns;
var options;
var actionParameters;
var idfield;
var gridwidth;
var gridheight;
var dataView;
var selectedRoletitle;
var selectedRoleno;
var members = [];
var selectedRole = "";
var roleList = [];
var columnFilters = {};

var id = -1;
var supplierName = "";
var materialID = "";
var materialName = "";
var resetflag = 0;
var changedrow = -1;
var newrowids = -1;
var gitems;
var selrow;
var materialList = {};
var materialListForValidation = [];
var materialTyepListForValidation = [];
var modeOfCommuListForValidation = [];
var data = [];
$(function () {




    //    showemptygrid();    
    //    ShowManageRolesGrid();
    setGridParameters();
    DisplayGrid("");




    $("#LookupIconSupplier").click(function () {
        loadSupplierLookupTextBox();
    });

    $("#LookupIconMaterialID").click(function () {
        loadMaterialIDTextBox();
    });

    //    $("#LookupIconMaterialName").click(function () {

    //        loadMaterialNameTextBox();
    //    });





    shortcut.add("F7", function () {
        ResetControls();
    });


    shortcut.add("F8", function () {
        find_click();

    });

    shortcut.add("F10", function () {
        Save();

    });

    shortcut.add("F9", function () {


        if ($("#Supplier").is(":focus")) {
            loadSupplierLookupTextBox();
        }

        if ($("#MaterialId").is(":focus")) {

            loadMaterialIDTextBox();
        }

        //        if ($("#MaterialName").is(":focus")) {
        //            
        //            loadMaterialNameTextBox();
        //        }


    });


});

function ResetControls() {
    $.noty.closeAll();
    if (resetflag == 0) {
        supplierName = $("#Supplier").val();
        $("#Supplier").val("");
        materialID = $("#MaterialId").val();
        $("#MaterialId").val("");
       materialName = $("#MaterialName").val();
      $("#MaterialName").val("");
        resetflag = 1;   
    }
    else if (resetflag == 1) {
        $("#Supplier").val(supplierName);
        $("#MaterialId").val(materialID);
        $("#MaterialName").val(materialName);
        resetflag = 0;
    }
};

function Reset() {
    $.noty.closeAll();
    if (grid.getEditorLock().isActive())
        grid.getEditorLock().deactivate(grid.getEditController());
    //supplierName = "";
    //supplierName = $("#Supplier").val();
    $("#Supplier").val("");
    //supplierName = "";
    //materialID = $("#MaterialId").val();
    $("#MaterialId").val("");
   // supplierName = "";
    //materialName = $("#MaterialName").val();
    $("#MaterialName").val("");
    resetflag = 0;
    DisplayGrid("");
};

function find_click() {
    $.noty.closeAll();
    if ($("#Supplier").val() == "" && $("#MaterialId").val() == "" && $("#MaterialName").val() == "") {
    setTimeout(function () {
        noty({
                text: 'No search criteria has been selected. Do you want to see all the records from the system?',
                modal: false,           
                type: 'alert',
                buttons: [
                { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                    $noty.close();
                    Search();
                }
                },
                { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
                    $noty.close();
                }
                }
              ]
        });
    }, 400);  
    }
    else {
        Search();
    }        
};


function Search() {
    setGridParameters();
    ShowProgressBar($(gridContainerDiv).position().left + (gridwidth / 2),
                        $(gridContainerDiv).position().top + (gridheight / 2));

    actionParameters = { supplierName: $("#Supplier").val(), materialID: $("#MaterialId").val(), MaterialName: $("#MaterialName").val() };
    ShowProgressBar();
    $.ajax({
        url: GetSearchListActionURL,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,
        cache: false,
        success: function (data) {
            if (data.SearchList.length == 0 && data.AppMessages.length==0) {
                showMessage('No matching records found.', 'information');
            }
            if (data != null) {
                DisplayGrid(data.SearchList);
                DisplayAppMessages(data.AppMessages);
                if (data.SearchList!="")
                    showMessage('Search result completed.', 'information');
            }
            RemoveProgressBar();
            return;
        },
        error: function () {
            RemoveProgressBar();
            showMessage('error fetching data.Please try again', 'error');
            //alert("error fetching data.Please try again");
        }
    });                      //end of ajax call
    RemoveProgressBar();

};

function setGridParameters() {
    gridContainerDiv = "#grdSearchResults";
    ToggleButton = "#btnSave";

    //                        { id: "Status", name: "Status", field: "Status", sortable: true },
    //                        { id: "LibraryID", name: "LibraryID", field: "LibraryID", sortable: true },
    //                        { id: "LibraryName", name: "Library Name", field: "LibraryName", sortable: true },
    //                        { id: "GivenBy", name: "Given By", field: "GivenBy", sortable: true },
    //                        { id: "GivenTo", name: "Given To", field: "GivenTo", sortable: true },
    // id: "MaterialName", name: "Material Name", field: "MaterialName", editor: Slick.Editors.Text, sortable: true },
    //{ id: "ModeOfCommCodeVal", name: "ModeOfCommCodeVal", field: "ModeOfCommCodeVal", sortable: true },
    columns = [
                        { id: "CommId", name: "CommId", field: "CommId", editor: Slick.Editors.Text, sortable: true },
                        { id: "MaterialId", name: "Material ID", field: "MaterialId", editor: Slick.Editors.Text, sortable: true },
                        { id: "MaterialName", name: "Material Name", field: "MaterialName", sortable: true },
                        { id: "MaterialType", name: "Material Type", field: "MaterialType", sortable: true },
                        { id: "Date", name: "Date", field: "Date", sortable: true },
                        { id: "Time", name: "Time", field: "Time", sortable: true },
                        { id: "MOC", name: "Mode of communication", field: "MOC", sortable: true },
                        { id: "Person_contacted", name: "Person Contacted", field: "Person_contacted", sortable: true },
                        { id: "Comments", name: "Comments", field: "Comments", sortable: true }
                  ];


    //                        { id: "Status", name: "Status", field: "Status", editor: Slick.Editors.Text, sortable: true },
    //                        { id: "LibraryName", name: "Library Name", field: "LibraryName", editor: Slick.Editors.Select, sortable: true },
    //                        { id: "GivenBy", name: "Given By", field: "GivenBy", editor: Slick.Editors.Text, sortable: true },
    //                        { id: "GivenTo", name: "Given To", field: "GivenTo", editor: Slick.Editors.Text, sortable: true },
    visiblecolumns = [
                        { id: "MaterialId", name: "Material ID", field: "MaterialId", editor: Slick.Editors.Text, sortable: true,headerCssClass: "HeaderLovImage", validator: MaterialValidator },
                        { id: "MaterialName", name: "Material Name", field: "MaterialName", sortable: true },
                        { id: "MaterialType", name: "Material Type", field: "MaterialType", sortable: true },
                        { id: "Date", name: "Date", field: "Date", editor: Slick.Editors.Date, sortable: true},
                        { id: "Time", name: "Time", field: "Time", editor: Slick.Editors.Text, sortable: true, validator: IsValidTime },
                        { id: "MOC", name: "Mode Of communication", field: "MOC", editor: Slick.Editors.Text, sortable: true,headerCssClass: "HeaderLovImage", validator: ModeOfCommuValidator },
                        { id: "Person_contacted", name: "Person Contacted", field: "Person_contacted", editor: Slick.Editors.Text, sortable: true },
                        { id: "Comments", name: "Comments", field: "Comments", editor: Slick.Editors.LongText, sortable: true }
                ];


                 visiblecolumnsNonEdit = [
                        { id: "MaterialId", name: "Material ID", field: "MaterialId", sortable: true,headerCssClass: "HeaderLovImage",cssClass: "NonEditable" },
                        { id: "MaterialName", name: "Material Name", field: "MaterialName", sortable: true,cssClass: "NonEditable" },
                        { id: "MaterialType", name: "Material Type", field: "MaterialType", sortable: true ,cssClass: "NonEditable"},
                        { id: "Date", name: "Date", field: "Date", sortable: true,cssClass: "NonEditable"},
                        { id: "Time", name: "Time", field: "Time",  sortable: true,cssClass: "NonEditable" },
                        { id: "MOC", name: "Mode Of communication", field: "MOC", sortable: true,headerCssClass: "HeaderLovImage" ,cssClass: "NonEditable"},
                        { id: "Person_contacted", name: "Person Contacted", field: "Person_contacted", sortable: true,cssClass: "NonEditable" },
                        { id: "Comments", name: "Comments", field: "Comments",  sortable: true,cssClass: "NonEditable" }
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
    idfield = "SupplierCommunicationID";
    gridwidth = 600;
    gridheight = 410;
}

function IsValidTime(value) {
   
    var no;
    var enteredLang = value.toUpperCase()
    var isValidTime = /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/.test(value)
    if (!isValidTime) {
        return { valid: false, msg: "Please enter a valid time, between 00:00 and 23:59" };
    }
    return { valid: true, msg: "" };
};


//function IsValidDate(value) {
//    alert('test');
//    var no;
//    var enteredLang = value.toUpperCase()
//    var isValidDate = /^([012]?\d|3[01])-([Jj][Aa][Nn]|[Ff][Ee][bB]|[Mm][Aa][Rr]|[Aa][Pp][Rr]|[Mm][Aa][Yy]|[Jj][Uu][Nn]|[Jj][u]l|[aA][Uu][gG]|[Ss][eE][pP]|[oO][Cc]|[Nn][oO][Vv]|[Dd][Ee][Cc])-(19|20)\d\d$/.test(value)
//    if (!isValidDate) {
//        return { valid: false, msg: "Please enter a valid Date Format" };       
//    }
//   return { valid: true, msg: "" };
//};






var materialName="";
var materialType="";


function MaterialValidator(value) {
   // debugger;
    var no;
    var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select Material Code." };
    }

    if (materialListForValidation.length == 0) {
        var activeParameter = { strFilter: "" };
        $.ajax({
            async: false,
            url: GetMaterialListActionURL,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            cache: false,
            success: function (data) {
                if (data != null) {
                    materialListForValidation = data.MaterialList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                alert("error for fetching Material list.");
            }
        });
    }

    if ((materialListForValidation == null))
        materialListForValidation = [];
    if ((materialListForValidation != null) && materialListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < materialListForValidation.length; i++) {
            if ($.trim(value.toUpperCase()) == materialListForValidation[i].MaterialId.toUpperCase()) {
                materialName = materialListForValidation[i].MaterialName;
                materialType = materialListForValidation[i].MaterialType;
                isValidValue = true;
                return { valid: true, msg: "" };
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Material Code." };
        }
    }
};


var SupplierlookupData = "";
function loadSupplierLookupTextBox() {
    //debugger;
    var lookupInvokerControl = "#Supplier";

    var columns = [
                                { id: "ComShortName", name: "Supplier Code", field: "ComShortName" },
                                { id: "ComName", name: "Supplier Name", field: "ComName" }
                         ];
    var actionParameters = { strFilter: $('#Supplier').val()};
    var title = "Suppliers";
    //var listName = "MaterialList";
    var idfield = "ComName"
//    if (SupplierlookupData != null && SupplierlookupData.length == 0) {

        SupplierlookupData = ShowCommonLookup(urlSupplierList, actionParameters, columns, lookupInvokerControl, idfield, title, null);
        //debugger;
//    }
//    else {

//        DisplayLookupWithExistingData(columns, lookupInvokerControl, idfield, title, null, SupplierlookupData)
//    }



}


var MaterialIDlookupData = "";

function loadMaterialIDTextBox() {

    var lookupInvokerControl = "#MaterialId";

    var columns = [
                                { id: "MaterialId", name: "Material ID", field: "MaterialId", sortable: true },
                                { id: "MaterialName", name: "Material Name", field: "MaterialName", sortable: true }
                         ];
    var actionParameters = { strFilter: $('#MaterialId').val() };
    var title = "Material List";
    var idfield = "MaterialId";
    var listName = "MaterialList";
//    if (MaterialIDlookupData == null || MaterialIDlookupData.length == 0) {
 
        MaterialIDlookupData = ShowCommonLookup(GetMaterialListActionURL, actionParameters, columns, lookupInvokerControl, idfield, title, listName);
        //debugger;
//    }
//    else {
//  
//        DisplayLookupWithExistingData(columns, lookupInvokerControl, idfield, title, null, MaterialIDlookupData)
//    }

}

//var MaterialNamelookupData = "";

//loadMaterialNameTextBox()
//{

//    var lookupInvokerControl = "#MaterialName";

//    var columns = [
//                                { id: "MaterialId", name: "Material Id", field: "MaterialId", sortable: true },
//                                { id: "MaterialName", name: "Material Name", field: "MaterialName", sortable: true }
//                         ];
//    var actionParameters = "";
//    var title = "MaterialID";
//    var idfield = "MaterialId";
//    if (MaterialIDlookupData != null && MaterialIDlookupData.length == 0) {

//        MaterialIDlookupData = ShowCommonLookup(GetMaterialListActionURL, actionParameters, columns, lookupInvokerControl, idfield, title, null);
//        //debugger;
//    }
//    else {

//        DisplayLookupWithExistingData(columns, lookupInvokerControl, idfield, title, null, SupplierlookupData)
//    }




//}






//function MaterialTyepValidator(value) {
//    var no;
//    var enteredLang = value.toUpperCase()
//    if (value == null || value == undefined || !value.length) {
//        return { valid: false, msg: "Please select Material Type." };
//    }

//    if (materialTyepListForValidation.length == 0) {
//        var activeParameter = { filterValue: "" };
//        $.ajax({
//            async: false,
//            url: GetMaterialTyepListActionURL,
//            type: "GET",
//            dataType: "json",
//            data: activeParameter,
//            success: function (data) {
//                if (data != null) {
//                    materialTyepListForValidation = data.MaterialTyepList;
//                    DisplayAppMessages(data.AppMessages);
//                }
//            },
//            error: function () {
//                alert("error for fetching Material list.");
//            }
//        });
//    }

//    if ((materialTyepListForValidation == null))
//        materialTyepListForValidation = [];
//    if ((materialTyepListForValidation != null) && materialTyepListForValidation.length > 0) {
//        var stat = 0;
//        var isValidValue = false;
//        for (var i = 0; i < materialTyepListForValidation.length; i++) {
//            if (value == materialTyepListForValidation[i].Val) {
//                isValidValue = true;
//            }
//        }
//        if (!isValidValue) {
//            return { valid: false, msg: "Invalid Material Type." };
//        }
//    }
//};
var ModeOfCommID = "";

function ModeOfCommuValidator(value) {
    var no;
   // var enteredLang = value.toUpperCase()
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Please select Mode Of Communication." };
    }

    if (modeOfCommuListForValidation.length == 0) {
        var activeParameter = { filterValue: "" };
        $.ajax({
            async: false,
            url: GetModeOfCommunicationListActionURL,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            cache: false,
            success: function (data) {
                if (data != null) {
                    modeOfCommuListForValidation = data.ModeOfCommunicationList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                alert("error for fetching Material list.");
            }
        });
    }

    if ((modeOfCommuListForValidation == null))
        modeOfCommuListForValidation = [];
    if ((modeOfCommuListForValidation != null) && modeOfCommuListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < modeOfCommuListForValidation.length; i++) {
            if ($.trim(value.toUpperCase()) == modeOfCommuListForValidation[i].Val.toUpperCase()) {

                ModeOfCommID = modeOfCommuListForValidation[i].ID;
                isValidValue = true;
                return { valid: true, msg: "" };
            }
        }
        if (!isValidValue) {
            return { valid: false, msg: "Invalid Mode Of Communication." };
        }
    }
};


function DisplayGrid(enterData) {

    var isEnterKeyPress = false;
    gridwidth = $(gridContainerDiv).width();
    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });

    dataView = new Slick.Data.DataView();
    grid = new Slick.Grid(gridContainerDiv, dataView, columns, options);
    grid.setSelectionModel(new Slick.RowSelectionModel());

    if (visiblecolumns != null) {
        grid.setColumns(visiblecolumns);
    }

    if (enterData == "") {
        data = [];
        setfooter(gridContainerDiv, 0, 0);
        // DisableToggleButton(ToggleButton, true);
    }
    else {
        data = enterData;
        setfooter(gridContainerDiv, 0, data.length);
    }


    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
        //        if (args.cell == 2) {
        //            args.item.MaterialTypeCodeVal = CurComboVal;
        //        }
        //        else if (args.cell == 4) {
        //            args.item.ModeOfCommCodeVal = CurComboVal;
        //        }
        //        else if (args.cell == 7) {
        //            args.item.LibraryID = CurComboVal;
        //        }
        //var typevalue = args.editor.getValue();
        //        data[args.row].SupplierCommunicationID = id;
        //        id = id - 1;
    });


    grid.onClick.subscribe(function (e, args) {
        $.noty.closeAll();
        var cell = grid.getCellFromEvent(e);
        var row = cell.row;
        selectedCol = grid.getColumns()[cell.cell].id;
        changedrow = args.row;

        //  setfooter(gridContainerDiv, row, data.length - 1);
        if (row == 0) {
            if (data[0].MaterialId == "Click here to add a new row") {
                var currentTime = new Date();
                var currentHours = currentTime.getHours();
                currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
                var min = "00;"
                if ((currentTime.getMinutes() != null) && currentTime.getMinutes().toString().length == 1)
                    min = "0" + currentTime.getMinutes();
                else
                    min = currentTime.getMinutes();

                if (currentHours.toString().length == 1)
                    currentHours = "0" + currentHours;

                var time = currentHours + ":" + min;
                data[0].MaterialId = "";
                data[0].MaterialName = "";
                data[0].MaterialType = "";
                data[0].Date = GetTodayDate();
                data[0].Time = time;
                data[0].MOC = "";
                data[0].Person_contacted = "";
                data[0].Comments = "";
                grid.setActiveCell(0, 1);
                grid.editActiveCell();
                grid.setActiveCell(0, 0);
                grid.editActiveCell();
            }
        }

    });

    grid.onSort.subscribe(function (e, args) {

        Remove_Addrow();
        SortGrid(args, dataView);
        Create_Addrow();
        grid.setActiveCell(0, 0);
        grid.editActiveCell();
    });



    grid.onKeyDown.subscribe(function (e, args) {

        if (e.keyCode == 120) {
            if (grid.getColumns()[args.cell].id == "MaterialId" || grid.getColumns()[args.cell].id == "MaterialId") {
                if (grid.getEditorLock().isActive())
                    grid.getEditorLock().deactivate(grid.getEditController());
                selrow = args.row;
                gitems = data[args.row];
                selectedrow = data[selrow];
                cellvalue = data[args.row].MaterialId;
                var columns = [
                                { id: "MaterialId", width: 900, name: "Material ID", field: "MaterialId", sortable: true },
                                { id: "MaterialName", width: 900, name: "Material Name", field: "MaterialName", sortable: true }
                         ];
                if (grid.getCellEditor() != null)
                    cellvalue = grid.getCellEditor().getValue();
                var actionParameters = { strFilter: cellvalue };
                var title = "Material List";
                var listName = "MaterialList";
                var idfield = "MaterialId";
                ShowCommonLookup(GetMaterialListActionURL, actionParameters, columns, "MaterialIDColumn", idfield, title, listName);
            }
            if (grid.getColumns()[args.cell].id == "MOC" || grid.getColumns()[args.cell].id == "MOC") {
                if (grid.getEditorLock().isActive())
                    grid.getEditorLock().deactivate(grid.getEditController());
                selrow = args.row;
                gitems = data[args.row];
                selectedrow = data[selrow];
                cellvalue = data[args.row].ModeOfComm;
                var columns = [
                                { id: "ID", width: 900, name: "Mode Of Communication Code", field: "ID", sortable: true },
                                { id: "Val", width: 900, name: "Mode Of Communication Name", field: "Val", sortable: true }
                         ];
                var actionParameters = "";
                var title = "Mode Of Communication Details";
                var listName = "ModeOfCommunicationList";
                var idfield = "ID";
                ShowCommonLookup(GetModeOfCommunicationListActionURL, actionParameters, columns, "MOC", idfield, title, listName);
            }
        }
        if (e.keyCode == 13) {
            if ((grid.getActiveCell() != null) && (changedrow > -1)) {
                if (changedrow == 0 ) {
                    data[changedrow].CommId = newrowids;
                    if (ModeOfCommID.length > 0)
                        data[changedrow].MOC = ModeOfCommID;
                    if (materialName.length > 0) {
                        data[changedrow].MaterialName = materialName;
                    }
                    if (materialType.length > 0) {
                        data[changedrow].MaterialType = materialType;
                    }
                    dataView.refresh();
                    if (grid.getCellEditor() != null) {
                        var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
                        data[changedrow][fieldName] = grid.getCellEditor().getValue();
                    }


                    //data.push(data[changedrow]);
                    data.splice(1, 0, data[changedrow]);
                    AddToBasket(data[changedrow], "Added");
                    newrowids = newrowids - 1;


                    var item = {
                        "CommId": "new row",
                        "MaterialId": "Click here to add a new row",
                        "MaterialName": " ",
                        "MaterialType": " ",
                        "Date": " ",
                        "Time": " ",
                        "MOC": " ",
                        "Person_contacted": " ",
                        "Comments": " "
                    };
                    data[0] = item;
                    dataView.refresh();
                    grid.render();
                    isEnterKeyPress = true;
                    grid.setActiveCell(0, 0);
                    grid.editActiveCell();
                    grid.setActiveCell(0, 0);
                    grid.editActiveCell();
                    grid.render();
                }
                changedrow = -1;
                // setfooter(gridContainerDiv, data.length - 1);
            }
        }
    });

    var columnset=0;
    grid.onSelectedRowsChanged.subscribe(function (e, args) {
      //  debugger;
        if (isEnterKeyPress && (grid.getActiveCell() != null) && (grid.getActiveCell().row == 1 && grid.getActiveCell().cell == 0)) {
            isEnterKeyPress = false;
            grid.setActiveCell(0, 0);
            grid.editActiveCell();
            grid.render();
        }

        if (grid.getActiveCell() != null) {
            if (dataView.getItem(grid.getActiveCell().row).CommId < 0 || dataView.getItem(grid.getActiveCell().row).CommId == "new row") {  //grid.getActiveCell().row == 0 ||
                grid.setColumns(visiblecolumns);
                columnset = 0;
            }
            else if (columnset == 0 ) {
                grid.setColumns(visiblecolumnsNonEdit);
                columnset = 1;
            }
        }



        if ((grid.getActiveCell() != null) && changedrow == 0) {
           // data[changedrow].CommId = newrowids;

//            if (materialName.length > 0) {
//                data[changedrow].MaterialName = materialName;
//            }
//            if (materialType.length > 0) {
//                data[changedrow].MaterialType = materialType;
//            }

//            if (ModeOfCommID.length > 0)
//                data[changedrow].MOC = ModeOfCommID;

            dataView.refresh();
            grid.invalidate();
            grid.focus();
            grid.editActiveCell();
        }


        if ((grid.getActiveCell() != null) && (changedrow > -1) && (changedrow != grid.getActiveCell().row)) {
            if (changedrow == 0 && dataView.getItem(changedrow).CommId == "new row") {
                data[changedrow].CommId = newrowids;

                if (materialName.length > 0) {
                    data[changedrow].MaterialName = materialName;
                }
                if (materialType.length > 0) {
                    data[changedrow].MaterialType = materialType;
                }
                dataView.refresh();
                if (ModeOfCommID.length > 0)
                    data[changedrow].MOC = ModeOfCommID;
                data.splice(1, 0, data[changedrow]);
                AddToBasket(data[changedrow], "Added");
                newrowids = newrowids - 1;

                var item = {
                    "CommId": "new row",
                    "MaterialId": "Click here to add a new row",
                    "MaterialName": " ",
                    "MaterialType": " ",
                    "Date": " ",
                    "Time": " ",
                    "MOC": " ",
                    "Person_contacted": " ",
                    "Comments": " "
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

                if (materialName.length > 0) {
                    data[changedrow].MaterialName = materialName;
                }
                if (materialType.length > 0) {
                    data[changedrow].MaterialType = materialType;
                }

                if (ModeOfCommID.length > 0)
                    data[changedrow].MOC = ModeOfCommID;
                dataView.refresh();
                var status = "";
                if (data[changedrow].CommId < 0)
                    status = "Added";
                else
                    status = "Modified";
                AddToBasket(data[changedrow], status);
                grid.focus();

            }
            changedrow = -1;

        }
        if (grid.getActiveCell() != null) {
            setfooter(gridContainerDiv, grid.getActiveCell().row, dataView.getLength());
        }
    });

    grid.onCellChange.subscribe(function (e, args) {
        changedrow = args.row;
    });


    grid.onValidationError.subscribe(function (e, args) {

        var validationResult = args.validationResults;
        var activeCellNode = args.cellNode;
        var editor = args.editor;
        var errorMessage = validationResult.msg;
       // debugger;
        if (validationResult != null || typeof validationResult == 'undefined')
         {
            var valid_result = validationResult.valid;
        

        if (!valid_result) {
            $(activeCellNode).attr("title", errorMessage);
        }
        else {
            $(activeCellNode).attr("title", "");
        }
    }

    });



//FilterGrid(grid, dataView);
FilterGridWithRowCount(grid, dataView, gridContainerDiv);


    grid.init();



    // var item = { "SupplierCommunicationID": "new row", "MaterialID": "Click here to add a new row", "MaterialName": "", "MaterialTypeCodeVal": "", "PersistFlag": "" };
    var item = {
        "CommId": "new row",
        "MaterialId": "Click here to add a new row",
        "MaterialName": " ",
        "MaterialType": " ",
        "Date": " ",
        "Time": " ",
        "MOC": " ",
        "Person_contacted": " ",
        "Comments": " "
    };
    data.splice(0, 0, item);
    dataView.beginUpdate();
    dataView.setItems(data, 'CommId');
    dataView.setFilter(filter);
    dataView.endUpdate();   

    var rows = [];
    rows.push(0);
    grid.setSelectedRows(rows);

}



function Remove_Addrow() {
    dataView.deleteItem("new row");

}

function Create_Addrow() {
    //var item = { "SupplierCommunicationID": "new row", "MaterialID": "Click here to add a new row", "MaterialName": "", "MaterialTypeCodeVal": "", "PersistFlag": "" };
    var item = {
        "CommId": "new row",
        "MaterialId": "Click here to add a new row",
        "MaterialName": " ",
        "MaterialType": " ",
        "Date": " ",
        "Time": " ",
        "MOC": " ",
        "Person_contacted": " ",
        "Comments": " "
    };
    dataView.insertItem(0, item);
};
function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
    var cdata = grid.getData();
    if (lookupInvokerControl == "MaterialIDColumn") {

        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());

        if (SelectedRowData != null) {
            gitems.MaterialId = SelectedRowData.MaterialId;
            gitems.MaterialName = SelectedRowData.MaterialName;
            gitems.MaterialType = SelectedRowData.MaterialType;
            $.extend(gitems, gitems);
          

            data[selrow] = gitems;
            dataView.refresh();
            grid.invalidate();
            grid.setActiveCell(selrow, 0);
            grid.editActiveCell();
            grid.render();
        }


       // grid.editActiveCell();
       
    }
   
    if (lookupInvokerControl == "MOC") {
        // gitems.ModeOfCommCodeVal = SelectedRowData.ID;
        if (SelectedRowData != null) {
            gitems.MOC = SelectedRowData.ID;
        }
        if (!grid.getEditorLock().isActive())
            grid.getEditorLock().activate(grid.getEditController());
        grid.setActiveCell(0, 0);
        grid.editActiveCell();
        grid.setActiveCell(selrow, 5);
        grid.editActiveCell();
        grid.render();
        grid.focus();
    }

    if (lookupInvokerControl == "#MaterialId") {
        if (SelectedRowData != null) {
            $("#MaterialId").val(SelectedRowData.MaterialId);
        }
        $("#MaterialId").focus();
    }

    if (lookupInvokerControl == "#Supplier") {
        if (SelectedRowData != null) {
            $("#Supplier").val(SelectedRowData.ComShortName);
        }
        $("#Supplier").focus();
    }

};

function AddSelectedRowToBasket() {
    dataView.refresh();
    grid.render();
    if (grid.getActiveCell() != null) {
        if (grid.getActiveCell().row >= 0) {
            var rowData = grid.getData().getItem(grid.getActiveCell().row);
            var fieldName = grid.getColumns()[grid.getActiveCell().cell].field;
            if (grid.getCellEditor() != null) {
                if (grid.getActiveCell().cell == 3 && grid.getCellEditor().getValue() != null) {
                    grid.setActiveCell(grid.getActiveCell().row, 4);
                    grid.editActiveCell();
                    grid.setActiveCell(grid.getActiveCell().row, 3);
                    grid.editActiveCell();
                }
                rowData[fieldName] = grid.getCellEditor().getValue();
            }
            if ((rowData != null)) {   //&& rowData.CommId != "new row"
                var CommId = 0;
                var status = "";
                if (rowData.CommId < 0 || rowData.CommId == "new row") {
//                    rowData.CommId = newrowids;
//                    newrowids = newrowids - 1;
                    status = "Added";
                    AddToBasket(rowData, status);   //gitems
                }
//                else {
//                    status = "Modified";
//                }
                if (changedrow == 0) {
                    //data.push(data[changedrow]);
                    data.splice(1, 0, gitems);
                    var item = {
                        "CommId": "new row",
                        "MaterialId": "Click here to add a new row",
                        "MaterialName": " ",
                        "MaterialType": " ",
                        "Date": " ",
                        "Time": " ",
                        "MOC": " ",
                        "Person_contacted": " ",
                        "Comments": " "
                    };
                    data[0] = item;
                    dataView.refresh();
                    grid.render();
                    grid.setActiveCell(0, 0);
                    grid.editActiveCell();
                    grid.setActiveCell(0, 0);
                    grid.editActiveCell();
                    grid.render();
                    changedrow = -1;
                }
            }

        }
    }
};

function Save() {
    AddSelectedRowToBasket();
    if (UpData.length == 0) {
        showMessage('No record(s) available for update.', 'information');
    }
    else if (IsValidForm()) {
        PostData();
    }
};

function IsValidForm() {
    var isValid = true;
    if (UpData != null) {
        for (var index = 0; index < UpData.length; index++) {
            if (UpData[index].MaterialId.trim() == "" || UpData[index].MOC.trim() == "") {
                isValid = false;
                showMessage('Please insert supplier communication details.', 'information');
                return isValid;
            }
            else if (!IsValidMaterialID(UpData[index].MaterialId.trim())) {
                isValid = false;
                showMessage('Please insert valid Material ID.', 'information');
                return isValid;
            }
            else if (!IsModeOfCommuValid(UpData[index].MOC.trim())) {
                isValid = false;
                showMessage('Please insert valid mode of communication.', 'information');
                return isValid;
            }
            else if (!IsTimeValid(UpData[index].Time)) {
                isValid = false;
                showMessage('Please enter a valid time, between 00:00 and 23:59.', 'information');
                return isValid;
            }
        }
    }
    return isValid;
};


function PostData() {
    $.noty.closeAll();
    var dataToSend = JSON.stringify(UpData);
    $.ajax({
        url: SaveActionURL,
        type: "POST",
        data: dataToSend,
        dataType: "json",
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                for (var index = 0; index <= data.SupplierCommunicationList.length - 1; index++) {
                    $.extend(UpData[index], data.SupplierCommunicationList[index]);
                }
                UpData = [];
                dataView.refresh();
                grid.render();
                grid.setColumns(visiblecolumnsNonEdit);
                columnset = 1;
                DisplayAppMessages(data.AppMessages);
            }
        },
        error: function () {
            showMessage('Error', 'error');
        }
    });
};
function AddToBasket(item, status, index) {
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
            if (UpData[i]["CommId"] == item["CommId"]) {
                UpData.splice(i, 1);
            }
        }
        item1 = { "PersistFlag": status };
        $.extend(item, item1);
        UpData.push(item);
    }
    //Just to check record in alert
}


function IsValidMaterialID(value) {
    if (materialListForValidation.length == 0) {
        var activeParameter = { strFilter: "" };
        $.ajax({
            async: false,
            url: GetMaterialListActionURL,
            type: "GET",
            dataType: "json",
            data: activeParameter,
            cache: false,
            success: function (data) {
                if (data != null) {
                    materialListForValidation = data.MaterialList;
                    DisplayAppMessages(data.AppMessages);
                }
            },
            error: function () {
                showMessage('Error for fetching Material list.', 'error');
            }
        });
    }

    if ((materialListForValidation == null))
        materialListForValidation = [];
    if ((materialListForValidation != null) && materialListForValidation.length > 0) {
        var stat = 0;
        var isValidValue = false;
        for (var i = 0; i < materialListForValidation.length; i++) {
            if (value.toUpperCase() == materialListForValidation[i].MaterialId.toUpperCase()) {
                materialName = materialListForValidation[i].MaterialName;
                materialType = materialListForValidation[i].MaterialType;
                isValidValue = true;
                return true;
            }
        }
            return isValidValue;
    }
    }


    function IsModeOfCommuValid(value) {
        var no;
        if (modeOfCommuListForValidation.length == 0) {
            var activeParameter = { filterValue: "" };
            $.ajax({
                async: false,
                url: GetModeOfCommunicationListActionURL,
                type: "GET",
                dataType: "json",
                data: activeParameter,
                cache: false,
                success: function (data) {
                    if (data != null) {
                        modeOfCommuListForValidation = data.ModeOfCommunicationList;
                        DisplayAppMessages(data.AppMessages);
                    }
                },
                error: function () {
                    alert("error for fetching Material list.");
                }
            });
        }

        if ((modeOfCommuListForValidation == null))
            modeOfCommuListForValidation = [];
        if ((modeOfCommuListForValidation != null) && modeOfCommuListForValidation.length > 0) {
            var stat = 0;
            var isValidValue = false;
            for (var i = 0; i < modeOfCommuListForValidation.length; i++) {
                if (value.toUpperCase() == modeOfCommuListForValidation[i].Val.toUpperCase()) {

                    ModeOfCommID = modeOfCommuListForValidation[i].ID;
                    isValidValue = true;
                }
            }
                return isValidValue;
        }
    };


    function IsTimeValid(value) {
        var no;
        var enteredLang = value.toUpperCase()
        var isValidTime = /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/.test(value)
        if (!isValidTime) {
            return false;
        }
        return true;
    }
