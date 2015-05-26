var CanigoOptionsTag = {
  Version: '1.0'
}

CanigoOptionsTag.Swap = Class.create();
CanigoOptionsTag.Swap.prototype={

  initialize: function(options) {
    this.setOptions(options);

    if (this.options.sourceElem) {   
    	this.attachBehaviors(this.options.sourceElem, this.options.eventType, this.actionElemChanged, this);
    }
  },


  setOptions: function(options) {
  
   this.options = {
       sourceElem: $(options.source),
       eventType: options.eventType ? options.eventType : "click"
   }.extend(options || {});
   
  },  
  
  checkErrors: function() {
  		
  		var errores = "";
        if (!this.options.sourceElem){
      		errores=errores+"The element doesn\'t exist \n"
        }
        if (!($(this.options.fromSelect))){
      		 errores=errores+" - The origin\'s element doesn\'t exist \n"
        }
        if (!($(this.options.toSelect))){
      		 errores=errores+" - The destiny\'s element doesn\'t exist \n"
        }
   		if (!this.options.action){
      		 errores=errores+" - The action to execute doesn\'t exist \n"
        }
        if (!this.options.scope){
      		 errores=errores+" - You should especify the element\elements to be moved\copied \n"
        }
        if (errores!=""){
        	alert("The following erros have been found: \n"+errores+"\n The function will not be executed.");
        }
        
  },
  //desde aqui llamar a las funciones del js
  actionElemChanged: function(e) {  
     this.checkErrors();
     var scope = this.options.scope;
     var action = this.options.action;
     var fromSelectElem = $(this.options.fromSelect);
     var toSelectElemt = $(this.options.toSelect);
   
  	 if (action.toUpperCase()=="MOVE"){
  	 		
  	 	 if (scope.toUpperCase()=="SELECTED")
  	 	 {
  	 	    
  	 	 	Selectbox.moveSelectedOptions(fromSelectElem,toSelectElemt); 
  	 	 }else{
  	 	     if (scope.toUpperCase()=="ALL"){
  	 	         
  	 	         Selectbox.moveAllOptions(fromSelectElem,toSelectElemt); 
  	 	     }
  	 	 }
  	 }else{
  	 	if (action.toUpperCase()=="COPY"){
  	 	   if (scope.toUpperCase()=="SELECTED"){
  	 	 		Selectbox.copySelectedOptions(fromSelectElem,toSelectElemt);
  	 	   }else{
  	 	       if (scope.toUpperCase()=="ALL"){
  	 	          Selectbox.moveAllOptions(fromSelectElem,toSelectElemt);
  	 	   }
  	 	 }
  	 	 
  	   }
  	 
  	 }	
  },
  
  attachBehaviors: function(element, event, listener, obj) {
    //alert('attach');
    if (isArray(element)) {
      for (var i=0; i<element.length; i++) {
    	if(element.attachEvent){
    		element[i].attachEvent('on'+event,listener.bindAsEventListener(obj));
    	}
    	else {
	    	element[i].addEventListener(event,listener.bindAsEventListener(obj),'true');
    	}
      }
    } else {
    	if(element.attachEvent){
    		element.attachEvent('on'+event,listener.bindAsEventListener(obj));
    	}
    	else {
	    	element.addEventListener(event,listener.bindAsEventListener(obj),'true');
    	}
    }
  }

}
  	  
  	   
  	   

