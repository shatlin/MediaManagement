//Declare variables.
var myDataToSave = [];
var castawardData = [];
var UpData = [];
var selrow;
var gitems;
var selectedrow;
var SelectedValueforgrid;
var cellvalue;
var grid;
var cdata = [];
var dataView;
var data = [];
var griddata = [];
var emptyrow = [];
var gridfordelete = [];
var selectDelId;
var synopsisList = new Array();
var synFull;
var infoMessage;
var cellvalueRole;
var cellNo;
var flag;
var flagRole;
var columnFilters = {};
var activeCellNode;
var testvar;
function setfooter(gridContainerDiv, totalrows) {
   // debugger;
    var footerid = gridContainerDiv + "footer";
    $(footerid).remove();
    $(gridContainerDiv).after('<div style="margin:5px 5px 5px 5px;" id="' + footerid.substring(1) + '">' + "Total number of rows displayed :" + totalrows + '</div>');
}

//function to show message.
//noty({ text: "ok", type: 'error', dismissQueue: true,
//               layout: 'bottom', theme: 'defaultTheme'
//           });
function showMessage(message, messagetype) {
    clearErrorMessages();
    if (messagetype = "information")
        infoMessage = message;
    else
        errorMessage = message;

    if ((errorMessage != "") || (infoMessage != "")) {
        errorMessagePanel = noty({ text: message, type: messagetype, dismissQueue: true,
            layout: 'bottom', theme: 'defaultTheme'
        });
    }
}

// Function to clear existing messsages.

function clearErrorMessages() {
    infoMessage = "";
    errorMessage = "";
    if (errorMessagePanel != null && errorMessagePanel != undefined)
        errorMessagePanel.close();
}

// Function to validate text as a number only.

function NumberValidationMethod(value) {
    if (value == null || value == undefined || isNaN(value)) {
        return { valid: false, msg: "Please enter a valid integer" };
    }
    else {
        return { valid: true, msg: null };
    }
}
function roledata() {
    $.ajax({

        url: CastRoleUrl,
        type: "GET",
        dataType: 'Json',
        data: { "cellvalueRole": "" },        
        success: function (data) {
            myDataToSave = data;
        },
        error: function () {
            alert("error");
        }
    });
}

//Function to validate Cast Role column of grid.

function RoleValidation(value) {
    debugger;
    var no;
    if (value == null || value == undefined || !value.length) {
        return { valid: false, msg: "Cast Role is required" };
    }
    else {   
        var enteredRole = value.toUpperCase();
        var ldata = grid.getData();
        var rdata = ldata[selrow];
        if (myDataToSave.length > 0) {
            var stat = 0;
            for (var i = 0; i < myDataToSave.length; i++) {
                if (enteredRole == myDataToSave[i].CastRoleCode) {
                    stat = 1;
                    break;
                    debugger;
                }
            }
            if (stat == 0) {
                return { valid: false, msg: "Invalid Cast Role" };
            }

            else {
                if (ldata.length == 0) {
                    var item = { "ProgramCastRole": enteredRole };
                    ldata.push(item);
                }
                else {
                    if (typeof ldata[selrow] == 'undefined') {
                        var item = { "ProgramCastRole": enteredRole };
                        ldata.push(item);
                    }
                    else {
                        ldata[selrow].ProgramCastRole = enteredRole;
                    }
                }
            }
            if (ldata[selrow].Id == null) 
            //if (item.gridstatus = 'undefined')
                AddToBasket(ldata[selrow], "New");
            else
                AddToBasket(ldata[selrow], "edit");
           
            grid.setData(ldata);
            grid.render();
            if (!grid.getEditorLock().isActive())
                grid.getEditorLock().activate(grid.getEditController());
            grid.setActiveCell(selrow, 0);
            grid.setActiveCell(selrow, 1);
            grid.setActiveCell(selrow, 0);
            grid.editActiveCell();

            return { valid: true, msg: null };

        }
    }
}
function Awarddata() {
    $.ajax({
        async: false,
        url: CastAwardUrl,
        type: "GET",
        dataType: 'Json',
        data: { "cellvalueRole": "" },       
        success: function (data) {
            castawardData = data;
        },
        error: function () {
            alert("error");
        }
    });
}

//Function to validate Cast Award column of grid.

function AwardValidation(value) {
    var no;
    //debugger;
    var enteredAward = value.toUpperCase();
    if (value != null || value != undefined || value.length) {
        var Cdata = grid.getData();
        if (castawardData.length > 0) {
            var stat = 0;
            for (var i = 0; i < castawardData.length; i++) {
                if (enteredAward == castawardData[i].CastAwardCode) {
                    stat = 1;
                    break;
                }
            }
            if (stat == 0) {
                return { valid: false, msg: "Invalid Cast Award" };
            }
            else {
                if (Cdata.length == 0) {
                    var item = { "ProgramCastAward": enteredAward, "ProgramCastDescription": castawardData[i].CastAwardDesc };
                    Cdata.push(item);
                }
                else {
                    Cdata[selrow].ProgramCastAward = enteredAward;
                    Cdata[selrow].ProgramCastDescription = castawardData[i].CastAwardDesc;
                }
            }
            if (Cdata[selrow].Id == null)
            //if (item.gridstatus = 'undefined')
                AddToBasket(Cdata[selrow], "New");
            else
                AddToBasket(Cdata[selrow], "edit");
            grid.setData(Cdata);
            grid.render();         

            return { valid: true, msg: null };
        }
    }
}
var columns = [
{ id: "Id", name: "Id", field: "Id" },
{ id: "ProgramCastRole", name: "Role", field: "ProgramCastRole", editor: Slick.Editors.Text, validator: RoleValidation, headerCssClass: " HeaderLovImage " },
{ id: "ProgramCastName", name: "Name", field: "ProgramCastName", editor: Slick.Editors.Text },
{ id: "ProgramCastOrder.", name: "No.", field: "ProgramCastOrder", editor: Slick.Editors.Text, validator: NumberValidationMethod },
{ id: "ProgramCastAward", name: "Award", field: "ProgramCastAward", editor: Slick.Editors.Text, validator: AwardValidation, headerCssClass: " HeaderLovImage " },
{ id: "ProgramCastDescription", name: "Description", field: "ProgramCastDescription" },
{ id: "gridstatus", name: "gridstatus", field: "gridstatus", editor: Slick.Editors.Text }

];
var columns1 = [
{ id: "ProgramCastRole", name: "Role", field: "ProgramCastRole", editor: Slick.Editors.Text, validator: RoleValidation, headerCssClass: " HeaderLovImage ", sortable: false },
{ id: "ProgramCastName", name: "Name", field: "ProgramCastName", editor: Slick.Editors.Text, sortable: false },
{ id: "ProgramCastOrder.", name: "No.", field: "ProgramCastOrder", editor: Slick.Editors.Text, validator: NumberValidationMethod, sortable: false },
{ id: "ProgramCastAward", name: "Award", field: "ProgramCastAward", editor: Slick.Editors.Text, validator: AwardValidation, headerCssClass: " HeaderLovImage ", sortable: false },
{ id: "ProgramCastDescription", name: "Description", field: "ProgramCastDescription", sortable: false }
];
var options = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    forceFitColumns: true,
    editable: true,
   asyncEditorLoading: false,
    enableAddRow: true
};

