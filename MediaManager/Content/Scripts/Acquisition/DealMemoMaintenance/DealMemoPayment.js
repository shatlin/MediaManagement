var emptyrow = [];
var cellvalue;
var selrow;
var gitems;
var Paymenttotalrecord = [];
var SplitPaymenttotalrecord = [];
var selectedrow;
var paymentGrid;
var splitPaymentGrid = [];
var monthNumber;
var copiedRow=[];
var gridwidth;
var PayCodeList = [];
var cellNo;
var zero = 0;
var hundred = 100;
var gridContainerDivPayment = "#PaymentGrid";
var gridContainerDivsplitPayment = "#SplitPaymentGrid";

var SplitPaymentGridData = [];
var PaymentGridData = [];

var paymentcolumns = [
    { id: "SortOrder", name: "Order", field: "SortOrder", editor: Slick.Editors.Text, validator: OrderValidator },
    { id: "MonthNumber", name: "Payment Month No", field: "MonthNumber", editor: Slick.Editors.Text, validator: MonthNumberValidator },
    { id: "PaymentPercent", name: "Percent Payment", field: "PaymentPercent", editor: Slick.Editors.Text, validator: PercentValidator },
    { id: "Amount", name: "Amount", field: "Amount", editor: Slick.Editors.Text, validator: AmountValidator },
    { id: "PaymentCode", name: "Payment Code", field: "PaymentCode", editor: Slick.Editors.Text, headerCssClass: "HeaderLovImage", validator: PaymentCodeValidator }, 
    { id: "DueDateDMPayment", name: "Due Date", field: "DueDateDMPayment", editor: Slick.Editors.Date},
    { id: "Comments", name: "Comments", field: "Comments", editor: Slick.Editors.LongText}
  ];

var pcolumns = [
    { id: "Id", name: "Id", field: "Id" },
    { id: "SortOrder", name: "Order", field: "SortOrder" },
    { id: "MonthNumber", name: "Payment Month No", field: "MonthNumber" },
    { id: "PaymentPercent", name: "Percent Payment", field: "PaymentPercent" },
    { id: "Amount", name: "Amount", field: "Amount" },
    { id: "PaymentCode", name: "Payment Code", field: "PaymentCode" },
    { id: "DueDateDMPayment", name: "Due Date", field: "DueDateDMPayment" },
    { id: "Comments", name: "Comments", field: "Comments" },
     { id: "UpdateCount", name: "Update Count", field: "UpdateCount" },
    { id: "PersistFlag", name: "Status", field: "PersistFlag" }
  ];

var splitpaymentcolumns = [
    { id: "SortOrder", name: "Order", field: "SortOrder", editor: Slick.Editors.Text, validator: SplitOrderValidator },
    {id: "MonthNumber", name: "Split Month No", field: "MonthNumber", editor: Slick.Editors.Text,   validator: SplitMonthValidator },
    { id: "PaymentPercent", name: "Percent Payment", field: "PaymentPercent", editor: Slick.Editors.Text, validator: SplitPercentValidator },
    { id: "Comment", name: "Comments", field: "Comment", editor: Slick.Editors.LongText  }
  ];

var spcolumns = [
    { id: "Id", name: "Id", field: "Id" },
    { id: "SortOrder", name: "Order", field: "SortOrder" },
    { id: "MonthNumber", name: "Split Month No", field: "MonthNumber" },
    { id: "PaymentPercent", name: "Percent Payment", field: "PaymentPercent" },
    { id: "Comment", name: "Comments", field: "Comment" },
     { id: "UpdateCount", name: "Update Count", field: "UpdateCount" },
    { id: "PersistFlag", name: "Status", field: "PersistFlag" }
  ];

var splitpaymentcolumns_noneditable = [
    { id: "SortOrder", name: "Order", field: "SortOrder", selectable: false, sortable: false, behavior: "select", cannotTriggerInsert: true },
    { id: "MonthNumber", name: "Split Month No", field: "MonthNumber", selectable: false, sortable: false, behavior: "select", cannotTriggerInsert: true },
    { id: "PaymentPercent", name: "Percent Payment", field: "PaymentPercent", selectable: false, sortable: false, behavior: "select", cannotTriggerInsert: true },
    { id: "Comment", name: "Comments", field: "Comment", selectable: false, sortable: false, behavior: "select", cannotTriggerInsert: true },
  ];
    
var poptions = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    editable: true,
    autoedit:true,
    forceFitColumns: true,
    enableAddRow: true
};


//Validator methods (Split Payment)
//=================================

