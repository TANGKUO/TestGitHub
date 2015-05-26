var CanigoPagedSelectFieldTag = {
  Version: '1.0'
}
var isAttach = false;
//ASM: Variable global per a l'actual pagedSelect visible
var visiblePagedSelect = null;

/**
 * Extension of CanigoFieldTag
 * Coses pendents:
 *  - combos dependents.
 *  - otherKey.
 *  - mode inspecci? / edici?
 *  - rellenar camp si b? informat.
 *  - amagar div si clicken buto del combo si el panell est? mostrat.
 *  - suport a atributs d'events, onmouseevents,onkeypress,etc.
 *  - quan es carrega el input text ha dagafar el valor corresponent al seu id
 */ 
CanigoPagedSelectFieldTag.Base = function() {};
CanigoPagedSelectFieldTag.Base.prototype = (new AjaxJspTag.Base()).extend({
});


CanigoPagedSelectFieldTag.Search = Class.create();
CanigoPagedSelectFieldTag.Search.prototype = (new AjaxJspTag.Base()).extend({

  initialize: function(options) {
    this.setOptions(options);
    this.suggestList = new Array();
    this.currentIndex = 0;
 
    this.checkErrors();
    
    this.buildButton();
        
    this.attachBehaviors(this.options.sourceButton, this.options.eventType, this.performClickButton, this);
  },

  setOptions: function(options) {
    this.options = {            
      fieldHiddenElem: $$(options.fieldId)[0],
      fieldElem: $$(options.fieldId+'/Text')[0],
      eventType: options.eventType ? options.eventType : "click",
      className: options.eventType ? options.className : "popupSearch",
      sourceElem: $$(options.fieldId+'/Text')[0],
      targetElem: $$(options.fieldId+'/Text')[0]
    }.extend(options || {});

	if(this.options.queryParameters != undefined){
		this.options.queryParametersArray = this.options.queryParameters.split(',');
	}else{
		this.options.queryParametersArray = new Array();
	}
	
    this.currentPage = 1;
    this.popupElem = options.fieldId+"Popup";
    
	this.isIE=(document.all)? true: false;
  },
  
  buildButton: function() {
	var div = $(this.options.fieldId+"Div");
  	   
  	// EVC: changed img creation method.
    var sourceElemId = this.options.fieldId;
    var pagedSelectButtonId = sourceElemId + "-button";
    var content = "<img src=\""+contextPath+"/images/pagedSelect/arrowOption.gif\" class=\"pagedSelectImageClass\" id=\"" +  pagedSelectButtonId + "\"";
    content = content + " style=\"cursor:pointer;border:0px solid;\"";
    content = content + "/>";
    	
    new Insertion.After(this.options.sourceElem,content);

  	this.options.sourceButton = $(pagedSelectButtonId);
  },
  
  checkErrors: function() {
    var errors ="";

    if (!this.options.fieldElem){
       errors=errors+"The fieldId is not an element \n";	
    } 
    
    if (this.options.indicator!=null){
   
        if (!($(this.options.indicator))){
             errors=errors+"The indicator is not an element \n";
        }	
    }
    
    if (errors!=""){
       errors="Errors in pagedSelect \n"+errors;
       alert(errors);
    }          
  },
  
 /**
  * Recibe los datos del servidor y los pinta
  **/  
  searchPanelView: function() {
     var miDiv = $(this.popupElem);
//     var tableS = miDiv.getElementsByTagName("table")[1];
//     var trB = miDiv.getElementsByTagName("tr").length;
     var numCols = 1;
     
     if (this.xml!=null)
     {
	     var json = this.xml.parseJSON();	
	     var forward="false";
	     var backward="false";
	    
	     if (json.length>0) {
	        items = json[0];
	     }
	     else {
	        items = new Array();
	     }
	     
	     if ((json.length>0) && (json[1].lastPage == false)) {
	         // hi ha seguent pagina.
             forward="true";
	     }
	     else {
             forward="false";
	     }
	     if (this.currentPage>1) {
	        backward="true";
	     }
	     else {
	        backward="false";
	     }
	     
	     // borrar elements panell.
	     var ul = miDiv.getElementsByTagName("ul")[0];              
	     miDiv.removeChild(ul);      
	     miDiv.removeChild(this.buttonDiv);

         // afegir botons i llista ul.
         this.buildDivButtons(backward,forward);
         miDiv.appendChild(this.buttonDiv);         
         ul = document.createElement("ul");
         miDiv.appendChild(ul);
	     	     
	     // append otherKey, if defined
	     if((this.currentPage == 0) && (this.options.otherKey != undefined)){
	     	var li= document.createElement("li");
	     	var valueText = document.createTextNode(this.options.otherKey);
	     	li.setAttribute("id",this.options.otherKey);
	     	li.appendChild(valueText);
	     	ul.appendChild(li);	
	     }     
	     
	     var numItems = items.length;
         for (var i=0; i<numItems; i++) {    

	          var li= document.createElement("li");
	          var it = items[i];
		      var value = eval("it.C1");   
		      var key = eval("it.C0");  
		      
		      li.setAttribute("id",key);
		      var valueText = document.createTextNode(value);		      
		      li.appendChild(valueText);
		      ul.appendChild(li);	
		 }
		 
       this.setSelected();
	}
	else{
	    var li = document.createElement("li");
	    var labelText = document.createTextNode("No results");
	    li.appendChild(labelText);
	    ul.appendChild(li);
	}
  },
		 
  // boto de combobox.
  performClickButton: function(e) {
      if (this.miDiv==null) {
   		//ASM: Gesti? de pagedSelect visible
		if(visiblePagedSelect != null) {
			visiblePagedSelect.hidePopup();
		}
		visiblePagedSelect = this;
		
         this.initPopup();
 	     
  	     this.functionWindow = this._checkPanel.bindAsEventListener(this);
  	     this.attachBehaviorsSimple(window,"click",this.functionWindow,this);
  	     this.doSearch();
      }
      else {
	      if ($(this.popupElem).style.visibility == 'visible'){
	    	   this.hidePopup();
	       	   Event.stop(e);
	       	   visiblePagedSelect = null;
	      }else{
		   		//ASM: Gesti? de pagedSelect visible
				if(visiblePagedSelect != null) {
					visiblePagedSelect.hidePopup();
				}
				visiblePagedSelect = this;
	      	 
	      	  $(this.popupElem).style.visibility = 'visible';
	  	      Element.show($(this.popupElem));       
	  	      this.functionWindow = this._checkPanel.bindAsEventListener(this);
	  	      this.attachBehaviorsSimple(window,"click",this.functionWindow,this);
	                 
	  	     this.doSearch();      
	      }
      }
  },
 
  // boto endavant.
  performEndavantButton:function(e) {
     this.currentPage= this.currentPage+1;
     this.doSearch(e);
  },
  
  // boto endarrera
  performEndarreraButton:function(e) {
     this.currentPage = this.currentPage-1;
     if (this.currentPage==0) {
         
         this.doSearch(e);
     }
     else {
         this.doSearch(e);
     }
  },
  
 initPopup: function() {
    this.miDiv = this.createPopup();
    if(this.isIE) {
   		this.createIframe();
   	}
   
//  this.setDivStyles();
//  this.setSelected();
   	this.setPopupStyles();
   
//  window._dynarch_pagedSelect=this.miDiv;
 },
  
  findDependentFieldsValues: function() {
  	if(this.options.dependentFields != undefined){
		this.options.dependentFieldsArray = this.options.dependentFields.split(',');
		for(var i=0;i<this.options.dependentFieldsArray.length;i++){
		    var fieldElem = $$(this.options.dependentFieldsArray[i])[0];
			if(fieldElem == undefined){
				alert("Paged select exception:\n Field '" + this.options.dependentFieldsArray[i] + "' not found!");
			}else{
				var fieldValue = fieldElem.value;
				this.options.dependentFieldsArray[i] = fieldValue;
			}
		}
	}else{
		this.options.dependentFieldsArray = new Array();
	}
   },
  
  doSearch: function(e) {
      var oOptions = this.options;
      var oThis = this;
      
      // s'ha de fer per camps dependents.
      //var searchField = document.getElementsByName(this.options.fieldId)[0]; 
 
 	  this.findDependentFieldsValues();
 
      if (oOptions.indicator) {
         Element.show($(oOptions.indicator));              
      }
   
      var numRowsLoad = 0;
      numRowsLoad = parseInt(this.options.numberRowsPerPage);   
      
      // comprovar si hi ha camps dependents.
         
//      alert("NumRowsLoad"+numRowsLoad);
	  //                        cols(params) - vals(dependentFields)
	  
      searchPanelService.doSearch(this.options.queryParametersArray,this.options.dependentFieldsArray,oOptions.optionsListName,oOptions.selectedValue,oOptions.selectedKey,this.currentPage,numRowsLoad,
      {
	 		callback:function(dataFromServer) {
		        if (oOptions.indicator) {
        	       Element.hide($(oOptions.indicator));              
        		}

	 			oThis.handlerFunction(dataFromServer);
	 		},
	 		timeout:1000
	 	}
	  );     		
  },
  
  fillField: function(selection) {
    this.options.fieldHiddenElem.value = selection.getAttribute("id");
    this.options.fieldElem.value = selection.innerHTML;
    $(this.popupElem).style.visibility = 'hidden';
    this.hidePopup();
  },

  handleEmptyResult: function(e) {
    this.resetProgressStyle();
    if (this.options.forceSelection == "true") {
      // remove last character typed
      this.options.sourceElem.value = this.options.sourceElem.value.substr(0, this.options.sourceElem.value.length-1);
    } else {
      // simply hide the popup
      this.hidePopup();
    }
  },

  handlerFunction: function(xml) {
    this.xml = xml;
  //this.resetProgressStyle();
    this.searchPanelView();
  },

  executePostFunction: function() {
    if (this.options.postFunction) {
      this.options.postFunction(this.xml);
    }
  },
  
  buildNavButton:function(enabled,uri) {
    if (enabled=="false") {
       uri = uri+"Disabled.gif";            
    }
    else {
       uri=uri+".gif";
    }
     
    var button = document.createElement("a");
    var imgEndavant = document.createElement("img");
    imgEndavant.src=contextPath+uri;
    button.appendChild(imgEndavant);            
    
	return button;     
  },
  
  // construeix els botons de navegaci?.
  buildDivButtons:function(backward,forward) {
    this.buttonDiv = document.createElement("div");
    
    if (backward == "true") {
       this.inputButtonEndarrera = this.buildNavButton("true","/images/pagedSelect/backward");       
       
       this.attachBehaviors(this.inputButtonEndarrera, this.options.eventType, this.performEndarreraButton, this);
      
    }
    else {
       this.inputButtonEndarrera = this.buildNavButton("false","/images/pagedSelect/backward");       
    }
     
         
    if (forward == "true") {
       this.inputButtonEndavant = this.buildNavButton("true","/images/pagedSelect/forward");       	   
	   this.attachBehaviors(this.inputButtonEndavant, this.options.eventType, this.performEndavantButton, this);
      
    }
    else {
	   this.inputButtonEndavant = this.buildNavButton("false","/images/pagedSelect/forward");           

    }
    
    this.buttonDiv.appendChild(this.inputButtonEndarrera);
    this.buttonDiv.appendChild(this.inputButtonEndavant);

        
    this.buttonDiv.style.position="relative";    
    var left = this.options.fieldElem.offsetWidth-30;
  
    this.buttonDiv.style.left=left+"px";
  
    this.buttonDiv.style.top="0px";
//  this.buttonDiv.style.width="100%";
    this.buttonDiv.style.height="15px";
  },

  createPopup: function(e) {
    new Insertion.Top(
      document.getElementsByTagName("body")[0],
       "<div id=\""+this.popupElem+"\" class=\""+this.options.className+"\"></div>"); 

    this.miDiv = $(this.popupElem);  
    this.buildDivButtons("false","true");
    this.miDiv.appendChild(this.buttonDiv);
    
    var ul = document.createElement("ul");
    this.miDiv.appendChild(ul);
       
    if (this.options.className!='null') {
        this.miDiv.style.className=this.options.className;
    }
   
  	var miBody = document.getElementsByTagName("body")[0];
  
    return this.miDiv;
  },
  
  
  

  hidePopup: function() {
//    alert("window._dynarch_searchPanel:"+window._dynarch_searchPanel.id);
    this.miDiv.style.visibility = 'hidden';
//    this.removeBehaviors(document,"click",this.functionWindow,this);
	if(this.isIE) {
		var layerId = new String("layerCover_" + this.options.fieldId).replace('.', '');
	    $(layerId).style.display = "none";
	}
  },

  setProgressStyle: function() {
    if (this.options.progressStyle != null) {
      Element.addClassName(this.options.sourceElem, this.options.progressStyle);
    }
  },

  resetProgressStyle: function() {
    if (this.options.progressStyle != null) {
      Element.removeClassName(this.options.sourceElem, this.options.progressStyle);
    }
  },

  setSelected: function() {
    this.currentIndex = 0;
    this.suggestList = this.miDiv.getElementsByTagName("li");

    if (this.suggestList.length > 0) {
//           && this.suggestList[0].innerHTML != $F(this.options.targetElem))) {
       
      this.setPopupStyles();
    
      for (var i = this.currentIndex ; i < this.suggestList.length; i++) {
          this.suggestList[i].index = i;
          this.addOptionHandlers(this.suggestList[i]);
      }
      
      this.currentIndex=0;
      
      this.suggestList[this.currentIndex].className = 'selected';
    }else {
//       alert("SuggestListBuida");
       $(this.popupElem).style.visibility = 'hidden';
    }
    return null;
  },

  setPopupStyles: function() {    
    var maxHeight;
    if (isIE) {
      maxHeight = 200;
    } else {
      maxHeight = window.outerHeight/3;
    }

//    alert("MaxHeight:"+maxHeight);
//       alert("Popup:"+$(this.popupElem));
    if ($(this.popupElem).offsetHeight < maxHeight) {
      $(this.popupElem).style.overflow = 'hidden';
    } else if (isMoz) {
      $(this.popupElem).style.maxHeight = maxHeight + 'px';
      $(this.popupElem).style.overflow = '-moz-scrollbars-vertical';
    } else {
      $(this.popupElem).style.height = maxHeight + 'px';
      $(this.popupElem).style.overflowY = 'auto';
    }
    $(this.popupElem).scrollTop = 0;
    $(this.popupElem).style.visibility = 'visible';
    
  //  alert("Top:"+this.options.fieldElem+" Left:"+this.options.fieldElem);
  //  alert("Y:"+getElementY(this.options.fieldElem)+":"+$(this.popupElem).style.top);
  //  alert("X:"+getElementX(this.options.fieldElem)+":"+$(this.popupElem).style.left);
    
    $(this.popupElem).style.top = (getElementY(this.options.fieldElem)+this.options.fieldElem.offsetHeight+2) + "px";
    $(this.popupElem).style.left = getElementX(this.options.fieldElem) + "px";
    if (isIE) {
      $(this.popupElem).style.width = this.options.fieldElem.offsetWidth + "px";
      $(this.miDiv).style.display="block";
      $(this.popupElem).style.overflow = "visible";
//      alert($(this.miDiv).style.top+","+$(this.miDiv).style.left+","+$(this.miDiv).style.width+","+$(this.miDiv).style.display+","+$(this.miDiv).style.visibility);
    } else {
      $(this.popupElem).style.minWidth = this.options.fieldElem.offsetWidth + "px";
    }

	//$(this.popupElem).style.backgroundColor="blue";
	$(this.popupElem).style.border = "1px solid black";

	if(this.isIE) {
	    // do iframe
	   	var layerId = new String("layerCover_" + this.options.fieldId).replace('.', '');
	    $(layerId).style.top = (getElementY(this.options.fieldElem)+this.options.fieldElem.offsetHeight+2) + "px";
	    $(layerId).style.left = getElementX(this.options.fieldElem) + "px";
	    $(layerId).style.width = $(this.popupElem).offsetWidth;
	    $(layerId).style.backgroundColor = "fff";
	    $(layerId).style.height = $(this.popupElem).offsetHeight + "px";
	//    alert("LayerCover"+$(layerId).style.display+"LayerCover"+$(layerId).style.top+","+$(layerId).style.left+","+$(layerId).style.width+$(layerId).style.height);
	    $(layerId).style.display = "block";
	    $(layerId).style.zIndex = 10;
    }
    
    $(this.popupElem).style.zIndex = 20;
  },

  setDivStyles: function() {
    var maxHeight;
    if (isIE) {
      maxHeight = 200;
    } else {
      maxHeight = window.outerHeight/3;
    }

    if ($(this.miDiv).offsetHeight < maxHeight) {
      $(this.miDiv).style.overflow = 'hidden';
    } else if (isMoz) {
      $(this.miDiv).style.maxHeight = maxHeight + 'px';
      $(this.miDiv).style.overflow = '-moz-scrollbars-vertical';
    } else {
      $(this.miDiv).style.height = maxHeight + 'px';
      $(this.miDiv).style.overflowY = 'auto';
    }
    $(this.miDiv).scrollTop = 0;
    //$(this.miDiv).style.visibility = 'visible';

    
    $(this.miDiv).style.top = (getElementY(this.options.fieldElem)+this.options.fieldElem.offsetHeight+2) + "px";
    $(this.miDiv).style.left = getElementX(this.options.fieldElem) + "px";
    
//    alert($(this.miDiv).style.top+","+$(this.miDiv).style.left);
    
    if (this.isIE) {
      $(this.miDiv).style.width = this.options.fieldElem.offsetWidth + "px";
//      alert($(this.miDiv).style.top+","+$(this.miDiv).style.left+","+$(this.miDiv).style.width);
    } else {
      $(this.miDiv).style.minWidth = this.options.fieldElem.offsetWidth + "px";
    }
    $(this.miDiv).style.overflow = "visible";
  },

  
  
  createIframe: function() {
  var layerId = new String("layerCover_" + this.options.fieldId).replace('.', '');
    new Insertion.Before($(this.popupElem), "<iframe id='" + layerId + "' style='position: absolute; top: 0; left: 0;' src='about:blank' frameborder='0' scrolling='no'></iframe>");
  },
  
//  createIframe: function() {  
//    var miiFrame = document.createElement("iFrame");
//    miiFrame.setAttribute("id","layerCover");
//    miiFrame.setAttribute("style","display: none; position: absolute; top: 0; left: 0;");
//    miiFrame.setAttribute("src","about:blank");
//    miiFrame.setAttribute("frameborder","0");
//    miiFrame.setAttribute("scrolling","no");
//    var miBody = document.getElementsByTagName("body")[0];
//    miBody.appendChild(miiFrame);
//    this.setPopupStyles();
//    this.attachBehaviors(miiFrame, "keyup", this.sourceElemKeyPress, this);
//  },

  handleClick: function(e) {
    this.fillField(Event.element(e));
   // this.executePostFunction();
  },

  handleOver: function(e) {
 //  alert("SuggestList "+this.currentIndex+ " SuggestList"+this.suggestList);
    this.suggestList[this.currentIndex].className = '';
    this.currentIndex = Event.element(e).index;
//    alert("SuggestList "+this.currentIndex);
    this.suggestList[this.currentIndex].className = 'selected';
  },

  addOptionHandlers: function(option) {
    option.onclick = this.handleClick.bindAsEventListener(this);
    option.onmouseover = this.handleOver.bindAsEventListener(this);
  },
  
 _checkPanel: function(ev) {
//    alert("_checkPanel"+window._dynarch_searchPanel);
	var panel = this.miDiv;
	if (!panel) {
	    alert("no panel");
		return false;
	}
	
	var el = this.isIE ? this.getElement(ev) : this.getTargetElement(ev);
//	alert("Element event:"+el+" Panel:"+panel.element);	

	for (; el != null && el != panel; el = el.parentNode);
	if (el == null) {	
		if((!isAttach) && ($(this.popupElem).style.visibility == 'visible')){
			this.hidePopup(); 
			Event.stop(ev);	
		}else{
			isAttach = false;
		}
		return false; //this.stopEvent(ev);
	}
  },
  
  getTargetElement: function(ev) {
	var f = this.isIE ? window.event.srcElement : ev.target;
	while (f.nodeType != 1)
		f = f.parentNode;
	return f;
  },
  
  getElement: function(ev) {
	var f = this.isIE ? window.event.srcElement : ev.currentTarget;
	while (f.nodeType != 1 || /^div$/i.test(f.tagName))
		f = f.parentNode;
	return f;
  },  

  removeBehaviors: function(element, event, listener, obj) {
	if(element.detachEvent){
    	element.detachEvent('on'+event,listener);
    }
    else {
	    element.removeEventListener(event,listener,'true');
    }  
  },

  stopEvent: function(ev) {
	ev || (ev = window.event);
	if (this.isIE) {
		ev.cancelBubble = true;
		ev.returnValue = false;
	} else {
		ev.preventDefault();
		ev.stopPropagation();
	}
	return false;
  },
  
  attachBehaviorsSimple: function(element, event, listener, obj) {
    	if(element.attachEvent){//alert('attachBehaviorsSimple');
//    		element.attachEvent('on'+event,listener);

			isAttach = true;
    		document.onclick=this.functionWindow;
//    		isAttach = false;alert('attachBehaviorsSimple2'+isAttach);
//    		window._dynarch_searchPanel = this;
    	}
    	else {
	    	element.addEventListener(event,listener,'true');
    	}
  }  

});

// global object that remembers the calendar
//window._dynarch_pagedSelect = null;