var optionsReadonly = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    forceFitColumns: true,
    asyncEditorLoading: false,
    editable: false

};

$(function () {

    var gridwidth = $("#tabs").width();
    //        alert($("#CdetailsGrid").width(););
    $("#CdetailsGrid").css({ "width": gridwidth - 55 + "px" });
    $("#btnEdit").attr("class", "inputButtonDisable");
    if ($("#ProgrammeTitle").val() != "") {
        DisableScreen();
        $("#btnEdit").attr("class", "inputButton");
    }
    ToggleButton1 = "#btnSave";
    ToggleButton2 = "#btnEdit";

    if ($("#ProductionYear").val() == 0) { $("#ProductionYear").val(''); }
    if ($("#Episodes").val() == 0) { $("#Episodes").val(''); }
    if ($("#RefNo").val() == 0) { $("#RefNo").val(''); }
    if ($("#Parent").val() == 0) { $("#Parent").val(''); }
    if ($("#Awards").val() == 0) { $("#Awards").val(''); }
    syn();
    $("#tabs").tabs({
        beforeLoad: function (event, ui) {
            ui.jqXHR.error(function () { ui.panel.html("Couldn't load this tab."); });
        }
    });
    roledata();
    Awarddata();
    var selectedLang = $("#Distributor option:selected").val().split(":"); ;
    $('#DistributorSelectedValue').val(selectedLang[1]);
    var selectedLang = $("#ProductionHouse option:selected").val().split(":"); ;
    $('#ProductionHouseSelectedValue').val(selectedLang[1]);
    var selectedLang = $("#PrimaryGenre option:selected").val().split(":"); ;
    $('#PrimaryGenreSelectedValue').val(selectedLang[1]);
    var selectedLang = $("#SecondaryGenre option:selected").val().split(":"); ;
    $('#SecondaryGenreSelectedValue').val(selectedLang[1]);
    var selectedLang = $("#TertiaryGenre option:selected").val().split(":"); ;
    $('#TertiaryGenreSelectedValue').val(selectedLang[1]);
    var selectedLang = $("#ColourCode option:selected").val().split(":"); ;
    $('#ColorCodeSelectedValue').val(selectedLang[1]);
    var selectedLang = $("#UserCode option:selected").val().split(":"); ;
    $('#UserCodeSelectedValue').val(selectedLang[1]);
    var selectedLang = $("#SpokenLanguage option:selected").val().split(":"); ;
    $('#SpokenLanguageSelectedValue').val(selectedLang[1]);
    $("#ProgrammeTitle").blur(function (e) {
        document.getElementById('WorkingTitle').value = document.getElementById('ProgrammeTitle').value;
    });

    $('#Distributor').change(function () {
        var selectedValue = $("#Distributor option:selected").val().split(":"); ;
        $('#DistributorSelectedValue').val(selectedValue[1]);
        return true;
    });
    $('#ProductionHouse').change(function () {
        var selectedValue = $("#ProductionHouse option:selected").val().split(":"); ;
        $('#ProductionHouseSelectedValue').val(selectedValue[1]);
        return true;
    });
    $('#PrimaryGenre').change(function () {
        var selectedValue = $("#PrimaryGenre option:selected").val().split(":"); ;
        $('#PrimaryGenreSelectedValue').val(selectedValue[1]);
        return true;
    });
    $('#SecondaryGenre').change(function () {
        var selectedValue = $("#SecondaryGenre option:selected").val().split(":"); ;
        $('#SecondaryGenreSelectedValue').val(selectedValue[1]);
        return true;
    });
    $('#TertiaryGenre').change(function () {
        var selectedValue = $("#TertiaryGenre option:selected").val().split(":"); ;
        $('#TertiaryGenreSelectedValue').val(selectedValue[1]);
        return true;
    });
    $('#ColourCode').change(function () {
        var selectedValue = $("#ColourCode option:selected").val().split(":"); ;
        $('#ColorCodeSelectedValue').val(selectedValue[1]);
        return true;
    });
    $('#UserCode').change(function () {
        var selectedValue = $("#UserCode option:selected").val().split(":"); ;
        $('#UserCodeSelectedValue').val(selectedValue[1]);
        return true;
    });
    $('#SpokenLanguage').change(function () {
        var selectedValue = $("#SpokenLanguage option:selected").val().split(":"); ;
        $('#SpokenLanguageSelectedValue').val(selectedValue[1]);
        return true;
    });
    //TO bind Grid.
    if ($("#ProgrammeTitle").val() == "") {
        BindBlankGrid();
    }
    else {
        BindGridWithData("trueflag");
    }

})

