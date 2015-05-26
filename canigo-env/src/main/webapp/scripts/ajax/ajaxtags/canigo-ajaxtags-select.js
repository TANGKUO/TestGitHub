
var CanigoSelectFieldTag = {
  Version: '1.0'
}

function populateSelect(dataFromServer,dataFromBrowser) {

    // Obtain target from dataFromBrowser of previous call to callback
    var targetElem = $(dataFromBrowser['target']);
    var defaultSelected = dataFromBrowser['defaultSelected'];
    if (targetElem) {	
    	if (targetElem.options) {
    	    // reset target field    
	    	targetElem.options.length = 0;
	    }
	    targetElem.disabled = false;    
	    
	    if (dataFromServer) {
    		// grab list of options from list
    		var items = dataFromServer;
    		var itemsQuoted = new Array(items.length);
    		// Add a "'" to each value for presenting
		    for (var i=0; i<items.length; i++) {    		      
		      itemsQuoted[i] = new Object();
		      itemsQuoted[i]['label'] = "'" + items[i]['label'] + "'";
		      itemsQuoted[i]['value'] = "'" + items[i]['value'] + "'";
		      var label = items[i]['label'];
		      var value = items[i]['value'];
	  	      targetElem.options[i] = new Option(label, value);
	  	      if(value == defaultSelected){
	  	      	targetElem.options[i].selected = true;
	  	      }
    		}
	    	//DWRUtil.addOptions(targetElemId,dataFromServer,'label','value');
	    }
	    
    }    
}


/**
 * Extension of CanigoFieldTag
 */ 
CanigoSelectFieldTag.Base = function() {};
CanigoSelectFieldTag.Base.prototype = (new AjaxJspTag.Base()).extend({
});


/******************************************************************************
 * Canigo Select Dependency behaviour
 * Example of use  :
 * <script type="text/javascript">
 *   new CanigoSelectFieldTag.SelectTarget(
 *     {
 *           defaultSelected: "...", // defaultSelected
 *           source: "...", // id of source select
 * 			 target: "...", // id of target select
 *           paramName: "title" // name of parameter to be created in order to populate target
 *			 optionsSourceListName: "" // name of configured list name of target options
 *     });
 * </script>
 ******************************************************************************/
 

CanigoSelectFieldTag.SelectTarget = Class.create();
CanigoSelectFieldTag.SelectTarget.prototype=(new CanigoSelectFieldTag.Base()).extend({

  initialize: function(options) {
    this.setOptions(options);
    
    if (this.options.sourceElem) {    	
    	this.attachBehaviors(this.options.sourceElem, this.options.eventType, this.actionElemChanged, this);
    	this.actionElemChanged(new Object());
	}
  },


  setOptions: function(options) {
   this.options = {
      defaultSelected: $(options.defaultSelected),
      sourceElem: $(options.source),
      targetElem: $(options.target),
      paramName: $(options.paramName),
      optionsTargetListName: $(options.targetListName),
      eventType: options.eventType ? options.eventType : "change"
   }.extend(options || {});
  },  

  
  actionElemChanged: function(e) {        
     var value = $F(this.options.sourceElem);
     
     // Create parameters to call 'getOptions'
	 var parametersCall = new Object();
  	 parametersCall[this.options.paramName] = value;   	
	 parametersCall['sourceElem'] = this.options.sourceElem.id;   	
	 
	 Event.stop(e);
  	 
	 var optionsListName = this.options.optionsTargetListName;
	 var dataFromBrowser = new Object();
  	 dataFromBrowser['target'] = this.options.targetElem.id;
  	 dataFromBrowser['defaultSelected'] = this.options.defaultSelected;
 	 
	 var thisSelect = this;
	 webOptionsListService.getOptionsFromMap(optionsListName,parametersCall,
	 	{
	 		callback:function(dataFromServer) {
	 			thisSelect.putOtherOption(dataFromServer);
	 			populateSelect(dataFromServer,dataFromBrowser);
	 		},
	 		timeout:5000
	 	}
	 );
  	}, 
  	
  	putOtherOption: function (dataFromServer) {
		if(dataFromServer && this.options.otherKey) {		
			var otherOpt = new Object();
			otherOpt['label'] = this.options.otherKey;
			otherOpt['value'] = this.options.otherValue;
			dataFromServer.splice(0,0,otherOpt);
		}
	}
	
}); 
  	  
  	   
  	   

