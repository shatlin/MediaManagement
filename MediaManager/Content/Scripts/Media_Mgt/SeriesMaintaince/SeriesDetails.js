var screentitle;
var dialoghandler;
var currentaction;
var episodegrid;
var popupgrid;
var episodedata = [];
var myDataToSave = [];
var UpData = [];
var dataView;
var sportstype;
var popupinputparameters;
var popupdata = [];
var f9pressedrow;
var gitems;
var eventgitem;
var popupcolumns;
var popupoptions;
var currentseriestitle;
var currentSeriesno;
var currentseasontitle;
var currentseasonno;
var deletedItem;
var cellvalue;
var ForDeleteSeasonparameters;
var pDeleteSeriesDetails;
var model;
var temp_episodedata=[];
var selrow;
var EpisodeRefNo;
 var SelectedRowData;
 var columnFilters = {};
    function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl)
    {
    if(SelectedRowData != null)
    {

        if (lookupInvokerControl == "TypeShowLOV") {
            popupselectedvalue=SelectedRowData.SportTypeValue;
            var cdata = episodegrid.getData();
            var itemtoupdate = { "SportTypeGenre": popupselectedvalue };
            $.extend(gitems, itemtoupdate);
            gitems = { "SportTypeGenre": popupselectedvalue,
                       "SequenceEpisodeno": episodedata[f9pressedrow].SequenceEpisodeno,
                       "GenRefNo": episodedata[f9pressedrow].GenRefNo,
                       "EpisodeTitle": episodedata[f9pressedrow].EpisodeTitle,
                       "Duration": episodedata[f9pressedrow].Duration,
                       "SubGenre": episodedata[f9pressedrow].SubGenre,
                       "EventType": episodedata[f9pressedrow].EventType,
                       "LicStart": episodedata[f9pressedrow].LicStart,
                       "LicEnd": episodedata[f9pressedrow].LicEnd,
                       "Vennue": episodedata[f9pressedrow].Vennue,
                       "Location": episodedata[f9pressedrow].Location,
                       "LiveDate": episodedata[f9pressedrow].LiveDate,
                       "LiveTime": episodedata[f9pressedrow].LiveTime,
                       "Comments": episodedata[f9pressedrow].Comments,
                       "gridstatus": "Edit"
                    };

                episodegrid.setData(cdata);
                episodegrid.setSortColumn("SequenceEpisodeno", true);
                episodegrid.invalidateRow(cdata.length);

                episodegrid.render();
                AddToBasket(gitems, "Edit");

        }
    else if(lookupInvokerControl == "EventLOV") {


    var cdata = episodegrid.getData();
      popupselectedvalue=SelectedRowData.CodeValue;
                var itemtoupdate = { "EventType": popupselectedvalue };
                $.extend(gitems, itemtoupdate);
                gitems = { "EventType": popupselectedvalue,
                    "SportTypeGenre": episodedata[f9pressedrow].SportTypeGenre,
                    "SequenceEpisodeno": episodedata[f9pressedrow].SequenceEpisodeno,
                    "GenRefNo": episodedata[f9pressedrow].GenRefNo,
                    "EpisodeTitle": episodedata[f9pressedrow].EpisodeTitle,
                    "Duration": episodedata[f9pressedrow].Duration,
                    "SubGenre": episodedata[f9pressedrow].SubGenre,
                    "SportTypeGenre": episodedata[f9pressedrow].SportTypeGenre,
                    "LicStart": episodedata[f9pressedrow].LicStart,
                    "LicEnd": episodedata[f9pressedrow].LicEnd,
                    "Vennue": episodedata[f9pressedrow].Vennue,
                    "Location": episodedata[f9pressedrow].Location,
                    "LiveDate": episodedata[f9pressedrow].LiveDate,
                    "LiveTime": episodedata[f9pressedrow].LiveTime,
                    "Comments": episodedata[f9pressedrow].Comments,
                    "gridstatus": "Edit"

                };

                episodegrid.setData(cdata);
                episodegrid.setSortColumn("SequenceEpisodeno", true);
                episodegrid.invalidateRow(cdata.length);
                episodegrid.render();
                AddToBasket(gitems, "Edit");

    }
        else if(lookupInvokerControl == "SubGenreLOV") {
         var cdata = episodegrid.getData();
          popupselectedvalue=SelectedRowData.SubGenreCodeValue;
                var itemtoupdate = { "SubGenre": popupselectedvalue };
                $.extend(gitems, itemtoupdate);
                gitems = { "SubGenre": popupselectedvalue,
                    "SportTypeGenre": popupselectedvalue,
                    "SequenceEpisodeno": episodedata[f9pressedrow].SequenceEpisodeno,
                    "GenRefNo": episodedata[f9pressedrow].GenRefNo,
                    "EpisodeTitle": episodedata[f9pressedrow].EpisodeTitle,
                    "Duration": episodedata[f9pressedrow].Duration,
                    "SportTypeGenre": episodedata[f9pressedrow].SportTypeGenre,
                    "EventType": episodedata[f9pressedrow].EventType,
                    "LicStart": episodedata[f9pressedrow].LicStart,
                    "LicEnd": episodedata[f9pressedrow].LicEnd,
                    "Vennue": episodedata[f9pressedrow].Vennue,
                    "Location": episodedata[f9pressedrow].Location,
                    "LiveDate": episodedata[f9pressedrow].LiveDate,
                    "LiveTime": episodedata[f9pressedrow].LiveTime,
                    "Comments": episodedata[f9pressedrow].Comments,
                    "gridstatus": "Edit"

                };

                episodegrid.setData(cdata);
                episodegrid.setSortColumn("SequenceEpisodeno", true);
                episodegrid.invalidateRow(cdata.length);
                episodegrid.render();
                AddToBasket(gitems, "Edit");
            }
            else if (lookupInvokerControl == "TerLOV") {
                clearAllMessages();
                popupselectedvalue1 = SelectedRowData.TerCode;
                var Tercdata = gridLocal.getData();
                var items11 = {
                    "TerCode": popupselectedvalue1
                };
                $.extend(items11, gitems1);
                if (gitems1 != null) {

                    gitems1.TerritoryCode = SelectedRowData.TerCode;
                }
                else {

                    Tercdata.push(items11);
                }


//                                        if (!gridLocal.getEditorLock().isActive())
//                                            gridLocal.getEditorLock().activate(gridLocal.getEditController());


                gridLocal.setData(Tercdata);
                gridLocal.invalidateRow(Tercdata.length);
                gridLocal.render();
//                                        gridLocal.setActiveCell(0, 3);
//                                        gridLocal.setActiveCell(selrow, 0);
//                                        gridLocal.editActiveCell();
            }

    }
    };
    $(document).ready(function () {
        // Show menu when #myDiv is clicked

        var pDeleteSeriesDetails;
        var pDeleteSeriesTitle;
        var data;

        getEpisodeGrid('0', '0', '0', '0');

        shortcut.add("F10", function () {
            Save();

        });

        function DeleteSeasonDetailsList() {
            $.ajax({
                url: DeleteSeasonDetailes,
                type: "POST",
                dataType: 'Json',
                data: ForDeleteSeasonparameters,
                async: false,
                cache: false,
                success: function (data) {
                    if (data != null) {
                        if (data.length == 2) {
                            showMessage(data[0].Message, "error");
                        }
                        else {
                            showMessage("Season cannot be deleted as it contains episodes.", "information");
                        }

                    }
                    else {
                        showMessage("Transaction Saved successfully", "information");
                        location.reload();
                    }
                },
                error: function (data) {
                    showMessage("Some Error Occured", "error");

                }
            });

        }
        function DeleteSeriesList() {

            var actionParm = { SeriesNumber: DeleteSeriesModel, SeriesTitle: DeleteSeriesModel };
            $.ajax({
                url: DeleteSeriesDetails,
                type: "POST",
                dataType: 'Json',
                data: actionParm,
                async: false,
                cache: false,
                success: function (data) {
                    if (data != null) {
                        if (data.length == 2) {
                            showMessage(data[0].Message, "error");
                        }
                        else {
                            showMessage("Series cannot be deleted as it contains seasons.", "information");
                        }

                    }
                    else {
                        showMessage("Transaction Saved successfully", "information");
                        window.location = seriessearchurl;
                    }

                },
                Error: function () {
                    showMessage("Some Error Occured", "error");

                }
            });

        }

        $("#ContextMenuSectionToRender").contextMenu({

            menu: 'SeriesTreeContextMenu'
        },
					function (action, el, pos) {
					    clearAllMessages();
					    if (action == 'SelectionScreen') {
					        alert('This Functionality is not possible in Web Application');
					    }
					    else if (action == 'AddSeriesTitle') {
					        screentitle = 'Add Series Title';
					        $('#ContextMenuPopup').css({ "width": "600px", "height": "275px", "padding": "10px" });
					        GeneratePop(action, 275, 600);
					    }
					    else if (action == 'UpdateSeriesTitle') {
					        screentitle = 'Update Series Title';
					        $('#ContextMenuPopup').css({ "width": "600px", "height": "275px", "padding": "10px" });
					        GeneratePop(action, 275, 600);
					    }
					    else if (action == 'CreateEpisode') {
					        screentitle = 'Create/Change Episodes';
					        $('#ContextMenuPopup').css({ "width": "1000px", "height": "650px", "padding": "10px" });
					        GeneratePop(action, 650, 1000);
					    }
					    else if (action == 'ChangeEpisode') {
					        screentitle = 'Create/Change Episodes';
					        $('#ContextMenuPopup').css({ "width": "1000px", "height": "650px", "padding": "10px" });
					        GeneratePop(action, 650, 1000);
					    }
					    else if (action == 'AddSeasonTitle') {
					        screentitle = 'Add Season Title';
					        $('#ContextMenuPopup').css({ "width": "600px", "height": "350px", "padding": "10px" });
					        GeneratePop(action, 350, 600);
					    }
					    else if (action == 'UpdateSeasonTitle') {
					        screentitle = 'Update Season Title';
					        $('#ContextMenuPopup').css({ "width": "600px", "height": "400px", "padding": "10px" });
					        GeneratePop(action, 400, 600);
					    }
					    else if (action == 'EnterUpdateLiveInfo') {
					        screentitle = 'Enter Update Live Info';
					        $('#ContextMenuPopup').css({ "width": "600px", "height": "300px", "padding": "10px" });
					        GeneratePop(action, 300, 600);
					    }
					    else if (action == 'ChangeEpisodenumberWorkingTitle') {
					        screentitle = 'Change Episode Number Working Title';
					        $('#ContextMenuPopup').css({ "width": "700px", "height": "400px", "padding": "10px" });
					        GeneratePop(action, 400, 700);
					    }
					    else if (action == 'ChangeEpisodenumberActualNumber') {
					        screentitle = 'Change Episode Number Actual Number';
					        $('#ContextMenuPopup').css({ "width": "700px", "height": "250px", "padding": "10px" });
					        GeneratePop(action, 250, 700);
					    }
					    else if (action == 'DeleteSeasonTitle') {
					        var answer = confirm("Are you sure you want to delete Season Title")
					        if (answer) {
					            DeleteSeasonDetailsList();

					        }
					    }
					    else if (action == 'DeleteSeriesTitle') {
					        var answer = confirm("Are you sure you want to delete Series Title")
					        if (answer) {
					            DeleteSeriesList();

					        }
					    }
					    //					    if (action == 'ChangeEpisodenumberActualNumber' || action == 'AddSeasonTitle' || action == 'ChangeEpisodenumberWorkingTitle' || action == 'EnterUpdateLiveInfo' || action == 'UpdateSeasonTitle' || action == 'ChangeEpisode' || action == 'CreateEpisode' || action == 'UpdateSeriesTitle' || action == 'AddSeriesTitle') {
					    //					        GeneratePop(action);
					    //                            
					    //					    }
					});
    });