function BindBlankGrid() {
    grid = new Slick.Grid("#CdetailsGrid", data, columns, options);
    dataView = new Slick.Data.DataView();
    grid.setColumns(columns1);
   // debugger;
    grid.onAddNewRow.subscribe(function (e, args) {

        var item = args.item;
        var column = args.column;
        //alert('hi');
        //AddToBasket(args.item, "New");
        grid.invalidateRow(data.length);
        $.extend(item, args.item);
        data.push(item);
        grid.updateRowCount();
        grid.render();


    });

    grid.onCellChange.subscribe(function (e, args) {
        
        if (typeof (args.item.Id) == 'undefined') {           
                AddToBasket(args.item, "New");
            }       
       else
            AddToBasket(args.item, "Edit");   
    });


    grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
        cellvalueRole = args.editor.getValue();
    });

    grid.onClick.subscribe(function (e, args) {

        var cell = grid.getCellFromEvent(e);
        var c = args.cell;
        selrow = cell.row;
        data = grid.getData();
        selectedrow = data[selrow];
        if (c != 0) {
            if ((selectedrow == null) || (selectedrow == undefined)) {
                showMessage("Please select Cast Role.", "information");
                grid.setActiveCell(args.row, 0);
            }
            else if ((data[selrow]["ProgramCastRole"] == null) || (data[selrow]["ProgramCastRole"] == undefined)) {
                showMessage("Please select Cast Role.", "information");
            }
            clearErrorMessages();
        }
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


    grid.onKeyDown.subscribe(function (e, args) {

        var cell = grid.getCellFromEvent(e);
        gridfordelete = grid.getData();

        if (e.shiftKey && e.keyCode == 117) {
            selrow = cell.row;
            gitems = args.item;
            selectedrow = data[selrow];
            //                alert(data[selrow]["Id"]);
            if (data[selrow]["Id"] == null) {
                AddToBasket(data[selrow], "Remove");
                grid.invalidateRow(data.length);
                data.splice(selrow, 1);
                grid.updateRowCount();
                grid.setData(data);
                grid.render();

            }
            else {
                alert("Please select row.");
            }
        }
        if (grid.getColumns()[args.cell].id == "ProgramCastRole") {
            if (e.keyCode == 120) {
                selrow = cell.row;
                gitems = args.item;
                grid.setActiveCell(selrow, cell + 1);
                grid.setActiveCell(selrow, cell);
                grid.editActiveCell();
                selectedrow = data[selrow];
                openRoleLov();
            }
        }
        else if (grid.getColumns()[args.cell].id == "ProgramCastAward") {
            if (e.keyCode == 120) {
                selrow = cell.row;
                gitems = args.item;
                grid.setActiveCell(selrow, cell + 1);
                grid.setActiveCell(selrow, cell);
                grid.editActiveCell();
                selectedrow = data[selrow];
                if (selectedrow == undefined) {
                    showMessage("Please select Cast Role.", "information");
                }
                else {
                    clearErrorMessages();
                    openAwardLov();
                }

            }
        }
    });

}
var castdata = [];
var str;
//second call to bind grid
function BindGridWithData(dd) {
    var datatobind;
  //  debugger;
    $.ajax({
        url: BindGridwithgridUrl,
        type: "GET",
        dataType: 'Json',
        cache: false,
        success: function (data) {
            //  debugger;
            if (dd != "trueflag") {
                data = dd;
                castdata = data.CastDetailList;
                //data = null;
                data = castdata;
                grid = new Slick.Grid("#CdetailsGrid", data, columns, optionsReadonly);
            }
            else {

                grid = new Slick.Grid("#CdetailsGrid", data, columns, optionsReadonly);
            }
            dataView = new Slick.Data.DataView();
            grid.setColumns(columns1);
            grid.onAddNewRow.subscribe(function (e, args) {
                var item = args.item;
                var column = args.column;
                //alert('hi');
                //AddToBasket(args.item, "New");
                grid.invalidateRow(data.length);
                $.extend(item, args.item);
                data.push(item);
                grid.updateRowCount();
                grid.render();
            });

            grid.onCellChange.subscribe(function (e, args) {
                debugger;
                if (typeof (args.item.Id) == 'undefined') {
                    AddToBasket(args.item, "New");
                }
                else {
                    AddToBasket(args.item, "Edit");
                }
            });


            grid.onClick.subscribe(function (e, args) {

                var cell = grid.getCellFromEvent(e);
                selrow = cell.row;
                var c1 = args.cell;
                data = grid.getData();
                selectedrow = data[selrow];
                if (c1 != 0) {
                    if ((selectedrow == null) || (selectedrow == undefined)) {
                        showMessage("Please select Cast Role.", "information");
                        grid.setActiveCell(args.row, 0);
                    }
                    else if ((data[selrow]["ProgramCastRole"] == null) || (data[selrow]["ProgramCastRole"] == undefined)) {
                        showMessage("Please select Cast Role.", "information");
                        grid.setActiveCell(args.row, 0);
                    }
                    else {
                        clearErrorMessages();
                    }
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
            grid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
                cellvalueRole = args.editor.getValue();
            });

            grid.onKeyDown.subscribe(function (e, args) {

                var cell = grid.getCellFromEvent(e);               
                if (e.shiftKey && e.keyCode == 117) {
                    //  debugger;
                    selrow = cell.row;
                    gitems = args.item;
                    selectedrow = data[selrow];
                    // alert(data[selrow]["Id"]);
                    if (data[selrow]["Id"] == null) {
                        AddToBasket(data[selrow], "Remove");
                        grid.invalidateRow(data.length);
                        data.splice(selrow, 1);
                        grid.updateRowCount();
                        grid.setData(data);
                        grid.render();
                    }
                    else {
                        AddToBasket(data[selrow], "Remove");
                        grid.invalidateRow(data.length);
                        data.splice(args.row, 1);
                        grid.updateRowCount();
                        grid.setData(data);
                        grid.render();
                    }
                }
                //  debugger;
                if (grid.getColumns()[args.cell].id == "ProgramCastRole") {
                    if (e.keyCode == 120) {

                        selrow = cell.row;
                        gitems = args.item;
                        grid.setActiveCell(selrow, cell + 1);
                        grid.setActiveCell(selrow, cell);
                        grid.editActiveCell();
                        selectedrow = data[selrow];
                        openRoleLov();
                    }
                }
                else if (grid.getColumns()[args.cell].id == "ProgramCastAward") {
                    if (e.keyCode == 120) {
                        debugger;
                        selrow = cell.row;
                        gitems = args.item;
                        grid.setActiveCell(selrow, cell + 1);
                        grid.setActiveCell(selrow, cell);
                        grid.editActiveCell();
                        selectedrow = data[selrow];
                        if (selectedrow == undefined) {
                            showMessage("Please select Cast Role.", "information");
                        }
                        else {
                            clearErrorMessages();
                            openAwardLov();
                        }
                    }
                }
            });

        },
        error: function () {
            alert("error");
        }
    });


}




//Validation Part.


var errorMessagePanel;
var isvalid = true;

function DurationExp(str) {
    if (str != "")
        var exp = new RegExp("[0-9][0-9]:[0-9][0-9]:[0-9][0-9]");
    var m = str.match(exp);
    return m;
};
$("#Awards").blur(function (e) {
    debugger;
    var award = document.getElementById('Awards').value;
    if (isNaN(award)) {
        showMessage("Please insert Award as Number.", "information");
        $("#Awards").val('');
    }
    else {
        clearErrorMessages();
    }
});
$("#Episodes").blur(function (e) {
    debugger;
    var episode = document.getElementById('Episodes').value;
    if (isNaN(episode)) {
        showMessage("Please insert episodes as Number.", "information");
        $("#Episodes").val('');
    }
    else {
        clearErrorMessages();
    }
});

var isValidRow = 0;

function validateRow(grid, rowIdx) {


    $.each(grid.getColumns(), function (colIdx, column) {
        // iterate through editable cells
        //debugger;
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

function ValidateForm() {
    debugger;
   // if (UpData.length == 0) {
//        if (grid.getActiveCell() != null) {

//            if (grid.getDataLength() > 0) {
//                var ActiveRow = grid.getActiveCell().row;
//                var Activecell = grid.getActiveCell().cell;
//                if (Activecell == 2) 
//                {
//                    grid.gotoCell(ActiveRow, 1, true);            
//                }
//                else if (Activecell == 1) 
//                {
//                    grid.gotoCell(ActiveRow, 2, true);              
//                }
//                else if (Activecell == 0)
//                {
//                    grid.gotoCell(ActiveRow, 1, true);                                                               
//                }
//                else if (Activecell == 3)
//                {
//                 grid.gotoCell(ActiveRow, 1, true);
//                }
          //  }          
      //  }
//  //  }  


    var str = [];
    str = UpData;
    var errorMessage = "";
    var $ProgrammeDiv = $(".ProgrammeDiv:visible");
    var validator = $('#Programmeform').validate(); // obtain validator
    var isvalid = false;
    if (errorMessagePanel != null && errorMessagePanel != undefined)
        errorMessagePanel.close();
    if (!DurationExp($('#DurationC').val()))
    { errorMessage = "Duration format should be 00:00:00"; }

    if ($('#Type').val() == "") {
        if (errorMessage == "") {
            errorMessage = "Please select Type";
        }
        else {
            errorMessage = errorMessage + "<br /> Please select Type";
        }
    }

    for (var i = 0; i < UpData.length; i++) {
        if ((UpData[i]["ProgramCastRole"] == null) || (UpData[i]["ProgramCastRole"] == "") || (UpData[i]["ProgramCastRole"] == undefined)) {
            if (errorMessage == "") {
                errorMessage = "Cast role cannot be blank. Please enter cast role.";
                grid.setActiveCell(selrow, 0);
                grid.editActiveCell();
            }
            else {
                errorMessage = errorMessage + "<br /> Cast role cannot be blank. Please enter cast role.";
                grid.setActiveCell(selrow, 0);
                grid.editActiveCell();
            }
        }
        else if ((UpData[i]["ProgramCastName"] == null) || (UpData[i]["ProgramCastName"] == "") || (UpData[i]["ProgramCastName"] == undefined)) {
            if (errorMessage == "") {
                errorMessage = "Cast name cannot be blank. Please enter cast name.";
                grid.setActiveCell(selrow, 1);
                grid.editActiveCell();
            }
            else {
                errorMessage = errorMessage + "<br /> Cast name cannot be blank. Please enter cast name.";
                grid.setActiveCell(selrow, 1);
                grid.editActiveCell();
            }
        }
    }
    $ProgrammeDiv.find("input").each(function () {

        if (!validator.element(this)) { // validate every input element insidepthis step
            isvalid = true;
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
        return false;
    }
    else {

        return true;
    }
}
shortcut.add("Esc", function () {
    $(activeCellNode).attr("title", "");
});

shortcut.add("F10", function () {
    SaveData();

});

$("#Synopsis1").change(function (e) {
    debugger;
    var ss = $("#Synopsis1").val();
    if (ss == "Local Synopsis") {
        $("#SynopsisareaLocal").attr("style", "display:block;width:100%;height:121px;background-color:#FFFFFF");
        $("#Synopsisarea").attr("style", "display:none;width:100%;height:121px;background-color:#C0C0C0");
        $("#SynopsisareaFull").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaWeb").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaMobile").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaEPG").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaShort").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $('#SynopsisareaLocal').focus();
    }
    else if (ss == "Full Synopsis") {
        $("#SynopsisareaLocal").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#Synopsisarea").attr("style", "display:none;width:100%;height:121px;background-color:#C0C0C0");
        $("#SynopsisareaFull").attr("style", "display:block;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaWeb").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaMobile").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaEPG").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaShort").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $('#SynopsisareaFull').focus();
    }
    else if (ss == "Web Synopsis") {
        $("#SynopsisareaLocal").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#Synopsisarea").attr("style", "display:none;width:100%;height:121px;background-color:#C0C0C0");
        $("#SynopsisareaFull").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaWeb").attr("style", "display:block;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaMobile").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaEPG").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaShort").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $('#SynopsisareaWeb').focus();
    }
    else if (ss == "Mobile Synopsis") {
        $("#SynopsisareaLocal").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#Synopsisarea").attr("style", "display:none;width:100%;height:121px;background-color:#C0C0C0");
        $("#SynopsisareaFull").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaWeb").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaMobile").attr("style", "display:block;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaEPG").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaShort").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $('#SynopsisareaMobile').focus();
    }
    else if (ss == "EPG Synopsis") {
        $("#SynopsisareaLocal").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#Synopsisarea").attr("style", "display:none;width:100%;height:121px;background-color:#C0C0C0");
        $("#SynopsisareaFull").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaWeb").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaMobile").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaEPG").attr("style", "display:block;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaShort").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $('#SynopsisareaEPG').focus();
    }
    else if (ss == "Short Synopsis") {
        $("#SynopsisareaLocal").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#Synopsisarea").attr("style", "display:none;width:100%;height:121px;background-color:#C0C0C0");
        $("#SynopsisareaFull").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaWeb").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaMobile").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaEPG").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaShort").attr("style", "display:block;width:100%;height:121px;background-color:#FFFFFF");
        $('#SynopsisareaShort').focus();
    }
    else if (ss == "--Select Option--") {
        $("#SynopsisareaLocal").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#Synopsisarea").attr("style", "display:block;width:100%;height:121px;background-color:#C0C0C0");
        $("#SynopsisareaFull").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaWeb").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaMobile").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaEPG").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
        $("#SynopsisareaShort").attr("style", "display:none;width:100%;height:121px;background-color:#FFFFFF");
    }
});

