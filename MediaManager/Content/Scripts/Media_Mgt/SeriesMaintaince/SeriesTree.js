var seriesTreeViewModel;
var seriestreeepisodegrid;
var seriestreedataview;
var idfield;
var seriestreeepisodeinputparameters;
var deletedItem;
var Addseasondialoghandler;

var seriestreepopupoptions = {
    multiColumnSort: true,
    enableCellNavigation: true,
    enableColumnReorder: false,
    forceFitColumns: true,
    editable: true,
    autoEdit: false,
    asyncEditorLoading: true,
    frozenRow: 3,
    frozenColumn: 7,
    showHeaderRow: true
      , explicitInitialization: true
};
var seriestreeepisodecolumns = [
                                 { id: "Check", name: "check", field: "Status", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "slick-cell-AlignCenter" },
                                {id: "SequenceEpisodeno", width: 150, name: "Epi#", field: "SequenceEpisodeno" },        //minWidth:120, 
                                {id: "episodeTitle", width: 2500, name: "Episode Title", field: "EpisodeTitle", editor: Slick.Editors.Text },
                                { id: "Duration", width: 300, name: "Duration", field: "Duration", editor: Slick.Editors.Text },
                                {id: "Vennue", width: 300, name: "Venue", field: "Vennue" },
                                { id: "Location", width: 300, name: "Location", field: "Location" },
                                { id: "LiveDate", width: 300, name: "Live Date", field: "LiveDate" },
                                { id: "LiveTime", width: 300, name: "Live Time", field: "LiveTime" },
                                { id: "MemNo", width: 300, name: "Mem No Where LIC Created", field: "MemNo" },
                                { id: "Comments", width: 300, name: "Comments", field: "Comments", editor: Slick.Editors.LongText },
                                { id: "Staus", width: 300, name: "Status", field: "gridstatus" }

                  ];
var seriestreeepisodevisiblecolumns = [
                                 { id: "Check", name: "check", field: "Status", formatter: Slick.Formatters.Checkmark, editor: Slick.Editors.Checkbox, cssClass: "slick-cell-AlignCenter" },
                                { id: "SequenceEpisodeno", width: 150, name: "Epi#", field: "SequenceEpisodeno" },        //minWidth:120, 
                                {id: "episodeTitle", width: 2500, name: "Episode Title", field: "EpisodeTitle", editor: Slick.Editors.Text },
                                { id: "Duration", width: 300, name: "Duration", field: "Duration", editor: Slick.Editors.Text },
                                { id: "Vennue", width: 300, name: "Venue", field: "Vennue" },
                                { id: "Location", width: 300, name: "Location", field: "Location" },
                                { id: "LiveDate", width: 300, name: "Live Date", field: "LiveDate" },
                                { id: "LiveTime", width: 300, name: "Live Time", field: "LiveTime" },
                                { id: "MemNo", width: 300, name: "Mem No Where LIC Created", field: "MemNo" },
                                { id: "Comments", width: 300, name: "Comments", field: "Comments", editor: Slick.Editors.LongText }


                  ];
var seriestreeafterdmexcutioncolumns = [
                                 { id: "Check", name: "check", field: "Status", formatter: Slick.Formatters.Checkmark, cssClass: "slick-cell-AlignCenter" },
                                { id: "SequenceEpisodeno", width: 150, name: "Epi#", field: "SequenceEpisodeno" },        //minWidth:120, 
                                {id: "episodeTitle", width: 2500, name: "Episode Title", field: "EpisodeTitle", editor: Slick.Editors.Text },
                                { id: "Duration", width: 300, name: "Duration", field: "Duration", editor: Slick.Editors.Text },
                                { id: "Vennue", width: 300, name: "Venue", field: "Vennue" },
                                { id: "Location", width: 300, name: "Location", field: "Location" },
                                { id: "LiveDate", width: 300, name: "Live Date", field: "LiveDate" },
                                { id: "LiveTime", width: 300, name: "Live Time", field: "LiveTime" },
                                { id: "MemNo", width: 300, name: "Mem No Where LIC Created", field: "MemNo" },
                                { id: "Comments", width: 300, name: "Comments", field: "Comments", editor: Slick.Editors.LongText }


                  ];

