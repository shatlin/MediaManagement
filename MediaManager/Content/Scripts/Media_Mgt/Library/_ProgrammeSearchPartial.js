//Declare Variables.
var selectedvalue;
var lookupInvokerControl;
var Lookuptitle;
var resetflag = 0;
var actionParameters;
var gridTeam;
var idfield;
var gridwidth;
var gridheight;
var columns;
var visiblecolumns;
var options;
var gridMaterialProgContainer;
var gridTeamContainer;
var baseaddress;
var emptyrow = [];
var ToggleButton1 = "#btnLicenseDetails";
var ToggleButton2 = "#btnProgrammeDetail";
var teamdataView;
var columnFilters = {};
var errorMessagePanel;
var errorMessage;
var infoMessage;
var act; 
var para = [];
var emprow = [];
var emptycolumns = [];
var emptyoptions;
var gridteamGridData;
var progResetFlag = 0;
var resetActionParameters = {};
var gridMaterialPrograms; var gridMaterialProgramscolumns = []; var gridMaterialProgramsviewableColumns = [];
var gridMaterialProgramsoptions; var gridMaterialProgramsidfield; var gridMaterialProgramsWidth; var gridMaterialProgramsHeight;

$(function () {
    $("#ProductionYear").val('');
    $("#Episodes").val('');
    $("#RefNo").val('');
    showemptygrid();
    baseaddress = (document.getElementById('viewdetailsLink')).href;
    //Grid Add Programs
    SetgridMaterialPrograms();
    resetActionParameters = { ProgrammeTitle: $("#ProgrammeTitle").val(),
        Distributor: $("#txtDistibutor").val(),
        CatComplete: document.getElementById('CatComplete').checked,
        WorkingTitle: $("#WorkingTitle").val(),
        TargetGroup: $("#TargetGroup").val(),
        Archive: document.getElementById('Archive').checked,
        ProductionHouse: $("#ProductionHouse").val(),
        PrimaryGenre: $("#PrimaryGenre").val(),
        SecondaryGenre: $("#SecondaryGenre").val(),
        TXDigitized: document.getElementById('TXDigitized').checked,
        DomesticAgeRestriction: $("#DomesticAgeRestriction").val(),
        MediaManagerAgeRestriction: $("#MediaManagerAgeRestriction").val(),
        TertiaryGenre: $("#TertiaryGenre").val(),
        NPACopy: document.getElementById('NPACopy').checked,
        ProductionYear: $("#ProductionYear").val(),
        QualityGrade: $("#QualityGrade").val(),
        Episodes: $("#Episodes").val(),
        WideScreen: document.getElementById('WideScreen').checked,
        Nationality: $("#Nationality").val(),
        Type: $("#Type").val(),
        RefNo: $("#RefNo").val(),
        ColourCode: $("#ColourCode").val(),
        SpokenLanguage: $("#SpokenLanguage").val(),
        MaterialID: MaterialID
    };

    $("#ProductionYear").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });

    $("#RefNo").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });

    $("#Episodes").keypress(function (e) {
        if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    });   


});