function syn() {
    var synFull = { SynID: "", SynDetails: "" }; synopsisList.push(synFull);
    var synFull = { SynID: "", SynDetails: "" }; synopsisList.push(synFull);
    var synFull = { SynID: "", SynDetails: "" }; synopsisList.push(synFull);
    var synFull = { SynID: "", SynDetails: "" }; synopsisList.push(synFull);
    var synFull = { SynID: "", SynDetails: "" }; synopsisList.push(synFull);
    var synFull = { SynID: "", SynDetails: "" }; synopsisList.push(synFull);
}

$("#SynopsisareaFull").blur(function (e) {
    var id = ""
    var s = $("#Synopsis1").val();
    var s1 = $("#SynopsisareaFull").val();
    synopsisList[0].SynID = s;
    synopsisList[0].SynDetails = s1;
});
$("#SynopsisareaLocal").blur(function (e) {
    var id = ""
    var s = $("#Synopsis1").val();
    var s1 = $("#SynopsisareaLocal").val();
    synopsisList[1].SynID = s;
    synopsisList[1].SynDetails = s1;
});
$("#SynopsisareaShort").blur(function (e) {
    var id = ""
    var s = $("#Synopsis1").val();
    var s1 = $("#SynopsisareaShort").val();
    synopsisList[2].SynID = s;
    synopsisList[2].SynDetails = s1;
});
$("#SynopsisareaWeb").blur(function (e) {
    var id = ""
    var s = $("#Synopsis1").val();
    var s1 = $("#SynopsisareaWeb").val();
    synopsisList[3].SynID = s;
    synopsisList[3].SynDetails = s1;
});
$("#SynopsisareaMobile").blur(function (e) {
    var id = ""
    var s = $("#Synopsis1").val();
    var s1 = $("#SynopsisareaMobile").val();
    synopsisList[4].SynID = s;
    synopsisList[4].SynDetails = s1;
});
$("#SynopsisareaEPG").blur(function (e) {
    var id = ""
    var s = $("#Synopsis1").val();
    var s1 = $("#SynopsisareaEPG").val();
    synopsisList[5].SynID = s;
    synopsisList[5].SynDetails = s1;
});

