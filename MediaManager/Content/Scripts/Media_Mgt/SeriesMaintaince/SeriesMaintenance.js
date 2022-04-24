var lookupInvokerControl;
var Lookuptitle;
var resetflag = 0;
var SeriesTitleVal;
var SeasonTitleVal;
var EpisodeTitleVal;
var GenreVal;
var GridVal=[];
var actionParameters;
var grid;
var idfield;
var gridwidth;
var gridheight;
var ToggleButton1;
var ToggleButton2;
var columns;
var visiblecolumns;
var options;
var actionParameters;
var gridContainerDiv;
var selectedseriestitle;
var selectedseriesno;
var baseaddress;
var addSeriesaddress;
var selectedrow;
var rowValues;
var dataView;
var emptyrow = [];

var newrowids = -1;
var messagepanel = "";
var collectedData;
$(function () {
    var seriessearchviewmodel;
    var urlforLOV;
    var currentLOV;
    
    baseaddress = (document.getElementById('viewseriesdetails')).href;
    addSeriesaddress = (document.getElementById('addseries')).href;
    setGridParameters();
    DisplayGrid("");
    $('#SeriesTitle').focus();

    shortcut.add("F8", function () {
        find_click();
    });

    shortcut.add("F7", function () {
        ResetControls();
    });

    shortcut.add("F9", function () {
        if ($("#SeriesTitle").is(":focus")) {
            OpenSeriesLookup();
        }

        if ($("#SeasonTitle").is(":focus")) {
            OpenSeasonLookup();
        }

        if ($("#EpisodeTitle").is(":focus")) {
            OpenEpisodeLookup();
        }
        if ($("#Genre").is(":focus")) {
            OpenGenreLookup();
        }
    });

    $("#imgMethodSeriesTitleId").click(function () {
        OpenSeriesLookup();
    });

    $("#imgMethodSeasonTitleId").click(function () {
        OpenSeasonLookup();
    });
    
    $("#imgMethodEpisodeTitleId").click(function () {
        OpenEpisodeLookup();
    });
    
    $("#imgMethodGenreId").click(function () {
        OpenGenreLookup();
    });
    DisableToggleButton(ToggleButton1, false);
//    DisableToggleButton(ToggleButton2, false);

});

function ResetControls() {

    if (resetflag == 0) {
        SeriesTitleVal = $("#SeriesTitle").val();
        SeasonTitleVal = $("#SeasonTitle").val();
        EpisodeTitleVal = $("#EpisodeTitle").val();
        GenreVal = $("#Genre").val();
        reset_click();
        resetflag = 1;
    }
    else if (resetflag == 1) {
        $("#SeriesTitle").val(SeriesTitleVal);
        $("#SeasonTitle").val(SeasonTitleVal);
        $("#EpisodeTitle").val(EpisodeTitleVal);
        $("#Genre").val(GenreVal);

        if (GridVal.length > 0) {
            var f7Grid = [];
            for (var i = 0; i < GridVal.length; i++) {
                if (GridVal[i].SeriesTitleNoList != "new row") 
                    f7Grid.push(GridVal[i]);
            }
            DisplayGrid(f7Grid);
        }
        resetflag = 0;
    }

};

function reset_click() {
    clearAllMessages();
    $('#SeriesTitle').val('');
    $('#SeasonTitle').val('');
    $('#EpisodeTitle').val('');
    $('#Genre').val('');
    DisplayGrid("");
    DisableToggleButton(ToggleButton1, false);
    DisableToggleButton(ToggleButton2, true);
    $.noty.closeAll();
    $('#SeriesTitle').focus();
    selectedseriesno = null;
    selectedseriestitle = null;
}

