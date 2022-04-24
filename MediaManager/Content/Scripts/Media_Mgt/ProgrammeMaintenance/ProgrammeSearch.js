
                           //Declare Variables.
var selectedvalue;
var GenRefno;
var lookupInvokerControl;
var Lookuptitle;
var resetflag = 0;
var actionParameters;
var grid;
var idfield;
var gridwidth;
var gridheight;
var columns;
var visiblecolumns;
var options;
var gridContainerDiv;
var baseaddress;
var emptyrow = [];
var ToggleButton1 = "#btnLicenseDetails";
var ToggleButton2 = "#btnProgrammeDetail";
var dataView;
var columnFilters = {};
var errorMessagePanel;
var errorMessage;
var infoMessage;
var act;
var para = [];
var emprow = [];
var emptycolumns = [];
var emptyoptions;
$(function () {
    $("#ProductionYear").val('');
    $("#Episodes").val('');
    $("#RefNo").val('');
    grid = showemptygrid();
    baseaddress = (document.getElementById('viewdetailsLink')).href;
});
function setfooter(gridContainerDiv, totalrows) {
   // debugger;
    var footerid = gridContainerDiv + "footer";
    $(footerid).remove();  
    $(gridContainerDiv).after('<div style="margin:5px 5px 5px 5px;" id="' + footerid.substring(1) + '">' + "Total number of rows displayed :" + totalrows + '</div>');
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


    gridContainerDiv = "#teamGrid";
    

    columns = [
    { id: "programmeTitle", name: "Programme Title", field: "ProgrammeTitle", editor: Slick.Editors.Text, sortable: true },
    { id: "workingTitle", name: "Working Title", field: "WorkingTitle", editor: Slick.Editors.Text, sortable: true },
    { id: "distributor", name: "Distributor", field: "Distributor", editor: Slick.Editors.Text, sortable: true },
    { id: "primaryGenre", name: "Primary Genre", field: "PrimaryGenre", editor: Slick.Editors.Text, sortable: true },
    { id: "type", name: "Type", field: "Type", editor: Slick.Editors.Text, sortable: true }
     ];

    visiblecolumns = null;

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
        Distributor: $("#Distributor").val(),
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
        SpokenLanguage: $("#SpokenLanguage").val()

    };

    idfield = "RefNo";
    gridwidth = 600;
    gridheight = 410;
}