function SplitOrderValidator(value) {
    if (isNaN(value)) {
        return { valid: false, msg: "Please enter a valid integer" };
    }
    else {
        if (value == null || value == undefined || !value.length) {
            return { valid: false, msg: "Order Number is Required" };
        }
        else {
            var sortOrder = value;
            if (value == 0) {
                return { valid: false, msg: "Order should not be Zero" };
            }
            var sdata = splitPaymentGrid.getData();
            var duplicate = 0;
            if (sdata != null) {
                for (var i = 0; i < sdata.length; i++) {
                    if (sdata[i].SortOrder == sortOrder)
                        duplicate += 1;
                }
            }
         
            if (duplicate == 1) {
                return { valid: false, msg: "Order must be unique" };
            }
            else {
                $.noty.closeAll();
                return { valid: true, msg: null };
            }
        }
    }
}

function SplitMonthValidator(value) {
    var sdata = splitPaymentGrid.getData();
    if (isNaN(value)) {
        return { valid: false, msg: "Please enter a valid integer" };
    }
    else {
        if (value == null || value == undefined || !value.length)
            return { valid: false, msg: "Month Number is Required" };
        else {
            if (value <= 0)
                return { valid: false, msg: "Split Month Number should be greater than Zero" };
            if (parseInt(value) < parseInt(monthNumber))
                return { valid: false, msg: "Split Month Number cannot be less than Payment Month Number" };
        }
        if (sdata[selrow].Id != null)
            AddtoSplitPayments(sdata[selrow], "Modified");            
        else
            AddtoSplitPayments(sdata[selrow], "Added");

        return { valid: true, msg: null };
    }
}

function SplitPercentValidator(value) {
    var amt = $("#DMVo_MemoPrice").val();
    var sdata = splitPaymentGrid.getData();
    if (sdata[selrow] == null) {
        $.noty.closeAll();
        showMessage("Order is Required", "error");
        splitPaymentGrid.setActiveCell(selrow, 0);
        splitPaymentGrid.editActiveCell();
    }
    else {
        if (isNaN(value)) {
            return { valid: false, msg: "Please enter a valid number" };
        }
        else
            if (value == null || value == undefined || !value.length)
                return { valid: false, msg: "Percentage is Required" };
            else
                if (value < 0)
                    return { valid: false, msg: "Percentage should be greater than Zero" };
                else
                    if (value > 100)
                        return { valid: false, msg: "Percentage should be less than 100" };
                    else {
                        var payperc = value;
                        if (payperc <= 100) {
                            var tbPerc = 0, tmp1 = 0;
                            //                            sdata[selrow].PaymentPercent =  parseFloat(payperc).toFixed(4);
                            sdata[selrow].PaymentPercent = parseFloat(payperc).toFixed(4); 
                            for (var i = 0; i < sdata.length; i++) {
                                if (sdata[i].PaymentPercent != null) {
                                    tmp1 = sdata[i].PaymentPercent;
                                    tbPerc = parseFloat(tbPerc) + parseFloat(tmp1);
                                }
                            }
                            //                            $("#tbSplitPayPercent").val( parseFloat(tbPerc).toFixed(4));
                            $("#tbSplitPayPercent").val(parseFloat(tbPerc).toFixed(4));

                        }
                    }
        if ($("#tbSplitPayPercent").val() > 100) {
            return { valid: false, msg: "Total payment percent cannot be greater than 100" };
        }
        splitPaymentGrid.setData(sdata);
        splitPaymentGrid.render();
        splitPaymentGrid.setActiveCell(0, 3);
        splitPaymentGrid.setActiveCell(selrow, 2);
        splitPaymentGrid.editActiveCell();
        $.noty.closeAll();
        if (sdata[selrow].Id != null)
            AddtoSplitPayments(sdata[selrow], "Modified");
        else
            AddtoSplitPayments(sdata[selrow], "Added");

        return { valid: true, msg: null };
    }
}

//=================================

//Validator methods (Payment)
//=================================

function OrderValidator(value) {
    if (isNaN(value)) {
        return { valid: false, msg: "Please enter a valid integer" };
    }
    else {
        if (value == null || value == undefined || !value.length) {
            return { valid: false, msg: "Order Number is Required" };
        }
        else {
            var sortOrder = value;
            if (value == 0) {
                return { valid: false, msg: "Order should not be Zero" };
            }
            var pdata = paymentGrid.getData();
            var duplicate = 0;
            if (pdata!= null) {
                for (var i = 0; i < pdata.length; i++) {
                    if (pdata[i].SortOrder == sortOrder)
                        duplicate += 1;
                }
            }
            if (duplicate == 1) {
                return { valid: false, msg: "Order must be unique" };
            }
            else{
                $.noty.closeAll();
                return { valid: true, msg: null };
                }
        }
    }
   
}

function MonthNumberValidator(value) {

    if (isNaN(value)) {
        return { valid: false, msg: "Please enter a valid integer" };
    }
    else {
        if (value == null || value == undefined || !value.length)
            return { valid: false, msg: "Month Number is Required" };
        else {
            if (value <= 0)
                return { valid: false, msg: "Month Number should be greater than Zero" };
            else {
                return { valid: true, msg: null };
            }
        }
    }
}

