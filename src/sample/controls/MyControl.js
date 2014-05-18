jQuery.sap.declare('sample.controls.MyControl');
jQuery.sap.require("sap.ui.core.Renderer");


sap.ui.core.Control.extend("sample.controls.MyControl", {
        metadata : {
            properties : {
               firstname: 'string',
               lastname:  'string',
               "currentPage" : {type : "int", group : "Misc", defaultValue : 1},
    		   "numberOfPages" : {type : "int", group : "Misc", defaultValue : null}
 
            },

            aggregations : {
               
            },

            associations: {
                _myButton : {type : "sap.ui.commons.Button", multiple : false, visibility: "hidden"},
                // etc...
            },

            events : {
                openFileList : {enablePreventDefault : true},
                page: {}
            }
        },

        init : function() {
            var oControl = this, oMyButton;

            this.setNumberOfPages(10);
            oMyButton   = new sap.ui.commons.Button({
                text: "Press me",
                press: function (oEvent) {
                var target = oEvent.getParameter("id");
        		alert(target);
                    //oControl.fireOpenFileList({
                    //    passAlong : "Some dummy data to pass along"
                    //});
                    
                    
                }
            });
            this.oMyButton =  oMyButton;
            //this.setAggregation("_myButton", oMyButton);
            var oLinks = new Array();
    	var nextBtn = new sap.m.Link({id: this.getId()+"--next"});
    	nextBtn.addStyleClass("sapUiPagBtn").addStyleClass('sapUiPagForward').addStyleClass("sapMLnk");
    	var firstBtn = new sap.m.Link({id:this.getId()+"--first"});
    	firstBtn.addStyleClass("sapUiPagBtn").addStyleClass('sapUiPagFirst').addStyleClass("sapMLnk");
    	
    	var prevBtn =  new sap.m.Link({id: this.getId()+"--previous"});
    	prevBtn.addStyleClass("sapUiPagBtn").addStyleClass('sapUiPagBack').addStyleClass("sapMLnk");
    	
    	var lastBtn =  new sap.m.Link({id: this.getId()+"--last"});
    	lastBtn.addStyleClass("sapUiPagBtn").addStyleClass('sapUiPagLast').addStyleClass("sapMLnk");
    	//sapUiLnkDsbl
    	var currPage =  this.getCurrentPage();
    	var numLink = new sap.m.Link({text:currPage});
    	numLink.addStyleClass("sapUiPagPage").addStyleClass('sapUiPagCurrentPage').addStyleClass("sapMLnk");
    	oLinks.push(firstBtn);
    	oLinks.push(prevBtn);
    	oLinks.push(numLink);
    	oLinks.push(nextBtn);
    	oLinks.push(lastBtn);
    	this.oLinks =  oLinks;
    	for (var i =0; i < oLinks.length; i++){
    	  var link =  oLinks[i];
    	  link.attachPress(function (oEvent) {
        		var target = oEvent.getParameter("id");
        		alert(target);
        		var aArray = target.split("--");
        		var path = aArray[aArray.length - 1];
        		var prevPage =  oControl.getCurrentPage();
        		var isFirst = (prevPage == 1);
        		var isLast = (prevPage == oControl.getNumberOfPages());
                
                var nextPage = prevPage ;
                
                if (path === "first"){
                	nextPage = 1;
                	//this.addStyleClass("sapUiLnkDsbl");
                }
                if (path === "last"){
                	nextPage = oControl.getNumberOfPages();
                	//this.addStyleClass("sapUiLnkDsbl");
                 }
                if (path === "previous"){
                	nextPage =  Math.max(1, oControl.getCurrentPage() -1);
                }
                if (path === "next"){
                	nextPage =  Math.min(oControl.getNumberOfPages(), oControl.getCurrentPage() + 1);
                }
                if (prevPage != nextPage){
                  oControl.firePage({targetPage:nextPage});
                  oControl.setCurrentPage(nextPage);
                }
                oControl.oLinks[0].addStyleClass("sapUiLnkDsbl");
                oControl.oLinks[1].addStyleClass("sapUiLnkDsbl");
                oControl.oLinks[3].addStyleClass("sapUiLnkDsbl");
                oControl.oLinks[4].addStyleClass("sapUiLnkDsbl");
                
                if (nextPage == 1){
                 	oControl.oLinks[3].removeStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[4].removeStyleClass("sapUiLnkDsbl");
                	
                }else if (nextPage == oControl.getNumberOfPages() ){
                	oControl.oLinks[0].removeStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[1].removeStyleClass("sapUiLnkDsbl");
                }else {
                	oControl.oLinks[0].removeStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[1].removeStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[3].removeStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[4].removeStyleClass("sapUiLnkDsbl");
                }
            })
    	}
        },

       onAfterRendering: function () {
         alert(" mycontrol onAfterRendering");
       },
        renderer : {
            render : function(oRm, oControl) {
                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.write(">");

                //content shows button which fires custom event
                oRm.write("<div>");
                oRm.renderControl(oControl.oMyButton);
                oRm.write("</div>");
oRm.write('<div');
        oRm.writeControlData(oControl);
        oRm.addClass('tabs');
        oRm.writeClasses();
        oRm.write('>');
        var links = oControl.oLinks;
        var numBtn = links[2];
        numBtn.setText(oControl.getCurrentPage());
        for (var i = 0; i < links.length; i++){
        	var link =  links[i];
        	oRm.renderControl(link);
        	
        }
        oRm.write('</div>');
                oRm.write("</div>");
                
                
            }
        }
    });