var columnFilters = {};
function Save_click() {
  if (IsSeasonSelected) {
          Save_EpisodeDetails();
  }
  else {
      alert('Please Select the Season Save');
  }
}
function GenrateEpisodes() {
    //$("#btnSeriesTreeGenerate").attr('disabled', 'disabled');
    $('#btnSeriesTreeGenerate').prop("disabled", true);
    $('#btnSeriesTreeGenerate').removeClass('inputButton').addClass('inputButtonDisable');

    var temp_seriesTreeViewModel = seriesTreeViewModel;
    if ($("#ChkSeries").attr('checked'))
        temp_seriesTreeViewModel.ChkSeries = true;
    else
        temp_seriesTreeViewModel.ChkSeries = false;

    if ($("#ChkWTSeries").attr('checked'))
        temp_seriesTreeViewModel.ChkWTSeries = true;
    else
        temp_seriesTreeViewModel.ChkWTSeries = false;

    if ($("#ChkSeason").attr('checked'))
        temp_seriesTreeViewModel.ChkSeason = true;
    else
        temp_seriesTreeViewModel.ChkSeason = false;

    if ($("#ChkWTSeason").attr('checked'))
        temp_seriesTreeViewModel.ChkWTSeason = true;
    else
        temp_seriesTreeViewModel.ChkWTSeason = false;

    if ($("#ChkEpi_No").attr('checked'))
        temp_seriesTreeViewModel.ChkEpi_No = true;
    else
        temp_seriesTreeViewModel.ChkEpi_No = false;

    if ($("#ChkWTEpi_No").attr('checked'))
        temp_seriesTreeViewModel.ChkWTEpi_No = true;
    else
        temp_seriesTreeViewModel.ChkWTEpi_No = false;

    if ($("#ChkAddText").attr('checked'))
        temp_seriesTreeViewModel.ChkAddText = true;
    else
        temp_seriesTreeViewModel.ChkAddText = false;

    if ($("#ChkWTAddText").attr('checked'))
        temp_seriesTreeViewModel.ChkWTAddText = true;
    else
        temp_seriesTreeViewModel.ChkWTAddText = false;
    temp_seriesTreeViewModel.TextWTAddText = $('#TextWTAddText').val();
    temp_seriesTreeViewModel.TextAddText = $('#TextAddText').val();
    temp_seriesTreeViewModel.NumberofUnlicencedEpisodes = $('#NumberofUnlicencedEpisodes').val();
    temp_seriesTreeViewModel.FirstEpisodeNumber = $('#FirstEpisodeNumber').val();
    temp_seriesTreeViewModel.TextNextEpi = $('#TextNextEpi').val();
    temp_seriesTreeViewModel.TextRelicence_From = $('#TextRelicence_From').val();
    temp_seriesTreeViewModel.TextRelicence_To = $('#TextRelicence_To').val();
    temp_seriesTreeViewModel.TextPriFirEpi = $('#TextPriFirEpi').val();
    temp_seriesTreeViewModel.TextPriOthEpi = $('#TextPriOthEpi').val();
    temp_seriesTreeViewModel.TextDuration = $('#TextDuration').val();
    temp_seriesTreeViewModel.TextSportType = $('#TextSportType').val();
    temp_seriesTreeViewModel.TextSubGenre = $('#TextSubGenre').val();
    temp_seriesTreeViewModel.TextEventType = $('#TextEventType').val();
    temp_seriesTreeViewModel.seriesvo = null;

    temp_seriesTreeViewModel.DMVo_DMNumber = GlobalDMVo_DMNumber;
    temp_seriesTreeViewModel.TypeComboSelection = GlobalTypeComboSelection;
    temp_seriesTreeViewModel.RefNo = GlobalRefNo;
    temp_seriesTreeViewModel.Type = GlobalType;
    temp_seriesTreeViewModel.ReleaseYear = GlobalReleaseYear;
    temp_seriesTreeViewModel.SeasonTitle = seriestreeepisodeinputparameters.season;
    



    var dataToSend = JSON.stringify(temp_seriesTreeViewModel);
   

    // alert('Genrate intialize');
    $.ajax({
        url: GenerateSeasonEpisodesUrl,
        type: "POST",
        dataType: 'Json',
        contentType: 'application/json; charset=utf-8',
        data: dataToSend,
        async: false,
        cache: false,
        success: function (data) {

            if (data.ErrorMessage == null || data.ErrorMessage == 'Undefined' || data.ErrorMessage.length == 0) {
                if (data.dMEpisodeDetails != null) {
                    for (var i = 0; i < data.dMEpisodeDetails.length; i++) {
                        if (data.dMEpisodeDetails[i].gridstatus == "New") {
                            AddToBasketSeriesTree(data.dMEpisodeDetails[i], "New");
                        }
                    }
                }
                
                seriesTreeViewModel = data;
                seriesTreeViewModel.seriesvo = temp_seriesTreeViewModel.seriesvo;
                temp_seriesTreeViewModel = null;
                seriestreeepisodegrid.init();
                seriestreedataview.beginUpdate();
                seriestreedataview.setItems(seriesTreeViewModel.dMEpisodeDetails, "SequenceEpisodeno");
                seriestreedataview.setFilter(filter);
                seriestreedataview.refresh();
                seriestreedataview.endUpdate();
            }
            else {

                //alert(data.ErrorMessage[0]);
                showMessage(data.ErrorMessage[0], "information");
            }

            //  alert(data);
        },
        error: function () {
            showMessage("Some Error occured", "error");
        }

    });        //end of Ajax call

}
function Generate_click() {


   












    var Isvalid = true;
    //var unlicendeepi = $('#NumberofUnlicencedEpisodes').val();
    //    var IntegerRegExp = new RegExp("^[0-9]{1,10}$");
    // var IntegerRegExp = new RegExp("[0-9]*");
    var unlicendeepiisvalid = /(^[0-9][0-9]*$)/.test($('#NumberofUnlicencedEpisodes').val());
    var firstepiisvalid = /(^[0-9][0-9]*$)/.test($('#FirstEpisodeNumber').val());
    var nextepiisvalid = /(^[0-9][0-9]*$)/.test($('#TextNextEpi').val());
    var durationisvalid = /(^(([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])))/.test($('#TextDuration').val());
    //var unlicendeepi_ISvalid = unlicendeepi.match(IntegerRegExp);

    //var regex = new Regex("^[0-9]{1,10}$", RegexOptions.Compiled);
    if (IsSeasonSelected) {


        var temp_seriesTreeViewModel = seriesTreeViewModel;
        seriesTreeViewModel.SeasonTitle = seriestreeepisodeinputparameters.season;
        if ($("#ChkSeries").attr('checked'))
            temp_seriesTreeViewModel.ChkSeries = true;
        else
            temp_seriesTreeViewModel.ChkSeries = false;

        if ($("#ChkWTSeries").attr('checked'))
            temp_seriesTreeViewModel.ChkWTSeries = true;
        else
            temp_seriesTreeViewModel.ChkWTSeries = false;

        if ($("#ChkSeason").attr('checked'))
            temp_seriesTreeViewModel.ChkSeason = true;
        else
            temp_seriesTreeViewModel.ChkSeason = false;

        if ($("#ChkWTSeason").attr('checked'))
            temp_seriesTreeViewModel.ChkWTSeason = true;
        else
            temp_seriesTreeViewModel.ChkWTSeason = false;

        if ($("#ChkEpi_No").attr('checked'))
            temp_seriesTreeViewModel.ChkEpi_No = true;
        else
            temp_seriesTreeViewModel.ChkEpi_No = false;

        if ($("#ChkWTEpi_No").attr('checked'))
            temp_seriesTreeViewModel.ChkWTEpi_No = true;
        else
            temp_seriesTreeViewModel.ChkWTEpi_No = false;

        if ($("#ChkAddText").attr('checked'))
            temp_seriesTreeViewModel.ChkAddText = true;
        else
            temp_seriesTreeViewModel.ChkAddText = false;

        if ($("#ChkWTAddText").attr('checked'))
            temp_seriesTreeViewModel.ChkWTAddText = true;
        else
            temp_seriesTreeViewModel.ChkWTAddText = false;
        temp_seriesTreeViewModel.TextWTAddText = "";
        temp_seriesTreeViewModel.TextAddText = "";
        temp_seriesTreeViewModel.NumberofUnlicencedEpisodes = $('#NumberofUnlicencedEpisodes').val();
        temp_seriesTreeViewModel.FirstEpisodeNumber = $('#FirstEpisodeNumber').val();
        temp_seriesTreeViewModel.TextNextEpi = $('#TextNextEpi').val();
        temp_seriesTreeViewModel.TextRelicence_From = $('#TextRelicence_From').val();
        temp_seriesTreeViewModel.TextRelicence_To = $('#TextRelicence_To').val();
        temp_seriesTreeViewModel.TextPriFirEpi = $('#TextPriFirEpi').val();
        temp_seriesTreeViewModel.TextPriOthEpi = $('#TextPriOthEpi').val();
        temp_seriesTreeViewModel.TextDuration = $('#TextDuration').val();
        temp_seriesTreeViewModel.TextSportType = $('#TextSportType').val();
        temp_seriesTreeViewModel.TextSubGenre = $('#TextSubGenre').val();
        temp_seriesTreeViewModel.TextEventType = $('#TextEventType').val();
        temp_seriesTreeViewModel.seriesvo = null;
        try {
            var epino =Number($('#NumberofUnlicencedEpisodes').val());
            if (epino > 20000) {
                Isvalid = false;
                showMessage("Can't Generate Episode more than 20000", "error");
            }

        }
        catch (e) {
            Isvalid = false;
        }


        if (Isvalid) {

            if ($('#NumberofUnlicencedEpisodes').val() == "0") {
                alert('Error:Invalid Unlicensed Episode Number');
                Isvalid = false;
            }
            else if ($('#FirstEpisodeNumber').val() == "0") {
                alert('Error:Invalid First Episode Number');
                Isvalid = false;
            }
            else if (!unlicendeepiisvalid) {
                alert('Error:Invalid Unlicensed Episode Number');
                Isvalid = false;
            }
            else if (!firstepiisvalid) {
                alert('Error:Invalid First Episode Number');
                Isvalid = false;
            }
            else if (!durationisvalid) {
                alert('Error:Duration must be in HH:MM:SS format - range 00:00 to 23:59');
                Isvalid = false;
            }
            else if (!nextepiisvalid) {
                alert('Error:Invalid Next Episode Number');
                Isvalid = false;
            }
            else if (!(temp_seriesTreeViewModel.ChkSeries || temp_seriesTreeViewModel.ChkSeason || temp_seriesTreeViewModel.ChkEpi_No || temp_seriesTreeViewModel.ChkAddText)) {
                alert('Error:You must select atleast series to generate episode title');
                Isvalid = false;
            }
            else if (!(temp_seriesTreeViewModel.ChkWTSeries || temp_seriesTreeViewModel.ChkWTSeason || temp_seriesTreeViewModel.ChkWTEpi_No || temp_seriesTreeViewModel.ChkWTAddText)) {
                alert('Error:You must select atleast series to generate episode working title');
                Isvalid = false;
            }
        }

//        if (Isvalid) {
//            if ($('#TextDuration').val() == "" || $('#TextDuration').val() == "00:00:00") {

//                noty({
//                    text: 'You have not specified A Duration.Do u want to continue Anyway?',
//                    modal: false,
//                    type: 'alert',
//                    buttons: [
//                                { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
//                                    $noty.close();
//                                }
//                                },
//                                { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
//                                    Isvalid = false;
//                                    $noty.close();
//                                }
//                                }
//                        ]
//                });


//            } //end of IF
//        }


//        if (Isvalid) {
//            if ($('#TextSportType').val() == "" || $('#TextSportType').val() == "-") {

//                noty({
//                    text: 'You have not specified A Sporting Type/Genre.Do u want to continue Anyway?',
//                    modal: false,
//                    type: 'alert',
//                    buttons: [
//                                { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
//                                    $noty.close();
//                                }
//                                },
//                                { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
//                                    Isvalid = false;
//                                    $noty.close();
//                                }
//                                }
//                        ]
//                });


//            } //end of IF
//        }

//        if (Isvalid) {
//            if ($('#TextSubGenre').val() == "" || $('#TextSubGenre').val() == "-") {

//                noty({
//                    text: 'You have not specified A Sub-Genre.Do u want to continue Anyway?',
//                    modal: false,
//                    type: 'alert',
//                    buttons: [
//                                { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
//                                    $noty.close();
//                                }
//                                },
//                                { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
//                                    Isvalid = false;
//                                    $noty.close();
//                                }
//                                }
//                        ]
//                });


//            } //end of IF
//        }
//        if (Isvalid) {
//            if ($('#TextEventType').val() == "" || $('#TextEventType').val() == "-") {

//                noty({
//                    text: 'You have not specified Event Type.Do u want to continue Anyway?',
//                    modal: false,
//                    type: 'alert',
//                    buttons: [
//                                { addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
//                                    $noty.close();
//                                }
//                                },
//                                { addClass: 'inputButton', text: 'No', onClick: function ($noty) {
//                                    Isvalid = false;
//                                    $noty.close();
//                                }
//                                }
//                        ]
//                });


//            } //end of IF
//        }




        if (Isvalid) {
            if ($('#TextDuration').val() == "" || $('#TextDuration').val() == "00:00:00") {
                Isvalid = false;
                alert("Duration must be greater than or equal to one minute");

            }
        }

        if (Isvalid) {
            if ($('#TextSportType').val() == "" || $('#TextSportType').val() == "-") {

                var confimsportstype = confirm("You have not specified A Sporting Type/Genre. Do you want to continue anyway?")
                if (confimsportstype) {
                }
                else {
                    Isvalid = false;
                }
            }
        }
        if (Isvalid) {
            if ($('#TextSubGenre').val() == "" || $('#TextSubGenre').val() == "-") {

                var confimsubgenre = confirm("You have not specified A Sub-Genre. Do you want to continue anyway?")
                if (confimsubgenre) {
                }
                else {
                    Isvalid = false;
                }
            }
        }
        if (Isvalid) {
            if ($('#TextEventType').val() == "" || $('#TextEventType').val() == "-") {
                var confimeventtype = confirm("You have not specified Event Type. Do you want to continue anyway?")
                if (confimeventtype) {
                }
                else {
                    Isvalid = false;
                }
            }
        }




    }
    else {
        alert('Error:Please Select the Season to generate episodes');
        Isvalid = false;
    }

    if (Isvalid) {
        GenrateEpisodes();
    }



}
function cancel_click() {
    $("#SeriesTreeDiv").dialog("close");
    
}
function change_click() {
    alert('Change');
}
function AddSeason_popup_Save() {
    var temp_seriesTreeViewModel = { DMVo_DMNumber: '', TypeComboSelection: '', RefNo: '', Type: '', ReleaseYear: '' };
    //temp_seriesTreeViewModel.seriesvo = null;
    // temp_seriesTreeViewModel.dMEpisodeDetails = null;
    temp_seriesTreeViewModel.DMVo_DMNumber = GlobalDMVo_DMNumber;
    temp_seriesTreeViewModel.TypeComboSelection = GlobalTypeComboSelection;
    temp_seriesTreeViewModel.RefNo = GlobalRefNo;
    temp_seriesTreeViewModel.Type = GlobalType;
    temp_seriesTreeViewModel.ReleaseYear = GlobalReleaseYear;
    
    temp_seriesTreeViewModel.SeasonTitle = $('#SeasonTitle').val();
    temp_seriesTreeViewModel.SeasonNumber = $('#SeasonNumber').val();


    var dataToSend = JSON.stringify(temp_seriesTreeViewModel);
    $.ajax({
        url: AddSeasonSaveUrl,
        type: "POST",
        dataType: 'Json',
        contentType: 'application/json; charset=utf-8',
        data: dataToSend,
        async: false,
        cache: false,
        success: function (data) {
            $("#SeriesTreeDiv").html("");
            if (data != null) {
                GlobalRefNo = data.seriesvo.DMGenRefNo;
                SeriesTreeParameters.RefNo = data.seriesvo.DMGenRefNo;
                temp_seriesTreeViewModel.RefNo = data.seriesvo.DMGenRefNo;
                IsSeasonAddedInSeriesTree = true;
                var selectedRow = gridProgrammeParticulars.getSelectedRows();
                if (selectedRow != null) {
                    var SelectedData = ProgrammeParticulargridData[selectedRow];
                    if (SelectedData != undefined && SelectedData != null) {
                        SelectedData.Title = data.NewTitle;
                        SelectedData.RefNo = data.NewRefNo;
                        SelectedData.SeriesTitle = data.NewSeriesTitle;
                        if (SelectedData.PersistFlag == 3) {
                            SelectedData.PersistFlag = parseInt("1");
                        }
                        if (SelectedData.Id != 0) {
                            if (ProgrammeVOModifiedData != null) {
                                for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                    if (ProgrammeVOModifiedData[i].Id == SelectedData.Id) {
                                        ProgrammeVOModifiedData[i].PersistFlag = SelectedData.PersistFlag;
                                        ProgrammeVOModifiedData[i].Title = data.NewTitle;
                                        ProgrammeVOModifiedData[i].RefNo = data.NewRefNo;
                                        ProgrammeVOModifiedData[i].SeriesTitle = data.NewSeriesTitle;
                                    }
                                }
                            }
                        }
                    }
                }
                gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                gridProgrammeParticulars.render();
                $('#SeriesTreeDiv').load(SeriesTreeUrl, temp_seriesTreeViewModel);
                showMessage("Transaction Completed Successfully", "information");
            }
            else {
                showMessage("Some Exception occured.Please contact the Administrator.", "error");
            }
            $("#AddSeasonPopup").dialog("close");
        },
        error: function () {
            //ShowNotyPannel("Transaction Not Saved", "information");
            showMessage("Some error occured", "error");

        }
    });

}
function AddSeason_click() {
    // alert('add season');
    $('#AddSeasonPopup').css("visibility", "visible");
   Addseasondialoghandler= $("#AddSeasonPopup").dialog({
        autoOpen: false,
        height: 100,
        width: 1200,
        modal: true,
        title: "Add Season Title",
        open: function (event, ui) {

            $('#AddSeasonPopup').css({ "width": "auto", "height": "100px", "padding": "10px" });
            //dialoghandler = $(this);

        },
        buttons: {
            "Save": function () {
                if ($('#SeasonTitle').val() == '' || $('#SeasonTitle').val() == null)
                    alert("Season Title can't be Empty");
                else if ($('#SeasonNumber').val() == '' || $('#SeasonNumber').val() == null)
                    alert("Season Number can't be Empty");
                else
                    AddSeason_popup_Save();
            },
            "Cancel": function () {
                $(this).dialog("close");

            }
        },
        close: function () {
        }
    });

    $("#AddSeasonPopup").dialog("open");


}
function getEpisodeGrid(series, season, DMVo_DMNumber, TypeComboSelection, RefNo, Type, ReleaseYear) {

    //  alert(series.toString() + '  ' + season.toString() + ' ' + DMVo_DMNumber + '  ' + TypeComboSelection + '  ' + RefNo +Type+'  ' +'   release year ' + ReleaseYear);

    seriestreeepisodeinputparameters = { 'series': series, 'season': season, 'DMVo_DMNumber': DMVo_DMNumber, 'TypeComboSelection': TypeComboSelection, 'RefNo': RefNo, 'Type': Type, 'ReleaseYear': ReleaseYear };



    $.ajax({
        url: GeteSeasonEpisode,
        type: "GET",
        dataType: 'Json',
        data: seriestreeepisodeinputparameters,
        async: false,
        cache: false,
        success: function (data) {
            IsSeasonSelected = true;
            seriesTreeViewModel = data;
            //            alert(seriesTreeViewModel.seriesvo.Selected_Season_Title)
            $('#TextNextEpi').val(seriesTreeViewModel.TextNextEpi);
            $('#NumberofUnlicencedEpisodes').val(seriesTreeViewModel.NumberofUnlicencedEpisodes);
            $('#FirstEpisodeNumber').val(seriesTreeViewModel.FirstEpisodeNumber);
            $('#TextPriFirEpi').val(seriesTreeViewModel.TextPriFirEpi);
            $('#TextPriOthEpi').val(seriesTreeViewModel.TextPriOthEpi);
            $('#TextDuration').val(seriesTreeViewModel.TextDuration);
            $('#TextSportType').val(seriesTreeViewModel.TextSportType);
            $('#TextSubGenre').val(seriesTreeViewModel.TextSubGenre);
            $('#TextEventType').val(seriesTreeViewModel.TextEventType);

            seriestreedataview = new Slick.Data.DataView();
            seriestreeepisodegrid = new Slick.Grid("#episodegrid", seriestreedataview, seriestreeepisodecolumns, seriestreepopupoptions);
            seriestreeepisodegrid.setSelectionModel(new Slick.RowSelectionModel());

            if ($('#DMVo_Status').val() == "EXECUTED") {
                seriestreeepisodegrid.setColumns(seriestreeafterdmexcutioncolumns);
            }
            else {
                seriestreeepisodegrid.setColumns(seriestreeepisodevisiblecolumns);
            }
            seriestreeepisodegrid.onClick.subscribe(function (e, args) {

            });
            seriestreeepisodegrid.onHeaderClick.subscribe(function (e, args) {
            });
            seriestreeepisodegrid.onSelectedRowsChanged.subscribe(function (e, args) {

            });
            seriestreeepisodegrid.onSort.subscribe(function (e, args) {
                Remove_Addrow();
                SortGrid(args, seriestreedataview);
                Create_Addrow();
                seriestreeepisodegrid.setActiveCell(0, 0);
                seriestreeepisodegrid.editActiveCell();
            });

            FilterGrid(seriestreeepisodegrid, seriestreedataview);


            seriestreeepisodegrid.onKeyDown.subscribe(function (e, args) {
                var cell = seriestreeepisodegrid.getCellFromEvent(e);
                var griddt = seriesTreeViewModel.dMEpisodeDetails;
                if (e.shiftKey && e.keyCode == 117) {                  //            shift+F6
                    // alert('Eveent Detected');

                    seriestreeepisodegrid.invalidateRow(griddt.length);
                    deletedItem = griddt[cell.row]
                    griddt.splice([cell.row], 1);
                    AddToBasketSeriesTree(deletedItem, "Delete");
                    seriestreeepisodegrid.setData(griddt);
                    seriestreeepisodegrid.render();

                }


            });


            seriestreeepisodegrid.onCellChange.subscribe(function (e, args) {

                if (typeof (args.item.SequenceEpisodeno) == 'undefined') {
                    AddToBasketSeriesTree(args.item, "New");
                }
                else {
                    AddToBasketSeriesTree(args.item, "Edit");
                }


            });


            seriestreeepisodegrid.init();
            seriestreedataview.beginUpdate();
            seriestreedataview.setItems(seriesTreeViewModel.dMEpisodeDetails, "SequenceEpisodeno");
            seriestreedataview.setFilter(filter);
            seriestreedataview.refresh();
            seriestreedataview.endUpdate();


            showMessage("Transaction Completed Successfully", "information");
        },
        error: function () { }
    });           //ende of ajax

}


