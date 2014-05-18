jQuery.sap.declare('sap.im.ui.controls.sample.controls.Paginator');
sap.ui.core.Control.extend('sample.controls.Paginator', {
    metadata: {
    	properties : {
    		"currentPage" : {type : "int", group : "Misc", defaultValue : 1},
    		"numberOfPages" : {type : "int", group : "Misc", defaultValue : null}
    	},
        events: {
            page: {}
        },
        aggregations: {
            pages: {
                type: 'sap.m.Link'
            }
        },
    },
    init: function(){
    	var oControl = this, oLinks;
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
    	for (var i = 0; i < oLinks.length; i++){
        	var link =  oLinks[i];
        	link.attachPress(function (oEvent) {
        		var target = oEvent.getParameter("id")
        		var aArray = target.split("--");
        		var path = aArray[aArray.length - 1];
        		var prevPage =  oControl.getCurrentPage();

                var nextPage = prevPage ;
                
                if (path === "first"){
                	nextPage = 1;
                }
                if (path === "last"){
                	nextPage = oControl.getNumberOfPages();
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
                 	oControl.oLinks[3].toggleStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[4].toggleStyleClass("sapUiLnkDsbl");
                	
                }else if (nextPage == oControl.getNumberOfPages() ){
                	oControl.oLinks[0].toggleStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[1].toggleStyleClass("sapUiLnkDsbl");
                }else {
                	oControl.oLinks[0].toggleStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[1].toggleStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[3].toggleStyleClass("sapUiLnkDsbl");
                	oControl.oLinks[4].toggleStyleClass("sapUiLnkDsbl");
                }
            });

    	}
    },
    renderer: function (oRm, oControl) {
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
    	
    }
});
