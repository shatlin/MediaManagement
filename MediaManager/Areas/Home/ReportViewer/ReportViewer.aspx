<%@ Page Language="C#"  AutoEventWireup="true" CodeBehind="ReportViewer.aspx.cs" Inherits="MediaManager.Areas.Home.ReportViewer.ReportViewer" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=10.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a"
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<%--<html xmlns="http://www.w3.org/1999/xhtml">--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">--%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <rsweb:ReportViewer ID="reportViewer"  BackColor="White" AsyncRendering="false"
            runat="server" Height="95%"  Width="100%"  ProcessingMode="Remote">
        </rsweb:ReportViewer>
        <br />
        <asp:ScriptManager ID="scriptManager" runat="server">
        </asp:ScriptManager>
    </div>
    </form>
</body>
</html>