function closepopup1() {
    dialoghandler.dialog("close");
}

function GeneratePop(anchor,popheight, popwidth) {
    currentaction = anchor;
    $("#ContextMenuPopup").html("");
    var pSeriesSearchViewModel = { SeriesTitle: currentseriestitle, SeriesNumber: currentSeriesno, SeasonTitle: currentseasontitle, SeasonNumber: currentseasonno};
    //    var bb='/Media_Mgt/SeriesMaintaince/';
    if (pSeriesSearchViewModel.getEpisodeResult != null) {
        pSeriesSearchViewModel.getEpisodeResult.splice(0, pSeriesSearchViewModel.getEpisodeResult.length);
    }
    var base=BasePopupurl;
    $('#ContextMenuPopup').load(base + anchor, pSeriesSearchViewModel);
    $("#ContextMenuPopup").dialog({
        autoOpen: false,
        height: popheight,
        width: popwidth,
        modal: true, 
        title: screentitle,
        open: function (event, ui) {


        SetNonStandardDialogStyles();

           // $('#ContextMenuPopup').css({ "width": "auto", "height": "400px", "padding" : "10px"});
            dialoghandler = $(this);

        },
        close: function () {
        }
    });

    $("#ContextMenuPopup").dialog("open");

}

function durationValidator(value) {
    if (isNaN(value)) {
        return { valid: false, msg: "Enter Duration in 00:00:00 format" };
    }
    else
        if (value.length <= 6) {
            if (value.length < 6) {
                var zeros = 6 - value.length;
                var j = "";
                for (var i = 0; i < zeros; i++) {
                    j += "0";
                }
                value = j + value;
            }
            var edata = episodegrid.getData();
            edata[selrow].Duration = value[0] + value[1] + ":" + value[2] + value[3] + ":" + value[4] + value[5];
            episodegrid.setData(edata);
            episodegrid.render();

            return { valid: true, msg: null };
        }
        else
            return { valid: false, msg: "Enter Duration in 00:00:00 format" };
}

