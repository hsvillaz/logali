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

        };

        var Main = Controller.extend("logali.employees.controller.EmployeeDetails", {});

        Main.prototype.onInit = onInit;

        return Main;
    });