function PercentValidator(value) {
    var amt = $("#DMVo_MemoPrice").val();
    var pdata = paymentGrid.getData();
    if (pdata[selrow] == null) {
        $.noty.closeAll();
        showMessage("Order is Required", "error");
        paymentGrid.setActiveCell(selrow, 1);
        paymentGrid.setActiveCell(selrow, 0);
        paymentGrid.editActiveCell();
    }
    else {
        if (isNaN(value)) {
            return { valid: false, msg: "Please enter a valid number" };
        }
        else
            if (value == null || value == undefined || !value.length)
                return { valid: false, msg: "Percentage is Required" };
            else
                if (value < 0)
                    return { valid: false, msg: "Percentage should be greater than Zero" };
                else
                    if (value > 100)
                        return { valid: false, msg: "Percentage should be less than 100" };
                    else {
                        if (amt > 0) {
                            var payperc = value;
                            var payamt = (amt * payperc) / 100;
                            var tbPerc = 0, tbAmt = 0, tmp1 = 0, tmp2 = 0;

                            pdata[selrow].PaymentPercent = parseFloat(payperc).toFixed(4);
//                            pdata[selrow].Amount = CommaSeperator(parseFloat(payamt).toFixed(4));
                            pdata[selrow].Amount = parseFloat(payamt).toFixed(4); 
                            for (var i = 0; i < pdata.length; i++) {
                                if ((pdata[i].PaymentPercent != null) || (pdata[i].Amount != null)) {
                                    tmp1 = pdata[i].PaymentPercent;
                                    tmp2 = pdata[i].Amount;
                                    tbPerc = parseFloat(tbPerc) + parseFloat(tmp1);
//                                    tbAmt = removeCommas(tbAmt);
//                                    tmp2 = removeCommas(tmp2);
                                    tbAmt = parseFloat(tbAmt) + parseFloat(tmp2);
                                }
                            }
                            $("#tbPayPercent").val(parseFloat(tbPerc).toFixed(4)); 

                            if ($("#TypeComboSelection").val() == "ROY") {
                                var sdata = splitPaymentGrid.getData();
                                if (sdata.length > 0 && pdata[selrow].PaymentPercent != 100) {
                                    noty({
                                        text: 'As Payment Percent Modified, Do you want to modified its Split Payments?',
                                        modal: false,
                                        type: 'alert',
                                        buttons: [{
                                            addClass: 'inputButton', text: 'Yes', onClick: function ($noty) {
                                                $noty.close();
                                                for (var i = 0; i < sdata.length; i++) {
                                                    AddtoSplitPayments(sdata[i], "Deleted");
                                                }
                                                sdata.length = 0;
                                                splitPaymentGrid.updateRowCount();
                                                splitPaymentGrid.render();
                                                $("#tbSplitPayPercent").val( parseFloat(zero).toFixed(4));

                                            }
                                        },
                                                                    {
                                                                        addClass: 'inputButton', text: 'No', onClick: function ($noty) {
                                                                            $noty.close();
                                                                            pdata[selrow].PaymentPercent = parseFloat(hundred).toFixed(4);
                                                                            paymentGrid.setData(pdata);
                                                                            paymentGrid.render();
                                                                            paymentGrid.setActiveCell(0, 1);
                                                                            paymentGrid.setActiveCell(selrow, 4);
                                                                            $("#tbPayPercent").val(parseFloat(hundred).toFixed(4));
                                                                            setOptions(pdata);
                                                                        }
                                                                    }
                                                                            ]
                                    });
                                }
                                pdata[selrow].Amount = parseFloat(zero).toFixed(4);
                                $("#tbPayAmount").val(parseFloat(zero).toFixed(4));
                                setOptions(pdata);
                            }
                            else {
//                                $("#tbPayAmount").val(CommaSeperator(parseFloat(tbAmt).toFixed(4)));
                                $("#tbPayAmount").val(parseFloat(tbAmt).toFixed(4));

                            }
                            if ($("#tbPayPercent").val() > 100) {
                                return { valid: false, msg: "The total scheduled payments  cannot be more than the total deal price" };
                            }
                        }
                        else {
                                                        $("#tbPayAmount").val(parseFloat(zero).toFixed(4));
                                                        pdata[selrow].PaymentPercent = parseFloat(value).toFixed(4);
                                                        pdata[selrow].Amount = parseFloat(zero).toFixed(4);

                        }
                    }
        paymentGrid.setData(pdata);
        paymentGrid.render();
        paymentGrid.setActiveCell(0, 3);
        paymentGrid.setActiveCell(selrow, 2);
        paymentGrid.editActiveCell();

        $.noty.closeAll();
        if (pdata[selrow].Id != null)
            AddtoPayments(pdata[selrow], "Modified");
        else
            AddtoPayments(pdata[selrow], "Added");
        return { valid: true, msg: null };
    }
}