//set Grid Add Programs
function SetgridMaterialPrograms() {

    gridMaterialProgContainer = "#gridMaterialPrograms";

    gridMaterialProgramscolumns = [
                              { id: "MpID", name: "MpID", field: "MpID" },
                             { id: "MaterialID", name: "Material ID", field: "MaterialID" },
                             { id: "ProgrammeTitle", name: "programme Title", field: "ProgrammeTitle", editor: Slick.Editors.Text },
                                { id: "WorkingTitle", name: "Working Title", field: "WorkingTitle", editor: Slick.Editors.Text },
                                { id: "Distributor", name: "Distributor", field: "Distributor", editor: Slick.Editors.Text },
                                { id: "PrimaryGenre", name: "Primary Genre", field: "PrimaryGenre", editor: Slick.Editors.Text },
                                { id: "Type", name: "Type", field: "Type", editor: Slick.Editors.Text }
                          ];

    gridMaterialProgramsviewableColumns = [
                             { id: "ProgrammeTitle", name: "programme Title", field: "ProgrammeTitle", editor: Slick.Editors.Text },
                                { id: "WorkingTitle", name: "Working Title", field: "WorkingTitle", editor: Slick.Editors.Text },
                                { id: "Distributor", name: "Distributor", field: "Distributor", editor: Slick.Editors.Text },
                                { id: "PrimaryGenre", name: "Primary Genre", field: "PrimaryGenre", editor: Slick.Editors.Text },
                                { id: "Type", name: "Type", field: "Type", editor: Slick.Editors.Text },
                                { id: "id", name: "Remove programme", field: "MpID",
                                   formatter: function (r, c, id, def, datactx) {
                                       return "<a href='#' style='color:red;font-weight:bold;text-decoration:underline;' onclick='RemoveClick(" + r + ")'>Remove</a>";
                                   }
                                }                               
                          ];

    gridMaterialProgramsoptions =
        {
            editable: false,
            enableAddRow: true,
            enableCellNavigation: true,
            asyncEditorLoading: false,
            forceFitColumns: true
        };

    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
        gridMaterialProgramsidfield = 'MpID';
    gridMaterialProgramsWidth = 1150;
    gridMaterialProgramsHeight = 200;
}

function LoadProgramData() {
    var actionParameters = {
        MaterialID: MaterialID
    }
    $.ajax({
        url: urlLoadProgramDetail,
        type: "GET",
        dataType: 'Json',
        cache: false,
        async: false,    
        data: actionParameters,
        success: function (data) {
            DisplayGridMaterialPrograms(data);
        },
        error: function () {
            DisplayGridMaterialPrograms("no record found.");
            alert("error fetching data.Please try again");
            RemoveProgressBar();
        }
    });
}

function DisplayGridMaterialPrograms(data)
{
    clearAllMessages();
    if (data.length == 0) {
        data = [];
        setfooter(gridMaterialProgContainer, 0, 0);
        gridMaterialProgData = data;

        //Remove remove button column if data in null.
//        gridMaterialProgramsviewableColumns.pop({ id: "id", name: "Remove", field: "MpID",
//            formatter: function (r, c, id, def, datactx) {
//                return "<a href='#' style='color:black;' onclick='RemoveClick(" + r + ")'>Remove</a>";
//            }
//        });
    }
    else {
        gridMaterialProgData = data;

        //Add remove button column if rows > 0.
//        if (gridMaterialProgramsviewableColumns.length < 6) {
//            gridMaterialProgramsviewableColumns.push({ id: "id", name: "Remove programme", field: "MpID",
//                formatter: function (r, c, id, def, datactx) {
//                    return "<a href='#' style='color:black;' onclick='RemoveClick(" + r + ")'>Remove</a>";
//                }
//            });
//         }
    }
    RemoveProgressBar();    
    var myData = [];
    $(gridMaterialProgContainer).css({ "width": gridMaterialProgramsWidth + "px", "height": gridMaterialProgramsHeight });
    myData = data;
    var totalrecord;
    
    gridMaterialPrograms = new Slick.Grid(gridMaterialProgContainer, data, gridMaterialProgramsviewableColumns, gridMaterialProgramsoptions);
    var progdataview = new Slick.Data.DataView();
    //gridMaterialPrograms = grid;

    gridMaterialPrograms.setSelectionModel(new Slick.RowSelectionModel());
    gridMaterialPrograms.onClick.subscribe(function (e, args) {
        var cell = gridMaterialPrograms.getCellFromEvent(e);
        var row = cell.row;
        setfooter(gridMaterialProgContainer, row, data.length);
    });

//    var rows = [];
//    rows.push(0);
//    gridMaterialPrograms.setSelectedRows(rows);
    gridMaterialPrograms.setColumns(gridMaterialProgramsviewableColumns);
    var rowNo = 0;
    if (data.length > 0)
        rowNo = 0;
    setfooter(gridMaterialProgContainer, rowNo, data.length);
}