function SaveData() {
    debugger;
    //       noty({ text: "ok", type: 'error', dismissQueue: true,
    //           layout: 'bottom', theme: 'defaultTheme'
    //       });
//    var currentrow = grid.getSelectedRows()[0];
//    grid.gotoCell(selrow, 0, true);
//    grid.gotoCell(selrow, 1, true);

//    var dataViewUserData = grid.getData();
////    dataViewUserData[selrow].LibraryID = LibraryID;

//    if (currentrow == 0) {


//        if ((dataViewUserData[selrow].Id == null) || (dataViewUserData[selrow].Id == 'Undefined') || (dataViewUserData[selrow].gridstatus == 'Undefined'))
//        //if (item.gridstatus = 'undefined')
//            AddToBasket(dataViewUserData[selrow], "New");
//        else
//            AddToBasket(dataViewUserData[selrow], "edit");
//    }

    if (ValidateForm()) {
       
        var myData = [];
        var selectedLang = $("#Distributor option:selected").val().split(":");
        var selectedHouse = $("#ProductionHouse option:selected").val().split(":");
        var selectedPGen = $("#PrimaryGenre option:selected").val().split(":");
        var selectedSGen = $("#SecondaryGenre option:selected").val().split(":");
        var selectedTGen = $("#TertiaryGenre option:selected").val().split(":");
        var selectedColor = $("#ColourCode option:selected").val().split(":");
        var selectedUCode = $("#UserCode option:selected").val().split(":");
        var selectedSL = $("#SpokenLanguage option:selected").val().split(":");

        var ProgrammeViewModel = { ProgrammeTitle: $("#ProgrammeTitle").val(),
            Distributor: selectedLang[0].toString(),
            WorkingTitle: $("#WorkingTitle").val(),
            CatComplete: document.getElementById('CatComplete').checked,
            TargetGroup: $("#TargetGroup").val(),
            Archive: document.getElementById('Archive').checked,
            ProductionHouse: selectedHouse[0].toString(),
            PrimaryGenre: selectedPGen[0].toString(),
            SecondaryGenre: selectedSGen[0].toString(),
            TXDigitized: document.getElementById('TXDigitized').checked,
            DomesticAgeRestriction: $("#DomesticAgeRestriction").val(),
            MediaManagerAgeRestriction: $("#MediaManagerAgeRestriction").val(),
            TertiaryGenre: selectedTGen[0].toString(),
            NPACopy: document.getElementById('NPACopy').checked,
            ProductionYear: $("#ProductionYear").val(),
            QualityGrade: $("#QualityGrade").val(),
            Episodes: $("#Episodes").val(),
            WideScreen: document.getElementById('WideScreen').checked,
            Nationality: $("#Nationality").val(),
            Type: $("#Type").val(),
            RefNo: $("#RefNo").val(),
            ColourCode: selectedColor[0].toString(),
            SpokenLanguage: selectedSL[0].toString(),
            ProgrammeCategory: $("#ProgrammeCategory").val(),
            UserCode: selectedUCode[0].toString(),
            Mood: $("#Mood").val(),
            SubTitle: $("#SubTitle").val(),
            MusicTitle: $("#MusicTitle").val(),
            PoemTitle: $("#PoemTitle").val(),
            WebTitle: $("#WebTitle").val(),
            Parent: $("#Parent").val(),
            Awards: $("#Awards").val(),
            LinkForPosterAct: $("#LinkForPosterAct").val(),
            DurationC: $("#DurationC").val(),
            DurationS: $("#DurationS").val(),
            synopsisList: synopsisList,
            CastDetailList: UpData
        };
        debugger;
        ShowProgressBar();
        $.ajax({
            url: SaveDataUrl,
            type: "POST",
            dataType: 'Json',
            data: JSON.stringify(ProgrammeViewModel),
            contentType: 'application/json; charset=utf-8',
            cache: false,
            success: function (data) {
              debugger;
                RemoveProgressBar();
                if (data.Applicationmessage != null) {
                    showMessage(data.Applicationmessage, "information");
                }
                else {
                    if ($("#RefNo").val() == "") {
                        showMessage("Record Added Successfully.", "information");
                    }
                    else {
                        showMessage("Record modified Successfully.", "information");
                    }
                    displaydata(data);
                    DisableScreen();
                    $("#btnEdit").attr("class", "inputButton");
                    UpData = [];
                }
            },
            error: function () {
                showMessage("Error Occured While Adding the Record.", "warning");
                RemoveProgressBar();
            }
        });            //end of ajax call
    }
};
function DisableScreen() {
    $(".addReadOnly").attr("readonly", "readonly");
    $(".addReadOnly").attr("disabled", "disabled");
    $("#btnSave").attr("class", "inputButtonDisable");
}
function EditableScreen() {
   
    clearErrorMessages();
    debugger;
    grid.setOptions(options);
    grid.setColumns(columns1);
    //grid.setData(data);
    grid.render();
    $(".addReadOnly").removeAttr("readonly");
    $(".addReadOnly").removeAttr("disabled");
    $("#btnSave").attr("class", "inputButton");
    $("#btnEdit").attr("class", "inputButtonDisable");
    $("#RefNo").attr("readonly", "readonly");
}
function displaydata(data) {
    $("#RefNo").val(data.RefNo);
    $("#Episodes").val(data.Episodes);
    $("#awards").val(data.Awards);
    $("#Parent").val(data.Parent);
    BindGridWithData(data);
}
function AddToBasket(item, status) {
    //--------------------AddToBasket Start--------------------------------------------------   
    item1 = { "gridstatus": status };
    $.extend(item, item1);
    if (UpData.length == 0) {
        UpData.push(item);
        //            if (status == "Edit") {
        //                item1 = { "gridstatus": status };
        //                $.extend(item, item1);
        //                UpData.push(item);
        //            }
        //            else if (status == "New") {
        //                item1 = { "gridstatus": status };
        //                $.extend(item, item1);
        //                UpData.push(item);
        //            }
        //            else {
        //                alert("Define Mode New/Edit");
        //            }

    }
    else {
        for (var i = 0; i < UpData.length; i++) {
            if (UpData[i]["ProgramCastRole"] == item["ProgramCastRole"]) {
                UpData.splice(i, 1);
            }
        }
        //            item1 = { "gridstatus": status };
        //            $.extend(item, item1);
        //            UpData.push(item);
        if (status != "Remove")
            UpData.push(item);
    }

};