function AmountValidator(value) {
    var payamt = value;
    var amt = $("#DMVo_MemoPrice").val();
    var pdata = paymentGrid.getData();

    if (pdata[selrow] == null) {
        $.noty.closeAll();
        showMessage("Order is Required", "error");
        paymentGrid.setActiveCell(selrow, 0);
        paymentGrid.editActiveCell();
    }
    else {
        if (isNaN(value)) {
            return { valid: false, msg: "Please enter a valid number" };
        }
        if (payamt == 0) {
            pdata[selrow].PaymentPercent = parseFloat(hundred).toFixed(4);
            pdata[selrow].Amount = parseFloat(zero).toFixed(4);
        }
        else {

            if (parseFloat(payamt) <= parseFloat(amt)) {
                var payperc;
                var tbPerc = 0, tbAmt = 0, tmp1 = 0, tmp2 = 0;

                if (amt != 0)
                    payperc = (payamt * 100) / amt;
                else
                    payperc = 0;

                pdata[selrow].PaymentPercent = parseFloat(payperc).toFixed(4);

//                pdata[selrow].Amount = CommaSeperator(parseFloat(payamt).toFixed(4));
                pdata[selrow].Amount = parseFloat(payamt).toFixed(4); 

                for (var i = 0; i < pdata.length; i++) {
                    if ((pdata[i].PaymentPercent != null) || (pdata[i].Amount != null)) {
                        tmp1 = payperc;
                        tmp2 = pdata[i].Amount;
                        tbPerc = parseFloat(tbPerc) + parseFloat(tmp1);
                        tbAmt = parseFloat(tbAmt) + parseFloat(tmp2);
                    }
                }
                $("#tbPayPercent").val(parseFloat(tbPerc).toFixed(4));

//                $("#tbPayAmount").val(CommaSeperator(parseFloat(tbAmt).toFixed(4)));
                $("#tbPayAmount").val(parseFloat(tbAmt).toFixed(4));


                if ($("#tbPayAmount").val() > $("#DMVo_MemoPrice").val())
                    return { valid: false, msg: "Payment amount cannot be greater than Memo Price" };
            }
            else {
                return { valid: false, msg: "Payment amount cannot be greater than Memo Price" };
            }
        }


        if ($("#TypeComboSelection").val() == "ROY") {
            pdata[selrow].Amount = parseFloat(zero).toFixed(4);
        }
        paymentGrid.setData(pdata);
        paymentGrid.render();
        paymentGrid.setActiveCell(0, 4);
        paymentGrid.setActiveCell(selrow, 3);
        paymentGrid.editActiveCell();

        $.noty.closeAll();
        if (pdata[selrow].Id != null)
            AddtoPayments(pdata[selrow], "Modified");
        else
            AddtoPayments(pdata[selrow], "Added");
        return { valid: true, msg: null };
    }
}
 
  
function PaymentCodeValidator(value) {

    var pdata = paymentGrid.getData();

    if (pdata[selrow] == null) {
        $.noty.closeAll();
        showMessage("Order is Required", "error");
        paymentGrid.setActiveCell(selrow, 0);
        paymentGrid.editActiveCell();
    }
    else {
        if (pdata[selrow].SortOrder != null) {
            if ((pdata[selrow].PaymentPercent == null) || (pdata[selrow].Amount == null)) {
                $.noty.closeAll();
                showMessage("Payment Percent or Amount is Required", "error");
                paymentGrid.setActiveCell(selrow, 2);
                paymentGrid.editActiveCell();
            }
            else {
                if (value == null || value == undefined || !value.length)
                    return { valid: false, msg: "Payment Code is Required" };
                else {
                    var paycode;
                    paycode = value.toUpperCase();

                    if (PayCodeList.length > 0) {
                        var stat = 0;
                        for (var i = 0; i < PayCodeList.length; i++) {
                            if (paycode == PayCodeList[i].PatCode) {
                                stat = 1;
                                if (pdata[selrow] == null) {
                                    var item = { "PaymentCode": paycode };
                                    pdata.push(item);
                                }
                                else {
                                    pdata[selrow].PaymentCode = paycode;
                                }
                                paymentGrid.setData(pdata);
                                paymentGrid.render();
                                paymentGrid.setActiveCell(0, 3);
                                paymentGrid.setActiveCell(selrow, 4);
                                paymentGrid.editActiveCell();
                            }
                        }
                        if (stat == 0) {
                            return { valid: false, msg: "Invalid Payment Code" };
                        }
                        else {
                            if (pdata[selrow].Id != null)
                                AddtoPayments(pdata[selrow], "Modified");
                            else
                                AddtoPayments(pdata[selrow], "Added");
                            $.noty.closeAll();
                            return { valid: true, msg: null };
                        }
                    }
                }
            }
        }
    }
}
//=================================