function find_click() {
    clearAllMessages();
    if ($("#SeriesTitle").val() == ""
        && $("#SeasonTitle").val() == ""
        && $("#EpisodeTitle").val() == ""
        && $("#Genre").val() == "") {
        noty({
            text: 'No Search criteria has been selected. Do you want to see all records from the system?',
            modal: false,
            type: 'alert',
            buttons: [
    { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
        $noty.close();
        PerformSeriesSearch();
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
        PerformSeriesSearch();
    }
};

function gotoseries_click() {
    clearAllMessages();
    if (selectedseriesno != "new row") {
        if (selectedseriesno != null) {
            window.open(baseaddress + '?seriestitle=' + selectedseriestitle + '&seriesno=' + selectedseriesno,'_self',false);
        }
        else if (selectedseriestitle == null) {
            $.noty.closeAll();
            ShowNotyPannel("Please select a series", "warning");
        }
    }
};

function addseries_click() {
    clearAllMessages();
    noty({
        text: 'Are you sure that you want to create new series?',
        modal: false,
        type: 'alert',
        buttons: [
    { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
        $noty.close();
        addseries()
    }
    },
    { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
        $noty.close();
    }
    }
  ]
    });


};
function addseries() {
    var flag = false;
    var newUpdata = [];

    for (var i = 0; i < UpData.length; i++) {
        if (selectedseriestitle == UpData[i]["SeriesTitleList"]) {
            flag = true;
            newUpdata.push(UpData[i]);
            break;
        }
    }
    if (flag) {
        var dataToSend = JSON.stringify(newUpdata);
        $.ajax({
            url: AddNewSeriesactionUrl,
            data: dataToSend,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            async: false,
            type: "POST",
            success: function (data) {
                collectedData = data;
            },
            error: function () {
                alert('error');
            }
        });

        if (collectedData.MessageToView == 'Operation Successful') {
            window.open(baseaddress + '?seriestitle=' + collectedData.SeriesTitle + '&seriesno=' + collectedData.SeriesNumber, '_self', false);
            
        }
        else {
            $.noty.closeAll();
            ShowNotyPannel(collectedData.MessageToView, "error");
        }
    }
    else {
        $.noty.closeAll();
        ShowNotyPannel("Series name already exist", "error");
    }
};

function setGridParameters() {
    gridContainerDiv = "#teamGrid";
    ToggleButton1 = "#viewseriesdetailsbtn";
    ToggleButton2 = "#addnewseriesbtn";
    columns = [
                       { id: "seriesNo", width: 900, name: "Series No", field: "SeriesTitleNoList"},
                       { id: "seriesTitle", width: 900, name: "Series Title", field: "SeriesTitleList" }
                  ];
    visiblecolumns = [
                 { id: "seriesTitle", width: 900, name: "Series Title", field: "SeriesTitleList", editor: Slick.Editors.Text }   
                ];

    options =
        {
            enableCellNavigation: true,
            enableColumnReorder: false,
            forceFitColumns: true,
            multiColumnSort: true,
            editable: true,
            asyncEditorLoading: false,
            showHeaderRow: true,
            explicitInitialization: true
        };

    actionParameters = {
        SeriesTitle: $("#SeriesTitle").val().toUpperCase(),
        SeasonTitle: $("#SeasonTitle").val().toUpperCase(),
        EpisodeTitle: $("#EpisodeTitle").val().toUpperCase(),
        Genre: $("#Genre").val().toUpperCase()
    };    
    idfield = "SeriesTitleNoList";
    gridwidth = 600;
    gridheight = 410;
}
function PerformSeriesSearch() {
    setGridParameters();
    ShowProgressBar();

    $.ajax({
        url: SeriessearchactionUrl,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,

        success: function (data) {
            if (data.length == 0) {
                $.noty.closeAll();
                ShowNotyPannel("No Records Found", "information");
            }
            else {
                $.noty.closeAll();
            }
            DisplayGrid(data);
            $('#SeriesTitle').focus();
        },
        error: function () {
            //alert("error fetching data.Please try again");
        }
    });                     //end of ajax call
    RemoveProgressBar();
};

function Remove_Addrow() {
    dataView.deleteItem("new row");
}

function Create_Addrow() {
    var item = { "SeriesTitleNoList": "new row", SeriesTitleList: "Click here to add a new row" };
    dataView.insertItem(0, item);
}

function DisplayGrid(data) {   

    gridwidth = $(gridContainerDiv).width();
    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });
    if(data.length>0)
    GridVal = data;
    dataView = new Slick.Data.DataView();
    grid = new Slick.Grid(gridContainerDiv, dataView, columns, options);
    grid.setSelectionModel(new Slick.RowSelectionModel());

    if (visiblecolumns != null) {
        grid.setColumns(visiblecolumns);
    }

    grid.onClick.subscribe(function (e, args) {

        var cell = grid.getCellFromEvent(e);
        var row = cell.row;
        selectedseriesno = data[cell.row][idfield];
        selectedseriestitle = data[cell.row].SeriesTitleList.toUpperCase();

        if (row > 0) {
            if (selectedseriesno < 0) {

                DisableToggleButton(ToggleButton1, false);
                DisableToggleButton(ToggleButton2, false);
            }
            else {

                DisableToggleButton(ToggleButton1, false);
                DisableToggleButton(ToggleButton2, true);
            }
        }
        else {
            DisableToggleButton(ToggleButton1, true);
            DisableToggleButton(ToggleButton2, true);
        }

    });
    
    grid.onHeaderClick.subscribe(function (e, args) {
        DisableToggleButton(ToggleButton1, true);
        DisableToggleButton(ToggleButton2, true);
    });
    
    grid.onSelectedRowsChanged.subscribe(function (e, args) {
        if (grid.getActiveCell() != null) {
            selectedseriesno = dataView.getItem(grid.getActiveCell().row)[idfield];
            selectedseriestitle = dataView.getItem(grid.getActiveCell().row).SeriesTitleList.toUpperCase();
        }
    });

    grid.onSort.subscribe(function (e, args) {
        Remove_Addrow();
        SortGrid(args, dataView);
        Create_Addrow();
        grid.setActiveCell(0, 0);
        grid.editActiveCell();
    });
 
    FilterGrid(grid, dataView);

    $(grid.getHeaderRow()).click(function () {
        DisableToggleButton(ToggleButton1, true);
        DisableToggleButton(ToggleButton2, true);
    });

    grid.onCellChange.subscribe(function (e, args) {
        var newAddedrow = {
            SeriesTitleNoList: newrowids,
            SeriesTitleList: data[args.row].SeriesTitleList.toUpperCase()
        };

        var item = { "SeriesTitleNoList": "new row", SeriesTitleList: "Click here to add a new row" };
        if (newAddedrow.SeriesTitleList != "") {
            if (args.row == 0) {
                data.splice(1, 0, newAddedrow);
                newrowids = newrowids - 1;
                args.item.SeriesTitleList = args.item.SeriesTitleList.toUpperCase();
                AddToBasket(args.item, "New");
                data[0] = item;
                dataView.refresh();
                grid.setActiveCell(0, 0);
                grid.editActiveCell();
                DisableToggleButton(ToggleButton1, true);
                DisableToggleButton(ToggleButton2, true);
                //setPopupFooter(gridContainerDiv, data.length - 1);
            }
            else {
                DisableToggleButton(ToggleButton1, false);
                DisableToggleButton(ToggleButton1, false);
                grid.setActiveCell(args.row, 0);
                grid.focus();
                //setPopupFooter(gridContainerDiv, data.length - 1);
            }
        }
        else {
            $.noty.closeAll();
            ShowNotyPannel("Please Enter Series Title", "warning");
            grid.setActiveCell(0, 0);
            grid.editActiveCell();
        }
    });

    if (data.length == 0) {
        data = [];
        setPopupFooter(gridContainerDiv,  0);
        DisableToggleButton(ToggleButton1, true);
        DisableToggleButton(ToggleButton2, true);
    }
    else {
        selectedseriestitle = data[0].SeriesTitleList;
        selectedseriesno = data[0].SeriesTitleNoList;
        setPopupFooter(gridContainerDiv, data.length);
        DisableToggleButton(ToggleButton1, false);
        DisableToggleButton(ToggleButton2, true);
    }
    grid.init();
    var item = { "SeriesTitleNoList": "new row", SeriesTitleList: "Click here to add a new row" };
    data.splice(0, 0, item);
    dataView.beginUpdate();
    dataView.setItems(data, 'SeriesTitleNoList');
    dataView.setFilter(filter);
    dataView.endUpdate();

    var rows = [];
    //    rows.push(0);
    if (data.length <= 1) {
        rows.push(0);
    }
    else {
        rows.push(1);
    }
    grid.setSelectedRows(rows);  

}
var tempflagEmptyRow = true;

