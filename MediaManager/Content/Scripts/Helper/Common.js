
function DisplayAppMessages(data) {
    $.noty.closeAll();
        if (data != null) {
            var errorMessage = "";
            var informationMessage = "";
            var warningMessage = "";
            for (var index = 0; index < data.length; index++) {
                if (data[index].Type == 0) {
                    if (informationMessage == "")
                        informationMessage = data[index].Message;
                    else
                        informationMessage = informationMessage + "<br/>" + data[index].Message;
                }
                else if (data[index].Type == 1) {
                    if (warningMessage == "")
                        warningMessage = data[index].Message;
                    else
                        warningMessage = warningMessage + "<br/>" + data[index].Message;
                }
                else if (data[index].Type == 2) {
                    if (errorMessage == "")
                        errorMessage = data[index].Message;
                    else
                        errorMessage = errorMessage + "<br/>" + data[index].Message;
                }
            }
             setTimeout(function () {
                if (informationMessage != "") {
                    ShowNotyPannel(informationMessage, 'information');
                }
                if (warningMessage != "") {
                    ShowNotyPannel(warningMessage, 'warning');
                }
                if (errorMessage != "") {
                    ShowNotyPannel(errorMessage, 'error');
                }
            }, 400);  
        }
    };

    function ShowNotyPannel(message, type) {
        noty({ text: message, type: type, dismissQueue: false,
            layout: 'bottom', theme: 'defaultTheme'
        });
    };

    function showMessage(message, messagetype) {
        $.noty.closeAll();
//        if (messagetype = "information")
//            infoMessage = message;
//        else
//            errorMessage = message;

        if ((message != "")) {
            setTimeout(function () {
                noty({ text: message, type: messagetype, dismissQueue: false,
                    layout: 'bottom', theme: 'defaultTheme'
                });
            }, 400);               
        }
    }

    function clearErrorMessages() {
        infoMessage = "";
        errorMessage = "";
        if (errorMessagePanel != null && errorMessagePanel != undefined)
            errorMessagePanel.close();
    }

    function clearAllMessages()
    {

    
            //$(".noty_message").fadeOut(20, "swing");
        $.noty.closeAll();
    }


    function GetGridComboBox(SelectedUrl) {
    var ComboMarkup;
    //Start of ajax call.
    $.ajax({
        type: "GET",
        url: SelectedUrl,
        data: "{}",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            ComboMarkup = "<option label='--Select One--' value='-1' selected='selected'>--Select One--</option>";
            $.each(data, function (index, item) {
                ComboMarkup += "<option label='" + item.Val + "' value='" + item.ID + "'>" + item.Val + "</option>";
            })
            //End of ajax call.   
            ComboMarkup = "<SELECT tabIndex='0' class='editor-yesno'>" + ComboMarkup + "</SELECT>";

        }
    });

    return ComboMarkup;
}

function GetTodayDate() {
   var tdate = new Date();
   var dd = tdate.getDate(); //yeilds day
   var MM = tdate.getMonth(); //yeilds month
   var yyyy = tdate.getFullYear(); //yeilds year
   var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
   tdate = (dd<10 ? '0' : '') + dd + "-" +monthNames[MM] + "-" + yyyy;

   return tdate;


}

function IsValidDate(str) {
    str = str.replace(/\//g, '-');
    str = str.toLowerCase();
    var matchArray = str.match(/^(([0-9])|([0-2][0-9])|([3][0-1]))\-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\-\d{4}$/);
    var dateArray = "";
    if (matchArray != null) {
        //str = str.replace(/\-/g, '/');
        dateArray = str.split('-');
        if (dateArray != null) {
            month = dateArray[1]; // p@rse date into variables
            day = dateArray[0];
            year = dateArray[2];
            if (day < 1 || day > 31) {
                //alert("Day must be between 1 and 31.");
                return false;
            }
            if (month != null) {
                month = month.toLowerCase();
                if ((month == "apr" || month == "jun" || month == "sep" || month == "nov") && day == 31) {
                    //alert("Month " + month + " doesn`t have 31 days!")
                    return false;
                }

                if (month == "feb") { // check for february 29th
                    var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
                    if (day > 29 || (day == 29 && !isleap)) {
                        //alert("February " + year + " doesn`t have " + day + " days!");
                        return false;
                    }
                }
            }
        }
    }
    return (matchArray) ? new Date(str.replace(/\-/g, '/')) : null;
}

function GetDateWithMonthInNumber(date) {
    date = date.replace(/\-/g, '/');
    var dateArray = date.split('/');
    var month = 0;
    var convertedDate = "";
    if ((dateArray != null) && dateArray.length == 3) {
        var monthInWord = dateArray[1].toLowerCase();
        if (monthInWord == "jan")
            month = 1;
        else if (monthInWord == "feb")
            month = 2;
        else if (monthInWord == "mar")
            month = 3;
        else if (monthInWord == "apr")
            month = 4;
        else if (monthInWord == "may")
            month = 5;
        else if (monthInWord == "jun")
            month = 6;
        else if (monthInWord == "jul")
            month = 7;
        else if (monthInWord == "aug")
            month = 8;
        else if (monthInWord == "sep")
            month = 9;
        else if (monthInWord == "oct")
            month = 10;
        else if (monthInWord == "nov")
            month = 11;
        else if (monthInWord == "dec")
            month = 12;

        convertedDate = dateArray[0] + "/" + month + "/" + dateArray[2];
    }
    return convertedDate;
};