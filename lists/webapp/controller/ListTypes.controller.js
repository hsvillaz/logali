//@ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
    * @param {typeof sap.ui.core.mvc.Controller} Controller
    */

    (Controller) => {
        "use strict";

        function onInit() {

            var oJSONModel = new sap.ui.model.json.JSONModel();
            var oView = this.getView();
            // var i18nModel = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            oJSONModel.loadData("./localService/mockdata/ListData.json");
            oView.setModel(oJSONModel);
        };

        function getGroupHeader(oGroup) {

            var groupHeaderListItem = new sap.m.GroupHeaderListItem({
                title: oGroup.key,
                upperCase: true
            });

            return groupHeaderListItem;
        };

        function onShowSelectedRows() {

            var standardList = this.getView().byId("standardList");
            var selectedItems = standardList.getSelectedItems();
            var i18nModel = this.getView().getModel("i18n").getResourceBundle();

            if (selectedItems.length === 0) {

                sap.m.MessageToast.show(i18nModel.getText("noSelection"));

            } else {

                var textMessage = i18nModel.getText("selection");

                for (var item in selectedItems) {
                    var context = selectedItems[item].getBindingContext();
                    var oContext = context.getObject();
                    textMessage = textMessage + " - " + oContext.Material;
                }

                sap.m.MessageToast.show(textMessage);
            }
        };

        function onDeleteSelectedRows() {

            var standardList = this.getView().byId("standardList");
            var selectedItems = standardList.getSelectedItems();
            var i18nModel = this.getView().getModel("i18n").getResourceBundle();

            if (selectedItems.length === 0) {

                sap.m.MessageToast.show(i18nModel.getText("noSelection"));

            } else {

                var textMessage = i18nModel.getText("selection");
                var model = this.getView().getModel();
                var products = model.getProperty("/Products");
                var arrayId = [];

                for (var item in selectedItems) {

                    var context = selectedItems[item].getBindingContext();
                    var oContext = context.getObject();

                    arrayId.push(oContext.Id);
                    textMessage = textMessage + " - " + oContext.Material;
                };

                products = products.filter(function (p) {
                    return !arrayId.includes(p.Id);
                });

                model.setProperty("/Products", products);
                standardList.removeSelections();
                sap.m.MessageToast.show(textMessage);
            }
        };

        function onDeleteRow(oEvent) {

            var selectedRow = oEvent.getParameter("listItem");

            var context = selectedRow.getBindingContext();
            var splitPath = context.getPath().split("/");
            var indexSelectedRow = splitPath[splitPath.length - 1];
            var model = this.getView().getModel();
            var products = model.getProperty("/Products");

            products.splice(indexSelectedRow, 1);
            
            model.refresh();

        };

        var Main = Controller.extend("logaligroup.lists.controller.ListTypes", {});
        Main.prototype.onInit = onInit;
        Main.prototype.getGroupHeader = getGroupHeader;
        Main.prototype.onShowSelectedRows = onShowSelectedRows;
        Main.prototype.onDeleteSelectedRows = onDeleteSelectedRows;
        Main.prototype.onDeleteRow = onDeleteRow;

        return Main;
    });