function Remove_Addrow() {
    seriestreedataview.deleteItem("new row");
}

function Create_Addrow() {
    var item = { "SequenceEpisodeno": "new row", EpisodeTitle: "Click here to add a new row" };
    seriestreedataview.insertItem(0, item);
}

$(function () {



    shortcut.add("F9", function () {
        if ($("#TextSportType").is(":focus")) {
            OpenSportTypeLookup();
        }

        if ($("#TextEventType").is(":focus")) {
            OpenEventTypeLookup();
        }

        if ($("#TextSubGenre").is(":focus")) {
            OpenSubGenreLookup();
        }

    });



});
function OpenSportTypeLookup() {
    var lookupInvokerControl = "SportTypeLOV";
    var actionParameters = { Genre: $("#TextSportType").val() };
    var columns = [
                                    { id: "SportTypeValue", width: 900, name: "SportType Value", field: "SportTypeValue", sortable: true },
                                    { id: "SportTypeDescription", width: 900, name: "SportType Description", field: "SportTypeDescription", sortable: true }
                              ];



    idfield = "SportTypeValue";

    var Lookuptitle = "Sport Type (Genre) ";
    //$(lookupInvokerControl).dialog("open");
    //ShowLookup(lookupInvokerControl, GenreactionUrl, actionParameters, columns, options, idfield, gridwidth, gridheight, Lookuptitle);
    ShowCommonLookup(SportTypeactionUrl, actionParameters, columns, lookupInvokerControl, idfield, Lookuptitle, null);
};
function OpenEventTypeLookup() {

    var lookupInvokerControl = "EventTypeLOV";
    idfield = "CodeValue";
    var actioParameters = { "eventstring": $("#TextEventType").val() }
    var popupcolumns = [
                                    { id: "CodeValue", width: 900, name: "Code Value", field: "CodeValue" },
                                    { id: "CodeDescription", width: 900, name: "Code Description", field: "CodeDescription" }
                        ];
    ShowCommonLookup(GetEventLOVListactionurl, actioParameters, popupcolumns, lookupInvokerControl, idfield, "Event Type", null);
};

