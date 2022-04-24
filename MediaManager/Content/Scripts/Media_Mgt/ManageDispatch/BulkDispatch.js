$(function () {

    SearchTapeDetail();

});

function SearchTapeDetail() {

    SetGridParameters(actionUrl);
};

function SetGridParameters(actionUrl) {

    var gridTapeSearch = "#gridTapeSearch";
    var gridTapeSearchcolumns = [
                             { id: "TapeNo", name: "Tape Number", field: "TapeNo" },
                              { id: "TapeTitle", name: "Tape Title", field: "TapeTitle" },
                              { id: "MediaType", name: "Media Type", field: "MediaType" },
                              { id: "Library", name: "Library", field: "Library" },
                                { id: "Storage", name: "Storage", field: "Storage" },
                                 { id: "Status", name: "Status", field: "Status" },
                          ];

    var gridTapeSearchVisibleColumns = [
                              { id: "TapeNo", name: "Tape Number", field: "TapeNo" },
                              { id: "TapeTitle", name: "Tape Title", field: "TapeTitle" },
                              { id: "MediaType", name: "Media Type", field: "MediaType" },
                              { id: "Library", name: "Library", field: "Library" },
                                { id: "Storage", name: "Storage", field: "Storage" },
                                 { id: "Status", name: "Status", field: "Status" },
                                { id: "id", name: "Add", field: "id",
                                    formatter: function (r, c, id, def, datactx) {
                                        return "<a href='#' onclick='AddClick(" + id + "," + r + ")'>Add</a>";
                                    }
                                }
                          ];


    var options =
        {
            enableCellNavigation: true, enableColumnReorder: false, forceFitColumns: true
        };


    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    var idfield = 'TapeNo';
    var gridwidth = $(gridTapeSearch).width();
    var gridheight = 150;

    var gridTapeAdded = "#gridTapeAdded";

    var gridTapeAddedProgrammecolumns = [
                            { id: "TapeNo", name: "Tape Number", field: "TapeNo" },
                              { id: "TapeTitle", name: "Tape Title", field: "TapeTitle" },
                              { id: "MediaType", name: "Media Type", field: "MediaType" },
                              { id: "Library", name: "Library", field: "Library" },
                                { id: "Storage", name: "Storage", field: "Storage" },
                          ];

    var gridTapeAddedProgrammeVisiblecolumns = [
                              { id: "TapeNo", name: "Tape Number", field: "TapeNo" },
                              { id: "TapeTitle", name: "Tape Title", field: "TapeTitle" },
                              { id: "MediaType", name: "Media Type", field: "MediaType" },
                              { id: "Library", name: "Library", field: "Library" },
                                { id: "Storage", name: "Storage", field: "Storage" },
                                    { id: "id", name: "Remove", field: "id",
                                        formatter: function (r, c, id, def, datactx) {
                                            return "<a href='#' onclick='RemoveClick(" + id + "," + r + ")'>Remove</a>";
                                        }
                                    }
                          ];

    BindGrid(actionUrl, gridTapeSearchcolumns, gridTapeSearchVisibleColumns, gridTapeAddedProgrammecolumns, gridTapeAddedProgrammeVisiblecolumns, options, idfield, gridwidth, gridheight);
}

function BindGrid(actionUrl, gridTapeSearchcolumns, gridTapeSearchVisibleColumns, gridTapeAddedProgrammecolumns, gridTapeAddedProgrammeVisiblecolumns, options, idfield, gridwidth, gridheight) {
    $("#gridTapeSearch").css({ "width": gridwidth + "px", "height": gridheight });
    $("#gridTapeAdded").css({ "width": gridwidth + "px", "height": gridheight });
    ShowProgressBar();
    $.ajax({
        url: actionUrl,
        type: "POST",
        dataType: 'Json',
        data: "ProgrammeSearchTitle = " + $("#txtProgramTitle").val(),
        success: function (data) {
            var TapeData = [];
            var AddedTapeData = [];
            TapeData = data.objTapeResult;
            AddedTapeData = data.objAddedTapeResult;
            BindGridTapeSearch(TapeData, gridTapeSearchcolumns, gridTapeSearchVisibleColumns, options, idfield, gridwidth, gridheight);
            BindGridTapeAdded(AddedTapeData, gridTapeAddedProgrammecolumns, gridTapeAddedProgrammeVisiblecolumns, options, idfield, gridwidth, gridheight);
            RemoveProgressBar();
        },
        error: function () {
            alert("error fetching data.Please try again");
            //RemoveProgressBar();
        }
    });                                         //end of ajax call        
};