function openRoleLov() {
    debugger;

    $("#CRoleLOV").dialog({
        autoOpen: false,
        height: 400,
        width: 850,
        modal: true,
        show: {
            effect: 'fade',
            duration: 350
        },
        hide: {
            effect: 'fade',
            duration: 350
        },
        
        open: function (event, ui) {
            SetNonStandardDialogStyles();
            $('#CRoleLOV').css({ "width": "850px", "height": "400px" });
            var myData = [];
            var DealMemoViewModel;
            var dataViewRole = "";
            var columns = [
{ id: "CastRoleCode", name: "CastRoleCode", field: "CastRoleCode", sortable: true },
{ id: "CastRoleCodeDesc", name: "CastRoleCodeDesc", field: "CastRoleCodeDesc", sortable: true }

];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false,
                forceFitColumns: true,
                multiColumnSort: true,
                showHeaderRow: true,
                explicitInitialization: true
            };

            ShowProgressBar();
            $.ajax({
                url: CastRoleUrl,
                type: "GET",
                dataType: 'Json',
                data: { "cellvalueRole": cellvalueRole },
                cache: false,
                success: function (data) {
                    debugger;
                    myData = data;
                    RemoveProgressBar();
                    dataViewRole = new Slick.Data.DataView();
                    dataViewRole.setItems(data, "CastRoleCode");
                    Rgrid = new Slick.Grid("#CRoleLOV", dataViewRole, columns, options);
                    var gridContainerDiv = "#CRoleLOV";
                    if (data.length > 0) {
                        Rgrid.setSelectionModel(new Slick.RowSelectionModel());
                        Rgrid.setSelectedRows([0, 0]);
                        //setfooter(gridContainerDiv, 1, myData.length);
                        setfooter(gridContainerDiv, data.length);
                    }
                    else {
                        //setfooter(gridContainerDiv, 0, 0);
                        setfooter(gridContainerDiv, data.length);
                    }
                    Rgrid.onSort.subscribe(function (e, args) {
                        debugger;
                        SortGrid(args, dataViewRole);
                    });
                    FilterGrid(Rgrid, dataViewRole);
                    Rgrid.onClick.subscribe(function (e, args) {

                        var cell = Rgrid.getCellFromEvent(e);
                        var row = cell.row;
                        selectedvalue = data[row];
                        if (Rgrid.getActiveCell() != null) {
                            selectedvalue = dataViewRole.getItem(Rgrid.getActiveCell().row)
                        }
                    });
                    Rgrid.onDblClick.subscribe(function (e, args) {
                        castRoleLOV();
                        $("#CRoleLOV").dialog("close");
                    });
                    Rgrid.onKeyDown.subscribe(function (e, args) {
                        var cell = grid.getCellFromEvent(e);
                        if (e.keyCode == 13) {
                            castRoleLOV();
                            $("#CRoleLOV").dialog("close");

                        }
                    });
                    dataViewRole.onRowCountChanged.subscribe(function (e, args) {
                        debugger;
                        Rgrid.updateRowCount();
                        Rgrid.render();
                        var s = Rgrid.getData();
                        setfooter(gridContainerDiv, s.getLength());
                    });

                    dataViewRole.onRowsChanged.subscribe(function (e, args) {
                        Rgrid.invalidateRows(args.rows);
                        Rgrid.render();
                    });


                    $(Rgrid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                        debugger;
                        var columnId = $(this).data("columnId");
                        if (columnId != null) {
                            colFilters[columnId] = $.trim($(this).val());
                            dataViewRole.refresh();
                        }
                    });

                    Rgrid.onHeaderRowCellRendered.subscribe(function (e, args) {
                        debugger;
                        $(args.node).empty();
                        $("<input type='text'>")
                       .data("columnId", args.column.id)
                       .val(colFilters[args.column.id])
                       .appendTo(args.node);
                    });
                    var colFilters = {};
                    function filter(item) {

                        for (var columnId in colFilters) {
                            if (columnId !== undefined && colFilters[columnId] !== "") {
                                var c = Rgrid.getColumns()[Rgrid.getColumnIndex(columnId)];

                                //if not type casted to string, number filtering will throw error
                                if (String(item[c.field]).indexOf(colFilters[columnId].toUpperCase()) != 0) {
                                    if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) {
                                        return false;
                                    }
                                }

                            }
                        }
                        return true;
                    }
                    Rgrid.init();
                    dataViewRole.beginUpdate();
                    dataViewRole.setItems(data, "CastRoleCode");
                    dataViewRole.setFilter(filter);
                    dataViewRole.refresh();
                    dataViewRole.endUpdate();
                },
                error: function () {
                    alert("error");
                }
            });
        },
        buttons: {
            "OK": function () {
                castRoleLOV();
                $(this).dialog("close");
            },
            "Cancel": function () {
                if (!grid.getEditorLock().isActive())
                    grid.getEditorLock().activate(grid.getEditController());
                grid.setActiveCell(selrow, 0);
                grid.editActiveCell();

                $(this).dialog("close");
            }
        },
        close: function () { }
    });
    $("#CRoleLOV").dialog("open");
}
var selectedvalue;
function castRoleLOV() {
    debugger;
    var cdata = grid.getData();
    var item = { "ProgramCastRole": selectedvalue.CastRoleCode };
    // var item = { "ProgramCastRole": selectedvalue.CastRoleCode, "ProgramCastName": cdata[selrow].ProgramCastName, "ProgramCastOrder": cdata[selrow].ProgramCastOrder, "ProgramCastAward": cdata[selrow].ProgramCastAward, "ProgramCastDescription": cdata[selrow].ProgramCastDescription };

    $.extend(item, gitems);
    if (selectedrow == null)
        cellvalue = null;
    else
        cellvalue = cdata[selrow].ProgramCastRole;
    if (cellvalue == null) {
        cdata.splice(selrow, 1);
        cdata.push(item);
    }
    else {
        cdata[selrow].ProgramCastRole = selectedvalue.CastRoleCode;
    }
    grid.setData(cdata);
    grid.render();
    if (!grid.getEditorLock().isActive())
        grid.getEditorLock().activate(grid.getEditController());
    grid.setActiveCell(selrow, 1);
    grid.editActiveCell();

    if ((cdata[selrow].Id == null) || (item.gridstatus == 'Undefined'))
    //if (item.gridstatus = 'undefined')
        AddToBasket(cdata[selrow], "New");
    else
        AddToBasket(cdata[selrow], "edit");
}