function setOptions(pdata) {
    if ($("#tbPayPercent").val() == 100 && pdata.length == 1) {
        var pdata = paymentGrid.getData();
        splitPaymentGrid.setColumns(splitpaymentcolumns);
        monthNumber = pdata[0].MonthNumber;
    }
    else {
        splitPaymentGrid.setColumns(splitpaymentcolumns_noneditable);
    }
}

function GetAllPaymentCodes() {
    $.ajax({
        url: GetPaymentCodeLOVListactionurl,
        type: "GET",
        dataType: 'Json',
        data: PayCodeList,
        async: false,
        cache: false,
        success: function (data) {
            PayCodeList = data;
        }
    });
}

function BindtoPayment(PaymentGridData) {
  var amt = $("#DMVo_MemoPrice").val();
    var payamt = 0, payperc = 0;
    for (var i = 0; i < PaymentGridData.length; i++) {
        payperc = parseFloat(payperc) + parseFloat(PaymentGridData[i].PaymentPercent);
        payamt = parseFloat(payamt) + parseFloat(PaymentGridData[i].Amount);
        PaymentGridData[i].PaymentPercent = parseFloat(PaymentGridData[i].PaymentPercent ).toFixed(4);
        PaymentGridData[i].Amount = parseFloat(PaymentGridData[i].Amount).toFixed(4);
//        PaymentGridData[i].Amount = CommaSeperator(parseFloat(PaymentGridData[i].Amount).toFixed(4));

    }

    gridwidth = $("#PaymentGrid").width();
    $("#PaymentGrid").css({ "width": gridwidth + "px" });

    paymentGrid = new Slick.Grid("#PaymentGrid", PaymentGridData, pcolumns, poptions);
    paymentGrid.setColumns(paymentcolumns);

    if (amt == 0) {   //&& ($("#TypeComboSelection").val() == "FLF")
        $("#tbPayPercent").val( parseFloat(hundred).toFixed(4));
        $("#tbPayAmount").val( parseFloat(zero).toFixed(4));
    }
    else {
        $("#tbPayPercent").val(  parseFloat(payperc).toFixed(4));
        $("#tbPayAmount").val(parseFloat(payamt).toFixed(4));
//        $("#tbPayAmount").val(CommaSeperator(parseFloat(payamt).toFixed(4)));

    }

    paymentGrid.setSelectionModel(new Slick.RowSelectionModel());
    paymentGrid.setSelectedRows([0, 0]);

    if (PaymentGridData.length > 0)
        setfooter(gridContainerDivPayment, 1, PaymentGridData.length);
    else
        setfooter(gridContainerDivPayment, 0, 0);

}

function BindtoSplitPayment(SplitPaymentGridData) {
    var spayperc = 0;
    for (var i = 0; i < SplitPaymentGridData.length; i++) {
        spayperc = parseFloat(spayperc) + parseFloat(SplitPaymentGridData[i].PaymentPercent);
        SplitPaymentGridData[i].PaymentPercent =  parseFloat(SplitPaymentGridData[i].PaymentPercent ).toFixed(4);
//        SplitPaymentGridData[i].PaymentPercent = formatprice(SplitPaymentGridData[i].PaymentPercent); 
    }

    $("#tbSplitPayPercent").val( parseFloat(spayperc).toFixed(4));

     gridwidth = $("#SplitPaymentGrid").width();
        $("#SplitPaymentGrid").css({ "width": gridwidth + "px" });

        splitPaymentGrid = new Slick.Grid("#SplitPaymentGrid", SplitPaymentGridData, spcolumns, poptions);
    splitPaymentGrid.setColumns(splitpaymentcolumns);
    splitPaymentGrid.setSelectionModel(new Slick.RowSelectionModel());
    //splitPaymentGrid.setSelectedRows([0, 0]);
    if (SplitPaymentGridData.length > 0)
        setfooter(gridContainerDivsplitPayment, 1, SplitPaymentGridData.length);
    else
        setfooter(gridContainerDivsplitPayment, 0, 0);
}