function OpenSubGenreLookup() {

    var lookupInvokerControl = "SubGenreLOV";
    idfield = "SubGenreCodeValue";
    var actioParameters = { "subGenre": $("#TextSubGenre").val() }
    var popupcolumns = [
                                    { id: "SubGenreCodeValue", width: 900, name: "Sub Genre Code Value", field: "SubGenreCodeValue" },
                                    { id: "SubGenreCodeDescription", width: 900, name: "Sub Genre Code Description", field: "SubGenreCodeDescription" }
                              ];
    ShowCommonLookup(GetSubGenreLOVactionurl, actioParameters, popupcolumns, lookupInvokerControl, idfield, "SubGenre Type", null);
};

var SelectedRowData;
//function SetLookupDataToInvoker(SelectedRowData, lookupInvokerControl) {
//    //alert('Comes');
//    if (lookupInvokerControl == "SportTypeLOV") {
//        $("#TextSportType").val(SelectedRowData[idfield]);
//        $(lookupInvokerControl).focus();
//    }
//    if (lookupInvokerControl == "SubGenreLOV") {
//        $("#TextSubGenre").val(SelectedRowData[idfield]);
//        $(lookupInvokerControl).focus();
//    } if (lookupInvokerControl == "EventTypeLOV") {
//        $("#TextEventType").val(SelectedRowData[idfield]);
//        $(lookupInvokerControl).focus();
//    }
//}


