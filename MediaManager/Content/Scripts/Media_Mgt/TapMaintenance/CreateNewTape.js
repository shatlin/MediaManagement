$(function () {

    SearchProgramme();

    $("#lblUMID").attr('style', 'display:none;');
    $("#UMID").attr('style', 'display:none;');
    $(".tdCourier").attr('style', 'display:none;');

    $("#btnProgrammeSearch").click(function (event) {
        SearchProgramme();
    });

    //Dropdown MediaType Selection Change Event.
    $("#MediaType").change(function () {
        var selectedVal = $(this).val();
        if (selectedVal == "File") {
            $("#lblUMID").removeAttr('style', 'display:none;');
            $("#UMID").removeAttr('style', 'display:none;');
        }
        else {
            $("#lblUMID").attr('style', 'display:none;');
            $("#UMID").attr('style', 'display:none;');
        }
    });

    //Dropdown MediaType Selection Change Event.
    $("#ddlTapeType").change(function () {
        var selectedVal = $(this).val();
        if (selectedVal == "FRM") {
            $(".tdCourier").removeAttr('style', 'display:none;');
        }
        else {
            $(".tdCourier").attr('style', 'display:none;');
        }
    });
});

function SearchProgramme() {
    SetGridParameters(actionUrl);
};

function SetGridParameters(actionUrl) {

    var gridProgrammeSearch = "#gridProgrammeSearch";

    var gridProgrammecolumns = [
                             { id: "ProductionNumber", name: "Production Number", field: "TMProductionNumber" },
                              { id: "ProgrammeWorkingTitle", name: "Programme Working Title", field: "TMProgrammeWorkingTitle" },
                                { id: "ProgrammeTitle", name: "Title", field: "TMProgrammeTitle" },
                          ];

    var gridProgrammeVisibleColumns = [
                              { id: "ProgrammeWorkingTitle", name: "Programme Working Title Number", field: "TMProgrammeWorkingTitle" },
                                { id: "ProgrammeTitle", name: "Title", field: "TMProgrammeTitle" },
                                { id: "id", name: "Add", field: "TMProductionNumber",
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
    var idfield = 'TMProductionNumber';
    var gridwidth = $(gridProgrammeSearch).width();
    var gridheight = 150;

    var gridAddedProgramme = "#gridAddedProgramme";

    var gridAddedProgrammecolumns = [
                             { id: "ProductionNumber", name: "Production Number", field: "TMProductionNumber" },
                              { id: "ProgrammeWorkingTitle", name: "Programme Working Title", field: "TMProgrammeWorkingTitle" },
                                { id: "ProgrammeTitle", name: "Title", field: "TMProgrammeTitle" },
                          ];

    var gridAddedProgrammeVisiblecolumns = [
                              { id: "ProgrammeWorkingTitle", name: "Programme Working Title Number", field: "TMProgrammeWorkingTitle" },
                                { id: "ProgrammeTitle", name: "Title", field: "TMProgrammeTitle" , class:"deletedRow"},
                                { id: "id", name: "Add", field: "TMProductionNumber",
                                    formatter: function (r, c, id, def, datactx) {
                                        return "<a href='#'  onclick='RemoveClick(" + id + "," + r + ")'>Remove</a>";
                                    }
                                }
                          ];

    BindGrid(actionUrl, gridProgrammecolumns, gridProgrammeVisibleColumns, gridAddedProgrammecolumns, gridAddedProgrammeVisiblecolumns, options, idfield, gridwidth, gridheight);
}

function AddClick(databaseId, gridRow) {alert(gridRow);
    //var deletedrow = $("#gridAddedProgramme").find(databaseId); alert(deletedrow);
    $(gridRow).hide('slow');
            //var actionUrl = '@Url.Action("SearchProgrammeByTitle", "TapeMaintenance", new { area = "Media_Mgt" })';
            //$.post("Media_Mgt/TapeMaintenance/AddProgrammeToTape", { id: databaseId });
//    var data = grid.getData(); alert(data);
//            data.splice(gridRow, 1);
//            grid.setData(data);
//            grid.render();    
}

function BindGrid(actionUrl, gridProgrammecolumns, gridProgrammeVisibleColumns, gridAddedProgrammecolumns, gridAddedProgrammeVisiblecolumns, options, idfield, gridwidth, gridheight) {
    $("#gridProgrammeSearch").css({ "width": gridwidth + "px", "height": gridheight });
    $("#gridAddedProgramme").css({ "width": gridwidth + "px", "height": gridheight });
    ShowProgressBar();
    $.ajax({
        url: actionUrl,
        type: "POST",
        dataType: 'Json',
        data: "ProgrammeSearchTitle = " + $("#txtProgramTitle").val(),
        success: function (data) {
            var ProgrammeData = [];
            var AddedProgrammeData = [];
            ProgrammeData = data.objProgramme;
            AddedProgrammeData = data.objAddedProgramme;
            debugger;
            BindGridProgrammeSearch(ProgrammeData, gridProgrammecolumns, gridProgrammeVisibleColumns, options, idfield, gridwidth, gridheight);
            BindGridAddedProgramme(AddedProgrammeData, gridAddedProgrammecolumns, gridAddedProgrammeVisiblecolumns, options, idfield, gridwidth, gridheight);

            $(".deletedRow").each(function (index, item) {
                $(item).click(function (event) {
                    var id = $(item).attr("ProgrammeTitle");
                    alert(id);
                });
            });

            RemoveProgressBar();
        },
        error: function () {
            alert("error fetching data.Please try again");
            //RemoveProgressBar();
        }
    });                                          //end of jax call        
};

function BindGridProgrammeSearch(ProgrammeData, gridProgrammecolumns, gridProgrammeVisibleColumns, options, idfield, gridwidth, gridheight) {
    var grid;
    grid = new Slick.Grid("#gridProgrammeSearch", ProgrammeData, gridProgrammeVisibleColumns, options);
    grid.setSelectionModel(new Slick.RowSelectionModel());
    var rows = [];
    rows.push(0);
    grid.setSelectedRows(rows);
    grid.setColumns(gridProgrammeVisibleColumns);
    $("#footerProgrammeSearch").css({ "width": gridwidth + "px", "visibility": "visible" });
    var totalrecord = "Total number of rows displayed:1/" + ProgrammeData.length;
    $("#TotalRecordsProgrammeSearch").text(totalrecord);
    //                grid.onClick.subscribe(function (e, args) {
    //                    var cell = grid.getCellFromEvent(e);
    //                    var row = cell.row;
    //                    totalrecord = "Total number of rows displayed:" + row + "/" + myData.length;
    //                    $("#TotalRecords").text(totalrecord);
    //                    ProgrammeTitle = data[cell.row].TMProgrammeTitle;
    //                    $("#TapeTitle").val(ProgrammeTitle);
    //                });
}

function BindGridAddedProgramme(AddedProgrammeData, gridAddedProgrammecolumns, gridAddedProgrammeVisiblecolumns, options, idfield, gridwidth, gridheight) {
    var grid;
    grid = new Slick.Grid("#gridAddedProgramme", AddedProgrammeData, gridAddedProgrammeVisiblecolumns, options);
    grid.setSelectionModel(new Slick.RowSelectionModel());
    var rows = [];
    rows.push(0);
    grid.setSelectedRows(rows);
    grid.setColumns(gridAddedProgrammeVisiblecolumns);
    //$("gridAddedProgramme").css({ "width": gridwidth + "px", "height": gridheight });
    $("#footerAddedProgramme").css({ "width": gridwidth + "px", "visibility": "visible" });
    var totalrecord = "Total number of rows displayed:1/" + AddedProgrammeData.length;
    $("#TotalRecordsAddedProgramme").text(totalrecord);

    //                grid.onClick.subscribe(function (e, args) {
    //                    var cell = grid.getCellFromEvent(e);
    //                    var row = cell.row;
    //                    totalrecord = "Total number of rows displayed:" + row + "/" + myData.length;
    //                    $("#TotalRecords").text(totalrecord);
    //                    ProgrammeTitle = data[cell.row].TMProgrammeTitle;
    //                    $("#TapeTitle").val(ProgrammeTitle);
    //                });
}


function SetGridAddedProgramme(actionUrl) {
    var gridAddedProgramme = "#gridAddedProgramme";

    var columns = [
                             { id: "ProductionNumber", name: "Production Number", field: "TMProductionNumber" },
                              { id: "ProgrammeWorkingTitle", name: "Programme Working Title", field: "TMProgrammeWorkingTitle" },
                                { id: "ProgrammeTitle", name: "Title", field: "TMProgrammeTitle" },
                          ];

    var Visiblecolumns = [
                              { id: "ProgrammeWorkingTitle", name: "Programme Working Title Number", field: "TMProgrammeWorkingTitle" },
                                { id: "ProgrammeTitle", name: "Title", field: "TMProgrammeTitle" },
                                { id: "id", name: "Remove", field: "id",
                                    formatter: function (r, c, id, def, datactx) {
                                        return "<a href='#' onclick='RemoveClick(" + id + "," + r + ")'>Remove</a>";
                                    }
                                }
                          ];


    var options =
        {
            enableCellNavigation: true, enableColumnReorder: false, forceFitColumns: true
        };

    var actionParameters = {
        ProgrammeSearchTitle: $("#ProgrammeSearchTitle").val()
    };

    //selected dmNumber from the grid will be available in the global variable 'selectedvalue' 
    var idfield = 'TMProductionNumber';
    var gridwidth = $(gridProgrammeSearch).width();
    var gridheight = 150;

    //ShowGridAddedProgramme("#gridAddedProgramme", actionUrl, actionParameters, columns, Visiblecolumns, options, idfield, gridwidth, gridheight);
};

function RemoveClick(databaseId, gridRow) {
    $.post("data/delete/", { id: databaseId });
    var data = grid.getData();
    data.splice(gridRow, 1);
    grid.setData(data);
    grid.render();
}

function ShowGridAddedProgramme(gridContainerDiv, actionUrl, actionParameters, columns, Visiblecolumns, options, idfield, gridwidth, gridheight) {

    var grid;
    var ProgrammeTitle;
    var myData = [];
    $(gridContainerDiv).css({ "width": gridwidth + "px", "height": gridheight });
    ShowProgressBar();
    $.ajax({
        url: actionUrl,
        type: "GET",
        dataType: 'Json',
        data: actionParameters,

        success: function (data) {
            myData = data;
            var totalrecord;
            debugger;

            grid = new Slick.Grid(gridContainerDiv, myData, columns, options);

            grid.setSelectionModel(new Slick.RowSelectionModel());

            var rows = [];
            rows.push(0);
            grid.setSelectedRows(rows);
            grid.setColumns(Visiblecolumns);
            selectedvalue = data[0.0][idfield];
            $("#footerAddedProgramme").css({ "width": gridwidth + "px", "visibility": "visible" });
            totalrecord = "Total number of rows displayed:1/" + myData.length;
            $("#TotalRecordsAddedProgramme").text(totalrecord);

            //                grid.onClick.subscribe(function (e, args) {
            //                    var cell = grid.getCellFromEvent(e);
            //                    var row = cell.row;
            //                    totalrecord = "Total number of rows displayed:" + row + "/" + myData.length;
            //                    $("#TotalRecords").text(totalrecord);
            //                    ProgrammeTitle = data[cell.row].TMProgrammeTitle;
            //                    $("#TapeTitle").val(ProgrammeTitle);
            //                });
            RemoveProgressBar();
        },
        error: function () {
            alert("error fetching data.Please try again");
            RemoveProgressBar();
        }
    });                                  //end of jax call
    return selectedvalue;
};

function SaveResults() {
    var TapeTitle = $("#TapeTitle").val();
    var MediaType = $("#MediaType").val();
    var TapeNo = $("#TapeNo").val();
    var ddlLibrary = $("#ddlLibrary").val();
    var ddlTapeType = $("#ddlTapeType").val();
}