//------------------------mohasin code -----------------------------
var UpData = [];
function AddToBasket(item, status) {
    //--------------------AddToBasket Start--------------------------------------------------
    if (UpData.length == 0) {
        if (status == "Edit") {
            item1 = { "gridstatus": status, "SeriesTitleNoList": "0" };
            $.extend(item, item1);
            UpData.push(item);
        }
        else if (status == "New") {
            DisableToggleButton(ToggleButton1, false);

            item1 = { "gridstatus": status, "SeriesTitleNoList": "0" };
            $.extend(item, item1);
            UpData.push(item);
          //  console.log(item);
        }
        else {
            alert("Define Mode New/Edit");
        }
    }
    else {
        for (var i = 0; i < UpData.length; i++) {
            if (UpData[i]["SeriesTitleList"] == item["SeriesTitleList"]) {
                UpData.splice(i, 1);
            }
        }
        item1 = { "gridstatus": status, "SeriesTitleNoList": "0" };
        $.extend(item, item1);
        UpData.push(item);
    }
    //---------------------------AddToBasket End-------------------------------------------
};

  var SelectedRowData;
  function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
      if (SelectedRowData != null)
          $(lookupInvokerControl).val(SelectedRowData[idfield]);
      $(lookupInvokerControl).focus();
  }