function Search_click() {
    var cat = document.getElementById('CatComplete').checked;
    var txt = document.getElementById('TXDigitized').checked;
    var Wide = document.getElementById('WideScreen').checked;
    var NPA = document.getElementById('NPACopy').checked;
    var ach =document.getElementById('Archive').checked;
    actionParameters.CatComplete = cat;
    actionParameters.Archive = ach;
    actionParameters.TXDigitized = txt;
    actionParameters.WideScreen = Wide;
    actionParameters.NPACopy = NPA;
    var year = isNaN($("#ProductionYear").val());
    var Epi = isNaN($("#Episodes").val());
    var ref = isNaN($("#RefNo").val());
    if (Epi == true) { $("#Episodes").val(''); actionParameters.Episodes == ""; }
    if (ref == true) { $("#RefNo").val(''); actionParameters.RefNo == ""; }
    if (year == true)
    { $("#ProductionYear").val(''); actionParameters.ProductionYear == ""; }
    else if (!validenumber($("#ProductionYear").val())) { $("#ProductionYear").val(''); actionParameters.ProductionYear == ""; };
   
    if ($("#ProgrammeTitle").val() == "" && $("#WorkingTitle").val() == "" && $("#Distributor").val() == ""
         && $("#ProductionYear").val() == "" && $("#Episodes").val() == "" && $("#RefNo").val() == ""
         && $("#SpokenLanguage").val() == "Select" && $("#ColourCode").val() == "Select"
            && $("#Type").val() == "Select" && $("#Nationality").val() == "Select" && $("#QualityGrade").val() == "Select"
            && $("#TertiaryGenre").val() == "Select" && $("#ProductionHouse").val() == "Select"
            && $("#MediaManagerAgeRestriction").val() == "Select" && $("#DomesticAgeRestriction").val() == "Select"
            && $("#SecondaryGenre").val() == "Select" && $("#PrimaryGenre").val() == "Select"
            && $("#TargetGroup").val() == "Select" && actionParameters.CatComplete == false && actionParameters.Archive == false
            && actionParameters.TXDigitized == false && actionParameters.NPACopy == false && actionParameters.WideScreen == false)
             {
//                 var answer = confirm("No Search criteria has been entered.Do you want to see all record from the system?")
//        if (answer) {
//            ShowProgrammeSearchGrid();
                 //        }
                 noty({
                     text: 'No Search criteria has been entered. Do you want to see all records from the system?',
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
    $.noty.closeAll();
    Resetgrid();
    if ($("#ProgrammeTitle").val() != "" || $("#WorkingTitle").val() != "" || $("#Distributor").val() != ""
         || $("#ProductionYear").val() != "" || $("#Episodes").val() != "" || $("#RefNo").val() != ""
         || $("#SpokenLanguage").val() != "Select" || $("#ColourCode").val() != "Select"
            || $("#Type").val() != "Select" || $("#Nationality").val() != "Select" || $("#QualityGrade").val() != "Select"
            || $("#TertiaryGenre").val() != "Select" || $("#ProductionHouse").val() != "Select"
            || $("#MediaManagerAgeRestriction").val() != "Select" || $("#DomesticAgeRestriction").val() != "Select"
            || $("#SecondaryGenre").val() != "Select" || $("#PrimaryGenre").val() != "Select"
            || $("#TargetGroup").val() != "Select") {
       
        Reset_click();
    }
    else if (document.getElementById('CatComplete').checked == true || document.getElementById('TXDigitized').checked == true || document.getElementById('WideScreen').checked == true || document.getElementById('NPACopy').checked == true || document.getElementById('Archive').checked == true) {
        Resetgrid();
        Reset_click();
    }
    else {
        para = act;        
        $("#ProgrammeTitle").val(para["ProgrammeTitle"]);
        $("#WorkingTitle").val(para["WorkingTitle"]);
        $("#ProductionYear").val(para["ProductionYear"]);
        $("#Episodes").val(para["Episodes"]);
        $("#RefNo").val(para["Episodes"]);
        if (para["Distributor"] == "") $('#Distributor option').first().prop('selected', true);
        else { $("#Distributor").val(para["Distributor"]); }
        $("#TargetGroup").val(para["TargetGroup"]);
        $("#ProductionHouse").val(para["ProductionHouse"]);
        $("#DomesticAgeRestriction").val(para["DomesticAgeRestriction"]);
        $("#MediaManagerAgeRestriction").val(para["MediaManagerAgeRestriction"]);
        $("#TertiaryGenre").val(para["TertiaryGenre"]);
        $("#Nationality").val(para["Nationality"]);
        $("#Type").val(para["Type"]);
        $("#ColourCode").val(para["ColourCode"]);
        $("#SpokenLanguage").val(para["SpokenLanguage"]);
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
    }
  
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
    $('#Distributor option').first().prop('selected', true);
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
    $.noty.closeAll();
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
    grid = new Slick.Grid(gridContainerDiv, emprow, emptycolumns, emptyoptions);
    setfooter(gridContainerDiv, 0, 0);
    DisableToggleButton(ToggleButton1, true);
    DisableToggleButton(ToggleButton2, true);
}

//Get value(RefNo.) to show programme details.

function btnProgrammeDetail_click() {
    //debugger;
    if (selectedvalue != null) {

        window.open(baseaddress + '?RefNo=' + selectedvalue,'_self',false);
    }
    else if (selectedvalue == null) {
        alert("Please select a row");
    }
}

function btnAddNewProgramme_click() {
     
    window.open(baseaddress, '_self', false);

}

//Search Function.

function ShowProgrammeSearchGrid() {    
    //debugger;
    setGridParameters();
    gridwidth = $(gridContainerDiv).width();
    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });

    if (emptyrow.length > 0) {

        emptycolumns = [
    { id: "programmeTitle", name: "Programme Title", field: "ProgrammeTitle" },
    { id: "workingTitle", name: "Working Title", field: "WorkingTitle" },
    { id: "distributor", name: "Distributor", field: "Distributor" },
    { id: "primaryGenre", name: "Primary Genre", field: "PrimaryGenre" },
    { id: "type", name: "Type", field: "Type" }
     ];
        emptyoptions = {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true
        }
        grid = CreateEmptyGrid(gridContainerDiv, emptyrow, emptycolumns, emptyoptions);
        DisableToggleButton(ToggleButton1, true);
        DisableToggleButton(ToggleButton2, true);
    }
    else {
            ShowProgressBar($(gridContainerDiv).position().left + (gridwidth / 2),
                                            $(gridContainerDiv).position().top + (gridheight / 2));
            $.ajax({
                url: ProgrammesearchactionUrl,
                type: "GET",
                dataType: 'Json',
                data: actionParameters,
                cache: false,
                success: function (data) {
                    //  debugger;
                    dataView = new Slick.Data.DataView();
                    grid = new Slick.Grid(gridContainerDiv, dataView, columns, options);

                    if (visiblecolumns != null) {
                        grid.setColumns(visiblecolumns);
                    }
                    grid.setSelectionModel(new Slick.RowSelectionModel());
                    if (data.length > 0) {
                        selectedvalue = data[0.0][idfield];
                        if (selectedvalue == 0) {
                            showMessage("No Record Found", "information");
                        }
                        else
                            showMessage("Search Result Completed", "information");
                    }

                    if (selectedvalue != 0) {
                        if (selectedvalue != null) {
                            var rows = [];
                            rows.push(0);
                            grid.setSelectedRows(rows);
                            //setfooter(gridContainerDiv, 1, data.length);
                            setfooter(gridContainerDiv, data.length)
                            DisableToggleButton(ToggleButton1, false);
                            DisableToggleButton(ToggleButton2, false);
                        }
                        else {
                            setfooter(gridContainerDiv, 0)
                            // setfooter(gridContainerDiv, 0, 0);
                            DisableToggleButton(ToggleButton1, true);
                            DisableToggleButton(ToggleButton2, true);
                        }
                    }
                    else {

                        setfooter(gridContainerDiv, 0);

                    }
                    grid.onClick.subscribe(function (e, args) {
                        debugger;
                        DisableToggleButton(ToggleButton2, false);
                        var cell = grid.getCellFromEvent(e);
                        var row = cell.row;                       
                        setfooter(gridContainerDiv, data.length)                     
                        if (grid.getActiveCell() != null) {
                            selectedvalue = dataView.getItem(grid.getActiveCell().row)[idfield];
                            setfooter(gridContainerDiv, data.length)
                            GenRefno = selectedvalue;
                        }
                    


                    });
                    grid.onSelectedRowsChanged.subscribe(function (e, args) {
                        if (grid.getActiveCell() != null) {
                            selectedvalue = dataView.getItem(grid.getActiveCell().row)[idfield];

                        }
                    });
                    grid.onSort.subscribe(function (e, args) {
                        SortGrid(args, dataView);
                    });

                    FilterGrid(grid, dataView);
                    $(grid.getHeaderRow()).click(function () {
                        DisableToggleButton(ToggleButton2, true);
                        //grid.resetActiveCell(); 
                    });
                    //setfooter(gridContainerDiv, 0, data.length - 1);
                    grid.init();
                   // grid.resetActiveCell();
                    dataView.beginUpdate();
                    dataView.setItems(data, 'RefNo');
                    dataView.setFilter(filter);
                    dataView.endUpdate();
                    //setfooter(gridContainerDiv, 0, 0);
                    var rows = [];
                    rows.push(0);
                    grid.setSelectedRows(rows);
                    RemoveProgressBar();
                },
                error: function () {
                    RemoveProgressBar();
                    // alert("error fetching data.Please try again");
                    showMessage("error fetching data.Please try again.", "error");
                }
            });                                  //end of ajax call
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