function AddClick(gridRow)
{
    clearAllMessages();
    var data = gridteamGridData;
    var newRow =
            {
                MaterialID: MaterialID,
                ProgrammeTitle: data[gridRow].ProgrammeTitle,
                WorkingTitle: data[gridRow].WorkingTitle,
                Distributor: data[gridRow].Distributor,
                PrimaryGenre: data[gridRow].PrimaryGenre,
                Type: data[gridRow].Type,
                GenRefNo: data[gridRow].RefNo
            }

    //set grid with new added row
    gridMaterialProgData.splice(0, 0, newRow);
    gridMaterialPrograms.setData(gridMaterialProgData);
    gridMaterialPrograms.render();
    //DisplayGridMaterialPrograms(gridMaterialProgData);
    
    //remove row from gridTeam    
    gridteamGridData.splice(gridRow, 1);      
    gridTeam.setData(gridteamGridData);
    gridTeam.render();
    //push added row in array to hold added/deleted row.
    var item1 = { "PersistFlag": "Added" };
    $.extend(newRow, item1);
    ModifiedMaterialProgramsRows.push(newRow);
    var row = 0;
    if (gridMaterialPrograms.getSelectedRows() != null && gridMaterialPrograms.getSelectedRows()[0] !=null) {
        row = gridMaterialPrograms.getSelectedRows()[0];
    }
    setfooter(gridMaterialProgContainer, row, gridMaterialPrograms.getData().length);
    row = 0;
    if (gridTeam.getSelectedRows() != null && gridTeam.getSelectedRows()[0] != null) {
        row = gridTeam.getSelectedRows()[0];
    }
    setfooter(gridTeamContainer, row, gridTeam.getData().length); 
}

function RemoveClick(gridRow)
{
    clearAllMessages();
    var data = gridMaterialProgData;
    var newRow =
            {
                MpID: data[gridRow].MpID,               
                MaterialID: MaterialID,
                ProgrammeTitle: data[gridRow].ProgrammeTitle,
                WorkingTitle: data[gridRow].WorkingTitle,
                Distributor: data[gridRow].Distributor,
                PrimaryGenre: data[gridRow].PrimaryGenre,
                Type: data[gridRow].Type,
                GenRefNo: data[gridRow].RefNo
            }       
    var MpID = data[gridRow].MpID;      
    var item1 = { "PersistFlag": "Deleted" };
    $.extend(newRow, item1);   
    
    //Dispay record in grid after removing row.
    data.splice(gridRow, 1);
    gridMaterialPrograms.setData(data);
    gridMaterialPrograms.render();

    //push deleted row in array to hold added/deleted row.
    ModifiedMaterialProgramsRows.push(newRow);
    //setfooter(gridMaterialProgContainer, 0, gridMaterialProgData.length);  

    var row = 0;
    if (gridMaterialPrograms.getSelectedRows() != null && gridMaterialPrograms.getSelectedRows()[0] != null) {
        row = gridMaterialPrograms.getSelectedRows()[0];
    }
    setfooter(gridMaterialProgContainer, row, gridMaterialPrograms.getData().length);
    row = 0;
    if (gridTeam.getSelectedRows() != null && gridTeam.getSelectedRows()[0] != null) {
        row = gridTeam.getSelectedRows()[0];
    }
    setfooter(gridTeamContainer, row, gridTeam.getData().length); 
}


