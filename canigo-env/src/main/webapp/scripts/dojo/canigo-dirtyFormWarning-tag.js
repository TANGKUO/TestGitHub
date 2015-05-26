var CanigoDirtyFormWarningTag = {
  Version: '1.0'
}

window.__dirtyFormWarning = "false";

CanigoDirtyFormWarningTag.DirtyForm = Class.create();
CanigoDirtyFormWarningTag.DirtyForm .prototype={

  initialize: function(options) {
  
//    alert("dirty");
    this.setOptions(options);
//    
//    	 	var str;
//		    for(var x in document){
//		    	str+=x+'-'+document.x+'\n';
//		    }
//		    alert(str);
    
	this.init(options);
    if (this.options.sourceElem) {   
    	this.attachBehaviors("window", this.options.eventType, this.actionElemChanged, this);
    	this.attachBehaviors("window", "load", this.initLoad, this);
    }else{
       alert('The element doesn\'t exist.');
    }
    
  },


  setOptions: function(options) {
 
   this.dirtyFormWarning = true;
   this.options = {
       sourceElem: $(options.source),
       eventType: options.eventType ? options.eventType : "beforeunload"
   }.extend(options || {});
   
   window.__dirtyFormWarning = "true";
   
  },  
  
  init: function() {
     //alert("init");
    var id = this.options.source;
    if ($(this.options.source)==null) {
         alert(' The source '+this.options.source+'for dirty form warning tag doesn\'t exists ');
    }
  },

  initLoad: function() {
    //alert("initLoad");
	//this.initialFormValue = dojo.io.encodeForm(dojo.byId(id));
	this.initialFormValue = this.getValues();
  },

  
  getValues:function() {
  	
//  			debugger;
	  		// form expected
	  		list = $(this.options.source).elements;				
	  		 
	  		if (list){
  		  		bean = new Object();
  		  		j=0;
				for (i=0;i<list.length;i++){	  		  	
					var element = list[i];
					
					if (element.name) {					  
						  bean[element.name] = '""';
				    }				  		
				}
			}
	   
		    DWRUtil.getValuesName(bean);
		    
//		    var str;
//		    for(x in bean){
//		    	str+=x+'-'+eval(bean.x)+' ';
//		    }
//		    alert(str);
		    return bean;
  
  }, 
 
  //desde aqui llamar a las funciones del js
  actionElemChanged: function(e) {  
  
  var isIE = document.all;
  var form = this.options.sourceElem;
  var formX = getElementX(form);
  var formY = getElementY(form);
  
//alert('Top:'+getElementY(form)+'\n'+'Left:'+getElementX(form)+'\n'+'Height:'+form.offsetHeight+'\n'+'Width:'+form.offsetWidth+'\n\n'+'EventX:'+e.clientX+'-'+'EventY:'+e.clientY);

//  if((!isIE) || !((e.clientX >= formX) && (e.clientX <= (formX + form.offsetWidth)) && (e.clientY >= formY) && (e.clientY <= (formY + form.offsetHeight)))){
      
     var formName = this.options.source;
     var message = this.options.message;

//     if (this.dirtyFormWarning) {
//			var currentFormValue = dojo.io.encodeForm(dojo.byId(formName));
//			if (this.initialFormValue != currentFormValue) {				
//		   	        e.returnValue = message;		   	       
//			   	    return message;
//		    }
//	   }
   //  alert("acionDirty");
 //  alert("GlobalDirty:"+window.__dirtyFormWarning);
		if (this.dirtyFormWarning && (window.__dirtyFormWarning == "true")) {
		    var currentBean = this.getValues();
		    if (!this.equalsBean(this.initialFormValue,currentBean)) {
		           e.returnValue = message;		   	       
			   	    return message;
		    }
		    else {
	//	         alert("Dirty activated but no modifications");
		    }
		}
		else {
    //		   alert("No dirty activated");
		}
//	}	

  },
  
  attachBehaviors: function(element, event, listener, obj) {
    
    var oldSubmit = this.options.sourceElem.onsubmit;
    var th = this;
    this.options.sourceElem.onsubmit = function() { 
    					th.setDirtyFormWarning(false); 
    					if (oldSubmit) { 
    					    //alert("oldsubmit");
    						if (!oldSubmit()) {
    						    //alert("oldsubmit false");
    							th.setDirtyFormWarning(true); 
    							return false; 
    						}
    					}
//    					 alert("oldsubmit true");
    					return true;
    					
     }
    
   	if(window.attachEvent){
   		window.attachEvent('on'+event,listener.bindAsEventListener(obj));
 	}
   	else {
    	window.addEventListener(event,listener.bindAsEventListener(obj),'true');
   	}
  },
 
  setDirtyFormWarning: function(enabled) {
	  this.dirtyFormWarning = enabled;
  },
  
  /**
   * Compare two beans.
   */
  equalsBean: function(map1,map2) {
	  var s='';
	  for (var property in map1) {
	    s=s+' '+property;
	    if (map1[property]!=map2[property]) {
		    //alert(s);
	        return false;
	    }        
	    
	  }
	  
	  for (var property in map2) {
	  	s=s+' '+property;
	    if (map1[property]!=map2[property]) {
	    	//alert(s);
	        return false;
	    }        
	    
	  }
//	  alert(s);
	  return true;
  
  }
  
  
};

  	  
  	   
  	   