function loadPayments() {
  
    GetAllPaymentCodes();
    
      gridwidth = $("#SplitPaymentGrid").width();
        $("#SplitPaymentGrid").css({ "width": gridwidth + "px" });
        splitPaymentGrid = new Slick.Grid("#SplitPaymentGrid", emptyrow, spcolumns, poptions);
    splitPaymentGrid.setColumns(splitpaymentcolumns);

    splitPaymentGrid.setSelectionModel(new Slick.RowSelectionModel());
    //splitPaymentGrid.setSelectedRows([0, 0]);
    setfooter(gridContainerDivsplitPayment, 0, 0);


    $.ajax({
        url: GetPaymentactionurl,
        type: "GET",
        dataType: 'Json',
        data: { DMNumber: $("#DMVo_DMNumber").val() },
        async: false,
        cache: false,
        success: function (data) {
            //Payment grid 
            PaymentGridData = data;
            BindtoPayment(PaymentGridData);

            PaymentGridData = paymentGrid.getData()


            var mycolumns = paymentGrid.getColumns();

            if ($("#TypeComboSelection").val() == "ROY") {
                mycolumns[3] = { id: "Amount", name: "Amount", field: "Amount" };
                mycolumns[5] = { id: "DueDateDMPayment", name: "Due Date", field: "DueDateDMPayment" };

                //Split Payment grid 

                if (PaymentGridData.length > 0)
                    SplitPaymentGridData = PaymentGridData[0].SplitPaymentDetails;
                else
                    SplitPaymentGridData = emptyrow;

                BindtoSplitPayment(SplitPaymentGridData);

                setOptions(PaymentGridData);
            }

            else if ($("#TypeComboSelection").val() == "FLF") {
                mycolumns[1] = { id: "MonthNumber", name: "Payment Month No", field: "MonthNumber" };

                document.getElementById('divSplitPayment').setAttribute("style", "visibility:hidden");
                document.getElementById('SplitPaymentGrid').setAttribute("style", "width: 0px; height:0px");
                document.getElementById('PaymentGrid').setAttribute("style", "width:" + gridwidth + "px;" + "height:375px");
            }

            paymentGrid.setColumns(mycolumns);


            paymentGrid.onClick.subscribe(function (e, args) {
                clearAllMessages();
                selrow = args.row;
                PaymentGridData = paymentGrid.getData();
                if (PaymentGridData.length > 0)
                    setfooter(gridContainerDivPayment, args.row + 1, PaymentGridData.length);
                else
                    setfooter(gridContainerDivPayment, 0, 0);

                resetActiveGrids(selTab);

            });

            splitPaymentGrid.onClick.subscribe(function (e, args) {

                clearAllMessages();
                selrow = args.row;
                setfooter(gridContainerDivsplitPayment, args.row + 1, SplitPaymentGridData.length);
                resetActiveGrids(selTab);
                if (args.row == 0 && args.cell == 0) {
                    splitPaymentGrid.setActiveCell(0, 3);
                    splitPaymentGrid.setActiveCell(selrow, 0);
                    splitPaymentGrid.editActiveCell();
                }
            });

            paymentGrid.onKeyDown.subscribe(function (e, args) {
                selrow = args.row;
                PaymentGridData = paymentGrid.getData();

                var cell = paymentGrid.getCellFromEvent(e);

                if (PaymentGridData.length >= 1) {
                    //                    //on Clicking F3  (F3 is to copy a selected row)
                    //                    if (e.keyCode == 114) {
                    //                        copiedRow = PaymentGridData[args.row];        //Copies a row 
                    //                    }

                    //                    //on Clicking F4  (F4 is to paste a copied row )
                    //                    if (e.keyCode == 115) {
                    //                        if (copiedRow != null) {
                    //                            //                            var ran = Math.floor(Math.random() * 4) + 1;
                    //                            //                            copiedRow.SortOrder = parseFloat(copiedRow.SortOrder) + parseFloat(ran);
                    //                            item = copiedRow;
                    //                            paymentGrid.invalidateRow(PaymentGridData.length);
                    //                            $.extend(item, args.item);
                    //                            PaymentGridData.push(item);
                    //                            paymentGrid.updateRowCount();
                    //                            paymentGrid.render();
                    //                        }
                    //                    }

                    //on Clicking SHIFT+F6  (SHIFT+F6 is to delete a selected row)

                    if (e.shiftKey && e.keyCode == 117) {              //Shift Key & F6
                        if (PaymentGridData[args.row].Id > 0)
                            AddtoPayments(PaymentGridData[args.row], "Deleted");
                        else
                            AddtoPayments(PaymentGridData[args.row], "Remove");

                        paymentGrid.invalidateRow(PaymentGridData.length);
                        PaymentGridData.splice(args.row, 1);
                        paymentGrid.updateRowCount();
                        paymentGrid.setData(PaymentGridData);
                        paymentGrid.render();

                        if ((PaymentGridData.length == 0) && (SplitPaymentGridData.length > 0)) {
                            for (var i = 0; i < SplitPaymentGridData.length; i++) {
                                if (SplitPaymentGridData[args.row].Id > 0)
                                    AddtoSplitPayments(SplitPaymentGridData[i], "Deleted");
                                else
                                    AddtoSplitPayments(SplitPaymentGridData[i], "Remove");
                                //                                AddtoSplitPayments(SplitPaymentGridData[i], "Deleted");
                            }
                            SplitPaymentGridData.length = 0;
                            splitPaymentGrid.updateRowCount();
                            splitPaymentGrid.render();
                            $("#tbSplitPayPercent").val(parseFloat(zero).toFixed(4));
                        }

                        if (UpData.length > 0)
                            save();

                        paymentGrid.setActiveCell(selrow, 1);
                        paymentGrid.setActiveCell(selrow, 0);
                        paymentGrid.editActiveCell();

                        var tbPerc = 0, tbAmt = 0, tmp1 = 0, tmp2 = 0;

                        for (var i = 0; i < PaymentGridData.length; i++) {
                            if ((PaymentGridData[i].PaymentPercent != null) || (PaymentGridData[i].Amount != null)) {
                                tmp1 = PaymentGridData[i].PaymentPercent;
                                tmp2 = PaymentGridData[i].Amount;
                                tbPerc = parseFloat(tbPerc) + parseFloat(tmp1);
                                tbAmt = parseFloat(tbAmt) + parseFloat(tmp2);
                            }
                        }

                        $("#tbPayPercent").val(parseFloat(tbPerc).toFixed(4));
                                                $("#tbPayAmount").val(parseFloat(tbAmt).toFixed(4));
//                        $("#tbPayAmount").val(CommaSeperator(parseFloat(tbAmt).toFixed(4)));


                        if ($("#TypeComboSelection").val() == "ROY") {
                            setOptions(PaymentGridData);
                        }

                    }
                }

                if (e.keyCode == 120) {
                    if (paymentGrid.getColumns()[args.cell].id == "PaymentCode") {
                        if (PaymentGridData[args.row].SortOrder != null) {
                            if (paymentGrid.getEditorLock().isActive())
                                paymentGrid.getEditorLock().deactivate(paymentGrid.getEditController());

                            selrow = args.row;
                            gitems = PaymentGridData[args.row];
                            //cellvalue = PaymentGridData[args.row][paymentGrid.getColumns()[args.cell].field];
                            //selectedrow = PaymentGridData[args.row];

                            var columns = [
                                  { id: "PatCode", name: "Payment Code", field: "PatCode" },
                                  { id: "PatDesc", name: "Payment Description", field: "PatDesc" }
                              ];

                            var actionParameters = "";
                            var title = "Payment Code";
                            var listName = null;
                            var idfield = "PatCode";
                            ShowCommonLookup(GetPaymentCodeLOVListactionurl, actionParameters, columns, "PatCodeColumn", idfield, title, listName);

                            // $("#PaymentCodeLOV").dialog("open");
                        }
                        else {
                            $.noty.closeAll();
                            showMessage("Order is required", "error");
                            paymentGrid.setActiveCell(selrow, 0);
                            paymentGrid.editActiveCell();
                        }

                    }
                }

            });

            splitPaymentGrid.onKeyDown.subscribe(function (e, args) {
                var item;
                //var cell = splitPaymentGrid.getCellFromEvent(e);
                selrow = args.row;
                if (SplitPaymentGridData.length >= 1) {

                    //on Clicking F3  (F3 is to copy a selected row)
                    if (e.keyCode == 114) {
                        copiedRow = SplitPaymentGridData[args.row];        //Copies a row 
                    }

                    //on Clicking F4  (F4 is to paste a copied row )
                    if (e.keyCode == 115) {
                        if (copiedRow != null) {
                            var currentRow = args.row;
                            item = copiedRow;
                            splitPaymentGrid.invalidateRow(SplitPaymentGridData.length);
                            $.extend(item, args.item);
                            SplitPaymentGridData.push(item);
                            splitPaymentGrid.updateRowCount();
                            splitPaymentGrid.render();

                        }
                    }
                    //on Clicking SHIFT+F6  (SHIFT+F6 is to delete a selected row)

                    if (e.shiftKey && e.keyCode == 117) {              //Shift Key & F6
                        var mydata = splitPaymentGrid.getData();
                        item = mydata[selrow];

                        if (mydata[selrow].Id > 0)
                            AddtoSplitPayments(item, "Deleted");
                        else
                            AddtoSplitPayments(item, "Remove");

                        splitPaymentGrid.invalidateRow(mydata.length);
                        SplitPaymentGridData.splice(args.row, 1);
                        splitPaymentGrid.updateRowCount();
                        splitPaymentGrid.setData(mydata);
                        splitPaymentGrid.render();

                        if (mydata.length > 0)
                            setfooter(gridContainerDivsplitPayment, 1, mydata.length);
                        else
                            setfooter(gridContainerDivsplitPayment, 0, 0);

                        var tmp1 = 0, tbPerc = 0;
                        for (var i = 0; i < mydata.length; i++) {
                            if (mydata[i].PaymentPercent != null) {
                                tmp1 = mydata[i].PaymentPercent;
                                tbPerc = parseFloat(tbPerc) + parseFloat(tmp1);
                            }
                        }
                        $("#tbSplitPayPercent").val(parseFloat(tbPerc).toFixed(4));
                    }
                }

            });



            paymentGrid.onCellChange.subscribe(function (e, args) {
                var pdata = paymentGrid.getData();

                if (paymentGrid.getColumns()[args.cell].id == "MonthNumber") {
                    if (PaymentGridData.length == 1)
                        monthNumber = PaymentGridData[args.row].MonthNumber;
                }
                if (typeof (args.item.Id) == 'undefined')
                    AddtoPayments(args.item, "Added");
                else
                    AddtoPayments(args.item, "Modified");

            });

            splitPaymentGrid.onCellChange.subscribe(function (e, args) {

                if (typeof (args.item.Id) == 'undefined')
                    AddtoSplitPayments(args.item, "Added");
                else
                    AddtoSplitPayments(args.item, "Modified");

            });


            paymentGrid.onAddNewRow.subscribe(function (e, args) {
                var item = args.item;
                var column = args.column;
                paymentGrid.invalidateRow(PaymentGridData.length);
                $.extend(item, args.item);
                PaymentGridData.push(item);
                paymentGrid.updateRowCount();
                paymentGrid.render();
            });

            splitPaymentGrid.onAddNewRow.subscribe(function (e, args) {

                var item = args.item;
                var column = args.column;
                splitPaymentGrid.invalidateRow(SplitPaymentGridData.length);
                $.extend(item, args.item);
                SplitPaymentGridData.push(item);
                splitPaymentGrid.updateRowCount();
                splitPaymentGrid.render();
            });

            paymentGrid.onValidationError.subscribe(function (e, args) {
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

            splitPaymentGrid.onValidationError.subscribe(function (e, args) {

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

        },
        error: function () {
        }

    });
}


$(function () {

    gridwidth = $("#PaymentGrid").width();
    $("#PaymentGrid").css({ "width": gridwidth + "px" });
    loadPayments();
});

function setPaymentCodeValues() {
    var item1;
    item1 = { "SortOrder": "" };
    var item;
    var cdata = paymentGrid.getData();
    $.extend(gitems, item);
    item = { "SortOrder": selectedrow.SortOrder, "MonthNumber": selectedrow.MonthNumber, "PaymentPercent": selectedrow.PaymentPercent, "Amount": selectedrow.Amount, "PaymentCode": selectedvalue.PatCode, "DueDateDMPayment": selectedrow.DueDateDMPayment, "Comments": selectedrow.Comments };

    if (cdata.length == 1) {
        cdata.splice(selrow, 1);
        cdata.push(item);
    }
    else {
        if (cellvalue == null) {
            cdata.splice(selrow, 1);
            cdata.push(item);
        }
        else {
            for (var i = 0; i < cdata.length; i++) {
                if (cdata[i].SortOrder == selectedrow.SortOrder)
                    cdata[i] = { "SortOrder": selectedrow.SortOrder, "MonthNumber": selectedrow.MonthNumber, "PaymentPercent": selectedrow.PaymentPercent, "Amount": selectedrow.Amount, "PaymentCode": selectedvalue.PatCode, "DueDateDMPayment": selectedrow.DueDateDMPayment, "Comments": selectedrow.Comments };
            }
        }
    }

    if (!paymentGrid.getEditorLock().isActive())
        paymentGrid.getEditorLock().activate(paymentGrid.getEditController());

    paymentGrid.setData(cdata);
    paymentGrid.render();
}

function SetLookupDataToInvokerPayment(SelectedRowData, lookupInvokerControl) {
    if (SelectedRowData != null) {
        if (lookupInvokerControl == "PatCodeColumn") {
            var cdata = paymentGrid.getData();
            $.noty.closeAll();
            var item = { "PaymentCode": SelectedRowData.PatCode };
            if (gitems != null) {
                gitems.PaymentCode = SelectedRowData.PatCode;
            }
            else {
                cdata.push(item);
            }
            if (cdata[selrow].Id != null)
                AddtoPayments(cdata[selrow], "Modified");
            else
                AddtoPayments(cdata[selrow], "Added");

            if (!paymentGrid.getEditorLock().isActive())
                paymentGrid.getEditorLock().activate(paymentGrid.getEditController());
            paymentGrid.setData(cdata);       
            paymentGrid.render();
        }
    }
    else {
        if (!paymentGrid.getEditorLock().isActive())
            paymentGrid.getEditorLock().activate(paymentGrid.getEditController());
    }
    paymentGrid.setActiveCell(0, 3);
    paymentGrid.setActiveCell(selrow, 4);
    paymentGrid.editActiveCell();
};

function loadPaymentsIfNotSaved() {
    paymentGrid.setData(PaymentGridData);
    paymentGrid.render();
}
