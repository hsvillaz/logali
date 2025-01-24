//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
],
    /**
    * @param {typeof sap.ui.core.mvc.Controller} Controller
    * @param {typeof sap.ui.model.Filter} Filter
    * @param {typeof sap.ui.model.FilterOperator} FilterOperator
    * @param {typeof sap.m.MessageToast} MessageToast
    */

    (Controller, Filter, FilterOperator, MessageToast) => {
        "use strict";

        function onInit() {

            var oJSONModel = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            var i18nBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            oJSONModel.loadData("./localService/mockdata/Employees.json", false);
            oView.setModel(oJSONModel);
        };

        function onFilter() {

            var oJSON = this.getView().getModel().getData();
            var filters = [];

            if (oJSON.EmployeeId !== "") {
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId));
            };

            if (oJSON.CountryKey !== "") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey));
            };

            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);
        };

        function onClearFilter(){

            var oModel = this.getView().getModel();
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");
        };

        function showPostalCode(oEvent){

            var itemPressed = oEvent.getSource();
            var oContext = itemPressed.getBindingContext();
            var objectContext = oContext.getObject();

            MessageToast.show(objectContext.PostalCode);
        };

        var Main = Controller.extend("logali.employees.controller.MainView", {});

        Main.prototype.onInit = onInit;
        Main.prototype.onFilter = onFilter;
        Main.prototype.onClearFilter = onClearFilter;
        Main.prototype.showPostalCode = showPostalCode;

        return Main;
    });