// Show emtpy grid at page loading.
function showemptygrid() {

    emptyrow[0] =
      {
          ProgrammeTitle: "",
          WorkingTitle: "",
          Distributor: "",
          PrimaryGenre: "",
          Type: ""
      };
    ShowProgrammeSearchGrid();
    emptyrow = "";
}
//Set parameters .
function setGridParameters() {


    gridTeamContainer = "#teamGrid";


    columns = [
    { id: "GenRefNo", name: "GenRefNo", field: "GenRefNo" },
    { id: "programmeTitle", name: "Programme Title", field: "ProgrammeTitle", editor: Slick.Editors.Text, sortable: true },
    { id: "workingTitle", name: "Working Title", field: "WorkingTitle", editor: Slick.Editors.Text, sortable: true },
    { id: "distributor", name: "Distributor", field: "Distributor", editor: Slick.Editors.Text, sortable: true },
    { id: "primaryGenre", name: "Primary Genre", field: "PrimaryGenre", editor: Slick.Editors.Text, sortable: true },
    { id: "type", name: "Type", field: "Type", editor: Slick.Editors.Text, sortable: true }
     ];

    visiblecolumns = [
    { id: "programmeTitle", name: "Programme Title", field: "ProgrammeTitle", editor: Slick.Editors.Text, sortable: true },
    { id: "workingTitle", name: "Working Title", field: "WorkingTitle", editor: Slick.Editors.Text, sortable: true },
    { id: "distributor", name: "Distributor", field: "Distributor", editor: Slick.Editors.Text, sortable: true },
    { id: "primaryGenre", name: "Primary Genre", field: "PrimaryGenre", editor: Slick.Editors.Text, sortable: true },
    { id: "type", name: "Type", field: "Type", editor: Slick.Editors.Text, sortable: true }
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


    actionParameters = { ProgrammeTitle: $("#ProgrammeTitle").val(),
        Distributor: $("#txtDistibutor").val(),
        CatComplete: document.getElementById('CatComplete').checked,
        WorkingTitle: $("#WorkingTitle").val(),
        TargetGroup: $("#TargetGroup").val(),
        Archive: document.getElementById('Archive').checked,
        ProductionHouse: $("#ProductionHouse").val(),
        PrimaryGenre: $("#PrimaryGenre").val(),
        SecondaryGenre: $("#SecondaryGenre").val(),
        TXDigitized: document.getElementById('TXDigitized').checked,
        DomesticAgeRestriction: $("#DomesticAgeRestriction").val(),
        MediaManagerAgeRestriction: $("#MediaManagerAgeRestriction").val(),
        TertiaryGenre: $("#TertiaryGenre").val(),
        NPACopy: document.getElementById('NPACopy').checked,
        ProductionYear: $("#ProductionYear").val(),
        QualityGrade: $("#QualityGrade").val(),
        Episodes: $("#Episodes").val(),
        WideScreen: document.getElementById('WideScreen').checked,
        Nationality: $("#Nationality").val(),
        Type: $("#Type").val(),
        RefNo: $("#RefNo").val(),
        ColourCode: $("#ColourCode").val(),
        SpokenLanguage: $("#SpokenLanguage").val(),
        MaterialID:MaterialID
    };

    idfield = "RefNo";
    gridwidth = 1150;
    gridheight = 200;
}

function Search_click()
{
    clearAllMessages();
    var cat = document.getElementById('CatComplete').checked;
    var txt = document.getElementById('TXDigitized').checked;
    var Wide = document.getElementById('WideScreen').checked;
    var NPA = document.getElementById('NPACopy').checked;
    var ach = document.getElementById('Archive').checked;
    actionParameters.CatComplete = cat;
    actionParameters.Archive = ach;
    actionParameters.TXDigitized = txt;
    actionParameters.WideScreen = Wide;
    actionParameters.NPACopy = NPA;
    var year = isNaN($("#ProductionYear").val());
    var Epi = isNaN($("#Episodes").val());
    var ref = isNaN($("#RefNo").val());
    var prodYear = isNaN($("#ProductionYear").val());
    if (Epi && $.trim($("#Episodes").val()) != "") {
        showMessage('Episode No. must be numeric.', 'error');
        return;
    }

    if (ref && $.trim($("#RefNo").val()) != "") {
        showMessage('ReFNo. must be numeric.', 'error');
        return;
    }
    if (prodYear && $.trim($("#ProductionYear").val()) != "") {
        showMessage('Production year must be numeric.', 'error');
        return;
    }
    else if ($("#ProductionYear").val().length != 4 && $.trim($("#ProductionYear").val()) != "") {
        showMessage('Invalid production year.', 'error');
        return;
    }
    if (Epi == true) { $("#Episodes").val(''); actionParameters.Episodes == ""; }
    if (ref == true) { $("#RefNo").val(''); actionParameters.RefNo == ""; }
    if (year == true)
    { $("#ProductionYear").val(''); actionParameters.ProductionYear == ""; }
    else if (!validenumber($("#ProductionYear").val())) { $("#ProductionYear").val(''); actionParameters.ProductionYear == ""; };



    if ($("#ProgrammeTitle").val() == "" && $("#WorkingTitle").val() == "" && $("#txtDistibutor").val() == ""
         && $("#ProductionYear").val() == "" && $("#Episodes").val() == "" && $("#RefNo").val() == ""
         && $("#SpokenLanguage").val() == "Select" && $("#ColourCode").val() == "Select"
            && $("#Type").val() == "Select" && $("#Nationality").val() == "Select" && $("#QualityGrade").val() == "Select"
            && $("#TertiaryGenre").val() == "Select" && $("#ProductionHouse").val() == "Select"
            && $("#MediaManagerAgeRestriction").val() == "Select" && $("#DomesticAgeRestriction").val() == "Select"
            && $("#SecondaryGenre").val() == "Select" && $("#PrimaryGenre").val() == "Select"
            && $("#TargetGroup").val() == "Select" && actionParameters.CatComplete == false && actionParameters.Archive == false
            && actionParameters.TXDigitized == false && actionParameters.NPACopy == false && actionParameters.WideScreen == false) {
        //                 var answer = confirm("No Search criteria has been entered.Do you want to see all record from the system?")
        //        if (answer) {
        //            ShowProgrammeSearchGrid();
        //        }
        noty({
            text: 'No Search criteria has been selected. Do you want to see all records from the system?',
            modal: false,
            type: 'alert',
            buttons: [
                                    { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                                        $noty.close();
                                        ShowProgrammeSearchGrid();
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
        ShowProgrammeSearchGrid();
    }
};

//To validate Number input.

function validenumber(input) {
    var isvalid = true;
    if (input != "") {
        if (input >= 1900 && input <= 2199)
            isvalid = true;
        else
            isvalid = false;
    }
    return isvalid;
};

//F7 -F7 functionality.1st F7 to reset screen and 2nd F7 to reset previous search criteria.

shortcut.add("F7", function () {
    var isDialogProgrammeSearchVisible = $('#dialogProgrammeSearch').is(':visible')
    if (isDialogProgrammeSearchVisible) {
        //        if ($("#ProgrammeTitle").val() != "" || $("#WorkingTitle").val() != "" || $("#txtDistibutor").val() != ""
        //         || $("#ProductionYear").val() != "" || $("#Episodes").val() != "" || $("#RefNo").val() != ""
        //         || $("#SpokenLanguage").val() != "Select" || $("#ColourCode").val() != "Select"
        //            || $("#Type").val() != "Select" || $("#Nationality").val() != "Select" || $("#QualityGrade").val() != "Select"
        //            || $("#TertiaryGenre").val() != "Select" || $("#ProductionHouse").val() != "Select"
        //            || $("#MediaManagerAgeRestriction").val() != "Select" || $("#DomesticAgeRestriction").val() != "Select"
        //            || $("#SecondaryGenre").val() != "Select" || $("#PrimaryGenre").val() != "Select"
        //            || $("#TargetGroup").val() != "Select") {
        if (progResetFlag == 0) {
            resetActionParameters = { ProgrammeTitle: $("#ProgrammeTitle").val(),
                Distributor: $("#txtDistibutor").val(),
                CatComplete: document.getElementById('CatComplete').checked,
                WorkingTitle: $("#WorkingTitle").val(),
                TargetGroup: $("#TargetGroup").val(),
                Archive: document.getElementById('Archive').checked,
                ProductionHouse: $("#ProductionHouse").val(),
                PrimaryGenre: $("#PrimaryGenre").val(),
                SecondaryGenre: $("#SecondaryGenre").val(),
                TXDigitized: document.getElementById('TXDigitized').checked,
                DomesticAgeRestriction: $("#DomesticAgeRestriction").val(),
                MediaManagerAgeRestriction: $("#MediaManagerAgeRestriction").val(),
                TertiaryGenre: $("#TertiaryGenre").val(),
                NPACopy: document.getElementById('NPACopy').checked,
                ProductionYear: $("#ProductionYear").val(),
                QualityGrade: $("#QualityGrade").val(),
                Episodes: $("#Episodes").val(),
                WideScreen: document.getElementById('WideScreen').checked,
                Nationality: $("#Nationality").val(),
                Type: $("#Type").val(),
                RefNo: $("#RefNo").val(),
                ColourCode: $("#ColourCode").val(),
                SpokenLanguage: $("#SpokenLanguage").val(),
                MaterialID: MaterialID
            };
            Resetgrid();
            Reset_click();
            progResetFlag = 1;
        }
        else if (document.getElementById('CatComplete').checked == true || document.getElementById('TXDigitized').checked == true || document.getElementById('WideScreen').checked == true || document.getElementById('NPACopy').checked == true || document.getElementById('Archive').checked == true) {
            Resetgrid();
            Reset_click();
        }
        else {
            para = resetActionParameters;
            $("#ProgrammeTitle").val(para["ProgrammeTitle"]);
            $("#WorkingTitle").val(para["WorkingTitle"]);
            $("#ProductionYear").val(para["ProductionYear"]);
            $("#Episodes").val(para["Episodes"]);
            $("#RefNo").val(para["Episodes"]);
            if (para["Distributor"] == "") $('#txtDistibutor option').first().prop('selected', true);
            else { $("#txtDistibutor").val(para["Distributor"]); }
            $("#TargetGroup").val(para["TargetGroup"]);
            $("#ProductionHouse").val(para["ProductionHouse"]);
            $("#DomesticAgeRestriction").val(para["DomesticAgeRestriction"]);
            $("#MediaManagerAgeRestriction").val(para["MediaManagerAgeRestriction"]);
            $("#TertiaryGenre").val(para["TertiaryGenre"]);
            $("#Nationality").val(para["Nationality"]);
            $("#Type").val(para["ProductionHouse"]);
            $("#ColourCode").val(para["ProductionHouse"]);
            $("#SpokenLanguage").val(para["ProductionHouse"]);
            $("#PrimaryGenre").val(para["PrimaryGenre"]);
            $("#SecondaryGenre").val(para["SecondaryGenre"]);
            $("#QualityGrade").val(para["QualityGrade"]);
            if (para["Archive"] == false)
            { $('#Archive').prop('checked', false); }
            else { $('#Archive').prop('checked', true); }
            if (para["CatComplete"] == false)
            { $('#CatComplete').prop('checked', false); }
            else { $('#CatComplete').prop('checked', true); }
            if (para["NPACopy"] == false)
            { $('#NPACopy').prop('checked', false); }
            else { $('#NPACopy').prop('checked', true); }
            if (para["WideScreen"] == false)
            { $('#WideScreen').prop('checked', false); }
            else { $('#WideScreen').prop('checked', true); }
            if (para["TXDigitized"] == false)
            { $('#TXDigitized').prop('checked', false); }
            else { $('#TXDigitized').prop('checked', true); }
            progResetFlag = 0;
        }
    }
    clearErrorMessages();
});

//F8 to search.

shortcut.add("F8", function () {
    Search_click();
});

//To reset screen using reset button.

function Reset_click() {
    act = actionParameters;
    $("#ProgrammeTitle").val('');
    $("#WorkingTitle").val('');
    $("#Episodes").val('');
    $("#ProductionYear").val('');
    $("#RefNo").val('');
    $('#txtDistibutor option').first().prop('selected', true);
    $('#ProductionHouse option').first().prop('selected', true);
    $('#PrimaryGenre option').first().prop('selected', true);
    $('#SecondaryGenre option').first().prop('selected', true);
    $('#DomesticAgeRestriction option').first().prop('selected', true);
    $('#MediaManagerAgeRestriction option').first().prop('selected', true);
    $('#QualityGrade option').first().prop('selected', true);
    $('#Nationality option').first().prop('selected', true);
    $('#Type option').first().prop('selected', true);
    $('#ColourCode option').first().prop('selected', true);
    $('#TertiaryGenre option').first().prop('selected', true);
    $('#TargetGroup option').first().prop('selected', true);
    $('#SpokenLanguage option').first().prop('selected', true);
    $('#Archive').prop('checked', false);
    $('#WideScreen').prop('checked', false);
    $('#TXDigitized').prop('checked', false);
    $('#CatComplete').prop('checked', false);
    $('#NPACopy').prop('checked', false);
    Resetgrid();
    clearErrorMessages();
};

//To reset grid.

function Resetgrid() {
    emprow[0] =
      {
          ProgrammeTitle: "",
          WorkingTitle: "",
          Distributor: "",
          PrimaryGenre: "",
          Type: ""
      };
      emprow = [];
      teamdataView = new Slick.Data.DataView();
      gridTeam = new Slick.Grid(gridTeamContainer, teamdataView, visiblecolumns, options);
      gridTeam.setSelectionModel(new Slick.RowSelectionModel());
      gridTeam.render();

      //FilterGrid(gridTeam, teamdataView);
      FilterGridWithRowCount(gridTeam, teamdataView, gridTeamContainer);
      //setfooter(gridTeamContainer, 0, data.length - 1);
      gridTeam.init();
      teamdataView.beginUpdate();
      teamdataView.setItems(emprow, 'RefNo');
      teamdataView.setFilter(GridTeamfilter);
      teamdataView.endUpdate();
      //setfooter(gridTeamContainer, 0, 0);
      var rows = [];
      rows.push(0);
      gridTeam.setSelectedRows(rows);
    setfooter(gridTeamContainer, 0, 0);
    DisableToggleButton(ToggleButton1, true);
    DisableToggleButton(ToggleButton2, true);
}

//Get value(RefNo.) to show programme details.

function btnProgrammeDetail_click() {
    if (selectedvalue != null) {

        window.open(baseaddress + '?RefNo=' + selectedvalue);
    }
    else if (selectedvalue == null) {
        alert("Please select a row");
    }
}

function btnAddNewProgramme_click() {

    window.open(baseaddress);
}

//Search Function.

function GridTeamfilter(item) {
    for (var columnId in columnFilters) {
        if (columnId !== undefined && columnFilters[columnId] !== "") {
            var c = gridTeam.getColumns()[gridTeam.getColumnIndex(columnId)];
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


function ShowProgrammeSearchGrid() {
    setGridParameters();
    //gridwidth = $(gridTeamContainer).width();
    $(gridTeamContainer).css({ "width": gridwidth + "px", "height": gridheight });

    if (emptyrow.length > 0) {

        //        emptycolumns = [
        //    { id: "programmeTitle", name: "Programme Title", field: "ProgrammeTitle" },
        //    { id: "workingTitle", name: "Working Title", field: "WorkingTitle" },
        //    { id: "distributor", name: "Distributor", field: "Distributor" },
        //    { id: "primaryGenre", name: "Primary Genre", field: "PrimaryGenre" },
        //    { id: "type", name: "Type", field: "Type" },
        //    { id: "id", name: "Add", field: "programmeTitle",
        //        formatter: function (r, c, id, def, datactx) {
        //            return "<a href='#' style='color:black;' onclick='AddClick(" + r + ")'>Add</a>";
        //        }
        //    }
        //     ];

        columns.pop({ id: "id", name: "Add", field: "GenRefNo",
            formatter: function (r, c, id, def, datactx) {
                return "<a href='#'  style='color:red;font-weight:bold;text-decoration:underline;' onclick='AddClick(" + r + ")'>Add</a>";

            }
        });
        emptyoptions = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true
        }
        gridTeam = CreateEmptyGrid(gridTeamContainer, emptyrow, columns, emptyoptions);
        gridTeam.setColumns(visiblecolumns);
        DisableToggleButton(ToggleButton1, true);
        DisableToggleButton(ToggleButton2, true);
    }
    else {
        ShowProgressBar($(gridTeamContainer).position().left + (gridwidth / 2),
                                            $(gridTeamContainer).position().top + (gridheight / 2));
        $.ajax({
            url: ProgrammesearchactionUrl,
            type: "GET",
            dataType: 'Json',
            data: actionParameters,
            cache: false,
            async: false,    
            success: function (data) {
                if (data.length > 0) {
                    selectedvalue = data[0.0][idfield];
                    if (selectedvalue == 0) {
                        showMessage("No Record Found.", "information");
                        visiblecolumns.pop({ id: "id", name: "Add", field: "GenRefNo",
                            formatter: function (r, c, id, def, datactx) {
                                return "<a href='#' style='color:red;font-weight:bold;text-decoration:underline;' onclick='AddClick(" + r + ")'>Add</a>";
                            }
                        });
                    }
                    else
                        visiblecolumns.push({ id: "id", name: "Add", field: "GenRefNo",
                            formatter: function (r, c, id, def, datactx) {
                                return "<a href='#' style='color:red;font-weight:bold;text-decoration:underline;' onclick='AddClick(" + r + ")'>Add</a>";
                            }
                        });  
                    gridteamGridData = data;
                    showMessage("Search Result Completed.", "information");
                }

                teamdataView = new Slick.Data.DataView();
                gridTeam = new Slick.Grid(gridTeamContainer, teamdataView, columns, options);
                if (visiblecolumns != null) {
                    gridTeam.setColumns(visiblecolumns);
                }

                gridTeam.setSelectionModel(new Slick.RowSelectionModel());
                if (selectedvalue != 0) {
                    if (selectedvalue != null) {
                        var rows = [];
                        rows.push(0);
                        gridTeam.setSelectedRows(rows);
                        setfooter(gridTeamContainer, 1, data.length);
                        DisableToggleButton(ToggleButton1, false);
                        DisableToggleButton(ToggleButton2, false);
                    }
                    else {
                        setfooter(gridTeamContainer, 0, 0);
                        DisableToggleButton(ToggleButton1, true);
                        DisableToggleButton(ToggleButton2, true);
                    }
                }

                gridTeam.onClick.subscribe(function (e, args) {
                    clearAllMessages();
                    var cell = gridTeam.getCellFromEvent(e);
                    var row = cell.row;
                    selectedvalue = data[cell.row][idfield];
                    //selectedseriestitle = data[cell.row].SeriesTitleList;
                    GenRefno = data[cell.row].RefNo; 
                    setfooter(gridTeamContainer, row, data.length);
                });

                gridTeam.onSort.subscribe(function (e, args) {
                    SortGrid(args, teamdataView);
                });

                //FilterGrid(gridTeam, teamdataView);
                FilterGridWithRowCount(gridTeam, teamdataView, gridTeamContainer);
                //setfooter(gridTeamContainer, 0, data.length - 1);
                gridTeam.init();
                teamdataView.beginUpdate();
                teamdataView.setItems(data, 'RefNo');
                teamdataView.setFilter(GridTeamfilter);
                teamdataView.endUpdate();
                //setfooter(gridTeamContainer, 0, 0);
                var rows = [];
                rows.push(0);
                gridTeam.setSelectedRows(rows);
                RemoveProgressBar();
            },
            error: function () {
                RemoveProgressBar();
                alert("error fetching data.Please try again");

            }
        });                           //end of ajax call
    }
    return selectedvalue;
};

$(document).ready(function () {

    $("#btnLicenseDetails").click(function (e) {
        GetLicenseDetail();
        ShowDialog(true);
        e.preventDefault();
    });
    $("#btnClose").click(function (e) {
        HideDialog();
        e.preventDefault();
    });

    $("#btnSubmit").click(function (e) {
        var brand = $("#brands input:radio:checked").val();
        $("#output").html("<b>Your favorite mobile brand: </b>" + brand);
        HideDialog();
        e.preventDefault();
    });
});

function ShowDialog(modal) {
    $("#overlay").show();
    $("#dialog").fadeIn(100);

    if (modal) {
        $("#overlay").unbind("click");
    }
    else {
        $("#overlay").click(function (e) {
            HideDialog();
        });
    }
}

function HideDialog() {
    $("#overlay").hide();
    $("#dialog").fadeOut(100);
}
