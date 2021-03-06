sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/Fragment',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/ui/core/mvc/Controller'
], function(jQuery, Fragment, Controller, JSONModel, Popover, Button) {
	"use strict";

	var CController = Controller.extend("cerpassMenumenu.controller.ToolPage", {
		model: new sap.ui.model.json.JSONModel(),
		data: {
			navigation: [{
				title: 'Home Page',
				icon: 'sap-icon://home',
				expanded: false,
				key: 'HO'
			}, {
				title: 'Dashboard',
				icon: 'sap-icon://multiple-line-chart',
				expanded: false,
				key: 'DB',
				items: [{
					title: 'Inbox',
					key: 'DB01'
				}, {
					title: 'Reports',
					key: 'DB02'
				}, {
					title: 'Simulations',
					key: 'DB03'
				}]
			}, {
				title: 'Rule Set',
				icon: 'sap-icon://database',
				expanded: false,
				key: 'RS',
				items: [{
					title: 'Rule Sets',
					key: 'RS01'
				}, {
					title: 'Activities',
					key: 'RS02'
				}, {
					title: 'Tests',
					key: 'RS03'
				}, {
					title: 'Risks',
					key: 'RS04'
				}, {
					title: 'Business Control',
					key: 'RS05'
				}]
			}, {
				title: 'Master Data',
				icon: 'sap-icon://it-system',
				expanded: false,
				key: 'MD',
				items: [{
					title: 'Module/SubModule',
					key: 'MD01'
				}, {
					title: 'Process/SubProcess',
					key: 'MD02'
				}, {
					title: 'Logical Systems',
					key: 'MD03'
				}, {
					title: 'Org Data',
					key: 'MD04'
				}, {
					title: 'Risk Rating',
					key: 'MD05'
				}]
			}, {
				title: 'Source Data',
				icon: 'sap-icon://it-system',
				expanded: false,
				key: 'SD',
				items: [{
					title: 'User Data',
					key: 'SD01'
				}, {
					title: 'Role Data',
					key: 'SD02'
				}, {
					title: 'Profile Data',
					key: 'SD03'
				}, {
					title: 'Usage Data',
					key: 'SD04'
				}, {
					title: 'Transaction Data',
					key: 'SD05'
				}, {
					title: 'Object Data',
					key: 'SD06'
				}]
			}, {
				title: 'Settings/Configuration',
				icon: 'sap-icon://action-settings',
				expanded: false,
				key: 'CO',
				items: [{
					title: 'Source Table Configuration',
					key: 'CO01'
				}, {
					title: 'Schedule Configuration',
					key: 'CO02'
				}, {
					title: 'Workflow Configuration',
					key: 'CO03'
				}, {
					title: 'Source System Module Configuration',
					key: 'CO04'
				}, {
					title: 'Security Configuration',
					key: 'CO05'
				}, {
					title: 'User Admin',
					key: 'CO06'
				}]
			}, {
				title: 'Useful Links',
				icon: 'sap-icon://sys-help',
				expanded: false,
				key: 'US',
				items: [{
					title: 'Child Item 1'
				}, {
					title: 'Child Item 2'
				}, {
					title: 'Child Item 3'
				}]
			}, {
				title: 'Legal',
				icon: 'sap-icon://compare',
				expanded: false,
				key: 'LE',
				items: [{
					title: 'Child Item 1'
				}, {
					title: 'Child Item 2'
				}, {
					title: 'Child Item 3'
				}]
			}],
			headerItems: [{
				text: "File"
			}, {
				text: "Edit"
			}, {
				text: "View"
			}]
		},
		onInit: function() {
			this.model.setData(this.data);
			this.getView().setModel(this.model);

			this._setToggleButtonTooltip(!sap.ui.Device.system.desktop);
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
		},

		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter('item');
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},

		handleUserNamePress: function(event) {
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content: [
					new Button({
						text: 'Feedback',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Help',
						type: sap.m.ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: sap.m.ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			popover.openBy(event.getSource());
		},

		onSideNavButtonPress: function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();

			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function(bLarge) {
			var toggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		}
		
		

	});

	return CController;

});