function openAwardLov() {

    $("#CAwardLOV").dialog({
        autoOpen: false,
       
        height: 400,
        width: 850,
        modal: true,
        show: {
            effect: 'fade',
            duration: 350
        },
        hide: {
            effect: 'fade',
            duration: 350
        },





        open: function (event, ui) {
            SetNonStandardDialogStyles();
            $('#CAwardLOV').css({ "width": "850px", "height": "400px" });
            var myData = [];
            var DealMemoViewModel;
            var dataViewRole = "";
            var columns = [
                    { id: "CastAwardCode", name: "CastAwardCode", field: "CastAwardCode", sortable: true },
                    { id: "CastAwardDesc", name: "CastAwardDesc", field: "CastAwardDesc", sortable: true }

                    ];

            var options = {
                enableCellNavigation: true,
                enableColumnReorder: false,
                forceFitColumns: true,
                multiColumnSort: true,
                showHeaderRow: true,
                explicitInitialization: true
            };
            ShowProgressBar();
            $.ajax({
                url: CastAwardUrl,
                type: "GET",
                dataType: 'Json',
                data: { "cellvalueRole": cellvalueRole },
                success: function (data) {
                    debugger;
                    myData = data;
                    RemoveProgressBar();
                    dataViewRole = new Slick.Data.DataView();
                    dataViewRole.setItems(data, 'CastAwardCode');
                    Rgrid = new Slick.Grid("#CAwardLOV", dataViewRole, columns, options);
                    var gridContainerDivAward = "#CAwardLOV";
                    if (myData.length > 0) {
                        Rgrid.setSelectionModel(new Slick.RowSelectionModel());
                        Rgrid.setSelectedRows([0, 0]);
                        setfooter(gridContainerDivAward, myData.length);
                    }
                    else {
                        setfooter(gridContainerDivAward, myData.length);
                    }
                    Rgrid.onSort.subscribe(function (e, args) {
                        SortGrid(args, dataViewRole);
                    });
                    //FilterGrid(Rgrid, dataViewRole);
                    dataViewRole.onRowCountChanged.subscribe(function (e, args) {
                        debugger;
                        Rgrid.updateRowCount();
                        Rgrid.render();
                        var s = Rgrid.getData();
                        setfooter(gridContainerDivAward, s.getLength());
                    });

                    dataViewRole.onRowsChanged.subscribe(function (e, args) {
                        Rgrid.invalidateRows(args.rows);
                        Rgrid.render();
                    });


                    $(Rgrid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                        debugger;
                        var columnId = $(this).data("columnId");
                        if (columnId != null) {
                            colFilters[columnId] = $.trim($(this).val());
                            dataViewRole.refresh();
                        }
                    });

                    Rgrid.onHeaderRowCellRendered.subscribe(function (e, args) {
                        debugger;
                        $(args.node).empty();
                        $("<input type='text'>")
                       .data("columnId", args.column.id)
                       .val(colFilters[args.column.id])
                       .appendTo(args.node);
                    });
                    var colFilters = {};
                    function filter(item) {

                        for (var columnId in colFilters) {
                            if (columnId !== undefined && colFilters[columnId] !== "") {
                                var c = Rgrid.getColumns()[Rgrid.getColumnIndex(columnId)];

                                //if not type casted to string, number filtering will throw error
                                if (String(item[c.field]).indexOf(colFilters[columnId].toUpperCase()) != 0) {
                                    if (String(item[c.field]).indexOf(colFilters[columnId]) != 0) {
                                        return false;
                                    }
                                }

                            }
                        }
                        return true;
                    }
                    Rgrid.onClick.subscribe(function (e, args) {
                        var cell = Rgrid.getCellFromEvent(e);
                        var row = cell.row;
                        selectedvalue = data[row];
                        if (Rgrid.getActiveCell() != null) {
                            selectedvalue = dataViewRole.getItem(Rgrid.getActiveCell().row)
                        }

                    });
                    Rgrid.onDblClick.subscribe(function (e, args) {
                        castAwardLOV();
                        $("#CAwardLOV").dialog("close");
                    });
                    Rgrid.onKeyDown.subscribe(function (e, args) {

                        if (e.keyCode == 13) {
                            castAwardLOV();
                            $("#CAwardLOV").dialog("close");

                        }
                    });
                    Rgrid.init();
                    dataViewRole.beginUpdate();
                    dataViewRole.setItems(data, 'CastAwardCode');
                    dataViewRole.setFilter(filter);
                    dataViewRole.refresh();
                    dataViewRole.endUpdate();
                },
                error: function () {
                    alert("error");
                }
            });
        },
        buttons: {
            "OK": function () {
                castAwardLOV();
                $(this).dialog("close");
            },
            "Cancel": function () {
                if (!grid.getEditorLock().isActive())
                    grid.getEditorLock().activate(grid.getEditController());
                grid.setActiveCell(selrow,3);
                grid.editActiveCell();

                $(this).dialog("close");
            }
        },
        close: function () { }
    });
    $("#CAwardLOV").dialog("open");
}