function AddToBasketSeriesTree(item, status) {
    if (UpDataSeriesTree.length == 0) {
        if (status == "Edit") {
            item1 = { "gridstatus": status };
            $.extend(item, item1);
            UpDataSeriesTree.push(item);
        }
        else if (status == "New") {
            item1 = { "gridstatus": status };
            $.extend(item, item1);
            UpDataSeriesTree.push(item);
        }
        else if (status == "Delete") {
            item1 = { "gridstatus": status };
            $.extend(item, item1);
            UpDataSeriesTree.push(item);
        }
        else {
            alert("Define Mode New/Edit");
        }
    }
    else {
        for (var i = 0; i < UpDataSeriesTree.length; i++) {
            if (UpDataSeriesTree[i]["SequenceEpisodeno"] == item["SequenceEpisodeno"]) {
                UpDataSeriesTree.splice(i, 1);
            }
        }
        item1 = { "gridstatus": status };
        $.extend(item, item1);
        UpDataSeriesTree.push(item);
    }
};
function Save_EpisodeDetails() {
    $.noty.closeAll();
   // debugger;

    $.noty.closeAll();
    var tempseriesTreeViewModel = seriesTreeViewModel;
    tempseriesTreeViewModel.dMEpisodeDetails = UpDataSeriesTree;
    tempseriesTreeViewModel.Id = GlobalId;
    tempseriesTreeViewModel.seriesvo = null;
    tempseriesTreeViewModel.TextPriFirEpi = $("#TextPriFirEpi").val();
    tempseriesTreeViewModel.TextPriOthEpi = $("#TextPriOthEpi").val();
    tempseriesTreeViewModel.SeasonTitle = seriestreeepisodeinputparameters.season;
    var dataToSend = JSON.stringify(tempseriesTreeViewModel);
    $.ajax({
        url: SaveEpisodeDetailsUrl,
        data: dataToSend,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        type: "POST",
        async: false,
        cache: false,
        success: function (data) {
            UpDataSeriesTree.splice(0, UpDataSeriesTree.length);
            tempseriesTreeViewModel = null;
            if (data.ErrorMessage.length > 0) {
                showMessage(data.ErrorMessage[0], "information");
            }
            else {
                var selectedRow = gridProgrammeParticulars.getSelectedRows();
                if (selectedRow != null) {
                    var SelectedData = ProgrammeParticulargridData[selectedRow];
                    if (SelectedData != undefined && SelectedData != null) {
                        SelectedData.Title = data.NewTitle;
                        SelectedData.RefNo = data.NewRefNo;
                        SelectedData.SportType_Genre = data.NewsportTypeGenre;
                        SelectedData.SubGenre = data.NewsubGenre;
                        SelectedData.EventType = data.NeweventType;
                        SelectedData.Duration = data.NewDuration;
                        SelectedData.SeriesTitle = data.NewSeriesTitle;
                        if (SelectedData.PersistFlag == 3) {
                            SelectedData.PersistFlag = parseInt("1");
                        }

                        if (SelectedData.Id != 0) {
                            if (ProgrammeVOModifiedData != null) {
                                for (var i = 0; i < ProgrammeVOModifiedData.length; i++) {
                                    if (ProgrammeVOModifiedData[i].Id == SelectedData.Id) {
                                        ProgrammeVOModifiedData[i].PersistFlag = SelectedData.PersistFlag;
                                        ProgrammeVOModifiedData[i].Title = data.NewTitle;
                                        ProgrammeVOModifiedData[i].RefNo = data.NewRefNo;
                                        ProgrammeVOModifiedData[i].SportType_Genre = data.NewsportTypeGenre;
                                        ProgrammeVOModifiedData[i].SubGenre = data.NewsubGenre;
                                        ProgrammeVOModifiedData[i].EventType = data.NeweventType;
                                        ProgrammeVOModifiedData[i].Duration = data.NewDuration;
                                        ProgrammeVOModifiedData[i].SeriesTitle = data.NewSeriesTitle;
                                    }
                                }
                            }
                        }

                        gridProgrammeParticulars.setData(ProgrammeParticulargridData);
                        gridProgrammeParticulars.render();
                    }
                }

                $("#SeriesTreeDiv").dialog("close");
                showMessage("Transaction Completed Successfully", "information");
            }


        },
        error: function () {

            showMessage("Some Error Occured", "error");
        }
    });
    
};
function ChkAddTextclick(checkvalue) {
    if (checkvalue.checked) {
        $('#lblAddText').css("visibility", "visible");
        $('#txtAddText').css("visibility", "visible");
    }
    else {
        $('#lblAddText').css("visibility", "collapse");
        $('#txtAddText').css("visibility", "collapse");
    }

};
function ChkWTAddTextclick(checkvalue) {
    if (checkvalue.checked) {
        $('#lblWTAddText').css("visibility", "visible");
        $('#txtWTAddText').css("visibility", "visible");
    }
    else {
        $('#lblWTAddText').css("visibility", "collapse");
        $('#txtWTAddText').css("visibility", "collapse");
    }

};
function TextPriFirEpifocuslost() {
    //alert('Detected');
    try {
        var totalprice = seriesTreeViewModel.seriesvo.DMProgrammme_Price;
        var firstpriceintextbox = $('#TextPriFirEpi').val();
        var otherepisodeprice = Number(totalprice) - Number(firstpriceintextbox);
        $('#TextPriOthEpi').val(otherepisodeprice);
    }
    catch (exception) {
        showMessage("Invalid First Episode Price", "error");
    };

};

function TextRelicence_Tofocuslost() {
    if ($('#TextRelicence_To').val() != "") {
        $('#btnSeriesTreeGenerate').prop("disabled", true);
        $('#btnSeriesTreeGenerate').removeClass('inputButton').addClass('inputButtonDisable');
    }

}
function TextRelicence_Fromfocuslost() {
    if ($('#TextRelicence_From').val() != "") {
        $('#btnSeriesTreeGenerate').prop("disabled", true);
        $('#btnSeriesTreeGenerate').removeClass('inputButton').addClass('inputButtonDisable');
    }
}