function OpenEpisodeLookup() {

    lookupInvokerControl = "#EpisodeTitle";
    actionParameters = { EpisodeTitle: $("#EpisodeTitle").val() };
    columns = [
                                    { id: "EpisodeTitle", width: 900, name: "SGenTitle", field: "SGenTitle", sortable: true }
                               ];
   

    idfield = "SGenTitle";
    
    Lookuptitle = "Episode Details";
    //ShowLookup(lookupInvokerControl, EpisodeactionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, Lookuptitle);
     ShowCommonLookup(EpisodeactionUrl, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle,null);
};

function OpenGenreLookup() {
    lookupInvokerControl = "#Genre";
    actionParameters = { Genre: $("#Genre").val() };
    columns = [
                                    { id: "SportTypeValue", width: 900, name: "SportTypeValue", field: "SportTypeValue", sortable: true},
                                    { id: "SportTypeDescription", width: 900, name: "SportTypeDescription", field: "SportTypeDescription", sortable: true }
                              ];

   

    idfield = "SportTypeValue";
   
    Lookuptitle = "Sport Type";
    //$(lookupInvokerControl).dialog("open");
    //ShowLookup(lookupInvokerControl, GenreactionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, Lookuptitle);
    ShowCommonLookup(GenreactionUrl, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle,null);
};


function OpenSeasonLookup() {

    lookupInvokerControl = "#SeasonTitle";
    actionParameters = { SeasonTitle: $("#SeasonTitle").val() };
    columns = [
                                   { id: "seasonTitle", width: 900, name: "Season Title", field: "SeasonTitle", sortable: true },
                                   { id: "seriesNumber", width: 900, name: "Season Number", field: "SeasonNumber", sortable: true, cssClass: "cell-right-align" }
                              ];
   
    //selected dmNumber from the grid will be available in the global variable 'selectedseriesno' 
    idfield = "SeasonTitle";
   
    Lookuptitle = "Season Details";
    //ShowLookup(lookupInvokerControl, SeasonactionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, Lookuptitle);
    ShowCommonLookup(SeasonactionUrl, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle,null);
};

function OpenSeriesLookup() {
    lookupInvokerControl = "#SeriesTitle";
    actionParameters = { SeriesTitle: $("#SeriesTitle").val() };
    var Seriescolumns = [
                      { id: "seriesTitle", width: 900, name: "Series Title", field: "SeriesTitle", sortable: true },
    { id: "seriesNumber", width: 900, name: "Series Number", field: "SeriesNumber", sortable: true, cssClass: "cell-right-align" }
               ];
    
    idfield = "SeriesTitle";
   
    Lookuptitle = "Series Details";
    //ShowLookup(lookupInvokerControl, SeriesactionUrl, actionParameters, Seriescolumns, Seriesoptions, idfield, gridwidth, gridheight, Lookuptitle);
    ShowCommonLookup(SeriesactionUrl, actionParameters, Seriescolumns, lookupInvokerControl, idfield, Lookuptitle,null);
};