function castAwardLOV() {
    var cdata = grid.getData();
    var item = { "ProgramCastRole": selectedrow.ProgramCastRole, "ProgramCastName": selectedrow.ProgramCastName, "ProgramCastOrder": selectedrow.ProgramCastOrder, "ProgramCastAward": selectedvalue.CastAwardCode, "ProgramCastDescription": selectedvalue.CastAwardDesc };
    $.extend(item, gitems);
    debugger;
    if (selectedrow == null)
        cellvalue = null;
    else
        cellvalue = cdata[selrow].ProgramCastAward;

    if ((cellvalue == null) && (selectedrow.ProgramCastRole == "")) {
        cdata.splice(selrow, 1);
        cdata.push(item);
    }
    else {
        cdata[selrow].ProgramCastAward = selectedvalue.CastAwardCode;
        cdata[selrow].ProgramCastDescription = selectedvalue.CastAwardDesc;
        // cdata.splice(selrow, 1);
        // cdata.push(item);
    }
    grid.setData(cdata);
    grid.render();
////    if (!grid.getEditorLock().isActive())
////        grid.getEditorLock().activate(grid.getEditController());
////    grid.setActiveCell(selrow, 3);
////    grid.editActiveCell();
  
    if (item.gridstatus = 'Undefined')
        AddToBasket(cdata[selrow], "New");

    else
        AddToBasket(cdata[selrow], "edit");
}




