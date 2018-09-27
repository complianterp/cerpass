sap.ui.define(["sap/ui/core/UIComponent"],
	function(UIComponent) {
		"use strict";

		var Component = UIComponent.extend("menuTest.Component", {

			metadata: {
				rootView: {
					"viewName": "menuTest.view.ToolPage",
					"type": "XML",
					"async": true
				}
			}
		});

		return Component;

	});