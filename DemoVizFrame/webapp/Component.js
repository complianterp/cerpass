sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"DemoVizFrameDemoVizFrame/model/models"
], function(UIComponent, Device, models) {
	"use strict";

var Component = UIComponent.extend("sap.tnt.sample.ToolPage.Component", {

		metadata : {
			rootView : {
				"viewName": "sap.tnt.sample.ToolPage.ToolPage",
				"type": "XML",
				"async": true
			},
			dependencies : {
				libs : [
					"sap.m",
					"sap.tnt"
				]
			},
			config : {
				sample : {
					stretch: true,
					files : [
						"ToolPage.view.xml", "ToolPage.controller.js"
					]
				}
			}
		}
	});

	return UIComponent.extend("DemoVizFrameDemoVizFrame.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});