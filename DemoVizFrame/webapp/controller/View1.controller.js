sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("DemoVizFrameDemoVizFrame.controller.View1", {

	onInit: function(){
		var oVizFrame = this.getView().byId("idcolumn");
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [{
				name: 'OBJECT_TYPE',
				value: "{Model>OBJECT_TYPE}"},
				
				{name: 'OBJECT_SUB_TYPE',
				value: "{Model>OBJECT_SUB_TYPE}"}
				],
				
				measures : [{
					name: 'Test_Occurrences',
					value : '{Model>Test_Occurrences}'}],
					
					data : {
						path : "Model>/value"
					}
		});
		oVizFrame.setDataset(oDataset);
		oVizFrame.setVizType('stacked_bar');
		
		
		oVizFrame.setVizProperties({
			plotArea: {
				colorPalette : d3.scale.category20().range()
			},
			title :{
				visible : "true",
				text : "VizFrame Chart"
			}
		});
		
		var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			'uid': "valueAxis",
			'type': "Measure",
			'values': ["Test_Occurrences"]
		}),
		feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			'uid': "categoryAxis",
			'type': "Dimension",
			'values': ["OBJECT_TYPE"]
		}),
		feedCategoryAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
			'uid': "categoryAxis",
			'type': "Dimension",
			'values': ["OBJECT_SUB_TYPE"]
		});
		oVizFrame.addFeed(feedValueAxis);
		oVizFrame.addFeed(feedCategoryAxis);
		oVizFrame.addFeed(feedCategoryAxis1);
		
	}

	});
});