function getEpisodeGrid(seasonTitle, seasonNumber, seriesTitle, seriesNumber) {
    clearAllMessages();

 if(seasonTitle=='0' && seasonNumber =='0' && seriesTitle=='0' && seriesNumber =='0')
 {
   $('#SeriesTreeContextMenu').disableContextMenuItems('#UpdateSeasonTitle,#EnterUpdateLiveInfo,#ChangeEpisodenumberWorkingTitle,#ChangeEpisodenumberActualNumber,#DeleteSeasonTitle,#CreateEpisode,#ChangeEpisode,#AddSeriesTitle,#UpdateSeriesTitle,#DeleteSeriesTitle,#AddSeasonTitle');
 }

if(seasonTitle=='0' && seasonNumber =='0' && seriesTitle!='0' && seriesNumber !='0')
{
    $('#SeriesTreeContextMenu').enableContextMenuItems('#AddSeriesTitle,#UpdateSeriesTitle,#DeleteSeriesTitle,#AddSeasonTitle');
    $('#SeriesTreeContextMenu').disableContextMenuItems('#UpdateSeasonTitle,#EnterUpdateLiveInfo,#ChangeEpisodenumberWorkingTitle,#ChangeEpisodenumberActualNumber,#DeleteSeasonTitle,#CreateEpisode,#ChangeEpisode');

}
else if (seasonTitle!='0' && seasonNumber !='0')
{
  $('#SeriesTreeContextMenu').enableContextMenuItems('#AddSeasonTitle,#UpdateSeasonTitle,#EnterUpdateLiveInfo,#ChangeEpisodenumberWorkingTitle,#ChangeEpisodenumberActualNumber,#DeleteSeasonTitle,#CreateEpisode,#ChangeEpisode');
   $('#SeriesTreeContextMenu').disableContextMenuItems('#AddSeriesTitle,#UpdateSeriesTitle,#DeleteSeriesTitle');
}


    currentseasontitle = seasonTitle;
    currentseasonno = seasonNumber;
    currentseriestitle = seriesTitle;
    currentSeriesno = seriesNumber;
  
    popupoptions = {
        enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true
    };

    //--------------------getEpisodeGrid Start--------------------------------------------------

    var episodecolumns = [
    //                        { id: "seriesNo", width: 900, name: "Series No", field: "SeriesTitleNoList" },
                                {id: "SequenceEpisodeno", width: 150, name: "Epi#", field: "SequenceEpisodeno" },        //minWidth:120, 
                                {id: "GenRefNo", width: 300, name: "Gen Ref No", field: "GenRefNo" },
                                { id: "episodeTitle", width: 2500, name: "Episode Title", field: "EpisodeTitle", editor: Slick.Editors.Text },
                                { id: "Duration", width: 300, name: "Duration", field: "Duration", editor: Slick.Editors.Text },  //, validator: durationValidator
                                {id: "SportTypeGenre", width: 450, name: "Sport Type Genre", field: "SportTypeGenre", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage" },
                                { id: "SubGenre", width: 450, name: "Sub Genre", field: "SubGenre", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage" },
                                { id: "EventType", width: 450, name: "Event Type", field: "EventType", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage" },
                                { id: "LicStart", width: 500,  name: "Lic Start", field: "LicStart" },
                                { id: "LicEnd", width: 500, name: "Lic End", field: "LicEnd" },
                                { id: "Vennue", width: 300, name: "Venue", field: "Vennue" },
                                { id: "Location", width: 300, name: "Location", field: "Location" },
                                { id: "LiveDate", width: 300,  name: "Live Date", field: "LiveDate" },
                                { id: "LiveTime", width: 300, name: "Live Time", field: "LiveTime" },
                                 { id: "Comments", width: 300,  name: "Comments", field: "Comments", editor: Slick.Editors.LongText}
                                 
                  ];

    var ecolumns = [
                                {id: "SequenceEpisodeno", width: 150, name: "Epi#", field: "SequenceEpisodeno" },        //minWidth:120, 
                                {id: "GenRefNo", width: 300, name: "Gen Ref No", field: "GenRefNo" },
                                { id: "episodeTitle", width: 2500, name: "Episode Title", field: "EpisodeTitle", editor: Slick.Editors.Text },
                                { id: "Duration", width: 300, name: "Duration", field: "Duration", editor: Slick.Editors.Text },  //, validator: durationValidator
                                {id: "SportTypeGenre", width: 450, name: "Sport Type Genre", field: "SportTypeGenre", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage" },
                                { id: "SubGenre", width: 450, name: "Sub Genre", field: "SubGenre", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage" },
                                { id: "EventType", width: 450, name: "Event Type", field: "EventType", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage" },
                                { id: "LicStart", width: 500, name: "Lic Start", field: "LicStart" },
                                { id: "LicEnd", width: 500, name: "Lic End", field: "LicEnd" },
                                { id: "Vennue", width: 300, name: "Venue", field: "Vennue" },
                                { id: "Location", width: 300, name: "Location", field: "Location" },
                                { id: "LiveDate", width: 300, name: "Live Date", field: "LiveDate" },
                                { id: "LiveTime", width: 300, name: "Live Time", field: "LiveTime" },
                                { id: "Comments", width: 300, name: "Comments", field: "Comments", editor: Slick.Editors.Text },
                                { id: "Staus", width: 300, name: "Status", field: "gridstatus" }
                  ];

    var episodeoptions = {
        multiColumnSort: true,
        enableCellNavigation: true,
        enableColumnReorder: false,
        forceFitColumns: true,
        editable: true,
        autoEdit: false,
        asyncEditorLoading: true,
        frozenRow: 3,
        frozenColumn: 7,
         showHeaderRow: true,  
        explicitInitialization: true
    };


    UpData.splice(0, UpData.length);
    EpisodeRefNo = 'undefined';

    var episodeinputparameters = { pSeasonTitle: seasonTitle, pSeasonNumber: seasonNumber, pSeriesTitle: seriesTitle, pSeriesNumber: seriesNumber };
    ForDeleteSeasonparameters = episodeinputparameters;
    var gridwidth = $("#teamGrid").width();
    $('#teamGrid').css({ "width": gridwidth + "px", "height": "650px" });
     var gridContainerDivEpisode = "#teamGrid";
    $.ajax({
        url: GetSeasonEpisodesactionurl,
        type: "GET",
        dataType: 'Json',
        data: episodeinputparameters,
        async: false,
        cache: false,
        success: function (data) {
            episodedata = data;
            dataView = new Slick.Data.DataView();

            episodegrid = new Slick.Grid("#teamGrid", dataView, ecolumns, episodeoptions);
            episodegrid.registerPlugin(new Slick.AutoTooltips());
            episodegrid.setColumns(episodecolumns);

            
            episodegrid.setSelectionModel(new Slick.RowSelectionModel());
            episodegrid.setSelectedRows([0, 0]);

            if(episodedata.length>0)
                setfooter(gridContainerDivEpisode, 1, episodedata.length);
            else
                setfooter(gridContainerDivEpisode, 0, 0);

  episodegrid.onSort.subscribe(function (e, args) {
                    SortGrid(args, dataView);
                    episodegrid.setActiveCell(0, 0);

                });

               dataView.onRowCountChanged.subscribe(function (e, args) {
        episodegrid.updateRowCount();
        episodegrid.render();
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
        episodegrid.invalidateRows(args.rows);
        episodegrid.render();
    });


    $(episodegrid.getHeaderRow()).delegate(":input", "change keyup", function (e) {

        var columnId = $(this).data("columnId");

        if (columnId != null) {

            columnFilters[columnId] = $.trim($(this).val());
            //alert(columnFilters[columnId]);    
            dataView.refresh();
        }
    });

    episodegrid.onHeaderRowCellRendered.subscribe(function (e, args) {

        $(args.node).empty();
        $("<input type='text'>")
           .data("columnId", args.column.id)
           .val(columnFilters[args.column.id])
           .appendTo(args.node);
    });

            episodegrid.onCellChange.subscribe(function (e, args) {
                if (typeof (args.item.SequenceEpisodeno) == 'undefined') {
                    AddToBasket(args.item, "New");
                }
                else {
                    AddToBasket(args.item, "Edit");
                }


            });

            episodegrid.onAddNewRow.subscribe(function (e, args) {
                var item = args.item;
                var column = args.column;
                episodegrid.invalidateRow(data.length);
                $.extend(item, args.item);
                data.push(item);
                episodegrid.updateRowCount();
                episodegrid.render();

            });





            episodegrid.onBeforeCellEditorDestroy.subscribe(function (e, args) {
                cellvalue = args.editor.getValue();
            });

            episodegrid.onClick.subscribe(function (e, args) {
                //var row=episodegrid.getActiveCell().row;
                var cell = episodegrid.getCellFromEvent(e);
                var row = cell.row;
                EpisodeRefNo = episodedata[cell.row]["GenRefNo"];
                setfooter(gridContainerDivEpisode, args.row+1, episodedata.length);
            });

            episodegrid.onValidationError.subscribe(function (e, args) {
                var validationResult = args.validationResults;
                var activeCellNode = args.cellNode;
                var editor = args.editor;
                var errorMessage = validationResult.msg;
                var valid_result = validationResult.valid;
                if (!valid_result)
                    $(activeCellNode).attr("title", errorMessage);
                else
                    $(activeCellNode).attr("title", "");

            });

            episodegrid.onKeyDown.subscribe(function (e, args) {

                selrow = args.row;

                var cell = episodegrid.getCellFromEvent(e);
                f9pressedrow = args.row;

                if (e.shiftKey && e.keyCode == 117) {                  //            shift+F6
                    episodegrid.invalidateRow(data.length);
                    deletedItem = episodedata[cell.row]
                    temp_episodedata=episodedata;
                    temp_episodedata.splice([cell.row], 1);
                    AddToBasket(deletedItem, "Delete");
                    episodegrid.setData(temp_episodedata);
                    episodegrid.render();
                }

                if (e.keyCode == 120) {                   //         F9
                    episodegrid.setActiveCell(args.row, cell + 1);
                    episodegrid.setActiveCell(args.row, cell);
                    episodegrid.editActiveCell();
                    gitems = episodedata[args.row];

                    if (episodegrid.getColumns()[args.cell].id == "SportTypeGenre") {

                        var lookupInvokerControl= "TypeShowLOV";
                        var actioParameters={"Genre": cellvalue}
                        var idfield="SportTypeValue";
                        popupcolumns = [
                                    { id: "SportTypeValue", width: 900, name: "SportType Value", field: "SportTypeValue" },
                                    { id: "SportTypeDescription", width: 900, name: "SportType Description", field: "SportTypeDescription" }
                              ];
                         ShowCommonLookup(GetGenreLOVactionurl, actioParameters, popupcolumns, lookupInvokerControl, idfield, "Sport Type",null);





                    }
                    if (episodegrid.getColumns()[args.cell].id == "SubGenre") {
                   
                        var lookupInvokerControl= "SubGenreLOV";
                        var idfield="SubGenreCodeValue";
                        var actioParameters={"subGenre":cellvalue}
                        popupcolumns = [
                                    { id: "SubGenreCodeValue", width: 900, name: "Sub Genre Code Value", field: "SubGenreCodeValue" },
                                    { id: "SubGenreCodeDescription", width: 900, name: "Sub Genre Code Description", field: "SubGenreCodeDescription" }
                              ];
                         ShowCommonLookup(GetSubGenreLOVactionurl, actioParameters, popupcolumns, lookupInvokerControl, idfield, "SubGenre Type",null);

                    }

                    if (episodegrid.getColumns()[args.cell].id == "EventType") {


                        var lookupInvokerControl= "EventLOV";
                        var idfield="CodeValue";
                        var actioParameters={"eventstring":cellvalue}
                        popupcolumns = [
                                    { id: "CodeValue", width: 900, name: "Code Value", field: "CodeValue" },
                                    { id: "CodeDescription", width: 900, name: "Code Description", field: "CodeDescription" }
                        ];
                        ShowCommonLookup(getEventLOVListactionurl, actioParameters, popupcolumns, lookupInvokerControl, idfield, "Event Type",null);


                    }
                }
            });
            episodegrid.init();
                dataView.beginUpdate();
                dataView.setItems(episodedata, 'SequenceEpisodeno');
                dataView.setFilter(filterlocal);
                dataView.endUpdate();

           

        },
        error: function () {
         showMessage("Some Error Occured", "error");
        }
    });                          //end of jax call

    //works till all f9

    $("#TypeShowLOV").dialog({
        autoOpen: false,
        height: 400,
        width: 950,
        modal: true,

        open: function (event, ui) {

        


            $('#TypeShowLOV').css({ "width": "900px", "height": "400px" });
            //popupinputparameters = { Genre: '' };
            popupcolumns = [
                                    { id: "SportTypeValue", width: 900, name: "SportType Value", field: "SportTypeValue" },
                                    { id: "SportTypeDescription", width: 900, name: "SportType Description", field: "SportTypeDescription" }
                              ];

            $.ajax({
                url: GetGenreLOVactionurl,
                type: "GET",
                dataType: 'Json',
                data: { "Genre": cellvalue },
                async: false,
                cache: false,
                success: function (data) {
                   // debugger;

                    popupdata = data;
                    popupgrid = new Slick.Grid("#TypeShowLOV", popupdata, popupcolumns, popupoptions);
                    popupgrid.setSelectionModel(new Slick.RowSelectionModel());
                    popupgrid.setSelectedRows([0, 0]);

                    popupgrid.onClick.subscribe(function (e, args) {
                        var cell = popupgrid.getCellFromEvent(e);
                        var row = cell.row;
                        popupselectedvalue = data[cell.row].SportTypeValue;

                    });

                },
                error: function () {
                 showMessage("Some Error Occured", "error");
                }
            });  //end of jax call
        },

        buttons: {
            "Save": function () {
                var cdata = episodegrid.getData();

                var itemtoupdate = { "SportTypeGenre": popupselectedvalue };
                $.extend(gitems, itemtoupdate);

                gitems = { "SportTypeGenre": popupselectedvalue,
                    "SequenceEpisodeno": episodedata[f9pressedrow].SequenceEpisodeno,
                    "GenRefNo": episodedata[f9pressedrow].GenRefNo,
                    "EpisodeTitle": episodedata[f9pressedrow].EpisodeTitle,
                    "Duration": episodedata[f9pressedrow].Duration,
                    "SubGenre": episodedata[f9pressedrow].SubGenre,
                    "EventType": episodedata[f9pressedrow].EventType,
                    "LicStart": episodedata[f9pressedrow].LicStart,
                    "LicEnd": episodedata[f9pressedrow].LicEnd,
                    "Vennue": episodedata[f9pressedrow].Vennue,
                    "Location": episodedata[f9pressedrow].Location,
                    "LiveDate": episodedata[f9pressedrow].LiveDate,
                    "LiveTime": episodedata[f9pressedrow].LiveTime,
                    "Comments": episodedata[f9pressedrow].Comments,
                    "gridstatus": "Edit"

                };

                episodegrid.setData(cdata);
                episodegrid.setSortColumn("SequenceEpisodeno", true);
                episodegrid.invalidateRow(cdata.length);

                episodegrid.render();
                AddToBasket(gitems, "Edit");

                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        },
        close: function () {

        }
    });

    $("#EventLOV").dialog({
        autoOpen: false,
        height: 400,
        width: 950,
        modal: true,

        open: function (event, ui) {


  



            $('#EventLOV').css({ "width": "900px", "height": "400px" });
            popupinputparameters = { eventstring: '' };
            popupcolumns = [

                                    { id: "CodeValue", width: 900, name: "Code Value", field: "CodeValue" },
                                    { id: "CodeDescription", width: 900, name: "Code Description", field: "CodeDescription" }
                              ];

            $.ajax({

                url: getEventLOVListactionurl,
                type: "GET",
                dataType: 'Json',
                data: { "eventstring": cellvalue },
                async: false,
                cache: false,
                success: function (data) {
                  //  debugger;
                    popupdata = data;
                    popupgrid = new Slick.Grid("#EventLOV", popupdata, popupcolumns, popupoptions);
                    popupgrid.setSelectionModel(new Slick.RowSelectionModel());
                    popupgrid.setSelectedRows([0, 0]);

                    popupgrid.onClick.subscribe(function (e, args) {
                        var cell = popupgrid.getCellFromEvent(e);
                        var row = cell.row;
                        popupselectedvalue = data[cell.row].CodeValue;

                    });

                },
                error: function () {
                 showMessage("Some Error Occured", "error");
                }
            });  //end of jax call
        },

        buttons: {
            "Save": function () {
                //debugger;
                var cdata = episodegrid.getData();

                var itemtoupdate = { "EventType": popupselectedvalue };
                $.extend(gitems, itemtoupdate);
                gitems = { "EventType": popupselectedvalue,
                    "SportTypeGenre": episodedata[f9pressedrow].SportTypeGenre,
                    "SequenceEpisodeno": episodedata[f9pressedrow].SequenceEpisodeno,
                    "GenRefNo": episodedata[f9pressedrow].GenRefNo,
                    "EpisodeTitle": episodedata[f9pressedrow].EpisodeTitle,
                    "Duration": episodedata[f9pressedrow].Duration,
                    "SubGenre": episodedata[f9pressedrow].SubGenre,
                    "SportTypeGenre": episodedata[f9pressedrow].SportTypeGenre,
                    "LicStart": episodedata[f9pressedrow].LicStart,
                    "LicEnd": episodedata[f9pressedrow].LicEnd,
                    "Vennue": episodedata[f9pressedrow].Vennue,
                    "Location": episodedata[f9pressedrow].Location,
                    "LiveDate": episodedata[f9pressedrow].LiveDate,
                    "LiveTime": episodedata[f9pressedrow].LiveTime,
                    "Comments": episodedata[f9pressedrow].Comments,
                    "gridstatus": "Edit"

                };

                episodegrid.setData(cdata);
                episodegrid.setSortColumn("SequenceEpisodeno", true);
                episodegrid.invalidateRow(cdata.length);
                episodegrid.render();
                AddToBasket(gitems, "Edit");

                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        },
        close: function () {
        }
    });

    $("#SubGenreLOV").dialog({
        autoOpen: false,
        height: 400,
        width: 950,
        modal: true,

        open: function (event, ui) {

      



            $('#SubGenreLOV').css({ "width": "900px", "height": "400px" });
            var popupinputparameters = { subGenre: '' };
            var popupcolumns = [

                                    { id: "SubGenreCodeValue", width: 900, name: "Sub Genre Code Value", field: "SubGenreCodeValue" },
                                    { id: "SubGenreCodeDescription", width: 900, name: "Sub Genre Code Description", field: "SubGenreCodeDescription" }
                              ];
            $.ajax({
                url: GetSubGenreLOVactionurl,
                type: "GET",
                dataType: 'Json',
                data: { "subGenre": cellvalue },
                async: false,
                cache: false,
                success: function (data) {
                    debugger;

                    popupdata = data;
                    popupgrid = new Slick.Grid("#SubGenreLOV", popupdata, popupcolumns, popupoptions);
                    popupgrid.setSelectionModel(new Slick.RowSelectionModel());
                    popupgrid.setSelectedRows([0, 0]);

                    popupgrid.onClick.subscribe(function (e, args) {
                        var cell = popupgrid.getCellFromEvent(e);
                        var row = cell.row;
                        popupselectedvalue = data[cell.row].SubGenreCodeValue;
                    });
                },
                error: function () {
                 showMessage("Some Error Occured", "error");
                }
            });  //end of jax call
        },

        buttons: {
            "Save": function () {
                var cdata = episodegrid.getData();

                var itemtoupdate = { "SubGenre": popupselectedvalue };
                $.extend(gitems, itemtoupdate);
                gitems = { "SubGenre": popupselectedvalue,
                    "SportTypeGenre": popupselectedvalue,
                    "SequenceEpisodeno": episodedata[f9pressedrow].SequenceEpisodeno,
                    "GenRefNo": episodedata[f9pressedrow].GenRefNo,
                    "EpisodeTitle": episodedata[f9pressedrow].EpisodeTitle,
                    "Duration": episodedata[f9pressedrow].Duration,
                    "SportTypeGenre": episodedata[f9pressedrow].SportTypeGenre,
                    "EventType": episodedata[f9pressedrow].EventType,
                    "LicStart": episodedata[f9pressedrow].LicStart,
                    "LicEnd": episodedata[f9pressedrow].LicEnd,
                    "Vennue": episodedata[f9pressedrow].Vennue,
                    "Location": episodedata[f9pressedrow].Location,
                    "LiveDate": episodedata[f9pressedrow].LiveDate,
                    "LiveTime": episodedata[f9pressedrow].LiveTime,
                    "Comments": episodedata[f9pressedrow].Comments,
                    "gridstatus": "Edit"

                };

                episodegrid.setData(cdata);
                episodegrid.setSortColumn("SequenceEpisodeno", true);
                episodegrid.invalidateRow(cdata.length);
                episodegrid.render();
                AddToBasket(gitems, "Edit");

                $(this).dialog("close");
            },
            "Cancel": function () {
                $(this).dialog("close");
            }
        },
        close: function () {
        }
    });

};

function AddToBasket(item, status) {
    if (UpData.length == 0) {
        if (status == "Edit") {
            item1 = { "gridstatus": status };
            $.extend(item, item1);
            UpData.push(item);
        }
        else if (status == "New") {
            item1 = { "gridstatus": status };
            $.extend(item, item1);
            UpData.push(item);
        }
        else if (status == "Delete") {
            item1 = { "gridstatus": status };
            $.extend(item, item1);
            UpData.push(item);
        }
        else {
            alert("Define Mode New/Edit");
        }
    }
    else {
        for (var i = 0; i < UpData.length; i++) {
            if (UpData[i]["SequenceEpisodeno"] == item["SequenceEpisodeno"]) {
                UpData.splice(i, 1);
            }
        }
        item1 = { "gridstatus": status };
        $.extend(item, item1);
        UpData.push(item);
    }
};

var dobj;
function Save() {
    clearAllMessages();
    if(UpData=='undefined' || UpData.length==0 || UpData==[])
    {
//    alert('No Data To Save');
     showMessage("No Data To Save", "information");
    }
    else{
        $.noty.closeAll();
        var dataToSend = JSON.stringify(UpData);
        ShowProgressBar();
        $.ajax({
            url: SaveEpisodeDetailsactionurl,
            data: dataToSend,
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            type: "POST",
            async: false,
            cache: false,
            success: function (data) {
                RemoveProgressBar();
                if (data.length != 0) {
                    if (data[0].Messages != null) {
                        showMessage(data[0].Messages[0].Message, "error");
                    }
                    else {
                        showMessage("Transaction Saved successfully", "information");
                        getEpisodeGrid(currentseasontitle, currentseasonno, currentseriestitle, currentSeriesno);
                    }
                    
                }
                else {
                    showMessage("Transaction Saved successfully", "information");
                  
                    getEpisodeGrid(currentseasontitle, currentseasonno, currentseriestitle, currentSeriesno);
                }
                UpData.splice(0, UpData.length);
            },
            error: function () {
                RemoveProgressBar();
                showMessage("Some Error Occured", "error");
            }
        });
    }
};




function popup_Save_click() {
    if ($('#txtSrcEpisodeFrom').val() == "" || $('#txtSrcEpisodeTo').val() == "" || $('#txtDesEpisodeFrom').val() == "" || $('#txtDesEpisodeTo').val() == "") {
        showMessage("Enter required  feilds.", "error");
    }
    else {
        var changecriteria = {
            SrcEpisodeFrom: $('#txtSrcEpisodeFrom').val(),
            SrcEpisodeTo: $('#txtSrcEpisodeTo').val(),
            DesEpisodeFrom: $('#txtDesEpisodeFrom').val(),
            DesEpisodeTo: $('#txtDesEpisodeTo').val()
        };
        var pSeriesSearchViewModel = { seriesTitleMaintChangeEpisodeNo: changecriteria, getEpisodeResult: episodedata, SeasonNumber: currentseasonno, SeasonTitle: currentseasontitle, SeriesNumber: currentSeriesno, SeriesTitle: currentseriestitle };
        var dataToSend = JSON.stringify(pSeriesSearchViewModel);
        $.ajax({
            url: SaveChangeEpisodeNoactionurl,
            type: "POST",
            dataType: "Json",
            data: JSON.stringify(pSeriesSearchViewModel),
            contentType: 'application/json; charset=UTF-8',
            cache: false,
            async: false,

            success: function (data) {
                if (data.MessageToView == 'Operation Successful') {
                    getEpisodeGrid(currentseasontitle, currentseasonno, currentseriestitle, currentSeriesno);
                    UpData.splice(0, UpData.length);
                    showMessage("Transaction Saved successfully", "information");
                }
                else {
                    showMessage(data.MessageToView, "error");
                }



            },
            error: function () {
                showMessage("Some Error Occured", "error");
            }
        });   //end of jax call

        dialoghandler.dialog("close");
    }
}
function popup_cancel_click() {
    dialoghandler.dialog("close");
}

function enterupdateliveinfo_save_click() {
    if ($('#txtSrcEpisodeFrom').val() == "" || $('#txtSrcEpisodeTo').val() == "" || $('#txtDaysBetween').val() == "" || $('#txtDefaultTime').val() == "" || $('#txtDefaultTimeMinutes').val() == "" || $('#txtDefaultDate').val() == "") {
        showMessage("Enter required  feilds.", "error");
    }
    else {
        var inputdatavariable = {
            SrcEpisodeFrom: $('#txtSrcEpisodeFrom').val(),
            SrcEpisodeTo: $('#txtSrcEpisodeTo').val(),
            DaysBetween: $('#txtDaysBetween').val(),
            DefaultTime: $('#txtDefaultTime').val(),
            DefaultTimeMinutes: $('#txtDefaultTimeMinutes').val(),
            DefaultDate: $('#txtDefaultDate').val()
        };
        var pSeriesSearchViewModel = { enterUpdateLiveInfo: inputdatavariable, getEpisodeResult: episodedata, SeasonNumber: currentseasonno, SeasonTitle: currentseasontitle, SeriesNumber: currentSeriesno, SeriesTitle: currentseriestitle };
        var dataToSend = JSON.stringify(pSeriesSearchViewModel);
        $.ajax({
            url: SaveLiveinfoactionurl,
            type: "POST",
            dataType: "Json",
            data: JSON.stringify(pSeriesSearchViewModel),
            contentType: 'application/json; charset=UTF-8',
            cache: false,
            async: false,

            success: function (data) {
                if (data.MessageToView == 'Operation Successful') {
                    getEpisodeGrid(currentseasontitle, currentseasonno, currentseriestitle, currentSeriesno);
                    UpData.splice(0, UpData.length);
                    showMessage("Transaction Saved successfully", "information");
                }
                else {
                    showMessage(data.MessageToView, "error");
                }

            },
            error: function () {
                showMessage("Some Error Occured", "error");
            }
        });   //end of jax call

        dialoghandler.dialog("close");
    }
}   

function filterlocal(item) {


    for (var columnId in columnFilters) {
        if (columnId !== undefined && columnFilters[columnId] !== "") {
            var c = episodegrid.getColumns()[episodegrid.getColumnIndex(columnId)];

            //if not type casted to string, number filtering will throw error
            if (String(item[c.field].toUpperCase()).indexOf(columnFilters[columnId].toUpperCase()) != 0) 
            {
//                if (String(item[c.field]).indexOf(columnFilters[columnId]) != 0) 
                {
                    return false;
                }
            }

        }
    }
    return true;
};
function seriesTitleMaintAddUpdateSeriesTitle_save_click() {
    if ($("#txtSeriesTitle").val() != "") {
        var flag;
        var answer;
        if (currentaction == 'AddSeriesTitle') {
            answer = confirm("Are you sure that you want to create a new series?")
            flag = true
        }
        else if (currentaction == 'UpdateSeriesTitle') {
            answer = confirm("Are you sure that you want to change the series title ?")
            flag = false;
        }
        if (answer) {
            var inputfrompopup = {
                SeriesTitle: $('#txtSeriesTitle').val(),
                AdditionalText: $('#txtAdditionalText').val(),
                CheckSeries: $('#chkCheckSeries').is(":checked"),
                CheckSeason: $('#chkCheckSeason').is(":checked"),
                CheckAdditionalText: $('#chkCheckAdditionalText').is(":checked"),
                CheckEpisodeNo: $('#chkCheckEpisodeNo').is(":checked"),
                CheckLeadZero: $('#chkCheckLeadZero').is(":checked"),
                UpdateProgrammeTitle: $('#chkUpdateProgrammeTitle').is(":checked"),
                IsAddSeriesTitle: flag

            };
            var pSeriesSearchViewModel = { SeriesNumber: currentSeriesno, SeriesTitle: currentseriestitle, seriesTitleMaintAddUpdateSeriesTitle: inputfrompopup, getEpisodeResult: episodedata };
            var dataToSendp = JSON.stringify(pSeriesSearchViewModel);
            $.ajax({
                url: AddUpdateSeriesTitleSavesurl,
                type: "POST",
                dataType: "Json",
                data: dataToSendp,
                contentType: 'application/json; charset=UTF-8',
                cache: false,
                success: function (data) {

                    // getEpisodeGrid(currentseasontitle, currentseasonno, inputfrompopup.SeriesTitle, currentSeriesno);
                    //                    getEpisodeGrid(currentseriestitle, currentSeriesno, currentseasontitle, currentseasonno);
                    // location.reload();
                    showMessage("Transaction Saved successfully", "information");
                    window.location.href = SeriesDetailsurl + '?seriestitle=' + data.SeriesTitle + '&seriesno=' + data.SeriesNumber;
                    //                    alert(data.SeriesTitle + data.SeriesNumber);
                },
                error: function () {
                    alert('error');
                }
            });     //end of jax call
            dialoghandler.dialog("close");

        }
    }
    else {
        showMessage("Please Enter Series Title", "error");
    }


    };
    function autocalcepisodeno() {
        try {
            var srcfrom = Number($("#txtSrcEpisodeFrom").val());
            var srcto = Number($("#txtSrcEpisodeTo").val());
            var desfrom = Number($("#txtDesEpisodeFrom").val());
            var srcto = desfrom + (srcto - srcfrom);
            $("#txtDesEpisodeTo").val(srcto);
        }
        catch (ex) {
            showMessage("Invalid Integer", "error");
        }
    };
    function EpisodeDetails() {
        clearAllMessages();
        if (EpisodeRefNo != 'undefined') {
            $("#EpisodeDetailsPopup").html("");
            $('#EpisodeDetailsPopup').load(ProgrammeMaintenancepopupurl + "?refno=" + EpisodeRefNo);
            $("#EpisodeDetailsPopup").dialog({
                autoOpen: false,
                height: 740,
                width: 940,
                modal: true,
                title: "Episode Details",
                open: function (event, ui) {
                    $('#EpisodeDetailsPopup').css({ "width": "940px", "height": "740px", "padding": "10px" });
                    //$("#EpisodeDetailsPopup").dialog("close");

                },
                close: function () {
                }
            });

            $("#EpisodeDetailsPopup").dialog("open");
        }
        else {
            alert('Please select Episode');
        }
    };