function AddClick(databaseId, gridRow) {
    //        var actionUrl = '@Url.Action("SearchProgrammeByTitle", "TapeMaintenance", new { area = "Media_Mgt" })';
    //        $.post("Media_Mgt/TapeMaintenance/AddProgrammeToTape", { id: databaseId });
    //        var data = grid.getData();
    //        data.splice(gridRow, 1);
    //        grid.setData(data);
    //        grid.render();

    //        var url = "/Event/SaveHolidayEvent?EventID=" + _HolidayEventID + "&CountryID=" + _HolidayCountryID + "&SessionID=" + _SessionID + "&HolidayName=" + _HolidayName + "&FromDate=" + _HolidayFromDate + "&ToDate=" + _HolidayToDate + "&TradingDayType=" + _TradingDayType + "&HolidayRemark=" + _HolidayRemark;
    //        $.ajax({
    //            type: "POST",
    //            url: url,
    //            data: "{}",
    //            contentType: "application/json; charset=utf-8",
    //            dataType: "json",
    //            success: function (data) {
    //                if (data.Message == "Insert") {
    //                    displayMessage("Holiday event submitted successfully.");
    //                    message = "New holiday event \'" + $.trim(data.Holiday) + "\' added for country '" + $("#ddlCountryHolidayEvent option:selected").text() + "' and session '" + $("#ddlSessionHolidayEvent").val() + "'.";
    //                    SaveActionLog("Event", "Holiday", message);
    //                }
    //                else if (data.Message == "Update") {
    //                    displayMessage("Holiday event updated successfully.");
    //                    message = "Holiday event \'" + $.trim(data.Holiday) + "\' updated for country '" + $("#ddlCountryHolidayEvent option:selected").text() + "' and session '" + $("#ddlSessionHolidayEvent").val() + "'.";
    //                    SaveActionLog("Event", "Holiday", message);
    //                }
    //                GetHolidayEventListByCountryAndSession(_HolidayCountryID, _SessionID);
    //                $("#dialogConfirmHoliday").dialog("close");
    //                EmptyControlsHoliday();
    //            }
    //        });
}


function BindGridTapeSearch(TapeData, gridTapeSearchcolumns, gridTapeSearchVisibleColumns, options, idfield, gridwidth, gridheight) {
    var grid;
    grid = new Slick.Grid("#gridTapeSearch", TapeData, gridTapeSearchVisibleColumns, options);
    grid.setSelectionModel(new Slick.RowSelectionModel());
    var rows = [];
    rows.push(0);
    grid.setSelectedRows(rows);
    grid.setColumns(gridTapeSearchVisibleColumns);
    $("#footerTapeSearch").css({ "width": gridwidth + "px", "visibility": "visible" });
    var totalrecord = "Total number of rows displayed:1/" + TapeData.length;
    $("#TotalRecordsTapeSearch").text(totalrecord);
    //                grid.onClick.subscribe(function (e, args) {
    //                    var cell = grid.getCellFromEvent(e);
    //                    var row = cell.row;
    //                    totalrecord = "Total number of rows displayed:" + row + "/" + myData.length;
    //                    $("#TotalRecords").text(totalrecord);
    //                    ProgrammeTitle = data[cell.row].TMProgrammeTitle;
    //                    $("#TapeTitle").val(ProgrammeTitle);
    //                });
}

function BindGridTapeAdded(AddedTapeData, gridTapeAddedProgrammecolumns, gridTapeAddedProgrammeVisiblecolumns, options, idfield, gridwidth, gridheight) {
    var grid;
    grid = new Slick.Grid("#gridTapeAdded", AddedTapeData, gridTapeAddedProgrammeVisiblecolumns, options);
    grid.setSelectionModel(new Slick.RowSelectionModel());
    var rows = [];
    rows.push(0);
    grid.setSelectedRows(rows);
    grid.setColumns(gridTapeAddedProgrammeVisiblecolumns);
    $("#footerTapeAdded").css({ "width": gridwidth + "px", "visibility": "visible" });
    var totalrecord = "Total number of rows displayed:1/" + AddedTapeData.length;
    $("#TotalRecordsTapeAdded").text(totalrecord);

    //                grid.onClick.subscribe(function (e, args) {
    //                    var cell = grid.getCellFromEvent(e);
    //                    var row = cell.row;
    //                    totalrecord = "Total number of rows displayed:" + row + "/" + myData.length;
    //                    $("#TotalRecords").text(totalrecord);
    //                    ProgrammeTitle = data[cell.row].TMProgrammeTitle;
    //                    $("#TapeTitle").val(ProgrammeTitle);
    //                });
}

function RemoveClick(databaseId, gridRow) {
    $.post("data/delete/", { id: databaseId });
    var data = grid.getData();
    data.splice(gridRow, 1);
    grid.setData(data);
    grid.render();
}

function SaveResults() {
    var TapeTitle = $("#TapeTitle").val();
    var MediaType = $("#MediaType").val();
    var TapeNo = $("#TapeNo").val();
    var ddlLibrary = $("#ddlLibrary").val();
    var ddlTapeType = $("#ddlTapeType").val();
}
